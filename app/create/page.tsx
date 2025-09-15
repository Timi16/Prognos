"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  ChevronLeft,
  ChevronRight,
  Save,
  CheckCircle,
  CalendarIcon,
  DollarSign,
  Users,
  Target,
  Shield,
} from "lucide-react"
import { format } from "date-fns"

interface MarketData {
  // Step 1: Basics
  title: string
  category: string
  description: string
  closeDate: Date | undefined

  // Step 2: Market Type
  marketType: "yes-no" | "multiple" | "scalar" | ""
  options: string[]
  scalarMin: number
  scalarMax: number
  scalarUnit: string

  // Step 3: Liquidity & Fees
  initialLiquidity: number
  minStake: number
  maxStake: number
  creatorFee: number

  // Step 4: Resolver
  resolverType: "oracle" | "designated" | "community" | ""
  resolverAddress: string
  resolverBond: number

  // Step 5: Review
  agreedToTerms: boolean
}

const initialData: MarketData = {
  title: "",
  category: "",
  description: "",
  closeDate: undefined,
  marketType: "",
  options: ["", ""],
  scalarMin: 0,
  scalarMax: 100,
  scalarUnit: "",
  initialLiquidity: 100,
  minStake: 1,
  maxStake: 1000,
  creatorFee: 2,
  resolverType: "",
  resolverAddress: "",
  resolverBond: 100,
  agreedToTerms: false,
}

const categories = ["Crypto", "Politics", "Sports", "Tech", "Finance", "Entertainment", "Science", "Other"]

const steps = [
  { id: 1, title: "Basics", description: "Market details" },
  { id: 2, title: "Type", description: "Market structure" },
  { id: 3, title: "Liquidity", description: "Fees & limits" },
  { id: 4, title: "Resolver", description: "Oracle setup" },
  { id: 5, title: "Review", description: "Confirm & publish" },
]

