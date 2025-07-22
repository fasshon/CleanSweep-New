"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Mouse,
  Clock,
  Upload,
  Thermometer,
  Settings,
  Save,
  Lock,
  Gamepad2,
  Target,
  Clipboard,
  Trash2,
  Shield,
} from "lucide-react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

const features = [
  {
    icon: Mouse,
    title: "Sensitivity Converter",
    points: ["Converts mouse sensitivity between supported games", "Maintains consistent aim across titles"],
  },
  {
    icon: Clock,
    title: "Game Time Tracker",
    points: ["Tracks how long each game has been played", "Provides detailed playtime statistics"],
  },
  {
    icon: Upload,
    title: "Discord Webhook Auto-Upload",
    points: [
      "Auto-uploads clips/screenshots to Discord webhooks",
      "Deletes local copies after upload",
      "Lightweight alternative to full clipping services",
    ],
  },
  {
    icon: Thermometer,
    title: "Temperature & Stats Logger",
    points: ["Continuously logs CPU/GPU temperatures and usage", "Visualize system spikes and performance trends"],
  },
  {
    icon: Settings,
    title: "Game Mode Process Manager",
    points: [
      "Kills unnecessary background processes",
      "Opens toggleable utility windows for game mode",
      "Frees up system resources for smoother gameplay",
    ],
    highlighted: true,
  },
  {
    icon: Save,
    title: "Settings Saver & Restorer",
    points: ["Backs up game/application config files", "Easily restores settings after corruption or reset"],
  },
  {
    icon: Lock,
    title: "Keybind Blocker",
    points: ["Blocks specific keys or key combos", "Manual or automatic toggling based on app status"],
  },
  {
    icon: Gamepad2,
    title: "Multi-Account Game Launcher",
    points: [
      "Launch games with multiple account profiles",
      "Useful for games that don't natively support multi-logins",
    ],
  },
  {
    icon: Target,
    title: "Keybinded Gaming Profiles",
    points: [
      "Bind keys to launch your gaming setup (e.g., OBS, Discord, Valorant)",
      "Fully customizable profile launcher",
    ],
  },
  {
    icon: Clipboard,
    title: "Clipboard Manager",
    points: ["Stores last 10 clipboard entries", "Hotkey recall (e.g., Ctrl + C + 1) for quick paste"],
  },
  {
    icon: Trash2,
    title: "Auto Clear Temporary Files & Logs",
    points: ["Deletes temp files and log files at regular intervals", "Helps maintain disk space and reduce clutter"],
  },
  {
    icon: Shield,
    title: "Encrypted Account Manager",
    points: ["GUI to manage saved logins securely", "All credentials are encrypted locally"],
  },
]

