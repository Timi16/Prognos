"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Clock, TrendingUp, Eye, Zap } from "lucide-react"
import { useState } from "react"

interface MarketCardProps {
  id: string
  title: string
  category: string
  marketType: "Yes/No" | "Multiple" | "Scalar"
  poolSize: string
  impliedProbability: number
  timeLeft: string
  topPredictors: Array<{
    id: string
    avatar?: string
    name: string
  }>
  isLive?: boolean
  sparklineData?: number[]
  onPredict?: () => void
  onView?: () => void
}

export function MarketCard({
  id,
  title,
  category,
  marketType,
  poolSize,
  impliedProbability,
  timeLeft,
  topPredictors,
  isLive = false,
  sparklineData = [],
  onPredict,
  onView,
}: MarketCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getMarketTypeColor = (type: string) => {
    switch (type) {
      case "Yes/No":
        return "bg-secondary/20 text-secondary border-secondary/30"
      case "Multiple":
        return "bg-accent/20 text-accent border-accent/30"
      case "Scalar":
        return "bg-warning/20 text-warning border-warning/30"
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30"
    }
  }

  const getCategoryColor = (cat: string) => {
    const colors = {
      Crypto: "bg-success/20 text-success border-success/30",
      Politics: "bg-danger/20 text-danger border-danger/30",
      Sports: "bg-primary/20 text-primary border-primary/30",
      Tech: "bg-secondary/20 text-secondary border-secondary/30",
      Finance: "bg-warning/20 text-warning border-warning/30",
    }
    return colors[cat as keyof typeof colors] || "bg-muted/20 text-muted-foreground border-muted/30"
  }

  return (
    <Card
      className={`glass-card transition-all duration-300 p-6 cursor-pointer bg-white/5 backdrop-blur-xl border border-white/10 ${
        isHovered ? "shadow-2xl shadow-primary/20 border-primary/20" : ""
      } ${isLive ? "animate-pulse-glow" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-2">
          <Badge className={`text-xs px-3 py-1 rounded-full ${getCategoryColor(category)} font-medium`}>
            {category}
          </Badge>
          {isLive && (
            <Badge className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 animate-pulse">
              <Zap className="w-3 h-3 mr-1" />
              LIVE
            </Badge>
          )}
        </div>
        <Badge variant="outline" className={`text-xs rounded-full ${getMarketTypeColor(marketType)}`}>
          {marketType}
        </Badge>
      </div>

      <h3 className="font-bold text-lg mb-4 text-balance line-clamp-2 leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        {title}
      </h3>

      {/* Probability Bar */}
      {marketType === "Yes/No" && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-text-muted">Implied Probability</span>
            <span className="font-medium text-secondary">{impliedProbability}%</span>
          </div>
          <Progress value={impliedProbability} className="h-2 bg-surface/50">
            <div
              className="h-full bg-gradient-to-r from-secondary to-accent rounded-full transition-all duration-500"
              style={{ width: `${impliedProbability}%` }}
            />
          </Progress>
        </div>
      )}

      {/* Stats */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Pool Size</span>
          <span className="font-medium text-success">{poolSize}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Time Left</span>
          <span className="font-medium flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span className={timeLeft.includes("5m") || timeLeft.includes("1m") ? "flicker" : ""}>{timeLeft}</span>
          </span>
        </div>

        {/* Top Predictors */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-text-muted">Top Predictors</span>
          <div className="flex -space-x-2">
            {topPredictors.slice(0, 3).map((predictor, i) => (
              <Avatar key={predictor.id} className="w-6 h-6 border-2 border-card">
                <AvatarImage src={predictor.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-xs bg-primary/20 text-primary">
                  {predictor.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ))}
            {topPredictors.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-muted/20 border-2 border-card flex items-center justify-center text-xs text-muted-foreground">
                +{topPredictors.length - 3}
              </div>
            )}
          </div>
        </div>

        {/* Sparkline */}
        {sparklineData.length > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-text-muted">Activity</span>
            <div className="flex items-end gap-0.5 h-4">
              {sparklineData.slice(-12).map((value, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-secondary/50 to-secondary rounded-sm"
                  style={{ height: `${(value / Math.max(...sparklineData)) * 100}%` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onPredict}
          className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-primary-foreground font-semibold rounded-full transition-all duration-300"
          size="sm"
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          Predict
        </Button>
        <Button
          onClick={onView}
          variant="outline"
          className="bg-white/5 border-white/20 hover:bg-white/10 text-foreground rounded-full transition-all duration-300"
          size="sm"
        >
          <Eye className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  )
}

export function MarketCardSkeleton() {
  return (
    <Card className="glass-card p-6 bg-white/5 backdrop-blur-xl border border-white/10">
      <div className="flex justify-between items-start mb-4">
        <div className="h-6 w-20 bg-white/10 rounded-full animate-pulse" />
        <div className="h-6 w-16 bg-white/10 rounded-full animate-pulse" />
      </div>
      <div className="h-14 w-full bg-white/10 rounded-lg mb-4 animate-pulse" />
      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <div className="h-4 w-20 bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-16 bg-white/10 rounded animate-pulse" />
        </div>
        <div className="flex justify-between">
          <div className="h-4 w-20 bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-20 bg-white/10 rounded animate-pulse" />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex-1 h-10 bg-white/10 rounded-full animate-pulse" />
        <div className="h-10 w-12 bg-white/10 rounded-full animate-pulse" />
      </div>
    </Card>
  )
}

// Empty State
export function EmptyMarketState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mb-4">
        <TrendingUp className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No markets found</h3>
      <p className="text-text-muted mb-4">Try adjusting your filters or check back later for new markets.</p>
      <Button className="cta-gradient">Create Market</Button>
    </div>
  )
}

// Error State
export function MarketErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-danger/20 flex items-center justify-center mb-4">
        <Zap className="w-8 h-8 text-danger" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Failed to load markets</h3>
      <p className="text-text-muted mb-4">Something went wrong while fetching the markets.</p>
      <Button onClick={onRetry} variant="outline" className="glass-card border-border/50 bg-transparent">
        Try Again
      </Button>
    </div>
  )
}
