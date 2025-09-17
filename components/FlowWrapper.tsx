// components/FlowWrapper.tsx
"use client"

import React from "react"
import { FlowProvider } from "@onflow/react-sdk"

interface FlowWrapperProps {
  children: React.ReactNode
}

export function FlowWrapper({ children }: FlowWrapperProps) {
  return (
    <FlowProvider
      config={{
        // For Mainnet
        // accessNodeUrl: "https://access-mainnet.onflow.org",
        // flowNetwork: "mainnet",
        
        // For Testnet (uncomment to use testnet instead)
        accessNodeUrl: "https://access-testnet.onflow.org",
        flowNetwork: "testnet",
        
        // For local development (uncomment to use emulator)
        // accessNodeUrl: "http://localhost:8888",
        // flowNetwork: "emulator",
        
        appDetailTitle: "Prognos",
        appDetailIcon: "<YOUR_APP_ICON>", // Replace with your app icon
        appDetailDescription: "Agentic Prediction market platform on Flow",
        appDetailUrl: "https://yourapp.com", // Replace with your app URL
      }}
    >
      {children}
    </FlowProvider>
  )
}