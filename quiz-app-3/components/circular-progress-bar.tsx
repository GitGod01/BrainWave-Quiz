"use client"

import { useEffect, useState } from "react"

interface CircularProgressBarProps {
  percentage: number
}

export function CircularProgressBar({ percentage }: CircularProgressBarProps) {
  const [progress, setProgress] = useState(0)

  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage)
    }, 100)

    return () => clearTimeout(timer)
  }, [percentage])

  // Calculate the circle properties
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  // Determine color based on score
  const getGradientId = () => {
    if (progress >= 80) return "circleGradientExcellent"
    if (progress >= 60) return "circleGradientGood"
    if (progress >= 40) return "circleGradientAverage"
    return "circleGradientNeeds"
  }

  return (
    <div className="relative flex h-48 w-48 items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 160 160">
        <defs>
          <linearGradient id="circleGradientExcellent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <linearGradient id="circleGradientGood" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="circleGradientAverage" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <linearGradient id="circleGradientNeeds" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>

        {/* Background glow */}
        <circle cx="80" cy="80" r={radius + 8} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="16" />

        {/* Background circle */}
        <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />

        {/* Progress circle */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke={`url(#${getGradientId()})`}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 80 80)"
          style={{
            transition: "stroke-dashoffset 1s ease-in-out",
            filter: "drop-shadow(0 0 6px rgba(255,255,255,0.3))",
          }}
        />
      </svg>

      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-white">{progress}%</span>
        <span className="text-xs text-white/70 uppercase tracking-wider mt-1">
          {progress >= 80 ? "Excellent" : progress >= 60 ? "Good" : progress >= 40 ? "Average" : "Try Again"}
        </span>
      </div>
    </div>
  )
}
