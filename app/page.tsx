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
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
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
      <section className="relative overflow-hidden bg-background pt-16">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-spin-slow"></div>
        </div>

        <div className="container mx-auto px-4 py-24 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Content container with solid background for contrast */}
            <div className="bg-background/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
              {/* Floating badge */}
              <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-1000">
                <Badge className="mb-8 bg-surface/80 text-primary border-primary/30 backdrop-blur-sm hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Built on Flow • Lightning Fast
                </Badge>
              </div>

              {/* Main headline with better contrast */}
              <div className="animate-in fade-in-0 slide-in-from-bottom-6 duration-1000 delay-200">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-balance leading-tight">
                  <span className="text-primary font-bold">Predict the future.</span>
                  <br />
                  <span className="text-foreground hover:scale-105 transition-transform duration-500 inline-block">
                    Get paid.
                  </span>
                </h1>
              </div>

              {/* Subtitle with better contrast */}
              <div className="animate-in fade-in-0 slide-in-from-bottom-8 duration-1000 delay-400">
                <p className="text-xl md:text-2xl text-foreground mb-12 max-w-3xl mx-auto text-pretty leading-relaxed">
                  Trade on real-world events in the world's most advanced decentralized prediction market.
                  <span className="text-primary font-bold"> Powered by Flow</span> for lightning-fast, low-cost
                  transactions.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="animate-in fade-in-0 slide-in-from-bottom-10 duration-1000 delay-600">
                <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                  <Button
                    size="lg"
                    className="cta-gradient hover-glow press-scale text-lg px-10 py-6 group text-background font-semibold"
                  >
                    <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Start Trading
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="glass-card hover-glow press-scale text-lg px-10 py-6 border-border bg-surface/50 group text-foreground"
                  >
                    <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                    Create Market
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats Grid - outside the container */}
            <div className="animate-in fade-in-0 slide-in-from-bottom-12 duration-1000 delay-800 mt-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {stats.map((stat, i) => (
                  <div key={i} className="glass-card p-6 hover-glow press-scale group cursor-pointer bg-surface/50">
                    <stat.icon
                      className={`h-8 w-8 ${stat.color} mb-3 mx-auto group-hover:scale-110 transition-transform duration-300`}
                    />
                    <div className="text-2xl font-bold mb-1 text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Markets */}
      <section className="py-24 relative bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
              <TrendingUp className="w-3 h-3 mr-1" />
              Hot Markets
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance text-foreground">
              Trending <span className="text-secondary">Predictions</span>
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Join thousands of traders making predictions on the most exciting events
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {trendingMarkets.map((market, i) => (
              <Card
                key={i}
                className={`glass-card hover-glow press-scale p-8 cursor-pointer group relative overflow-hidden transition-all duration-500 bg-surface/50 ${
                  activeCard === i ? "ring-2 ring-primary/50 scale-105" : ""
                }`}
                onMouseEnter={() => setActiveCard(i)}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <Badge className="bg-primary text-primary-foreground border-primary text-xs px-3 py-1 group-hover:scale-110 transition-transform duration-300 font-medium">
                      {market.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-border/50 bg-surface/50 text-foreground">
                      {market.type}
                    </Badge>
                  </div>

                  <h3 className="font-bold text-lg mb-6 text-balance line-clamp-2 group-hover:text-primary transition-colors duration-300 text-foreground">
                    {market.title}
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">Pool Size</span>
                      <span className="font-bold text-success text-lg">{market.pool}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">Current Odds</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-secondary text-lg">{market.odds}</span>
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
                      <span className="text-muted-foreground text-sm">Time Left</span>
                      <span className="font-medium flex items-center gap-1 text-foreground">
                        <Clock className="h-3 w-3 text-accent" />
                        {market.timeLeft}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">24h Volume</span>
                      <span className="font-medium text-primary">{market.volume}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-primary hover:bg-primary/90 text-background border-0 group-hover:scale-105 transition-all duration-300 font-medium">
                      <Target className="w-4 h-4 mr-2" />
                      Predict
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="px-4 hover:scale-110 transition-transform duration-300 border-border text-foreground bg-surface hover:bg-surface/80"
                    >
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Users className="w-3 h-3" />
                      {market.participants} traders
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/markets">
              <Button
                size="lg"
                variant="outline"
                className="glass-card hover-glow press-scale group bg-surface/50 text-foreground border-border"
              >
                View All Markets
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-surface/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-success/20 text-success border-success/30">
              <Zap className="w-3 h-3 mr-1" />
              Simple Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">How It Works</h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Start earning from your predictions in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Connect Wallet",
                description:
                  "Link your Flow wallet to start trading on prediction markets with lightning-fast transactions",
                icon: Shield,
                color: "from-primary to-primary/60",
              },
              {
                step: "02",
                title: "Choose Market",
                description: "Browse trending markets or create your own prediction market on any real-world event",
                icon: Target,
                color: "from-secondary to-secondary/60",
              },
              {
                step: "03",
                title: "Place Prediction",
                description:
                  "Stake tokens on your prediction and earn rewards when you're right. The more accurate, the more you earn",
                icon: Trophy,
                color: "from-accent to-accent/60",
              },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div
                  className={`w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-xl`}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-6xl font-bold text-muted-foreground/30 mb-4 group-hover:text-muted-foreground/50 transition-colors duration-300">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300 text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button
              size="lg"
              className="cta-gradient hover-glow press-scale text-lg px-8 py-4 text-background font-semibold"
            >
              <Coins className="mr-2 h-5 w-5" />
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-border bg-surface/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <span className="text-2xl font-bold text-primary">Wagerme</span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                The world's most advanced decentralized prediction market. Trade on real-world events and earn rewards
                for accurate predictions.
              </p>
              <div className="flex space-x-4">
                {["Twitter", "Discord", "Telegram"].map((social) => (
                  <Button
                    key={social}
                    variant="outline"
                    size="sm"
                    className="hover:scale-110 transition-transform duration-300 text-foreground border-border bg-transparent"
                  >
                    {social}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-foreground">Platform</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
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
              <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
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

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/30">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">© 2024 Wagerme. All rights reserved.</p>
            <div className="flex space-x-6 text-sm text-muted-foreground">
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
