"use client"
import "@/lib/flow-config"
import { FlowProvider } from "@onflow/react-sdk"
import React from "react"

interface FlowWrapperProps {
  children: React.ReactNode
}

export function FlowWrapper({ children }: FlowWrapperProps) {
  return <FlowProvider>{children}</FlowProvider>
}
