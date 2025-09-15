"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Clock, ChevronDown, ChevronUp, ThumbsUp, Heart, Laugh, Angry, CheckCircle, Calendar } from "lucide-react"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { PredictDrawer } from "@/components/predict-drawer"

// Mock data
const mockMarket = {
  id: "1",
  title: "Will Bitcoin reach $100K by end of 2024?",
  category: "Crypto",
  status: "Open" as const,
  timeLeft: "23d 14h 32m",
  eventStartTime: "Dec 31, 2024 23:59 UTC",
  eventStatus: "Not Started",
  description:
    "This market resolves to YES if Bitcoin (BTC) reaches or exceeds $100,000 USD on any major exchange (Coinbase, Binance, Kraken) before January 1, 2025 00:00 UTC.",
  poolSize: "$45,234",
  totalVolume: "$127,891",
  volume24h: "$12,450",
  activeTraders: 247,
  yesOdds: 73,
  noOdds: 27,
  resolver: {
    name: "CryptoOracle",
    type: "Designated Oracle",
    bond: "$1,000",
    reputation: 98.5,
  },
  rules: [
    "Market resolves based on price data from Coinbase Pro, Binance, and Kraken",
    "Price must be sustained for at least 1 minute on any of these exchanges",
    "Market closes at 23:59 UTC on December 31, 2024",
    "In case of exchange outages, alternative sources may be used at resolver discretion",
  ],
}

const oddsHistory = [
  { time: "00:00", yes: 65, no: 35, volume: 1200 },
  { time: "04:00", yes: 68, no: 32, volume: 1800 },
  { time: "08:00", yes: 71, no: 29, volume: 2400 },
  { time: "12:00", yes: 73, no: 27, volume: 3200 },
  { time: "16:00", yes: 75, no: 25, volume: 2800 },
  { time: "20:00", yes: 73, no: 27, volume: 2100 },
]

const volumeData = [
  { time: "Mon", volume: 15420, trades: 89 },
  { time: "Tue", volume: 18230, trades: 124 },
  { time: "Wed", volume: 22150, trades: 156 },
  { time: "Thu", volume: 19870, trades: 142 },
  { time: "Fri", volume: 25340, trades: 178 },
  { time: "Sat", volume: 21890, trades: 134 },
  { time: "Sun", volume: 17650, trades: 98 },
]

const liquidityData = [
  { price: 0.65, yesLiquidity: 1200, noLiquidity: 800 },
  { price: 0.7, yesLiquidity: 2400, noLiquidity: 1600 },
  { price: 0.73, yesLiquidity: 4800, noLiquidity: 3200 },
  { price: 0.75, yesLiquidity: 2400, noLiquidity: 1600 },
  { price: 0.8, yesLiquidity: 1200, noLiquidity: 800 },
]

const recentTrades = [
  { id: 1, user: "Alice", side: "YES", amount: "$250", odds: "73%", time: "2m ago", profit: "+$85" },
  { id: 2, user: "Bob", side: "NO", amount: "$180", odds: "27%", time: "5m ago", profit: "+$48" },
  { id: 3, user: "Charlie", side: "YES", amount: "$420", odds: "72%", time: "8m ago", profit: "+$142" },
  { id: 4, user: "David", side: "NO", amount: "$95", odds: "28%", time: "12m ago", profit: "+$26" },
  { id: 5, user: "Eve", side: "YES", amount: "$310", odds: "74%", time: "15m ago", profit: "+$105" },
]

const comments = [
  {
    id: 1,
    user: "CryptoAnalyst",
    avatar: "/placeholder.svg?height=32&width=32",
    content:
      "Looking at the current market trends and institutional adoption, I think $100K is very achievable by end of year.",
    time: "2h ago",
    reactions: { thumbsUp: 12, heart: 5, laugh: 2, angry: 1 },
  },
  {
    id: 2,
    user: "BearMarketBob",
    avatar: "/placeholder.svg?height=32&width=32",
    content:
      "The macro environment is still uncertain. Fed policy and global economic conditions could easily derail this rally.",
    time: "4h ago",
    reactions: { thumbsUp: 8, heart: 1, laugh: 0, angry: 3 },
  },
]

