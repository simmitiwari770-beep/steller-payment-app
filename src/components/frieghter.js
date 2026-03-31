import { signTransaction, setAllowed, getAddress } from "@stellar/freighter-api";
import * as StellarSDK from "@stellar/stellar-sdk";

// Properly define the Horizon server to use
const server = new StellarSDK.Horizon.Server("https://horizon-testnet.stellar.org");

export const checkconnection = async () => {
    return await setAllowed();
};

export const retrievePublicKey = async () => {
    const { address } = await getAddress();
    return address;
};

export const getBalance = async () => {
     // Wait for access and get address
     await setAllowed();
     const { address } = await getAddress();
     
     // Corrected "loadAccount" spelling
     const account = await server.loadAccount(address);
     
     // Corrected variable name "xlm"
     const xlm = account.balances.find((b) => b.asset_type === "native");
     return xlm?.balance || "0";
};

// Exporting signTransaction so you can use it individually
export { signTransaction };
