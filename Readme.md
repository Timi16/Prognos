Prognos


Prognos is a decentralized prediction marketplace built on the Flow blockchain ecosystem. Users can create, participate in, and resolve prediction markets on real-world events, outcomes, and trends. Bet on sports, politics, crypto prices, or any verifiable event using FLOW tokens or other assets. Wagerme leverages Flow's high-performance, user-centric blockchain to ensure fast, secure, and scalable betting experiences.
🚀 Features

Create Markets: Deploy prediction markets with custom questions, resolution criteria, and end dates.
Bet & Trade: Place yes/no bets or trade shares in open markets with real-time pricing.
Automated Resolution: Use oracles or community voting to settle markets transparently.
Multi-Asset Support: Bet with FLOW, fungible tokens, or NFTs.
User-Friendly Interface: Built with React and @onflow/fcl for seamless wallet integration.
Cross-Chain Compatibility: Supports EVM interactions via bridged assets.

🛠 Tech Stack

Blockchain: Flow (Cadence smart contracts)
Frontend: React.js, TypeScript, @onflow/fcl for wallet connectivity
Backend: Node.js with Flow SDK
Oracles: Integration with Chainlink or custom Flow-based oracles for event resolution
Deployment: Hosted on Flow's testnet/mainnet with EVM compatibility


Built on Flow: All smart contracts are deployed on the Flow blockchain. See the Contracts section for addresses.

📦 Installation

Clone the Repository:
git clone https://github.com/Timi16/Prognos.git
cd WagermeFlow


Install Dependencies:
npm install
# or
yarn install


Set Up Environment:

Create a .env file in the root directory.
Add your Flow wallet details and API keys:REACT_APP_FLOW_ACCESS_API=access.devnet.onflow.org:9000
REACT_APP_FLOW_APP_DETAIL="https://fcl-redirect.onflow.org"




Run the Development Server:
npm start
# or
yarn start

The app will open at http://localhost:3000.


🔧 Usage

Connect Wallet: Use Blocto or Lilico wallet via FCL to connect your Flow account.
Browse Markets: Explore active prediction markets on the dashboard.
Create a Market:
Navigate to "Create Market".
Enter event details (e.g., "Will Bitcoin hit $100K by Dec 2025?").
Set collateral and resolution method.
Deploy via smart contract.


Place Bets: Select a market, choose Yes/No, and stake tokens.
Resolve & Claim: Once resolved, winners claim rewards automatically.


For detailed guides, check the docs folder (coming soon).

📄 Contracts
Prognos uses the following deployed Cadence contracts on Flow:

PredictionMarket Contract: Handles market creation, betting, and resolution.
Address: 0x0fa0eeb9864e32cc


MarketToken (Fungible Token): Shares for yes/no outcomes.
Address: Integrated within the main contract.




Note: These are deployed on Flow Mainnet. For testnet deployments, update your FCL config.

EVM Bridge Wallet (for cross-chain assets): 0x000000000000000000000002206f95Af1352D46C
🤝 Contributing
We welcome contributions! Follow these steps to contribute:

Fork the repository.
Create a feature branch:git checkout -b feature/AmazingFeature


Commit your changes:git commit -m 'Add some AmazingFeature'


Push to the branch:git push origin feature/AmazingFeature


Open a Pull Request.

See CONTRIBUTING.md for more details.
📱 Follow Us

GitHub: Timi16
X: @Timicoding

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

Built with ❤️ on Flow. Questions? Open an issue or DM @Timicoding on X.
