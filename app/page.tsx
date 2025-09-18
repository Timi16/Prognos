"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import Link from "next/link"

import {
  ArrowRight,
  TrendingUp,
  Users,
  Clock,
  Zap,
  DollarSign,
  Target,
  Shield,
  Sparkles,
  ChevronRight,
  Play,
  BarChart3,
  Coins,
  Trophy,
  Plus,
} from "lucide-react"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [activeCard, setActiveCard] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  const trendingMarkets = [
    {
      title: "Will Bitcoin reach $100K by end of 2024?",
      category: "Crypto",
      odds: "73%",
      pool: "$45.2K",
      timeLeft: "23d 14h",
      type: "Yes/No",
      change: "+5.2%",
      volume: "$12.4K",
      participants: 234,
    },
    {
      title: "US Presidential Election 2024 Winner",
      category: "Politics",
      odds: "Multiple",
      pool: "$128.7K",
      timeLeft: "2d 8h",
      type: "Multiple",
      change: "+2.1%",
      volume: "$45.7K",
      participants: 892,
    },
    {
      title: "Tesla Stock Price on Dec 31, 2024",
      category: "Stocks",
      odds: "$245",
      pool: "$67.3K",
      timeLeft: "45d 2h",
      type: "Scalar",
      change: "-1.8%",
      volume: "$23.1K",
      participants: 456,
    },
  ]

  const stats = [
    { label: "Total Volume", value: "$2.4M+", icon: DollarSign, color: "text-success" },
    { label: "Active Traders", value: "12K+", icon: Users, color: "text-secondary" },
    { label: "Markets Created", value: "450+", icon: Target, color: "text-accent" },
    { label: "Avg. APY", value: "24.5%", icon: TrendingUp, color: "text-primary" },
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-12 sm:pt-16 md:pt-20">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-80 h-40 sm:h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 sm:w-80 h-40 sm:h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-96 h-48 sm:h-96 bg-accent/5 rounded-full blur-3xl animate-spin-slow"></div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-16 lg:py-24 text-center relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="bg-background/95 backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 border border-white/10 shadow-2xl">
              <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-1000">
                <Badge className="mb-4 sm:mb-6 md:mb-8 bg-surface/80 text-primary border-primary/30 backdrop-blur-sm hover:scale-110 transition-transform duration-300 cursor-pointer text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2">
                  <Sparkles className="w-3 h-3 mr-1 flex-shrink-0" />
                  <span className="whitespace-nowrap">Where Predictions Meet Profits</span>
                  <span className="hidden xs:inline"> • </span>
                  <span className="hidden xs:inline whitespace-nowrap">Built on Flow</span>
                </Badge>
              </div>

              <div className="animate-in fade-in-0 slide-in-from-bottom-6 duration-1000 delay-200">
                <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 md:mb-8 text-balance leading-tight">
                  <span className="text-primary font-bold">Professional</span>
                  <br />
                  <span className="text-foreground hover:scale-105 transition-transform duration-500 inline-block">
                    Prediction Markets
                  </span>
                </h1>
              </div>

              <div className="animate-in fade-in-0 slide-in-from-bottom-8 duration-1000 delay-400">
                <p className="text-lg md:text-xl lg:text-2xl text-foreground mb-8 md:mb-12 max-w-3xl mx-auto text-pretty leading-relaxed">
                  Advanced prediction markets platform for institutional traders and sophisticated investors.
                  <span className="text-primary font-bold block sm:inline"> Built on Flow</span> for enterprise-scale
                  performance and reliability.
                </p>
              </div>

              <div className="animate-in fade-in-0 slide-in-from-bottom-10 duration-1000 delay-600">
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mb-6 md:mb-8">
                  <Link href="/markets">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto cta-gradient hover-glow press-scale text-base md:text-lg px-8 md:px-10 py-4 md:py-6 group text-background font-semibold"
                    >
                      <Play className="mr-2 h-4 md:h-5 w-4 md:w-5 group-hover:scale-110 transition-transform" />
                      Explore Markets
                      <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/create">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto glass-card hover-glow press-scale text-base md:text-lg px-8 md:px-10 py-4 md:py-6 border-border bg-surface/50 group text-foreground"
                    >
                      <Plus className="mr-2 h-4 md:h-5 w-4 md:w-5 group-hover:rotate-90 transition-transform duration-300" />
                      Create Market
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="animate-in fade-in-0 slide-in-from-bottom-12 duration-1000 delay-800 mt-12 md:mt-16">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="glass-card p-4 md:p-6 hover-glow press-scale group cursor-pointer bg-surface/50"
                  >
                    <stat.icon
                      className={`h-6 md:h-8 w-6 md:w-8 ${stat.color} mb-2 md:mb-3 mx-auto group-hover:scale-110 transition-transform duration-300`}
                    />
                    <div className="text-xl md:text-2xl font-bold mb-1 text-foreground">{stat.value}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Markets */}
      <section className="py-16 md:py-24 relative bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <Badge className="mb-4 bg-accent/20 text-accent border-accent/30 text-xs md:text-sm">
              <TrendingUp className="w-3 h-3 mr-1" />
              Featured Markets
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-balance text-foreground">
              Active <span className="text-secondary">Trading Opportunities</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Discover high-volume prediction markets with institutional-grade liquidity and transparency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {trendingMarkets.map((market, i) => (
              <Card
                key={i}
                className="glass-card hover-glow press-scale p-6 md:p-8 cursor-pointer group relative overflow-hidden transition-all duration-500 bg-surface/50"
                onMouseEnter={() => setActiveCard(i)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4 md:mb-6">
                    <Badge className="bg-primary text-primary-foreground border-primary text-xs px-2 md:px-3 py-1 group-hover:scale-110 transition-transform duration-300 font-medium">
                      {market.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-border/50 bg-surface/50 text-foreground">
                      {market.type}
                    </Badge>
                  </div>

                  <h3 className="font-bold text-base md:text-lg mb-4 md:mb-6 text-balance line-clamp-2 group-hover:text-primary transition-colors duration-300 text-foreground">
                    {market.title}
                  </h3>

                  <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-xs md:text-sm">Pool Size</span>
                      <span className="font-bold text-success text-base md:text-lg">{market.pool}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-xs md:text-sm">Current Odds</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-secondary text-base md:text-lg">{market.odds}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            market.change.startsWith("+")
                              ? "bg-green-900/80 text-green-100 border border-green-700"
                              : "bg-red-900/80 text-red-100 border border-red-700"
                          }`}
                        >
                          {market.change}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-xs md:text-sm">Time Left</span>
                      <span className="font-medium flex items-center gap-1 text-foreground text-sm md:text-base">
                        <Clock className="h-3 w-3 text-accent" />
                        {market.timeLeft}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-xs md:text-sm">24h Volume</span>
                      <span className="font-medium text-primary text-sm md:text-base">{market.volume}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-primary hover:bg-primary/90 text-background border-0 group-hover:scale-105 transition-all duration-300 font-medium text-sm md:text-base py-2 md:py-3">
                      <Target className="w-3 md:w-4 h-3 md:h-4 mr-2" />
                      Predict
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="px-3 md:px-4 hover:scale-110 transition-transform duration-300 border-border text-foreground bg-surface hover:bg-surface/80"
                    >
                      <BarChart3 className="w-3 md:w-4 h-3 md:h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border/30">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Users className="w-3 h-3" />
                      {market.participants} traders
                    </div>
                    <ChevronRight className="w-3 md:w-4 h-3 md:h-4 text-muted-foreground group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link href="/markets">
              <Button
                size="lg"
                variant="outline"
                className="glass-card hover-glow press-scale group bg-surface/50 text-foreground border-border px-6 md:px-8 py-3 md:py-4"
              >
                View All Markets
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-surface/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <Badge className="mb-4 bg-success/20 text-success border-success/30 text-xs md:text-sm">
              <Zap className="w-3 h-3 mr-1" />
              Getting Started
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-foreground">How It Works</h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              Start trading on prediction markets with our streamlined three-step process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Connect Wallet",
                description:
                  "Connect your Web3 wallet to access institutional-grade prediction markets with enterprise security and compliance",
                icon: Shield,
                color: "from-primary to-primary/60",
              },
              {
                step: "02",
                title: "Analyze Markets",
                description:
                  "Research market fundamentals, analyze liquidity depth, and evaluate risk-adjusted returns across diverse prediction categories",
                icon: Target,
                color: "from-secondary to-secondary/60",
              },
              {
                step: "03",
                title: "Execute Trades",
                description:
                  "Place sophisticated predictions with advanced order types and risk management tools. Earn returns based on market accuracy and timing",
                icon: Trophy,
                color: "from-accent to-accent/60",
              },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div
                  className={`w-16 md:w-20 h-16 md:h-20 mx-auto mb-6 md:mb-8 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-xl`}
                >
                  <item.icon className="w-6 md:w-8 h-6 md:h-8 text-white" />
                </div>
                <div className="text-4xl md:text-6xl font-bold text-muted-foreground/30 mb-3 md:mb-4 group-hover:text-muted-foreground/50 transition-colors duration-300">
                  {item.step}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 group-hover:text-primary transition-colors duration-300 text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 md:mt-16">
            <Link href="/markets">
              <Button
                size="lg"
                className="cta-gradient hover-glow press-scale text-base md:text-lg px-6 md:px-8 py-3 md:py-4 text-background font-semibold"
              >
                <Coins className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                Start Trading Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-16 border-t border-border bg-surface/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl md:text-2xl font-bold text-primary">WagerMe</span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md text-sm md:text-base">
                Professional prediction markets platform delivering institutional-grade trading infrastructure for
                sophisticated market participants and enterprise clients.
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                {["Twitter", "Discord", "Telegram"].map((social) => (
                  <Button
                    key={social}
                    variant="outline"
                    size="sm"
                    className="hover:scale-110 transition-transform duration-300 text-foreground border-border bg-transparent text-xs md:text-sm"
                  >
                    {social}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-foreground text-sm md:text-base">Platform</h4>
              <div className="space-y-2 text-xs md:text-sm text-muted-foreground">
                <Link href="/markets" className="block hover:text-foreground transition-colors">
                  Markets
                </Link>
                <Link href="/portfolio" className="block hover:text-foreground transition-colors">
                  Portfolio
                </Link>
                <Link href="/create" className="block hover:text-foreground transition-colors">
                  Create Market
                </Link>
                <Link href="/leaderboard" className="block hover:text-foreground transition-colors">
                  Leaderboard
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-foreground text-sm md:text-base">Resources</h4>
              <div className="space-y-2 text-xs md:text-sm text-muted-foreground">
                <a href="#" className="block hover:text-foreground transition-colors">
                  Documentation
                </a>
                <a href="#" className="block hover:text-foreground transition-colors">
                  API
                </a>
                <a href="#" className="block hover:text-foreground transition-colors">
                  Support
                </a>
                <a href="#" className="block hover:text-foreground transition-colors">
                  Blog
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-6 md:pt-8 border-t border-border/30 gap-4 md:gap-0">
            <p className="text-muted-foreground text-xs md:text-sm text-center md:text-left">
              © 2024 WagerMe. All rights reserved.
            </p>
            <div className="flex space-x-4 md:space-x-6 text-xs md:text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Security
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
