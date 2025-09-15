"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, TrendingDown, DollarSign, Target, Clock, AlertTriangle, Eye, StarOff } from "lucide-react"
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts"

// Mock data
const portfolioStats = {
  totalPnL: 2847.32,
  roi: 18.4,
  winRate: 67.3,
  openPositions: 12,
  pendingDisputes: 1,
  totalVolume: 15480.75,
}

const pnlHistory = [
  { date: "Jan", pnl: 0 },
  { date: "Feb", pnl: 245 },
  { date: "Mar", pnl: 180 },
  { date: "Apr", pnl: 520 },
  { date: "May", pnl: 890 },
  { date: "Jun", pnl: 1240 },
  { date: "Jul", pnl: 1680 },
  { date: "Aug", pnl: 2100 },
  { date: "Sep", pnl: 2450 },
  { date: "Oct", pnl: 2847 },
]

const categoryDistribution = [
  { name: "Crypto", value: 35, color: "#39FF14" },
  { name: "Politics", value: 25, color: "#FF3B3B" },
  { name: "Sports", value: 20, color: "#00E5FF" },
  { name: "Tech", value: 15, color: "#FF2CDF" },
  { name: "Finance", value: 5, color: "#FFC857" },
]

const openPositions = [
  {
    id: "1",
    title: "Will Bitcoin reach $100K by end of 2024?",
    category: "Crypto",
    side: "YES",
    size: "$250",
    avgOdds: "68%",
    currentOdds: "73%",
    estPnL: 18.38,
    timeLeft: "23d 14h",
    status: "Open",
  },
  {
    id: "2",
    title: "US Presidential Election 2024 Winner",
    category: "Politics",
    side: "Multiple",
    size: "$180",
    avgOdds: "45%",
    currentOdds: "42%",
    estPnL: -12.6,
    timeLeft: "2d 8h",
    status: "Open",
  },
  {
    id: "3",
    title: "Tesla Stock Price on Dec 31, 2024",
    category: "Finance",
    side: "Scalar",
    size: "$420",
    avgOdds: "$245",
    currentOdds: "$252",
    estPnL: 28.7,
    timeLeft: "45d 2h",
    status: "Open",
  },
]

const settledPositions = [
  {
    id: "4",
    title: "Will Apple announce AR glasses at WWDC 2024?",
    category: "Tech",
    side: "NO",
    size: "$150",
    avgOdds: "35%",
    finalOdds: "100%",
    pnL: 278.57,
    settledDate: "Oct 15, 2024",
    status: "Won",
  },
  {
    id: "5",
    title: "Champions League Final 2024 Winner",
    category: "Sports",
    side: "Real Madrid",
    size: "$200",
    avgOdds: "28%",
    finalOdds: "0%",
    pnL: -200,
    settledDate: "Oct 12, 2024",
    status: "Lost",
  },
  {
    id: "6",
    title: "Will OpenAI release GPT-5 in 2024?",
    category: "Tech",
    side: "YES",
    size: "$300",
    avgOdds: "65%",
    finalOdds: "100%",
    pnL: 161.54,
    settledDate: "Oct 8, 2024",
    status: "Won",
  },
]

const createdMarkets = [
  {
    id: "7",
    title: "Will Ethereum 2.0 staking rewards exceed 5% APY?",
    category: "Crypto",
    poolSize: "$12.4K",
    volume: "$45.2K",
    traders: 89,
    creatorFee: "$67.80",
    status: "Active",
    timeLeft: "15d 8h",
  },
  {
    id: "8",
    title: "Next major tech IPO valuation over $50B",
    category: "Tech",
    poolSize: "$8.7K",
    volume: "$23.1K",
    traders: 45,
    creatorFee: "$34.65",
    status: "Active",
    timeLeft: "67d 12h",
  },
]