export default function CreateMarketPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [marketData, setMarketData] = useState<MarketData>(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDraft, setIsDraft] = useState(false)

  const updateData = (field: keyof MarketData, value: any) => {
    setMarketData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!marketData.title.trim()) newErrors.title = "Title is required"
        if (!marketData.category) newErrors.category = "Category is required"
        if (!marketData.description.trim()) newErrors.description = "Description is required"
        if (!marketData.closeDate) newErrors.closeDate = "Close date is required"
        break

      case 2:
        if (!marketData.marketType) newErrors.marketType = "Market type is required"
        if (marketData.marketType === "multiple" && marketData.options.some((opt) => !opt.trim())) {
          newErrors.options = "All options must be filled"
        }
        if (marketData.marketType === "scalar" && !marketData.scalarUnit.trim()) {
          newErrors.scalarUnit = "Unit is required for scalar markets"
        }
        break

      case 3:
        if (marketData.initialLiquidity < 10) newErrors.initialLiquidity = "Minimum liquidity is $10"
        if (marketData.minStake >= marketData.maxStake) newErrors.minStake = "Min stake must be less than max stake"
        break

      case 4:
        if (!marketData.resolverType) newErrors.resolverType = "Resolver type is required"
        if (marketData.resolverType === "designated" && !marketData.resolverAddress.trim()) {
          newErrors.resolverAddress = "Resolver address is required"
        }
        break

      case 5:
        if (!marketData.agreedToTerms) newErrors.agreedToTerms = "You must agree to the terms"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const saveDraft = () => {
    setIsDraft(true)
    setTimeout(() => setIsDraft(false), 2000)
  }

  const submitMarket = async () => {
    if (!validateStep(5)) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsSubmitting(false)
    // Would redirect to market page
  }

  const getStepIcon = (stepNumber: number) => {
    if (stepNumber < currentStep) return <CheckCircle className="w-5 h-5 text-success" />
    if (stepNumber === currentStep) return <div className="w-5 h-5 rounded-full bg-primary" />
    return <div className="w-5 h-5 rounded-full bg-muted/30" />
  }

  const renderMarketPreview = () => {
    if (!marketData.marketType) return null

    return (
      <Card className="glass-card p-4 mt-4">
        <h4 className="font-medium mb-3">Preview</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Badge className="text-xs bg-primary/20 text-primary border-primary/30">
              {marketData.category || "Category"}
            </Badge>
            <Badge className="text-xs bg-secondary/20 text-secondary border-secondary/30">
              {marketData.marketType === "yes-no"
                ? "Yes/No"
                : marketData.marketType === "multiple"
                  ? "Multiple"
                  : "Scalar"}
            </Badge>
          </div>
          <h5 className="font-medium line-clamp-2">{marketData.title || "Market title will appear here"}</h5>
          {marketData.marketType === "multiple" && (
            <div className="space-y-1">
              {marketData.options.map((option, i) => (
                <div key={i} className="text-sm p-2 rounded bg-surface/30">
                  {option || `Option ${i + 1}`}
                </div>
              ))}
            </div>
          )}
          {marketData.marketType === "scalar" && (
            <div className="text-sm p-2 rounded bg-surface/30">
              Range: {marketData.scalarMin} - {marketData.scalarMax} {marketData.scalarUnit}
            </div>
          )}
        </div>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-bg text-text noise-texture pt-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="hero-gradient bg-clip-text text-transparent">Create Market</span>
          </h1>
          <p className="text-text-muted">Launch your own prediction market in 5 simple steps</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-text-muted">
              Step {currentStep} of {steps.length}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={saveDraft}
              disabled={isDraft}
              className="glass-card border-border/50 bg-transparent"
            >
              <Save className="w-4 h-4 mr-2" />
              {isDraft ? "Saved!" : "Save Draft"}
            </Button>
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="h-2 mb-4" />

          {/* Step Breadcrumbs */}
          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full mb-2">
                  {getStepIcon(step.id)}
                </div>
                <div className="text-sm font-medium">{step.title}</div>
                <div className="text-xs text-text-muted">{step.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="glass-card p-8 mb-8">
          {/* Step 1: Basics */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Market Basics</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Market Title *</Label>
                  <Input
                    id="title"
                    value={marketData.title}
                    onChange={(e) => updateData("title", e.target.value)}
                    placeholder="e.g., Will Bitcoin reach $100K by end of 2024?"
                    className="bg-surface/50 border-border/50"
                  />
                  {errors.title && <p className="text-danger text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={marketData.category} onValueChange={(value) => updateData("category", value)}>
                    <SelectTrigger className="bg-surface/50 border-border/50">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-danger text-sm mt-1">{errors.category}</p>}
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={marketData.description}
                    onChange={(e) => updateData("description", e.target.value)}
                    placeholder="Describe the market conditions and resolution criteria..."
                    className="bg-surface/50 border-border/50 min-h-24"
                  />
                  {errors.description && <p className="text-danger text-sm mt-1">{errors.description}</p>}
                </div>

                <div>
                  <Label>Market Close Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-surface/50 border-border/50"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {marketData.closeDate ? format(marketData.closeDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 glass-card border-border/50">
                      <Calendar
                        mode="single"
                        selected={marketData.closeDate}
                        onSelect={(date) => updateData("closeDate", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.closeDate && <p className="text-danger text-sm mt-1">{errors.closeDate}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Market Type */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-secondary" />
                <h2 className="text-2xl font-bold">Market Type</h2>
              </div>

              <div>
                <Label>Choose Market Type *</Label>
                <RadioGroup
                  value={marketData.marketType}
                  onValueChange={(value) => updateData("marketType", value)}
                  className="grid md:grid-cols-3 gap-4 mt-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes-no" id="yes-no" />
                    <Label htmlFor="yes-no" className="cursor-pointer">
                      <Card className="glass-card p-4 hover-glow">
                        <h4 className="font-medium mb-2">Yes/No</h4>
                        <p className="text-sm text-text-muted">Binary outcome market with two possible results</p>
                      </Card>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="multiple" id="multiple" />
                    <Label htmlFor="multiple" className="cursor-pointer">
                      <Card className="glass-card p-4 hover-glow">
                        <h4 className="font-medium mb-2">Multiple Choice</h4>
                        <p className="text-sm text-text-muted">Market with multiple possible outcomes</p>
                      </Card>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="scalar" id="scalar" />
                    <Label htmlFor="scalar" className="cursor-pointer">
                      <Card className="glass-card p-4 hover-glow">
                        <h4 className="font-medium mb-2">Scalar</h4>
                        <p className="text-sm text-text-muted">Predict a numerical value within a range</p>
                      </Card>
                    </Label>
                  </div>
                </RadioGroup>
                {errors.marketType && <p className="text-danger text-sm mt-2">{errors.marketType}</p>}
              </div>

              {/* Multiple Choice Options */}
              {marketData.marketType === "multiple" && (
                <div>
                  <Label>Options</Label>
                  <div className="space-y-2 mt-2">
                    {marketData.options.map((option, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...marketData.options]
                            newOptions[index] = e.target.value
                            updateData("options", newOptions)
                          }}
                          placeholder={`Option ${index + 1}`}
                          className="bg-surface/50 border-border/50"
                        />
                        {index > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newOptions = marketData.options.filter((_, i) => i !== index)
                              updateData("options", newOptions)
                            }}
                            className="glass-card border-border/50 bg-transparent"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                    {marketData.options.length < 6 && (
                      <Button
                        variant="outline"
                        onClick={() => updateData("options", [...marketData.options, ""])}
                        className="glass-card border-border/50 bg-transparent"
                      >
                        Add Option
                      </Button>
                    )}
                  </div>
                  {errors.options && <p className="text-danger text-sm mt-2">{errors.options}</p>}
                </div>
              )}

              {/* Scalar Range */}
              {marketData.marketType === "scalar" && (
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="scalarMin">Minimum Value</Label>
                    <Input
                      id="scalarMin"
                      type="number"
                      value={marketData.scalarMin}
                      onChange={(e) => updateData("scalarMin", Number.parseFloat(e.target.value))}
                      className="bg-surface/50 border-border/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="scalarMax">Maximum Value</Label>
                    <Input
                      id="scalarMax"
                      type="number"
                      value={marketData.scalarMax}
                      onChange={(e) => updateData("scalarMax", Number.parseFloat(e.target.value))}
                      className="bg-surface/50 border-border/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="scalarUnit">Unit *</Label>
                    <Input
                      id="scalarUnit"
                      value={marketData.scalarUnit}
                      onChange={(e) => updateData("scalarUnit", e.target.value)}
                      placeholder="e.g., USD, %"
                      className="bg-surface/50 border-border/50"
                    />
                    {errors.scalarUnit && <p className="text-danger text-sm mt-1">{errors.scalarUnit}</p>}
                  </div>
                </div>
              )}

              {renderMarketPreview()}
            </div>
          )}

          {/* Step 3: Liquidity & Fees */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="w-6 h-6 text-success" />
                <h2 className="text-2xl font-bold">Liquidity & Fees</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="initialLiquidity">Initial Liquidity *</Label>
                  <Input
                    id="initialLiquidity"
                    type="number"
                    value={marketData.initialLiquidity}
                    onChange={(e) => updateData("initialLiquidity", Number.parseFloat(e.target.value))}
                    className="bg-surface/50 border-border/50"
                  />
                  <p className="text-sm text-text-muted mt-1">Minimum $10 required</p>
                  {errors.initialLiquidity && <p className="text-danger text-sm mt-1">{errors.initialLiquidity}</p>}
                </div>

                <div>
                  <Label htmlFor="creatorFee">Creator Fee (%)</Label>
                  <div className="space-y-2">
                    <Slider
                      value={[marketData.creatorFee]}
                      onValueChange={(value) => updateData("creatorFee", value[0])}
                      max={10}
                      min={0}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-text-muted">
                      <span>0%</span>
                      <span className="font-medium text-text">{marketData.creatorFee}%</span>
                      <span>10%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="minStake">Minimum Stake</Label>
                  <Input
                    id="minStake"
                    type="number"
                    value={marketData.minStake}
                    onChange={(e) => updateData("minStake", Number.parseFloat(e.target.value))}
                    className="bg-surface/50 border-border/50"
                  />
                  {errors.minStake && <p className="text-danger text-sm mt-1">{errors.minStake}</p>}
                </div>

                <div>
                  <Label htmlFor="maxStake">Maximum Stake</Label>
                  <Input
                    id="maxStake"
                    type="number"
                    value={marketData.maxStake}
                    onChange={(e) => updateData("maxStake", Number.parseFloat(e.target.value))}
                    className="bg-surface/50 border-border/50"
                  />
                </div>
              </div>

              <Card className="glass-card p-4 bg-surface/20">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Fee Breakdown
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Platform Fee</span>
                    <span>2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Creator Fee</span>
                    <span>{marketData.creatorFee}%</span>
                  </div>
                  <div className="flex justify-between font-medium border-t border-border/50 pt-2">
                    <span>Total Fees</span>
                    <span>{(2 + marketData.creatorFee).toFixed(1)}%</span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Step 4: Resolver */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-bold">Resolver Setup</h2>
              </div>

              <div>
                <Label>Resolver Type *</Label>
                <RadioGroup
                  value={marketData.resolverType}
                  onValueChange={(value) => updateData("resolverType", value)}
                  className="grid md:grid-cols-3 gap-4 mt-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oracle" id="oracle" />
                    <Label htmlFor="oracle" className="cursor-pointer">
                      <Card className="glass-card p-4 hover-glow">
                        <h4 className="font-medium mb-2">Oracle</h4>
                        <p className="text-sm text-text-muted">Automated resolution using external data feeds</p>
                      </Card>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="designated" id="designated" />
                    <Label htmlFor="designated" className="cursor-pointer">
                      <Card className="glass-card p-4 hover-glow">
                        <h4 className="font-medium mb-2">Designated</h4>
                        <p className="text-sm text-text-muted">Specific address resolves the market</p>
                      </Card>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="community" id="community" />
                    <Label htmlFor="community" className="cursor-pointer">
                      <Card className="glass-card p-4 hover-glow">
                        <h4 className="font-medium mb-2">Community</h4>
                        <p className="text-sm text-text-muted">Token holders vote on resolution</p>
                      </Card>
                    </Label>
                  </div>
                </RadioGroup>
                {errors.resolverType && <p className="text-danger text-sm mt-2">{errors.resolverType}</p>}
              </div>

              {marketData.resolverType === "designated" && (
                <div>
                  <Label htmlFor="resolverAddress">Resolver Address *</Label>
                  <Input
                    id="resolverAddress"
                    value={marketData.resolverAddress}
                    onChange={(e) => updateData("resolverAddress", e.target.value)}
                    placeholder="0x..."
                    className="bg-surface/50 border-border/50"
                  />
                  {errors.resolverAddress && <p className="text-danger text-sm mt-1">{errors.resolverAddress}</p>}
                </div>
              )}

              <div>
                <Label htmlFor="resolverBond">Resolver Bond</Label>
                <Input
                  id="resolverBond"
                  type="number"
                  value={marketData.resolverBond}
                  onChange={(e) => updateData("resolverBond", Number.parseFloat(e.target.value))}
                  className="bg-surface/50 border-border/50"
                />
                <p className="text-sm text-text-muted mt-1">Bond amount that can be slashed for incorrect resolution</p>
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-6 h-6 text-success" />
                <h2 className="text-2xl font-bold">Review & Publish</h2>
              </div>

              <Card className="glass-card p-6 bg-surface/20">
                <h3 className="text-lg font-semibold mb-4">Market Summary</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <span className="text-text-muted text-sm">Title</span>
                      <p className="font-medium">{marketData.title}</p>
                    </div>
                    <div>
                      <span className="text-text-muted text-sm">Category</span>
                      <p className="font-medium">{marketData.category}</p>
                    </div>
                    <div>
                      <span className="text-text-muted text-sm">Type</span>
                      <p className="font-medium">
                        {marketData.marketType === "yes-no"
                          ? "Yes/No"
                          : marketData.marketType === "multiple"
                            ? "Multiple Choice"
                            : "Scalar"}
                      </p>
                    </div>
                    <div>
                      <span className="text-text-muted text-sm">Close Date</span>
                      <p className="font-medium">
                        {marketData.closeDate ? format(marketData.closeDate, "PPP") : "Not set"}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-text-muted text-sm">Initial Liquidity</span>
                      <p className="font-medium text-success">${marketData.initialLiquidity}</p>
                    </div>
                    <div>
                      <span className="text-text-muted text-sm">Creator Fee</span>
                      <p className="font-medium">{marketData.creatorFee}%</p>
                    </div>
                    <div>
                      <span className="text-text-muted text-sm">Resolver</span>
                      <p className="font-medium capitalize">{marketData.resolverType}</p>
                    </div>
                    <div>
                      <span className="text-text-muted text-sm">Resolver Bond</span>
                      <p className="font-medium">${marketData.resolverBond}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={marketData.agreedToTerms}
                  onChange={(e) => updateData("agreedToTerms", e.target.checked)}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm cursor-pointer">
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">
                    Market Creation Guidelines
                  </a>
                </Label>
              </div>
              {errors.agreedToTerms && <p className="text-danger text-sm">{errors.agreedToTerms}</p>}
            </div>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="glass-card border-border/50 bg-transparent"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep < 5 ? (
            <Button onClick={nextStep} className="cta-gradient hover-glow press-scale">
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={submitMarket}
              disabled={isSubmitting}
              className="cta-gradient hover-glow press-scale min-w-32"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Publishing...
                </div>
              ) : (
                "Publish Market"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
