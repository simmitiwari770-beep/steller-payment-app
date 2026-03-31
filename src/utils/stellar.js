import {
  isConnected,
  requestAccess,
  signTransaction,
} from "@stellar/freighter-api";
import * as StellarSdk from "@stellar/stellar-sdk";

// Initialize Stellar Testnet Horizon server
// Using Horizon API to interact with the Stellar network
const server = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");
const NETWORK_PASSPHRASE = StellarSdk.Networks.TESTNET;

/**
 * Check if the Freighter wallet is installed and connected
 */
export async function checkFreighterInstalled() {
  const result = await isConnected();
  return result.isConnected;
}

/**
 * Check if app already has access to the wallet without prompting.
 */
export async function checkAlreadyConnected() {
  const connectedStatus = await isConnected();
  if (connectedStatus.isConnected) {
    // using requestAccess or getAddress to see if it's already permitted
    // Another option is isAllowed() from freighter-api
    const { getAddress, isAllowed } = await import("@stellar/freighter-api");
    const allowed = await isAllowed();
    if (allowed.isAllowed) {
      const { address } = await getAddress();
      return address || null;
    }
  }
  return null;
}

/**
 * Get the public key of the connected Freighter wallet
 */
export async function connectWallet() {
  const connectedStatus = await isConnected();
  if (connectedStatus.isConnected) {
    try {
      // requestAccess prompts the user if they haven't allowed connection yet.
      // It returns the public key / address.
      const response = await requestAccess();
      if (response.error) {
        throw new Error(typeof response.error === 'string' ? response.error : response.error.message || "Failed to connect");
      }
      if (response.address) {
        return response.address;
      }
      throw new Error("Rejected by user or invalid response.");
    } catch (e) {
      console.error("Connection error details:", e);
      throw new Error(e?.message || "Failed to connect wallet.");
    }
  } else {
    throw new Error("Freighter wallet is not installed.");
  }
}

/**
 * Fetch the XLM balance of a given public key
 */
export async function fetchBalance(publicKey) {
  try {
    const account = await server.loadAccount(publicKey);
    // Find the native (XLM) balance from the account balances array
    const nativeBalance = account.balances.find((b) => b.asset_type === "native");
    return nativeBalance ? nativeBalance.balance : "0";
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("Account not found on the network. It might be unfunded.");
    }
    throw new Error("Failed to fetch balance.");
  }
}

/**
 * Send XLM to a destination address
 * 1. Build the transaction
 * 2. Sign it with Freighter
 * 3. Submit it to Horizon
 */
export async function sendPayment(sourcePublicKey, destinationPublicKey, amount) {
  try {
    // 1. Load the source account to get the sequence number
    const sourceAccount = await server.loadAccount(sourcePublicKey);

    // Get the latest base fee from the network
    const feeStats = await server.feeStats();
    const baseFee = feeStats.last_ledger_base_fee;

    // 2. Build the transaction
    const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
      fee: baseFee,
      networkPassphrase: NETWORK_PASSPHRASE,
      timebounds: await server.fetchTimebounds(100), // transaction expiration 100s from now
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: destinationPublicKey,
          asset: StellarSdk.Asset.native(),
          amount: amount.toString(),
        })
      )
      .setTimeout(30)
      .build();

    // 3. Sign the transaction using Freighter
    // Freighter returns the signed transaction as an XDR string
    const signResponse = await signTransaction(transaction.toXDR(), {
      networkPassphrase: NETWORK_PASSPHRASE,
      address: sourcePublicKey,
    });

    // Handle error where Freighter might not sign
    if (signResponse.error) {
      throw new Error(typeof signResponse.error === 'string' ? signResponse.error : signResponse.error.message || "Failed to sign");
    }
    if (!signResponse.signedTxXdr) {
      throw new Error("Transaction signature rejected by user.");
    }

    // 4. Submit the transaction to the Stellar network
    // The stellar-sdk version ^12 or higher expects the transaction object for submitTransaction
    const transactionToSubmit = StellarSdk.TransactionBuilder.fromXDR(signResponse.signedTxXdr, NETWORK_PASSPHRASE);
    const response = await server.submitTransaction(transactionToSubmit);

    return {
      success: true,
      hash: response.hash,
    };
  } catch (error) {
    console.error("Payment error:", error);
    if (error.response && error.response.data && error.response.data.extras) {
      const resultCodes = error.response.data.extras.result_codes;
      throw new Error(`Transaction failed: ${JSON.stringify(resultCodes)}`);
    }
    throw new Error(error.message || "Failed to send payment");
  }
}