const watchlist = [
  {
    id: "9",
    title: "Will SpaceX land on Mars by 2026?",
    category: "Tech",
    currentOdds: "23%",
    change: "+5%",
    poolSize: "$89.2K",
    timeLeft: "2y 45d",
  },
  {
    id: "10",
    title: "Next US recession start date",
    category: "Finance",
    currentOdds: "Multiple",
    change: "-2%",
    poolSize: "$156.7K",
    timeLeft: "1y 123d",
  },
]

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("open")

  const getPnLColor = (pnl: number) => {
    if (pnl > 0) return "text-success"
    if (pnl < 0) return "text-danger"
    return "text-text-muted"
  }

  const getPnLIcon = (pnl: number) => {
    if (pnl > 0) return <TrendingUp className="w-4 h-4" />
    if (pnl < 0) return <TrendingDown className="w-4 h-4" />
    return null
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Won":
        return "bg-success/20 text-success border-success/30"
      case "Lost":
        return "bg-danger/20 text-danger border-danger/30"
      case "Open":
        return "bg-secondary/20 text-secondary border-secondary/30"
      case "Active":
        return "bg-primary/20 text-primary border-primary/30"
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 relative overflow-hidden pt-20">
      <div className="floating-orb floating-orb-1"></div>
      <div className="floating-orb floating-orb-2"></div>
      <div className="floating-orb floating-orb-3"></div>
      <div className="aurora-bg"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-shift">
              Portfolio
            </span>
          </h1>
          <p className="text-muted-foreground">Track your predictions and performance</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4 mb-8">
          <Card className="glass-card p-3 md:p-4 text-center bg-white/5 backdrop-blur-xl border border-white/10">
            <DollarSign className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 text-success" />
            <div className="text-lg md:text-2xl font-bold text-success mb-1">
              ${portfolioStats.totalPnL.toLocaleString()}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">Total P&L</div>
          </Card>

          <Card className="glass-card p-3 md:p-4 text-center bg-white/5 backdrop-blur-xl border border-white/10">
            <TrendingUp className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 text-secondary" />
            <div className="text-lg md:text-2xl font-bold text-secondary mb-1">{portfolioStats.roi}%</div>
            <div className="text-xs md:text-sm text-muted-foreground">ROI</div>
          </Card>

          <Card className="glass-card p-3 md:p-4 text-center bg-white/5 backdrop-blur-xl border border-white/10">
            <Target className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 text-accent" />
            <div className="text-lg md:text-2xl font-bold text-accent mb-1">{portfolioStats.winRate}%</div>
            <div className="text-xs md:text-sm text-muted-foreground">Win Rate</div>
          </Card>

          <Card className="glass-card p-3 md:p-4 text-center bg-white/5 backdrop-blur-xl border border-white/10">
            <Clock className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 text-warning" />
            <div className="text-lg md:text-2xl font-bold text-warning mb-1">{portfolioStats.openPositions}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Open Positions</div>
          </Card>

          <Card className="glass-card p-3 md:p-4 text-center bg-white/5 backdrop-blur-xl border border-white/10">
            <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 text-danger" />
            <div className="text-lg md:text-2xl font-bold text-danger mb-1">{portfolioStats.pendingDisputes}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Pending Disputes</div>
          </Card>

          <Card className="glass-card p-3 md:p-4 text-center bg-white/5 backdrop-blur-xl border border-white/10">
            <DollarSign className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 text-primary" />
            <div className="text-lg md:text-2xl font-bold text-primary mb-1">
              ${portfolioStats.totalVolume.toLocaleString()}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">Total Volume</div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          {/* P&L Chart */}
          <div className="lg:col-span-2">
            <Card className="glass-card p-4 md:p-6 bg-white/5 backdrop-blur-xl border border-white/10">
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Cumulative P&L
              </h3>
              <div className="h-48 md:h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pnlHistory}>
                    <defs>
                      <linearGradient id="pnlGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="rgb(57, 255, 20)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="rgb(57, 255, 20)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" stroke="#93A1B5" fontSize={12} />
                    <YAxis stroke="#93A1B5" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(17, 20, 27, 0.95)",
                        border: "1px solid rgba(28, 32, 48, 0.5)",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="pnl"
                      stroke="rgb(57, 255, 20)"
                      strokeWidth={3}
                      fill="url(#pnlGradient)"
                      dot={{ fill: "rgb(57, 255, 20)", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Category Distribution */}
          <div className="lg:col-span-1">
            <Card className="glass-card p-4 md:p-6 bg-white/5 backdrop-blur-xl border border-white/10">
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Category Distribution
              </h3>
              <div className="h-48 md:h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={60}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(17, 20, 27, 0.95)",
                        border: "1px solid rgba(28, 32, 48, 0.5)",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>

        {/* Positions Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-white/5 backdrop-blur-xl border border-white/10 p-1 mb-6">
            <TabsTrigger
              value="open"
              className="data-[state=active]:bg-warning/20 data-[state=active]:text-warning text-xs md:text-sm"
            >
              <span className="hidden sm:inline">Open ({openPositions.length})</span>
              <span className="sm:hidden">Open</span>
            </TabsTrigger>
            <TabsTrigger
              value="settled"
              className="data-[state=active]:bg-success/20 data-[state=active]:text-success text-xs md:text-sm"
            >
              <span className="hidden sm:inline">Settled ({settledPositions.length})</span>
              <span className="sm:hidden">Settled</span>
            </TabsTrigger>
            <TabsTrigger
              value="created"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary text-xs md:text-sm"
            >
              <span className="hidden sm:inline">Created ({createdMarkets.length})</span>
              <span className="sm:hidden">Created</span>
            </TabsTrigger>
            <TabsTrigger
              value="watchlist"
              className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary text-xs md:text-sm"
            >
              <span className="hidden sm:inline">Watchlist ({watchlist.length})</span>
              <span className="sm:hidden">Watch</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="open">
            <Card className="glass-card bg-white/5 backdrop-blur-xl border border-white/10">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10">
                      <TableHead className="min-w-[200px] text-muted-foreground">Market</TableHead>
                      <TableHead className="min-w-[80px] text-muted-foreground">Side</TableHead>
                      <TableHead className="min-w-[80px] text-muted-foreground">Size</TableHead>
                      <TableHead className="min-w-[100px] text-muted-foreground hidden md:table-cell">
                        Avg Odds
                      </TableHead>
                      <TableHead className="min-w-[100px] text-muted-foreground hidden lg:table-cell">
                        Current Odds
                      </TableHead>
                      <TableHead className="min-w-[100px] text-muted-foreground">Est. P&L</TableHead>
                      <TableHead className="min-w-[120px] text-muted-foreground hidden sm:table-cell">
                        Time Left
                      </TableHead>
                      <TableHead className="min-w-[80px] text-muted-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {openPositions.map((position) => (
                      <TableRow key={position.id} className="border-white/10">
                        <TableCell className="min-w-[200px]">
                          <div>
                            <div className="font-medium line-clamp-2 text-sm bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                              {position.title}
                            </div>
                            <Badge className="text-xs mt-1 bg-primary/20 text-primary border-primary/30">
                              {position.category}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`text-xs ${
                              position.side === "YES"
                                ? "bg-success/20 text-success border-success/30"
                                : position.side === "NO"
                                  ? "bg-danger/20 text-danger border-danger/30"
                                  : "bg-secondary/20 text-secondary border-secondary/30"
                            }`}
                          >
                            {position.side}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium text-foreground">{position.size}</TableCell>
                        <TableCell className="hidden md:table-cell text-foreground">{position.avgOdds}</TableCell>
                        <TableCell className="hidden lg:table-cell text-foreground">{position.currentOdds}</TableCell>
                        <TableCell className={`font-medium ${getPnLColor(position.estPnL)}`}>
                          <div className="flex items-center gap-1">
                            {getPnLIcon(position.estPnL)}${Math.abs(position.estPnL).toFixed(2)}
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {position.timeLeft}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="bg-white/5 border-white/20 hover:bg-white/10">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settled">
            <Card className="glass-card bg-white/5 backdrop-blur-xl border border-white/10">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10">
                      <TableHead className="min-w-[200px] text-muted-foreground">Market</TableHead>
                      <TableHead className="min-w-[80px] text-muted-foreground">Side</TableHead>
                      <TableHead className="min-w-[80px] text-muted-foreground">Size</TableHead>
                      <TableHead className="min-w-[100px] text-muted-foreground hidden md:table-cell">
                        Avg Odds
                      </TableHead>
                      <TableHead className="min-w-[100px] text-muted-foreground hidden lg:table-cell">
                        Final Odds
                      </TableHead>
                      <TableHead className="min-w-[100px] text-muted-foreground">P&L</TableHead>
                      <TableHead className="min-w-[120px] text-muted-foreground hidden sm:table-cell">
                        Settled Date
                      </TableHead>
                      <TableHead className="min-w-[80px] text-muted-foreground">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {settledPositions.map((position) => (
                      <TableRow key={position.id} className="border-white/10">
                        <TableCell className="min-w-[200px]">
                          <div>
                            <div className="font-medium line-clamp-2 text-sm bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                              {position.title}
                            </div>
                            <Badge className="text-xs mt-1 bg-primary/20 text-primary border-primary/30">
                              {position.category}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`text-xs ${
                              position.side === "YES" || position.side === "Real Madrid"
                                ? "bg-success/20 text-success border-success/30"
                                : "bg-danger/20 text-danger border-danger/30"
                            }`}
                          >
                            {position.side}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium text-foreground">{position.size}</TableCell>
                        <TableCell className="hidden md:table-cell text-foreground">{position.avgOdds}</TableCell>
                        <TableCell className="hidden lg:table-cell text-foreground">{position.finalOdds}</TableCell>
                        <TableCell className={`font-medium ${getPnLColor(position.pnL)}`}>
                          <div className="flex items-center gap-1">
                            {getPnLIcon(position.pnL)}${Math.abs(position.pnL).toFixed(2)}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground hidden sm:table-cell">
                          {position.settledDate}
                        </TableCell>
                        <TableCell>
                          <Badge className={`text-xs ${getStatusColor(position.status)}`}>{position.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="created">
            <Card className="glass-card bg-white/5 backdrop-blur-xl border border-white/10">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10">
                      <TableHead className="min-w-[200px] text-muted-foreground">Market</TableHead>
                      <TableHead className="min-w-[100px] text-muted-foreground">Pool Size</TableHead>
                      <TableHead className="min-w-[100px] text-muted-foreground hidden md:table-cell">Volume</TableHead>
                      <TableHead className="min-w-[80px] text-muted-foreground hidden lg:table-cell">Traders</TableHead>
                      <TableHead className="min-w-[100px] text-muted-foreground">Creator Fee</TableHead>
                      <TableHead className="min-w-[120px] text-muted-foreground hidden sm:table-cell">
                        Time Left
                      </TableHead>
                      <TableHead className="min-w-[80px] text-muted-foreground">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {createdMarkets.map((market) => (
                      <TableRow key={market.id} className="border-white/10">
                        <TableCell className="min-w-[200px]">
                          <div>
                            <div className="font-medium line-clamp-2 text-sm bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                              {market.title}
                            </div>
                            <Badge className="text-xs mt-1 bg-primary/20 text-primary border-primary/30">
                              {market.category}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-success">{market.poolSize}</TableCell>
                        <TableCell className="font-medium text-foreground hidden md:table-cell">
                          {market.volume}
                        </TableCell>
                        <TableCell className="text-foreground hidden lg:table-cell">{market.traders}</TableCell>
                        <TableCell className="font-medium text-success">{market.creatorFee}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {market.timeLeft}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`text-xs ${getStatusColor(market.status)}`}>{market.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="watchlist">
            <Card className="glass-card bg-white/5 backdrop-blur-xl border border-white/10">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10">
                      <TableHead className="min-w-[200px] text-muted-foreground">Market</TableHead>
                      <TableHead className="min-w-[120px] text-muted-foreground">Current Odds</TableHead>
                      <TableHead className="min-w-[100px] text-muted-foreground hidden md:table-cell">
                        24h Change
                      </TableHead>
                      <TableHead className="min-w-[100px] text-muted-foreground hidden lg:table-cell">
                        Pool Size
                      </TableHead>
                      <TableHead className="min-w-[120px] text-muted-foreground hidden sm:table-cell">
                        Time Left
                      </TableHead>
                      <TableHead className="min-w-[100px] text-muted-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {watchlist.map((market) => (
                      <TableRow key={market.id} className="border-white/10">
                        <TableCell className="min-w-[200px]">
                          <div>
                            <div className="font-medium line-clamp-2 text-sm bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                              {market.title}
                            </div>
                            <Badge className="text-xs mt-1 bg-primary/20 text-primary border-primary/30">
                              {market.category}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-foreground">{market.currentOdds}</TableCell>
                        <TableCell
                          className={`font-medium hidden md:table-cell ${market.change.startsWith("+") ? "text-success" : "text-danger"}`}
                        >
                          {market.change}
                        </TableCell>
                        <TableCell className="font-medium text-success hidden lg:table-cell">
                          {market.poolSize}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {market.timeLeft}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white/5 border-white/20 hover:bg-white/10"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white/5 border-white/20 hover:bg-white/10 hidden sm:inline-flex"
                            >
                              <StarOff className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