export default function MarketDetailsPage({ params }: { params: { id: string } }) {
  const [selectedSide, setSelectedSide] = useState<"YES" | "NO">("YES")
  const [stakeAmount, setStakeAmount] = useState([100])
  const [customAmount, setCustomAmount] = useState("100")
  const [isRulesOpen, setIsRulesOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("chart")
  const [isConfirming, setIsConfirming] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isPredictDrawerOpen, setIsPredictDrawerOpen] = useState(false)

  const currentOdds = selectedSide === "YES" ? mockMarket.yesOdds : mockMarket.noOdds
  const estimatedPayout = (Number.parseFloat(customAmount) / currentOdds) * 100
  const fee = Number.parseFloat(customAmount) * 0.02 // 2% fee
  const netPayout = estimatedPayout - fee

  const handleConfirm = () => {
    setIsConfirming(true)
    setTimeout(() => {
      setIsConfirming(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }, 2000)
  }

  const handlePredict = (marketId: string) => {
    setIsPredictDrawerOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-success/20 text-success border-success/30"
      case "Closing Soon":
        return "bg-warning/20 text-warning border-warning/30"
      case "Resolved":
        return "bg-muted/20 text-muted-foreground border-muted/30"
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30"
    }
  }

  const getEventStatusColor = (status: string) => {
    switch (status) {
      case "Not Started":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "Live":
        return "bg-green-500/20 text-green-400 border-green-500/30 animate-pulse"
      case "Ended":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30"
    }
  }

  return (
    <div className="min-h-screen bg-bg text-text noise-texture">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 glass-card border-b border-border/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge className="text-xs px-2 py-1 bg-primary/20 text-primary border-primary/30">
                  {mockMarket.category}
                </Badge>
                <Badge className={`text-xs px-2 py-1 ${getStatusColor(mockMarket.status)}`}>{mockMarket.status}</Badge>
                <Badge className={`text-xs px-2 py-1 ${getEventStatusColor(mockMarket.eventStatus)}`}>
                  {mockMarket.eventStatus}
                </Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-balance">{mockMarket.title}</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-text-muted">Time Left</div>
                <div className="font-mono text-lg font-bold flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {mockMarket.timeLeft}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-text-muted">Event Starts</div>
                <div className="font-mono text-sm font-bold flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {mockMarket.eventStartTime}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Charts & Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chart Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 glass-card p-1">
                <TabsTrigger
                  value="chart"
                  className={`data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:glow-ring`}
                >
                  Odds Chart
                </TabsTrigger>
                <TabsTrigger
                  value="liquidity"
                  className={`data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary data-[state=active]:glow-ring`}
                >
                  Liquidity
                </TabsTrigger>
                <TabsTrigger
                  value="trades"
                  className={`data-[state=active]:bg-accent/20 data-[state=active]:text-accent data-[state=active]:glow-ring`}
                >
                  Recent Trades
                </TabsTrigger>
                <TabsTrigger
                  value="comments"
                  className={`data-[state=active]:bg-warning/20 data-[state=active]:text-warning data-[state=active]:glow-ring`}
                >
                  Comments
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chart" className="mt-6">
                <Card className="glass-card p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Odds History</h3>
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-success"></div>
                        <span>YES ({mockMarket.yesOdds}%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-danger"></div>
                        <span>NO ({mockMarket.noOdds}%)</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={oddsHistory}>
                        <defs>
                          <linearGradient id="yesGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="rgb(57, 255, 20)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="rgb(57, 255, 20)" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="noGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="rgb(255, 59, 59)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="rgb(255, 59, 59)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="time" stroke="#93A1B5" />
                        <YAxis stroke="#93A1B5" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(17, 20, 27, 0.95)",
                            border: "1px solid rgba(28, 32, 48, 0.5)",
                            borderRadius: "8px",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="yes"
                          stroke="rgb(57, 255, 20)"
                          fillOpacity={1}
                          fill="url(#yesGradient)"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="no"
                          stroke="rgb(255, 59, 59)"
                          fillOpacity={1}
                          fill="url(#noGradient)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="liquidity" className="mt-6">
                <Card className="glass-card p-6">
                  <h3 className="text-lg font-semibold mb-4">Liquidity Depth</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={liquidityData}>
                        <XAxis dataKey="price" stroke="#93A1B5" />
                        <YAxis stroke="#93A1B5" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(17, 20, 27, 0.95)",
                            border: "1px solid rgba(28, 32, 48, 0.5)",
                            borderRadius: "8px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="yesLiquidity"
                          stroke="rgb(57, 255, 20)"
                          strokeWidth={2}
                          name="YES Liquidity"
                        />
                        <Line
                          type="monotone"
                          dataKey="noLiquidity"
                          stroke="rgb(255, 59, 59)"
                          strokeWidth={2}
                          name="NO Liquidity"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="trades" className="mt-6">
                <Card className="glass-card p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Trades</h3>
                  <div className="space-y-3">
                    {recentTrades.map((trade) => (
                      <div key={trade.id} className="flex justify-between items-center p-3 rounded-lg bg-surface/30">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs bg-primary/20 text-primary">
                              {trade.user.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{trade.user}</div>
                            <div className="text-sm text-text-muted">{trade.time}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-medium ${trade.side === "YES" ? "text-success" : "text-danger"}`}>
                            {trade.side} {trade.amount}
                          </div>
                          <div className="text-sm text-text-muted">@ {trade.odds}</div>
                          <div className="text-sm text-success">{trade.profit}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="comments" className="mt-6">
                <Card className="glass-card p-6">
                  <h3 className="text-lg font-semibold mb-4">Comments</h3>
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="p-4 rounded-lg bg-surface/30">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs bg-primary/20 text-primary">
                              {comment.user.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{comment.user}</span>
                              <span className="text-sm text-text-muted">{comment.time}</span>
                            </div>
                            <p className="text-sm mb-3">{comment.content}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                                <ThumbsUp className="w-4 h-4" />
                                {comment.reactions.thumbsUp}
                              </button>
                              <button className="flex items-center gap-1 hover:text-danger transition-colors">
                                <Heart className="w-4 h-4" />
                                {comment.reactions.heart}
                              </button>
                              <button className="flex items-center gap-1 hover:text-warning transition-colors">
                                <Laugh className="w-4 h-4" />
                                {comment.reactions.laugh}
                              </button>
                              <button className="flex items-center gap-1 hover:text-danger transition-colors">
                                <Angry className="w-4 h-4" />
                                {comment.reactions.angry}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Rules & Criteria */}
            <Card className="glass-card p-6">
              <Collapsible open={isRulesOpen} onOpenChange={setIsRulesOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <h3 className="text-lg font-semibold">Market Rules & Criteria</h3>
                  {isRulesOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <p className="text-text-muted mb-4">{mockMarket.description}</p>
                  <ul className="space-y-2">
                    {mockMarket.rules.map((rule, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Resolver Info */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Resolver Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-text-muted mb-1">Resolver</div>
                  <div className="font-medium">{mockMarket.resolver.name}</div>
                </div>
                <div>
                  <div className="text-sm text-text-muted mb-1">Type</div>
                  <div className="font-medium">{mockMarket.resolver.type}</div>
                </div>
                <div>
                  <div className="text-sm text-text-muted mb-1">Bond</div>
                  <div className="font-medium text-success">{mockMarket.resolver.bond}</div>
                </div>
                <div>
                  <div className="text-sm text-text-muted mb-1">Reputation</div>
                  <div className="font-medium text-success">{mockMarket.resolver.reputation}%</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Trading Panel */}
          <div className="space-y-6">
            <Card className="glass-card p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Place Prediction</h3>
                <Badge className={`text-xs px-2 py-1 ${getEventStatusColor(mockMarket.eventStatus)}`}>
                  {mockMarket.eventStatus}
                </Badge>
              </div>

              {/* Side Selection */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                <Button
                  variant={selectedSide === "YES" ? "default" : "outline"}
                  className={`h-12 ${
                    selectedSide === "YES"
                      ? "bg-success/20 text-success border-success/50 glow hover:bg-success/30"
                      : "glass-card border-border/50 hover:border-success/30"
                  }`}
                  onClick={() => setSelectedSide("YES")}
                >
                  <div className="text-center">
                    <div className="font-bold">YES</div>
                    <div className="text-xs">{mockMarket.yesOdds}%</div>
                    <div className="text-xs opacity-60">+{((100 / mockMarket.yesOdds - 1) * 100).toFixed(0)}%</div>
                  </div>
                </Button>
                <Button
                  variant={selectedSide === "NO" ? "default" : "outline"}
                  className={`h-12 ${
                    selectedSide === "NO"
                      ? "bg-danger/20 text-danger border-danger/50 glow hover:bg-danger/30"
                      : "glass-card border-border/50 hover:border-danger/30"
                  }`}
                  onClick={() => setSelectedSide("NO")}
                >
                  <div className="text-center">
                    <div className="font-bold">NO</div>
                    <div className="text-xs">{mockMarket.noOdds}%</div>
                    <div className="text-xs opacity-60">+{((100 / mockMarket.noOdds - 1) * 100).toFixed(0)}%</div>
                  </div>
                </Button>
              </div>

              {/* Stake Amount */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Stake Amount</label>
                  <span className="text-sm text-text-muted">Balance: $1,250</span>
                </div>
                <div className="space-y-3">
                  <Input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value)
                      setStakeAmount([Number.parseFloat(e.target.value) || 0])
                    }}
                    className="bg-surface/50 border-border/50"
                    placeholder="Enter amount"
                  />
                  <Slider
                    value={stakeAmount}
                    onValueChange={(value) => {
                      setStakeAmount(value)
                      setCustomAmount(value[0].toString())
                    }}
                    max={1000}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex gap-2">
                    {[25, 50, 100, 250].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        className="flex-1 glass-card border-border/50 text-xs bg-transparent"
                        onClick={() => {
                          setCustomAmount(amount.toString())
                          setStakeAmount([amount])
                        }}
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Payout Breakdown */}
              <div className="space-y-3 mb-6 p-4 rounded-lg bg-surface/30">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Stake</span>
                  <span>${customAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Current Odds</span>
                  <span>{currentOdds}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Est. Payout</span>
                  <span className="text-success">${estimatedPayout.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Platform Fee (2%)</span>
                  <span className="text-danger">-${fee.toFixed(2)}</span>
                </div>
                <div className="border-t border-border/50 pt-2">
                  <div className="flex justify-between font-medium">
                    <span>Net Payout</span>
                    <span className="text-success">${netPayout.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Confirm Button */}
              <Button
                onClick={handleConfirm}
                disabled={isConfirming || showSuccess || mockMarket.eventStatus === "Ended"}
                className="w-full h-12 cta-gradient hover-glow press-scale font-medium"
              >
                {isConfirming ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Confirming...
                  </div>
                ) : showSuccess ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Success!
                  </div>
                ) : mockMarket.eventStatus === "Ended" ? (
                  "Event Ended"
                ) : (
                  `Predict ${selectedSide} for $${customAmount}`
                )}
              </Button>

              <Button
                onClick={() => handlePredict(mockMarket.id)}
                className="w-full mt-4 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
              >
                Predict
              </Button>

              {showSuccess && (
                <div className="mt-4 p-3 rounded-lg bg-success/20 border border-success/30 text-success text-sm text-center">
                  Your prediction has been placed successfully!
                </div>
              )}
            </Card>

            {/* Market Stats */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Market Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-text-muted">Pool Size</span>
                  <span className="font-medium text-success">{mockMarket.poolSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Total Volume</span>
                  <span className="font-medium">{mockMarket.totalVolume}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">24h Volume</span>
                  <span className="font-medium">{mockMarket.volume24h}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Active Traders</span>
                  <span className="font-medium">{mockMarket.activeTraders}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* PredictDrawer component */}
      <PredictDrawer
        isOpen={isPredictDrawerOpen}
        onOpenChange={setIsPredictDrawerOpen}
        market={{
          id: mockMarket.id,
          title: mockMarket.title,
          timeLeft: mockMarket.timeLeft,
          yesOdds: mockMarket.yesOdds,
          noOdds: mockMarket.noOdds,
          isLive: true,
        }}
      />
    </div>
  )
}
