import * as fcl from "@onflow/fcl"

fcl
  .config()
  .put("accessNode.api", "https://rest-testnet.onflow.org")
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")
  .put("app.detail.title", "Prognos")
  .put("app.detail.icon", "/favicon.ico")
  .put("app.detail.description", "Agentic Prediction market platform on Flow")
