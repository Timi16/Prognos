"use client"
import "@/lib/flow-config" // <-- Import config at the top!

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X, Wallet, TrendingUp, Brain, Lightbulb } from "lucide-react"
import { Connect, useFlowCurrentUser } from "@onflow/react-sdk"
import Link from "next/link"

export function Navigation() {
  const [isDark, setIsDark] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  // Flow wallet connection
  const { user } = useFlowCurrentUser()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const handleConnect = () => {
    console.log("Wallet connected!")
  }

  const handleDisconnect = () => {
    console.log("Wallet disconnected!")
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">Prognos</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/markets"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 hover:scale-105 transform"
            >
              Markets
            </Link>
            <Link
              href="/portfolio"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 hover:scale-105 transform"
            >
              Portfolio
            </Link>
            <Link
              href="/agent"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 hover:scale-105 transform flex items-center gap-1"
            >
              <Brain className="w-4 h-4" />
              Agents
            </Link>
            <Link
              href="/ideas"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 hover:scale-105 transform flex items-center gap-1"
            >
              <Lightbulb className="w-4 h-4" />
              Ideas
            </Link>
            <Link
              href="/create"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 hover:scale-105 transform"
            >
              Create
            </Link>
            <Link
              href="/leaderboard"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 hover:scale-105 transform"
            >
              Leaderboard
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Flow Wallet Connect Component */}
            <div className="hidden md:block">
              <Connect
                onConnect={handleConnect}
                onDisconnect={handleDisconnect}
                balanceType="combined"
              />
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border animate-in slide-in-from-top-2 duration-300">
            <div className="px-4 py-6 space-y-4">
              <Link href="/markets" className="block text-muted-foreground hover:text-foreground transition-colors">
                Markets
              </Link>
              <Link href="/portfolio" className="block text-muted-foreground hover:text-foreground transition-colors">
                Portfolio
              </Link>
              <Link
                href="/agent"
                className="block text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Brain className="w-4 h-4" />
                AI Agents
              </Link>
              <Link
                href="/ideas"
                className="block text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Lightbulb className="w-4 h-4" />
                Market Ideas
              </Link>
              <Link href="/create" className="block text-muted-foreground hover:text-foreground transition-colors">
                Create Market
              </Link>
              <Link href="/leaderboard" className="block text-muted-foreground hover:text-foreground transition-colors">
                Leaderboard
              </Link>
              
              {/* Mobile Flow Wallet Connect */}
              <div className="pt-2">
                <Connect
                  onConnect={handleConnect}
                  onDisconnect={handleDisconnect}
                  balanceType="combined"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}