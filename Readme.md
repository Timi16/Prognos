
# 🔮 Prognos

**Prognos** is a decentralized prediction marketplace built on the **Flow blockchain ecosystem**.  
Users can **create, participate in, and resolve prediction markets** on real-world events, outcomes, and trends.  

Bet on **sports, politics, crypto prices, or any verifiable event** using FLOW tokens or other assets.  
Prognos leverages Flow's high-performance, user-centric blockchain to ensure **fast, secure, and scalable** betting experiences.

---

## 🚀 Features

- **Create Markets** – Deploy prediction markets with custom questions, resolution criteria, and end dates.  
- **Bet & Trade** – Place yes/no bets or trade shares in open markets with real-time pricing.  
- **Automated Resolution** – Use oracles or community voting to settle markets transparently.  
- **Multi-Asset Support** – Bet with FLOW, fungible tokens, or NFTs.  
- **User-Friendly Interface** – Built with React and `@onflow/fcl` for seamless wallet integration.  
- **Cross-Chain Compatibility** – Supports EVM interactions via bridged assets.  

---

## 🛠 Tech Stack

- **Blockchain**: Flow (Cadence smart contracts)  
- **Frontend**: React.js, TypeScript, `@onflow/fcl` for wallet connectivity  
- **Backend**: Node.js with Flow SDK  
- **Oracles**: Chainlink or custom Flow-based oracles for event resolution  
- **Deployment**: Flow testnet/mainnet with EVM compatibility  

> **Built on Flow** – All smart contracts are deployed on the Flow blockchain.  
See the [Contracts](#-contracts) section for addresses.

---

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Timi16/Prognos.git
cd WagermeFlow
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Set Up Environment
Create a `.env` file in the root directory and add:
```env
REACT_APP_FLOW_ACCESS_API=access.devnet.onflow.org:9000
REACT_APP_FLOW_APP_DETAIL="https://fcl-redirect.onflow.org"
```

### 4. Run the Development Server
```bash
npm start
# or
yarn start
```

The app will open at [http://localhost:3000](http://localhost:3000).

---

## 🔧 Usage

1. **Connect Wallet** – Use Blocto or Lilico wallet via FCL to connect your Flow account.  
2. **Browse Markets** – Explore active prediction markets on the dashboard.  
3. **Create a Market**:
   - Go to **"Create Market"**
   - Enter event details (e.g., *"Will Bitcoin hit $100K by Dec 2025?"*)  
   - Set collateral and resolution method  
   - Deploy via smart contract  
4. **Place Bets** – Select a market, choose **Yes/No**, and stake tokens.  
5. **Resolve & Claim** – Once resolved, winners claim rewards automatically.  

📖 Detailed guides will be available in the `docs/` folder (coming soon).

---

## 📄 Contracts

Prognos uses the following deployed **Cadence contracts** on Flow:

- **PredictionMarket Contract** – Handles market creation, betting, and resolution.  
  `Address: 0x0fa0eeb9864e32cc`  

- **MarketToken (Fungible Token)** – Shares for yes/no outcomes.  
  `Address: Integrated within the main contract`  

> These are deployed on **Flow Mainnet**. For testnet deployments, update your **FCL config**.

**EVM Bridge Wallet** (for cross-chain assets):  
`0x000000000000000000000002206f95Af1352D46C`

---

## 🤝 Contributing

We welcome contributions! 🚀  

1. **Fork** the repository  
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**:
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to your branch**:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

👉 See `CONTRIBUTING.md` for more details.

---

## 📱 Follow Us

- **GitHub**: [Timi16](https://github.com/Timi16)  
- **X (Twitter)**: [@Timicoding](https://x.com/Timicoding)

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.  

---

Built with ❤️ on **Flow**.  
Questions? Open an issue or DM [@Timicoding](https://x.com/Timicoding) on X.

---
