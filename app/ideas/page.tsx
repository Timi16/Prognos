"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share, TrendingUp, Lightbulb, Send, MoreHorizontal } from "lucide-react"

const initialIdeas = [
  {
    id: 1,
    user: {
      name: "Alex Chen",
      username: "@alexchen",
      avatar: "/diverse-user-avatars.png",
    },
    content:
      "What if we created a prediction market for the next breakthrough in quantum computing? IBM, Google, and other tech giants are racing to achieve quantum supremacy. Could be a fascinating market to track!",
    timestamp: "2h ago",
    likes: 24,
    comments: 8,
    shares: 3,
    category: "Technology",
    trending: true,
  },
  {
    id: 2,
    user: {
      name: "Sarah Williams",
      username: "@sarahw",
      avatar: "/diverse-female-avatar.png",
    },
    content:
      "Climate prediction markets could be huge. Imagine betting on carbon emission targets, renewable energy adoption rates, or even specific climate events. The data is all there, we just need to gamify it properly.",
    timestamp: "4h ago",
    likes: 67,
    comments: 15,
    shares: 12,
    category: "Climate",
    trending: false,
  },
  {
    id: 3,
    user: {
      name: "Mike Rodriguez",
      username: "@mikerod",
      avatar: "/male-avatar.png",
    },
    content:
      "Sports prediction markets are cool, but what about esports? League of Legends World Championship, Valorant Champions, CS2 Major... the viewership is massive and the data is incredibly detailed.",
    timestamp: "6h ago",
    likes: 43,
    comments: 22,
    shares: 7,
    category: "Esports",
    trending: true,
  },
  {
    id: 4,
    user: {
      name: "Emma Thompson",
      username: "@emmathompson",
      avatar: "/confident-business-woman.png",
    },
    content:
      "Real estate prediction markets could revolutionize property investment. Predict housing prices in specific neighborhoods, commercial real estate trends, or even which cities will see the biggest growth.",
    timestamp: "8h ago",
    likes: 89,
    comments: 31,
    shares: 18,
    category: "Real Estate",
    trending: false,
  },
  {
    id: 5,
    user: {
      name: "David Park",
      username: "@davidpark",
      avatar: "/tech-guy.jpg",
    },
    content:
      "AI development milestones would make great prediction markets. When will GPT-5 be released? Which company will achieve AGI first? What about specific AI capabilities like autonomous driving levels?",
    timestamp: "12h ago",
    likes: 156,
    comments: 45,
    shares: 28,
    category: "AI",
    trending: true,
  },
]

export default function IdeasPage() {
  const [ideas, setIdeas] = useState(initialIdeas)
  const [newIdea, setNewIdea] = useState("")

  const handleSubmitIdea = () => {
    if (newIdea.trim()) {
      const idea = {
        id: ideas.length + 1,
        user: {
          name: "You",
          username: "@you",
          avatar: "/abstract-geometric-shapes.png",
        },
        content: newIdea,
        timestamp: "now",
        likes: 0,
        comments: 0,
        shares: 0,
        category: "General",
        trending: false,
      }
      setIdeas([idea, ...ideas])
      setNewIdea("")
    }
  }

  const handleLike = (id: number) => {
    setIdeas(ideas.map((idea) => (idea.id === id ? { ...idea, likes: idea.likes + 1 } : idea)))
  }

  return (
    <div className="min-h-screen bg-background pt-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-pulse delay-2000" />

      <div className="container mx-auto px-4 py-8 relative z-10 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-shift">
              Market Ideas
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">Share your prediction market ideas with the community</p>
        </div>

        {/* Post New Idea */}
        <Card className="glass-card mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src="/abstract-geometric-shapes.png" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4">
                <Textarea
                  placeholder="What prediction market would you like to see? Share your ideas..."
                  value={newIdea}
                  onChange={(e) => setNewIdea(e.target.value)}
                  className="min-h-[100px] resize-none border-0 bg-transparent text-base placeholder:text-muted-foreground focus-visible:ring-0"
                />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lightbulb className="w-4 h-4" />
                    <span>Share your market idea</span>
                  </div>
                  <Button
                    onClick={handleSubmitIdea}
                    disabled={!newIdea.trim()}
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Post Idea
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ideas Feed */}
        <div className="space-y-6">
          {ideas.map((idea) => (
            <Card key={idea.id} className="glass-card hover:scale-[1.02] transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={idea.user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{idea.user.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{idea.user.name}</span>
                        <span className="text-muted-foreground text-sm">{idea.user.username}</span>
                        <span className="text-muted-foreground text-sm">·</span>
                        <span className="text-muted-foreground text-sm">{idea.timestamp}</span>
                        {idea.trending && (
                          <Badge variant="secondary" className="bg-gradient-to-r from-primary/20 to-secondary/20">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-foreground mb-4 leading-relaxed">{idea.content}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(idea.id)}
                      className="text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      {idea.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-blue-500 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {idea.comments}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-green-500 transition-colors"
                    >
                      <Share className="w-4 h-4 mr-2" />
                      {idea.shares}
                    </Button>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {idea.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" className="glass-card bg-transparent">
            Load More Ideas
          </Button>
        </div>
      </div>
    </div>
  )
}
