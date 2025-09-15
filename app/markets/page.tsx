"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MarketCard, MarketCardSkeleton, EmptyMarketState, MarketErrorState } from "@/components/market-card"
import { Search, Plus, TrendingUp, Zap, Target, Users, DollarSign } from "lucide-react"
import Link from "next/link"

// Mock data
const mockMarkets = [
  {
    id: "1",
    title: "Will Bitcoin reach $100K by end of 2024?",
    category: "Crypto",
    marketType: "Yes/No" as const,
    poolSize: "$45.2K",
    impliedProbability: 73,
    timeLeft: "23d 14h",
    isLive: true,
    topPredictors: [
      { id: "1", name: "Alice", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "2", name: "Bob", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "3", name: "Charlie", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "4", name: "David", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    sparklineData: [12, 19, 15, 27, 32, 25, 18, 29, 35, 28, 22, 31],
  },
  {
    id: "2",
    title: "US Presidential Election 2024 Winner",
    category: "Politics",
    marketType: "Multiple" as const,
    poolSize: "$128.7K",
    impliedProbability: 0,
    timeLeft: "2d 8h",
    isLive: true,
    topPredictors: [
      { id: "5", name: "Eve", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "6", name: "Frank", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "7", name: "Grace", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    sparklineData: [8, 14, 22, 18, 25, 31, 28, 35, 29, 33, 27, 38],
  },
  {
    id: "3",
    title: "Tesla Stock Price on Dec 31, 2024",
    category: "Finance",
    marketType: "Scalar" as const,
    poolSize: "$67.3K",
    impliedProbability: 0,
    timeLeft: "45d 2h",
    topPredictors: [
      { id: "8", name: "Henry", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "9", name: "Ivy", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    sparklineData: [15, 18, 12, 24, 28, 22, 19, 26, 31, 25, 20, 29],
  },
  {
    id: "4",
    title: "Will Apple announce AR glasses at WWDC 2024?",
    category: "Tech",
    marketType: "Yes/No" as const,
    poolSize: "$23.8K",
    impliedProbability: 42,
    timeLeft: "5m 23s",
    isLive: true,
    topPredictors: [
      { id: "10", name: "Jack", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "11", name: "Kate", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "12", name: "Liam", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    sparklineData: [10, 16, 13, 21, 26, 20, 17, 23, 28, 22, 19, 25],
  },
  {
    id: "5",
    title: "Champions League Final 2024 Winner",
    category: "Sports",
    marketType: "Multiple" as const,
    poolSize: "$89.1K",
    impliedProbability: 0,
    timeLeft: "12d 6h",
    isLive: true,
    topPredictors: [
      { id: "13", name: "Mia", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "14", name: "Noah", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "15", name: "Olivia", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "16", name: "Paul", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "17", name: "Quinn", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    sparklineData: [14, 20, 17, 25, 30, 24, 21, 27, 32, 26, 23, 30],
  },
  {
    id: "6",
    title: "Will OpenAI release GPT-5 in 2024?",
    category: "Tech",
    marketType: "Yes/No" as const,
    poolSize: "$156.4K",
    impliedProbability: 68,
    timeLeft: "87d 15h",
    topPredictors: [
      { id: "18", name: "Rachel", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "19", name: "Sam", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "20", name: "Tina", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    sparklineData: [18, 24, 21, 29, 34, 28, 25, 31, 36, 30, 27, 33],
  },
]

export default function MarketsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const categories = ["all", "Crypto", "Politics", "Tech", "Sports", "Finance"]
  const marketTypes = ["all", "Yes/No", "Multiple", "Scalar"]

  const filteredMarkets = mockMarkets.filter((market) => {
    const matchesSearch = market.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || market.category === selectedCategory
    const matchesType = selectedType === "all" || market.marketType === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  const handlePredict = (marketId: string) => {
    console.log("Predict on market:", marketId)
    // This would open the predict drawer
  }

  const handleView = (marketId: string) => {
    console.log("View market:", marketId)
    window.location.href = `/markets/${marketId}`
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 relative overflow-hidden">
        <div className="floating-orb floating-orb-1"></div>
        <div className="floating-orb floating-orb-2"></div>
        <div className="floating-orb floating-orb-3"></div>
        <div className="aurora-bg"></div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <MarketErrorState onRetry={() => setError(false)} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 relative overflow-hidden pt-16">
      <div className="floating-orb floating-orb-1"></div>
      <div className="floating-orb floating-orb-2"></div>
      <div className="floating-orb floating-orb-3"></div>
      <div className="aurora-bg"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-pulse-glow">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Live Markets</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-shift">
              Prediction Markets
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
            Trade on real-world events and earn rewards with the most advanced prediction platform
          </p>

          <Link href="/create">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow">
              <Plus className="w-5 h-5 mr-2" />
              Create Market
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            {
              label: "Total Volume",
              value: "$2.4M",
              icon: DollarSign,
              color: "text-green-400",
              gradient: "from-green-400/20 to-emerald-400/20",
            },
            {
              label: "Active Markets",
              value: "156",
              icon: Target,
              color: "text-blue-400",
              gradient: "from-blue-400/20 to-cyan-400/20",
            },
            {
              label: "Total Traders",
              value: "12.3K",
              icon: Users,
              color: "text-purple-400",
              gradient: "from-purple-400/20 to-pink-400/20",
            },
            {
              label: "Avg. Pool Size",
              value: "$15.2K",
              icon: TrendingUp,
              color: "text-orange-400",
              gradient: "from-orange-400/20 to-yellow-400/20",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className={`glass-card p-6 text-center hover:scale-105 transition-all duration-300 bg-gradient-to-br ${stat.gradient} border border-white/10 animate-float`}
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="glass-card p-6 mb-8 border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search markets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 bg-white/5 border-white/20 text-foreground placeholder:text-muted-foreground h-12 text-lg"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 bg-white/5 border-white/20 h-12">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-48 bg-white/5 border-white/20 h-12">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {marketTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === "all" ? "All Types" : type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <MarketCardSkeleton key={i} />)
            : filteredMarkets.length > 0
              ? filteredMarkets.map((market, i) => (
                  <div key={market.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                    <MarketCard
                      {...market}
                      onPredict={() => handlePredict(market.id)}
                      onView={() => handleView(market.id)}
                    />
                  </div>
                ))
              : !isLoading && <EmptyMarketState />}
        </div>
      </div>
    </div>
  )
}
