"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Clock, TrendingUp, Share2, Heart, CheckCircle, X, ArrowUp, ArrowDown, Zap } from "lucide-react"

interface PredictDrawerProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  market: {
    id: string
    title: string
    timeLeft: string
    yesOdds: number
    noOdds: number
    isLive?: boolean
  }
  trigger?: React.ReactNode
}

type TransactionState = "idle" | "signing" | "pending" | "success" | "error"

export function PredictDrawer({ isOpen, onOpenChange, market, trigger }: PredictDrawerProps) {
  const [selectedSide, setSelectedSide] = useState<"YES" | "NO">("YES")
  const [amount, setAmount] = useState([25])
  const [customAmount, setCustomAmount] = useState("25")
  const [txState, setTxState] = useState<TransactionState>("idle")
  const [isFollowing, setIsFollowing] = useState(false)
  const [oddsChange, setOddsChange] = useState<{ direction: "up" | "down"; value: number } | null>(null)

  // Simulate live odds changes
  useEffect(() => {
    if (!isOpen || !market.isLive) return

    const interval = setInterval(() => {
      const shouldChange = Math.random() > 0.7 // 30% chance of change
      if (shouldChange) {
        const direction = Math.random() > 0.5 ? "up" : "down"
        const value = Math.floor(Math.random() * 3) + 1 // 1-3% change
        setOddsChange({ direction, value })
        setTimeout(() => setOddsChange(null), 2000)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isOpen, market.isLive])

  const currentOdds = selectedSide === "YES" ? market.yesOdds : market.noOdds
  const stake = Number.parseFloat(customAmount) || 0
  const estimatedPayout = stake > 0 ? (stake / currentOdds) * 100 : 0
  const platformFee = stake * 0.02 // 2% platform fee
  const netPayout = estimatedPayout - platformFee

  const quickAmounts = [5, 10, 25, 100]

  const handleAmountChange = (value: number) => {
    setAmount([value])
    setCustomAmount(value.toString())
  }

  const handleMaxAmount = () => {
    const maxAmount = 500 // Simulate max balance
    handleAmountChange(maxAmount)
  }

  const handlePredict = async () => {
    if (stake <= 0) return

    setTxState("signing")
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setTxState("pending")
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // Simulate success/error
    const success = Math.random() > 0.1 // 90% success rate
    setTxState(success ? "success" : "error")

    if (success) {
      setTimeout(() => {
        setTxState("idle")
        // Don't close drawer immediately to show success state
      }, 3000)
    } else {
      setTimeout(() => setTxState("idle"), 2000)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: market.title,
        text: `Check out this prediction market: ${market.title}`,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href)
    }
  }

  const getButtonText = () => {
    switch (txState) {
      case "signing":
        return "Sign Transaction..."
      case "pending":
        return "Confirming..."
      case "success":
        return "Success!"
      case "error":
        return "Try Again"
      default:
        return `Predict ${selectedSide} • $${customAmount}`
    }
  }

  const getButtonIcon = () => {
    switch (txState) {
      case "signing":
      case "pending":
        return <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      case "success":
        return <CheckCircle className="w-4 h-4" />
      case "error":
        return <X className="w-4 h-4" />
      default:
        return <TrendingUp className="w-4 h-4" />
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent
        side="bottom"
        className="h-[85vh] glass-card border-t-2 border-primary/20 bg-bg/95 backdrop-blur-xl rounded-t-3xl"
      >
        <div className="flex flex-col h-full">
          {/* Handle Bar */}
          <div className="flex justify-center py-2">
            <div className="w-12 h-1 bg-border rounded-full" />
          </div>

          {/* Header */}
          <SheetHeader className="px-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {market.isLive && (
                  <Badge className="text-xs px-2 py-1 bg-success/20 text-success border-success/30 animate-pulse">
                    <Zap className="w-3 h-3 mr-1" />
                    LIVE
                  </Badge>
                )}
                <div className="flex items-center gap-1 text-sm text-text-muted">
                  <Clock className="w-3 h-3" />
                  {market.timeLeft}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8 p-0 hover:bg-surface/50"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <SheetTitle className="text-left text-lg font-semibold line-clamp-2 text-balance">
              {market.title}
            </SheetTitle>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 px-6 pb-6 overflow-y-auto">
            {txState === "success" ? (
              // Success State
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Prediction Placed!</h3>
                  <p className="text-text-muted">
                    You predicted {selectedSide} with ${customAmount}
                    <br />
                    Potential payout: ${netPayout.toFixed(2)}
                  </p>
                </div>
                <div className="flex gap-3 w-full max-w-sm">
                  <Button
                    variant="outline"
                    className="flex-1 glass-card border-border/50 bg-transparent"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    className={`flex-1 glass-card border-border/50 ${
                      isFollowing ? "bg-primary/20 text-primary" : "bg-transparent"
                    }`}
                    onClick={() => setIsFollowing(!isFollowing)}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isFollowing ? "fill-current" : ""}`} />
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                </div>
              </div>
            ) : (
              // Prediction Form
              <div className="space-y-6">
                {/* Odds Selection */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Choose Side</h3>
                    {oddsChange && (
                      <div
                        className={`flex items-center gap-1 text-sm font-medium ${
                          oddsChange.direction === "up" ? "text-success" : "text-danger"
                        }`}
                      >
                        {oddsChange.direction === "up" ? (
                          <ArrowUp className="w-3 h-3" />
                        ) : (
                          <ArrowDown className="w-3 h-3" />
                        )}
                        {oddsChange.value}%
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant={selectedSide === "YES" ? "default" : "outline"}
                      className={`h-16 ${
                        selectedSide === "YES"
                          ? "bg-success/20 text-success border-success/50 glow hover:bg-success/30"
                          : "glass-card border-border/50 hover:border-success/30"
                      }`}
                      onClick={() => setSelectedSide("YES")}
                    >
                      <div className="text-center">
                        <div className="text-lg font-bold">YES</div>
                        <div className="text-sm opacity-80">{market.yesOdds}%</div>
                      </div>
                    </Button>
                    <Button
                      variant={selectedSide === "NO" ? "default" : "outline"}
                      className={`h-16 ${
                        selectedSide === "NO"
                          ? "bg-danger/20 text-danger border-danger/50 glow hover:bg-danger/30"
                          : "glass-card border-border/50 hover:border-danger/30"
                      }`}
                      onClick={() => setSelectedSide("NO")}
                    >
                      <div className="text-center">
                        <div className="text-lg font-bold">NO</div>
                        <div className="text-sm opacity-80">{market.noOdds}%</div>
                      </div>
                    </Button>
                  </div>
                </div>

                {/* Amount Input */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Amount</h3>
                    <span className="text-sm text-text-muted">Balance: $1,250</span>
                  </div>
                  <div className="space-y-4">
                    <Input
                      type="number"
                      value={customAmount}
                      onChange={(e) => {
                        const value = e.target.value
                        setCustomAmount(value)
                        setAmount([Number.parseFloat(value) || 0])
                      }}
                      className="h-14 text-lg text-center bg-surface/50 border-border/50"
                      placeholder="0"
                    />
                    <Slider
                      value={amount}
                      onValueChange={(value) => {
                        setAmount(value)
                        setCustomAmount(value[0].toString())
                      }}
                      max={500}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="grid grid-cols-5 gap-2">
                      {quickAmounts.map((quickAmount) => (
                        <Button
                          key={quickAmount}
                          variant="outline"
                          size="sm"
                          className="glass-card border-border/50 bg-transparent text-xs"
                          onClick={() => handleAmountChange(quickAmount)}
                        >
                          ${quickAmount}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        className="glass-card border-border/50 bg-transparent text-xs"
                        onClick={handleMaxAmount}
                      >
                        Max
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Payout Breakdown */}
                {stake > 0 && (
                  <div className="glass-card p-4 bg-surface/30 rounded-xl">
                    <h4 className="font-medium mb-3">Payout Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-muted">Your Stake</span>
                        <span>${stake.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Current Odds</span>
                        <span>{currentOdds}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Est. Payout</span>
                        <span className="text-success">${estimatedPayout.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Platform Fee</span>
                        <span className="text-danger">-${platformFee.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-border/50 pt-2">
                        <div className="flex justify-between font-medium">
                          <span>Net Payout</span>
                          <span className="text-success">${netPayout.toFixed(2)}</span>
                        </div>
                        <div className="text-xs text-text-muted mt-1">
                          Profit: ${(netPayout - stake).toFixed(2)} ({(((netPayout - stake) / stake) * 100).toFixed(1)}
                          %)
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sticky Bottom Action */}
          {txState !== "success" && (
            <div className="px-6 py-4 border-t border-border/50 bg-bg/95 backdrop-blur-sm">
              <Button
                onClick={handlePredict}
                disabled={stake <= 0 || txState === "signing" || txState === "pending"}
                className={`w-full h-14 text-lg font-medium ${
                  txState === "error"
                    ? "bg-danger/20 text-danger border-danger/50 hover:bg-danger/30"
                    : "cta-gradient hover-glow press-scale"
                }`}
              >
                <div className="flex items-center gap-2">
                  {getButtonIcon()}
                  {getButtonText()}
                </div>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

// Usage example component
export function PredictDrawerExample() {
  const [isOpen, setIsOpen] = useState(false)

  const mockMarket = {
    id: "1",
    title: "Will Bitcoin reach $100K by end of 2024?",
    timeLeft: "23d 14h",
    yesOdds: 73,
    noOdds: 27,
    isLive: true,
  }

  return (
    <PredictDrawer
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      market={mockMarket}
      trigger={
        <Button className="cta-gradient hover-glow press-scale">
          <TrendingUp className="w-4 h-4 mr-2" />
          Predict
        </Button>
      }
    />
  )
}
