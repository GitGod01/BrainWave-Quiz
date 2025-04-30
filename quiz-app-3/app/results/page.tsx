"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CircularProgressBar } from "@/components/circular-progress-bar"
import { Trophy, ArrowRight, RotateCcw } from "lucide-react"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const score = Number.parseInt(searchParams.get("score") || "0")
  const total = Number.parseInt(searchParams.get("total") || "0")
  const percentage = Math.round((score / total) * 100)

  const getFeedback = () => {
    if (percentage >= 90) return "Extraordinary! Your brain waves are off the charts! 🧠✨"
    if (percentage >= 80) return "Exceptional! You've mastered this challenge with brilliance! 🏆"
    if (percentage >= 70) return "Impressive! Your knowledge shines brightly! 💫"
    if (percentage >= 60) return "Well done! Your mental prowess is remarkable! 👏"
    if (percentage >= 50) return "Good effort! Your brain is growing stronger! 💪"
    if (percentage >= 40) return "Nice try! Every question expands your knowledge! 📚"
    if (percentage >= 30) return "Keep going! Your brain is building new connections! 🔄"
    return "This is just the beginning of your knowledge journey! 🌱"
  }

  const getMotivationalQuote = () => {
    const quotes = [
      "The only limit to your knowledge is your commitment to growth.",
      "Every question you face is a stepping stone to greater wisdom.",
      "Your brain is a muscle - the more you challenge it, the stronger it becomes.",
      "Knowledge isn't about being right all the time, but learning something new every time.",
      "The journey of discovery begins with curiosity and continues with persistence.",
    ]
    return quotes[Math.floor(Math.random() * quotes.length)]
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 p-4">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-1">
          Brain<span className="text-yellow-400">Wave</span> Quiz
        </h1>
      </div>

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
        <div className="p-6 text-center border-b border-white/10">
          <Trophy className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-1">Quiz Results</h2>
          <div className="h-1 w-16 bg-yellow-400 rounded-full mx-auto"></div>
        </div>

        <div className="flex flex-col items-center space-y-6 p-8">
          <CircularProgressBar percentage={percentage} />

          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              You scored {score} out of {total}
            </h2>
            <p className="text-yellow-300 font-medium text-lg mb-4">{getFeedback()}</p>
            <div className="bg-white/20 rounded-xl p-4 mb-2">
              <p className="text-white/90 italic">"{getMotivationalQuote()}"</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 p-6 bg-white/5">
          <Link href="/quiz" className="w-full">
            <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none hover:opacity-90 gap-2">
              <RotateCcw className="h-4 w-4" />
              Try Again
            </Button>
          </Link>
          <Link href="/" className="w-full">
            <Button
              variant="outline"
              className="w-full border-white/30 text-white hover:bg-white/20 hover:text-white gap-2"
            >
              Back to Home
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
