"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "@/context/theme-context"
import { Mail, ArrowLeft, CheckCircle, Loader2 } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { theme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Show success state
    setSubmitted(true)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-700 dark:to-indigo-900 p-2 sm:p-4 overflow-hidden relative">
      {/* Background decorative elements - responsive positioning */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[5%] sm:top-[10%] left-[5%] sm:left-[15%] w-32 sm:w-64 h-32 sm:h-64 bg-white/10 rounded-full blur-xl sm:blur-3xl"></div>
        <div className="absolute bottom-[10%] sm:bottom-[20%] right-[5%] sm:right-[10%] w-40 sm:w-80 h-40 sm:h-80 bg-indigo-400/10 dark:bg-indigo-300/10 rounded-full blur-xl sm:blur-3xl"></div>
        <div className="absolute top-[30%] sm:top-[40%] right-[15%] sm:right-[25%] w-24 sm:w-40 h-24 sm:h-40 bg-blue-300/20 dark:bg-blue-200/10 rounded-full blur-lg sm:blur-2xl"></div>
      </div>

      <div className="w-full max-w-[90%] xs:max-w-[85%] sm:max-w-sm bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 z-10 transition-all duration-300 hover:shadow-blue-500/20 dark:hover:shadow-blue-400/10">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 tracking-tight">
            Forgot Password
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {!submitted
              ? "Enter your email address and we'll send you a link to reset your password"
              : "Check your email for a password reset link"}
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="group">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-1.5 transition-colors group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400"
              >
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400">
                  <Mail size={16} className="sm:size-[18px]" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 transition-all"
                  placeholder="your.email@example.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-500 dark:hover:to-blue-600 text-white text-sm sm:text-base font-medium py-2 sm:py-2.5 px-4 rounded-lg sm:rounded-xl transition-all duration-300 transform ${
                isLoading ? "opacity-80 cursor-not-allowed" : "hover:scale-[1.02] active:scale-[0.98]"
              } flex items-center justify-center`}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="sm:size-[18px] mr-2 animate-spin" />
                  <span className="text-sm sm:text-base">Sending Reset Link...</span>
                </>
              ) : (
                <span className="text-sm sm:text-base">Reset Password</span>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center p-4 sm:p-6 bg-green-50/80 dark:bg-green-900/20 rounded-lg sm:rounded-xl">
            <div className="flex justify-center mb-3 sm:mb-4">
              <CheckCircle size={36} className="sm:size-[48px] text-green-500 dark:text-green-400" />
            </div>
            <p className="text-sm sm:text-base text-green-700 dark:text-green-400 mb-3 sm:mb-4">
              If an account exists with the email <strong>{email}</strong>, you will receive a password reset link
              shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false)
                setEmail("")
              }}
              className="text-sm sm:text-base text-blue-600 dark:text-blue-400 hover:underline font-medium transition-colors"
            >
              Try another email
            </button>
          </div>
        )}

        <div className="text-center mt-6 sm:mt-8">
          <Link
            href="/login"
            className={`inline-flex items-center text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium transition-colors ${isLoading ? "pointer-events-none opacity-50" : ""}`}
          >
            <ArrowLeft size={14} className="sm:size-[16px] mr-1.5 sm:mr-2" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}
