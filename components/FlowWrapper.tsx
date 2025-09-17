"use client"

import React, { useEffect } from "react"
import { FlowProvider } from "@onflow/react-sdk"
import * as fcl from "@onflow/fcl"

interface FlowWrapperProps {
  children: React.ReactNode
}

export function FlowWrapper({ children }: FlowWrapperProps) {
  useEffect(() => {
    // Configure FCL directly for wallet discovery
    fcl.config({
      "accessNode.api": "https://rest-testnet.onflow.org",
      "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
      "app.detail.title": "Prognos",
      "app.detail.icon": "/favicon.ico",
      "app.detail.description": "Agentic Prediction market platform on Flow",
    })
  }, [])

  return (
    <FlowProvider
      config={{
        accessNodeUrl: "https://rest-testnet.onflow.org",
        flowNetwork: "testnet",
        appDetailTitle: "Prognos",
        appDetailIcon: "/favicon.ico",
        appDetailDescription: "Agentic Prediction market platform on Flow",
        appDetailUrl: "http://localhost:3000",
      }}
    >
      {children}
    </FlowProvider>
  )
}