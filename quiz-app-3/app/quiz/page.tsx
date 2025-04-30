"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { quizData } from "@/data/quiz-data"
import { AlertCircle, CheckCircle, Clock } from "lucide-react"

export default function QuizPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [timeLeft, setTimeLeft] = useState(30)
  const [timerExpired, setTimerExpired] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Feedback messages
  const correctMessages = [
    "Brilliant! Your brain waves are on fire! 🔥",
    "Outstanding! You're a knowledge powerhouse! 💪",
    "Excellent work! Your intellect is shining bright! ✨",
    "Spot on! You're mastering this challenge! 🏆",
    "Fantastic! Your mind is razor-sharp today! 🧠",
  ]

  const incorrectMessages = [
    "Not quite, but you're building those brain connections! 🔄",
    "Close one! Every challenge makes you stronger! 💯",
    "Keep going! Learning happens in these moments! 📚",
    "That's okay! Great minds learn from every question! 🌱",
    "Almost there! Your brain is expanding with each try! 🚀",
  ]

  const timeoutMessages = [
    "Time's up! Quick thinking is a skill you're developing! ⏱️",
    "Clock ran out! Speed comes with practice! ⌛",
    "Time flew by! Next question awaits your brilliance! ⏰",
    "Out of time! Mental agility grows with each challenge! 🕰️",
    "Time's up! Your brain is warming up for the next one! ⏳",
  ]

  // Reset timer when moving to a new question
  useEffect(() => {
    setTimeLeft(30)
    setTimerExpired(false)

    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    // Start new timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout)
          setTimerExpired(true)
          setShowFeedback(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Cleanup on unmount or when question changes
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [currentQuestion])

  // Clear timer when feedback is shown
  useEffect(() => {
    if (showFeedback && timerRef.current) {
      clearInterval(timerRef.current)
    }
  }, [showFeedback])

  const handleAnswerSelect = (answer: string) => {
    if (showFeedback) return
    setSelectedAnswer(answer)
  }

  const handleNextQuestion = () => {
    // Save the user's answer
    setUserAnswers([...userAnswers, selectedAnswer || ""])

    // Check if answer is correct and update score
    if (selectedAnswer === quizData[currentQuestion].correctAnswer && !timerExpired) {
      setScore(score + 1)
    }

    // Reset selection and feedback
    setSelectedAnswer(null)
    setShowFeedback(false)
    setTimerExpired(false)

    // Move to next question or results
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Navigate to results page with score
      router.push(
        `/results?score=${score + (selectedAnswer === quizData[currentQuestion].correctAnswer && !timerExpired ? 1 : 0)}&total=${quizData.length}`,
      )
    }
  }

  const checkAnswer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    setShowFeedback(true)
  }

  const isCorrect = selectedAnswer === quizData[currentQuestion].correctAnswer

  const getRandomMessage = (messageArray: string[]) => {
    const randomIndex = Math.floor(Math.random() * messageArray.length)
    return messageArray[randomIndex]
  }

  const getFeedbackMessage = () => {
    if (timerExpired) return getRandomMessage(timeoutMessages)
    return isCorrect ? getRandomMessage(correctMessages) : getRandomMessage(incorrectMessages)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 p-4">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-1">
          Brain<span className="text-yellow-400">Wave</span> Quiz
        </h1>
      </div>

      <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xl font-bold text-white">
              Question {currentQuestion + 1} of {quizData.length}
            </div>
            <div className="flex items-center gap-2 text-white">
              <div className={`flex items-center gap-1 ${timeLeft <= 10 ? "text-red-400" : "text-yellow-400"}`}>
                <Clock className="h-5 w-5" />
                <span className="font-mono font-bold">{timeLeft}s</span>
              </div>
              <div className="text-white font-medium">Score: {score}</div>
            </div>
          </div>

          <Progress
            value={(currentQuestion / quizData.length) * 100}
            className="h-2 mb-6"
            indicatorClassName="bg-gradient-to-r from-yellow-400 to-orange-500"
          />

          <div className="bg-white/20 rounded-xl p-5 mb-6">
            <h2 className="text-xl font-semibold text-white mb-1">{quizData[currentQuestion].question}</h2>
            <div className="h-1 w-16 bg-yellow-400 rounded-full"></div>
          </div>

          <div className="grid gap-3">
            {quizData[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`flex items-center p-4 rounded-xl transition-all duration-200 border-2 ${
                  selectedAnswer === option
                    ? showFeedback
                      ? isCorrect
                        ? "bg-green-500/20 border-green-500 text-white"
                        : "bg-red-500/20 border-red-500 text-white"
                      : "bg-indigo-600/30 border-indigo-400 text-white"
                    : showFeedback && option === quizData[currentQuestion].correctAnswer
                      ? "bg-green-500/20 border-green-500 text-white"
                      : "bg-white/10 border-white/30 text-white hover:bg-white/20"
                }`}
                onClick={() => handleAnswerSelect(option)}
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 mr-3 font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-left">{option}</span>
              </button>
            ))}
          </div>

          {showFeedback && (
            <div
              className={`mt-6 p-4 rounded-xl flex items-start gap-3 ${
                timerExpired
                  ? "bg-orange-500/20 border border-orange-400/50"
                  : isCorrect
                    ? "bg-green-500/20 border border-green-400/50"
                    : "bg-red-500/20 border border-red-400/50"
              }`}
            >
              {timerExpired ? (
                <AlertCircle className="w-6 h-6 text-orange-400 shrink-0 mt-0.5" />
              ) : isCorrect ? (
                <CheckCircle className="w-6 h-6 text-green-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="text-white font-medium">{getFeedbackMessage()}</p>
                {!isCorrect && !timerExpired && (
                  <p className="text-white/80 text-sm mt-1">
                    The correct answer is:{" "}
                    <span className="font-semibold">{quizData[currentQuestion].correctAnswer}</span>
                  </p>
                )}
                {timerExpired && (
                  <p className="text-white/80 text-sm mt-1">
                    The correct answer was:{" "}
                    <span className="font-semibold">{quizData[currentQuestion].correctAnswer}</span>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between p-6 border-t border-white/10">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="border-white/30 text-white hover:bg-white/20 hover:text-white"
          >
            Quit
          </Button>

          <div className="space-x-2">
            {!showFeedback ? (
              <Button
                onClick={checkAnswer}
                disabled={!selectedAnswer && !timerExpired}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none hover:opacity-90"
              >
                Check Answer
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none hover:opacity-90"
              >
                {currentQuestion < quizData.length - 1 ? "Next Question" : "See Results"}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
