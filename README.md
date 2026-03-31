# Stellar Payment dApp (White Belt) 🚀

A modern, beginner-friendly decentralized application (dApp) built on the Stellar Testnet. This application allows users to connect their Freighter wallet, view their XLM balance, and send XLM to other Stellar addresses seamlessly.

![Stellar dApp Screenshot Placeholder](https://via.placeholder.com/800x400.png?text=Stellar+Payment+dApp+Screenshot)

## 🌟 Features

- **Freighter Wallet Integration**: Connect and disconnect your Freighter wallet securely.
- **Real-time Balance**: Check your current XLM balance on the Stellar Testnet.
- **Send Payments**: Send XLM to any other Stellar address easily with network fee estimation.
- **Transaction Feedback**: View transaction status (Success/Error) alongside the transaction hash and a link to Stellar Expert Explorer.
- **Copy to Clipboard**: Quickly copy your address with a clean visual feedback element.

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Blockchain SDK**: 
  - `@stellar/stellar-sdk`
  - `@stellar/freighter-api`
- **Icons**: `lucide-react`
- **Network**: Stellar Testnet

## 📁 Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── ui/              # Base UI elements (Button, Input, Card)
│   ├── WalletCard.jsx     # Displays wallet balance and public key
│   └── TransactionForm.jsx # Handles sending XLM payments
├── utils/               # Helper utilities
│   ├── stellar.js       # Stellar SDK and Freighter API logic
│   └── cn.js            # Tailwind class-merging utility
├── pages/
│   └── Home.jsx         # Main page layout
├── App.jsx              # App entry point
├── main.jsx             # React DOM rendering
└── index.css            # Global styles and Tailwind configuration
```

## ⚙️ How Transactions Work

1. **Connect Wallet**: The app uses the Freighter API to securely request your public key.
2. **Fetch Balance**: We connect to the public **Horizon Testnet Server** (`https://horizon-testnet.stellar.org`) and query the account data for your address.
3. **Build Transaction**: When you initiate a payment, we use `TransactionBuilder` to create a new transaction with an operation of type `payment`.
4. **Sign Transaction**: We pass the un-signed transaction XDR back to Freighter which prompts you to sign it.
5. **Submit to Network**: Once signed, we submit the transaction through the Horizon server and wait for the response, displaying the transaction hash upon success.

---

## 🚀 Setup Instructions

### 1. Prerequisites

- Node.js installed (v18 or higher recommended)
- [Freighter Wallet Extension](https://freighter.app/) installed in your browser.
- Make sure Freighter is configured to use the **Testnet**.
- Important: Your Freighter wallet on testnet must be funded. You can fund it using the [Stellar Laboratory Friendbot](https://laboratory.stellar.org/#account-creator?network=test).

### 2. Local Installation

Clone the repository and install the dependencies:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🌐 Deployment Guide (Vercel or Netlify)

This project uses Vite, making deployment extremely easy. 

### Option A: Deploying to Vercel (Recommended)

1. Sign up for a free account on [Vercel](https://vercel.com/).
2. Install the Vercel CLI (`npm i -g vercel`) and run `vercel` in your project root, OR use the Vercel Dashboard to import your GitHub repository.
3. The default settings for Vite will be automatically detected:
   - **Framework Preset**: Vite
   - **Build Command**: `pm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**. Your app will be live within seconds!

### Option B: Deploying to Netlify

1. Sign in to [Netlify](https://www.netlify.com/).
2. Add a new site and click **Import an existing project** from GitHub.
3. Configure the build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click **Deploy site**.

## 🤝 Need Help?
- **Stellar Docs**: [Stellar Developer Documentation](https://developers.stellar.org/)
- **Freighter Docs**: [Freighter Connect Documentation](https://docs.freighter.app/)
