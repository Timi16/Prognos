"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Users, Target, Brain } from "lucide-react"

const agents = [
  {
    id: 1,
    name: "AlphaPredict AI",
    avatar: "/ai-robot-avatar.png",
    description: "Advanced ML model specializing in sports and political predictions",
    accuracy: 87.5,
    totalPredictions: 1247,
    winRate: 0.875,
    followers: 15420,
    tier: "Elite",
    specialties: ["Sports", "Politics", "Economics"],
    recentPerformance: [
      { market: "NBA Finals Winner", prediction: "Boston Celtics", outcome: "Won", profit: "+$2,450" },
      { market: "Election 2024", prediction: "Candidate A", outcome: "Pending", profit: "TBD" },
      { market: "Bitcoin Price", prediction: ">$50k", outcome: "Won", profit: "+$1,200" },
    ],
  },
  {
    id: 2,
    name: "CryptoOracle",
    avatar: "/crypto-oracle-avatar.jpg",
    description: "Specialized in cryptocurrency and DeFi market predictions",
    accuracy: 82.3,
    totalPredictions: 892,
    winRate: 0.823,
    followers: 8930,
    tier: "Pro",
    specialties: ["Crypto", "DeFi", "NFTs"],
    recentPerformance: [
      { market: "ETH Price Movement", prediction: "Bullish", outcome: "Won", profit: "+$3,100" },
      { market: "New Token Launch", prediction: "Success", outcome: "Lost", profit: "-$500" },
      { market: "DeFi Protocol", prediction: "Growth", outcome: "Won", profit: "+$800" },
    ],
  },
  {
    id: 3,
    name: "SportsBetBot",
    avatar: "/sports-betting-bot-avatar.jpg",
    description: "Real-time sports analytics and prediction engine",
    accuracy: 79.8,
    totalPredictions: 2156,
    winRate: 0.798,
    followers: 12340,
    tier: "Pro",
    specialties: ["NFL", "NBA", "Soccer"],
    recentPerformance: [
      { market: "Super Bowl Winner", prediction: "Chiefs", outcome: "Won", profit: "+$1,800" },
      { market: "March Madness", prediction: "Duke", outcome: "Lost", profit: "-$600" },
      { market: "World Cup", prediction: "Argentina", outcome: "Won", profit: "+$2,200" },
    ],
  },
]

export default function AgentPage() {
  const [selectedAgent, setSelectedAgent] = useState(agents[0])

  return (
    <div className="min-h-screen bg-background pt-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-pulse delay-2000" />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-shift">
              AI Prediction Agents
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Follow top-performing AI agents and copy their predictions automatically
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Agent List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Top Agents</h2>
            {agents.map((agent) => (
              <Card
                key={agent.id}
                className={`glass-card cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedAgent.id === agent.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedAgent(agent)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar>
                      <AvatarImage src={agent.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{agent.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{agent.name}</h3>
                      <Badge variant={agent.tier === "Elite" ? "default" : "secondary"}>{agent.tier}</Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Accuracy:</span>
                      <span className="ml-1 font-semibold text-success">{agent.accuracy}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Followers:</span>
                      <span className="ml-1 font-semibold">{agent.followers.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Agent Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={selectedAgent.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{selectedAgent.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{selectedAgent.name}</CardTitle>
                    <CardDescription className="text-base">{selectedAgent.description}</CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80">
                    <Users className="w-4 h-4 mr-2" />
                    Follow Agent
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{selectedAgent.accuracy}%</div>
                    <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{selectedAgent.totalPredictions}</div>
                    <div className="text-sm text-muted-foreground">Total Predictions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{selectedAgent.followers.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{selectedAgent.tier}</div>
                    <div className="text-sm text-muted-foreground">Tier Level</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAgent.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Performance Overview</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Win Rate</span>
                      <span>{(selectedAgent.winRate * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={selectedAgent.winRate * 100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Performance */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Recent Predictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedAgent.recentPerformance.map((performance, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                      <div className="flex-1">
                        <div className="font-medium">{performance.market}</div>
                        <div className="text-sm text-muted-foreground">Prediction: {performance.prediction}</div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`flex items-center gap-1 ${
                            performance.outcome === "Won"
                              ? "text-success"
                              : performance.outcome === "Lost"
                                ? "text-destructive"
                                : "text-muted-foreground"
                          }`}
                        >
                          {performance.outcome === "Won" && <TrendingUp className="w-4 h-4" />}
                          {performance.outcome === "Lost" && <TrendingDown className="w-4 h-4" />}
                          {performance.outcome === "Pending" && <Brain className="w-4 h-4" />}
                          <span className="font-medium">{performance.outcome}</span>
                        </div>
                        <div
                          className={`text-sm font-semibold ${
                            performance.profit.startsWith("+")
                              ? "text-success"
                              : performance.profit.startsWith("-")
                                ? "text-destructive"
                                : "text-muted-foreground"
                          }`}
                        >
                          {performance.profit}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
