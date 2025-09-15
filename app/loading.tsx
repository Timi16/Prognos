export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 relative overflow-hidden flex items-center justify-center">
      <div className="floating-orb floating-orb-1"></div>
      <div className="floating-orb floating-orb-2"></div>
      <div className="floating-orb floating-orb-3"></div>
      <div className="aurora-bg"></div>

      <div className="text-center relative z-10">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Loading...
        </p>
      </div>
    </div>
  )
}
