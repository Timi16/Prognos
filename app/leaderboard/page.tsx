"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Crown, Medal, Award, Star } from "lucide-react"

const mockLeaderboard = [
  {
    id: "1",
    name: "CryptoKing",
    avatar: "/placeholder.svg?height=40&width=40",
    pnl: "+$12,450",
    roi: "+245%",
    winRate: "78%",
    trades: 156,
    rank: 1,
    badge: "Diamond",
  },
  {
    id: "2",
    name: "PredictorPro",
    avatar: "/placeholder.svg?height=40&width=40",
    pnl: "+$9,230",
    roi: "+189%",
    winRate: "72%",
    trades: 203,
    rank: 2,
    badge: "Gold",
  },
  {
    id: "3",
    name: "MarketMaster",
    avatar: "/placeholder.svg?height=40&width=40",
    pnl: "+$7,890",
    roi: "+156%",
    winRate: "69%",
    trades: 134,
    rank: 3,
    badge: "Gold",
  },
  {
    id: "4",
    name: "TradingGuru",
    avatar: "/placeholder.svg?height=40&width=40",
    pnl: "+$6,540",
    roi: "+134%",
    winRate: "65%",
    trades: 189,
    rank: 4,
    badge: "Silver",
  },
  {
    id: "5",
    name: "BetBeast",
    avatar: "/placeholder.svg?height=40&width=40",
    pnl: "+$5,670",
    roi: "+123%",
    winRate: "63%",
    trades: 167,
    rank: 5,
    badge: "Silver",
  },
]

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("all-time")

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return (
          <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-muted-foreground">
            #{rank}
          </span>
        )
    }
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Diamond":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
      case "Gold":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Silver":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-primary/20 text-primary border-primary/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 relative overflow-hidden pt-20">
      <div className="floating-orb floating-orb-1"></div>
      <div className="floating-orb floating-orb-2"></div>
      <div className="floating-orb floating-orb-3"></div>
      <div className="aurora-bg"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <div className="mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 mb-4 md:mb-6 animate-pulse-glow">
              <Trophy className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <span className="text-sm md:text-lg font-semibold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Top Performers
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 text-center leading-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-shift">
              Leaderboard
            </span>
          </h1>

          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8 text-balance px-4">
            See who's dominating the prediction markets and climbing the ranks
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6 md:mb-8">
            <TabsList className="grid w-full grid-cols-3 bg-white/5 backdrop-blur-xl border border-white/10 h-12 md:h-14">
              <TabsTrigger
                value="all-time"
                className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:text-white/70 data-[state=inactive]:hover:text-white text-xs md:text-sm font-medium transition-all duration-300"
              >
                All Time
              </TabsTrigger>
              <TabsTrigger
                value="monthly"
                className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:text-white/70 data-[state=inactive]:hover:text-white text-xs md:text-sm font-medium transition-all duration-300"
              >
                This Month
              </TabsTrigger>
              <TabsTrigger
                value="weekly"
                className="data-[state=active]:bg-white data-[state=active]:text-black data-[state=inactive]:text-white/70 data-[state=inactive]:hover:text-white text-xs md:text-sm font-medium transition-all duration-300"
              >
                This Week
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-3 md:space-y-4">
              {mockLeaderboard.map((user, i) => (
                <Card
                  key={user.id}
                  className={`glass-card p-4 md:p-6 bg-white/5 backdrop-blur-xl border border-white/10 hover:scale-[1.02] md:hover:scale-105 transition-all duration-300 animate-fade-in-up ${user.rank <= 3 ? "shadow-lg shadow-primary/20" : ""}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="flex items-center gap-2 md:gap-3">
                        {getRankIcon(user.rank)}
                        <Avatar className="w-10 h-10 md:w-12 md:h-12 border-2 border-primary/20">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-primary/20 text-primary font-bold text-sm">
                            {user.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-base md:text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent truncate">
                            {user.name}
                          </h3>
                          <Badge
                            className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${getBadgeColor(user.badge)}`}
                          >
                            {user.badge}
                          </Badge>
                        </div>
                        <p className="text-xs md:text-sm text-muted-foreground">{user.trades} trades</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 md:gap-6 text-center sm:text-right">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">P&L</p>
                        <p className="font-bold text-sm md:text-lg text-green-400">{user.pnl}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">ROI</p>
                        <p className="font-bold text-sm md:text-lg text-blue-400">{user.roi}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Win Rate</p>
                        <p className="font-bold text-sm md:text-lg text-purple-400">{user.winRate}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          <div className="text-center">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-primary-foreground px-6 md:px-8 py-2 md:py-3 font-semibold rounded-full transition-all duration-300 hover:scale-105 text-sm md:text-base">
              <Star className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Join the Competition
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
