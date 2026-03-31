#Stellar Payment dApp (White Belt) 🚀

A modern, beginner-friendly decentralized application (dApp) built on the Stellar Testnet. This application allows users to connect their Freighter wallet, view their XLM balance, and send XLM transactions seamlessly.

This project demonstrates the core fundamentals of Stellar development including wallet integration, balance fetching, and transaction execution.

⸻

📌 Project Description

This dApp is a Simple Payment Application built as part of the Stellar White Belt level.

It enables users to:
	•	Connect/disconnect their Freighter wallet
	•	View real-time XLM balance
	•	Send XLM to any Stellar address on testnet
	•	Get instant feedback on transaction status

The project focuses on:
	•	Clean UI/UX
	•	Proper error handling
	•	Real blockchain interaction using Stellar SDK

⸻

🌟 Features
	•	🔗 Freighter Wallet Integration
	•	Connect and disconnect wallet securely
	•	Displays public key
	•	💰 Real-time Balance
	•	Fetch XLM balance from Stellar Horizon Testnet
	•	Shows loading and error states
	•	💸 Send Payments
	•	Send XLM to any valid Stellar address
	•	Includes input validation
	•	📊 Transaction Feedback
	•	Success/Error messages
	•	Transaction hash display
	•	Link to Stellar Expert Explorer
	•	📋 Copy to Clipboard
	•	Copy wallet address easily

⸻

🛠️ Tech Stack
	•	Frontend: React + Vite
	•	Styling: Tailwind CSS v4
	•	Blockchain SDK:
	•	@stellar/stellar-sdk
	•	@stellar/freighter-api
	•	Icons: lucide-react
	•	Network: Stellar Testnet

⸻

📁 Project Structure

<pre>

src/
├── components/
│   ├── ui/
│   ├── WalletCard.jsx
│   └── TransactionForm.jsx
├── utils/
│   ├── stellar.js
│   └── cn.js
├── pages/
│   └── Home.jsx
├── App.jsx
├── main.jsx
└── index.css
</pre>




⸻

⚙️ How Transactions Work
	1.	Connect Wallet
	•	Uses Freighter API to get public key
	2.	Fetch Balance
	•	Queries Horizon Testnet server:

https://horizon-testnet.stellar.org


	3.	Build Transaction
	•	Uses TransactionBuilder
	•	Adds payment operation
	4.	Sign Transaction
	•	Freighter prompts user to sign
	5.	Submit Transaction
	•	Sent to Stellar network
	•	Returns transaction hash

⸻

🚀 Setup Instructions (Run Locally)

1. Prerequisites
	•	Node.js (v18 or higher)
	•	Freighter Wallet Extension installed
	•	Set Freighter to Testnet
	•	Fund your wallet using:
👉 https://laboratory.stellar.org/#account-creator?network=test

⸻

2. Installation

# Clone repository
git clone <your-repo-url>

# Navigate to project
cd stellar-payment-dapp

# Install dependencies
npm install

# Start development server
npm run dev

Open in browser:

http://localhost:5173


⸻

📸 Screenshots 

🔌 Wallet Connected State

<img width="1435" height="804" alt="Screenshot 2026-03-31 at 10 32 24 PM" src="https://github.com/user-attachments/assets/2f0d1b83-f3cf-4c35-be07-438586e683d3" />


⸻

💰 Balance Displayed

<img width="1417" height="774" alt="Screenshot 2026-03-31 at 10 32 53 PM" src="https://github.com/user-attachments/assets/2ba0ec4a-da9e-4909-a34b-c9fa141a51fa" />



⸻

🌐 Deployment Guide

Option A: Vercel (Recommended)
	1.	Go to https://vercel.com
	2.	Import GitHub repository
	3.	Use default settings:

	•	Framework: Vite
	•	Build Command:

npm run build


	•	Output Directory:

dist



	4.	Click Deploy

⸻

Option B: Netlify
	1.	Go to https://netlify.com
	2.	Import project from GitHub

Build settings:

Build command: npm run build
Publish directory: dist

	3.	Click Deploy

⸻

⚠️ Error Handling

The app handles:
	•	Freighter not installed
	•	Wallet not connected
	•	Invalid address
	•	Insufficient balance
	•	Network errors

⸻

🤝 Need Help?
	•	Stellar Docs: https://developers.stellar.org
	•	Freighter Docs: https://docs.freighter.app

⸻