export default function CleanSweepExact() {
  const [activeSection, setActiveSection] = useState("home")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const [selectedPlan, setSelectedPlan] = useState("year")

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const particles: Particle[] = []
      const particleCount = 50

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.1,
        })
      }
      particlesRef.current = particles
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw animated gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 2,
      )

      const time = Date.now() * 0.001
      const purple1 = `hsla(${260 + Math.sin(time) * 10}, 70%, 25%, 1)`
      const purple2 = `hsla(${280 + Math.cos(time * 0.7) * 15}, 60%, 15%, 1)`
      const black = "hsla(0, 0%, 0%, 1)"

      gradient.addColorStop(0, purple1)
      gradient.addColorStop(0.6, purple2)
      gradient.addColorStop(1, black)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw and update particles
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(168, 85, 247, ${particle.opacity})`
        ctx.fill()

        // Add glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = "rgba(168, 85, 247, 0.5)"
        ctx.fill()
        ctx.shadowBlur = 0
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createParticles()
    animate()

    window.addEventListener("resize", () => {
      resizeCanvas()
      createParticles()
    })

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  const renderHome = () => (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4">
      {/* Main Title */}
      <h1
        className="text-8xl md:text-9xl font-bold mb-4 animate-pulse"
        style={{
          background: "linear-gradient(135deg, #a855f7 0%, #c084fc 25%, #e879f9 50%, #c084fc 75%, #a855f7 100%)",
          backgroundSize: "200% 200%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "gradientShift 3s ease-in-out infinite",
        }}
      >
        CleanSweep
      </h1>

      {/* Subtitle */}
      <p className="text-xl md:text-2xl text-white mb-16 font-medium">The Windows multi-tool</p>

      {/* Navigation Buttons */}
      <div className="flex flex-col items-center gap-6">
        {/* Top Row - Features and Pricing */}
        <div className="flex gap-8">
          <Button
            size="lg"
            className="text-white px-10 py-4 text-xl font-medium rounded-full border border-purple-400/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            style={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #9333ea 100%)",
              backdropFilter: "blur(10px)",
            }}
            onClick={() => setActiveSection("features")}
          >
            Features
          </Button>
          <Button
            size="lg"
            className="text-white px-10 py-4 text-xl font-medium rounded-full border border-purple-400/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            style={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #9333ea 100%)",
              backdropFilter: "blur(10px)",
            }}
            onClick={() => setActiveSection("pricing")}
          >
            Pricing
          </Button>
        </div>

        {/* Bottom Row - Demo */}
        <Button
          size="lg"
          className="text-white px-12 py-4 text-xl font-medium rounded-full border border-purple-400/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          style={{
            background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #9333ea 100%)",
            backdropFilter: "blur(10px)",
          }}
        >
          Demo
        </Button>
      </div>
    </div>
  )

  const renderFeatures = () => (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-6xl font-bold mb-8"
            style={{
              background: "linear-gradient(135deg, #a855f7 0%, #8b5cf6 50%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Features
          </h2>
          <Button
            variant="outline"
            className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black mb-8 bg-transparent"
            onClick={() => setActiveSection("home")}
          >
            ← Back to Home
          </Button>
        </div>

        <div className="rounded-3xl border-2 border-gray-700 p-8 bg-black/20 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`bg-gray-900/60 border-gray-600 rounded-2xl backdrop-blur-sm ${
                  feature.highlighted ? "border-2 border-dashed border-blue-400" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <feature.icon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg mb-3 leading-tight">{feature.title}</h3>
                      <ul className="space-y-1">
                        {feature.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="text-gray-300 text-sm flex items-start">
                            <span className="text-gray-500 mr-2 flex-shrink-0">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderPricing = () => (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center mb-12">
        <h1
          className="text-7xl md:text-8xl font-bold mb-8"
          style={{
            background: "linear-gradient(135deg, #a855f7 0%, #8b5cf6 50%, #7c3aed 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          CleanSweep
        </h1>
        <Button
          variant="outline"
          className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black mb-8 bg-transparent"
          onClick={() => setActiveSection("home")}
        >
          ← Back to Home
        </Button>
      </div>

      <Card className="bg-gray-900/60 border-gray-600 rounded-3xl p-8 max-w-sm w-full backdrop-blur-sm">
        <div className="text-center mb-8">
          <h2
            className="text-2xl font-semibold"
            style={{
              background: "linear-gradient(135deg, #a855f7 0%, #8b5cf6 50%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Pricing
          </h2>
        </div>

        <div className="space-y-4 mb-8">
          <button
            onClick={() => setSelectedPlan("month")}
            className={`w-full flex items-center justify-between p-4 rounded-full border-2 transition-all duration-300 ${
              selectedPlan === "month"
                ? "border-purple-500 bg-gradient-to-r from-purple-600/30 to-purple-500/30 shadow-lg shadow-purple-500/25"
                : "border-gray-600 bg-gray-800/50 hover:border-purple-400"
            }`}
          >
            <span className="text-white font-medium text-lg">Month</span>
            <span className="text-white font-medium text-lg">4.99$</span>
          </button>

          <button
            onClick={() => setSelectedPlan("year")}
            className={`w-full flex items-center justify-between p-4 rounded-full border-2 transition-all duration-300 ${
              selectedPlan === "year"
                ? "border-purple-500 bg-gradient-to-r from-purple-600/30 to-purple-500/30 shadow-lg shadow-purple-500/25"
                : "border-gray-600 bg-gray-800/50 hover:border-purple-400"
            }`}
          >
            <span className="text-white font-medium text-lg">Year</span>
            <span className="text-white font-medium text-lg">19.99$</span>
          </button>

          <button
            onClick={() => setSelectedPlan("lifetime")}
            className={`w-full flex items-center justify-between p-4 rounded-full border-2 transition-all duration-300 ${
              selectedPlan === "lifetime"
                ? "border-purple-500 bg-gradient-to-r from-purple-600/30 to-purple-500/30 shadow-lg shadow-purple-500/25"
                : "border-gray-600 bg-gray-800/50 hover:border-purple-400"
            }`}
          >
            <span className="text-white font-medium text-lg">Lifetime</span>
            <span className="text-white font-medium text-lg">35.99$</span>
          </button>
        </div>

        <Button
          className="w-full py-4 text-lg rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          style={{
            background: "linear-gradient(135deg, #a855f7 0%, #8b5cf6 50%, #7c3aed 100%)",
          }}
          onClick={() => setActiveSection("checkout")}
        >
          Purchase
        </Button>
      </Card>
    </div>
  )

  const renderCheckout = () => {
    const planDetails = {
      month: { name: "Monthly Plan", price: "4.99", period: "month" },
      year: { name: "Yearly Plan", price: "19.99", period: "year", savings: "Save 67%" },
      lifetime: { name: "Lifetime Plan", price: "35.99", period: "one-time", savings: "Best Value" },
    }

    const currentPlan = planDetails[selectedPlan as keyof typeof planDetails]

    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center mb-12">
          <h1
            className="text-6xl md:text-7xl font-bold mb-4"
            style={{
              background: "linear-gradient(135deg, #a855f7 0%, #8b5cf6 50%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Checkout
          </h1>
          <Button
            variant="outline"
            className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black mb-8 bg-transparent"
            onClick={() => setActiveSection("pricing")}
          >
            ← Back to Pricing
          </Button>
        </div>

        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card className="bg-gray-900/60 border-gray-600 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold text-white mb-6">Order Summary</h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-xl">
                <div>
                  <h4 className="text-white font-medium">{currentPlan.name}</h4>
                  <p className="text-gray-400 text-sm">CleanSweep - The Windows multi-tool</p>
                  {currentPlan.savings && (
                    <span className="inline-block mt-1 px-2 py-1 bg-green-600 text-white text-xs rounded-full">
                      {currentPlan.savings}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">${currentPlan.price}</p>
                  <p className="text-gray-400 text-sm">/{currentPlan.period}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-white">Total</span>
                <span className="text-2xl font-bold text-purple-400">${currentPlan.price}</span>
              </div>
            </div>
          </Card>

          {/* Payment Form */}
          <Card className="bg-gray-900/60 border-gray-600 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold text-white mb-6">Payment Details</h3>

            <form className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Card Number</label>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Expiry Date</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">CVC</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                    placeholder="123"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Cardholder Name</label>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>

              <Button
                type="submit"
                className="w-full py-4 text-lg rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                style={{
                  background: "linear-gradient(135deg, #a855f7 0%, #8b5cf6 50%, #7c3aed 100%)",
                }}
              >
                Complete Purchase - ${currentPlan.price}
              </Button>
            </form>

            <p className="text-gray-400 text-sm text-center mt-4">
              Secure payment powered by Stripe. Your information is encrypted and safe.
            </p>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Animated Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4">
        {activeSection === "home" && renderHome()}
        {activeSection === "features" && renderFeatures()}
        {activeSection === "pricing" && renderPricing()}
        {activeSection === "checkout" && renderCheckout()}
      </div>

      {/* Custom CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  )
}
