"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTheme } from "@/context/theme-context"
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberPassword, setRememberPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { theme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Navigate to main page
    router.push("/")
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
            Login to Account
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Welcome back! Please sign in</p>
        </div>

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
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="group">
            <div className="flex justify-between items-center mb-1 sm:mb-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className={`text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${isLoading ? "pointer-events-none opacity-50" : ""}`}
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400">
                <Lock size={16} className="sm:size-[18px]" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 transition-all"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex items-center">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberPassword}
                  onChange={(e) => setRememberPassword(e.target.checked)}
                  className="h-4 w-4 text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded transition-colors"
                  disabled={isLoading}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="remember"
                  className={`text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 ${isLoading ? "opacity-70" : ""}`}
                >
                  Remember Password
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-500 dark:hover:to-blue-600 text-white text-sm sm:text-base font-medium py-2 sm:py-2.5 px-4 rounded-lg sm:rounded-xl transition-all duration-300 transform ${
              isLoading ? "opacity-80 cursor-not-allowed" : "hover:scale-[1.02] active:scale-[0.98]"
            } flex items-center justify-center group`}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="sm:size-[18px] mr-2 animate-spin" />
                <span className="text-sm sm:text-base">Signing In...</span>
              </>
            ) : (
              <>
                <span className="text-sm sm:text-base">Sign In</span>
                <ArrowRight
                  size={16}
                  className="sm:size-[18px] ml-2 transition-transform duration-300 group-hover:translate-x-1"
                />
              </>
            )}
          </button>
        </form>

        <div className="relative flex items-center justify-center mt-6 sm:mt-8 mb-3 sm:mb-4">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
          <span className="flex-shrink mx-3 sm:mx-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            or continue with
          </span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
        </div>

        <div className="flex justify-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
          <button
            className="p-1.5 sm:p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
            disabled={isLoading}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z"
                fill="#4285F4"
              />
              <path
                d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.13 18.63 6.72 16.69 5.82 14.09H2.12V16.95C3.94 20.57 7.69 23 12 23Z"
                fill="#34A853"
              />
              <path
                d="M5.82 14.09C5.6 13.43 5.48 12.73 5.48 12C5.48 11.27 5.6 10.57 5.82 9.91V7.05H2.12C1.41 8.57 1 10.24 1 12C1 13.76 1.41 15.43 2.12 16.95L5.82 14.09Z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.37C13.54 5.37 14.93 5.91 16.03 6.97L19.22 3.78C17.46 2.13 14.97 1 12 1C7.69 1 3.94 3.43 2.12 7.05L5.82 9.91C6.72 7.31 9.13 5.37 12 5.37Z"
                fill="#EA4335"
              />
            </svg>
          </button>
          <button
            className="p-1.5 sm:p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
            disabled={isLoading}
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-[#1877F2]"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 16.9913 5.65783 21.1283 10.4385 21.8785V14.8906H7.89941V12H10.4385V9.79688C10.4385 7.29063 11.9314 5.90625 14.2156 5.90625C15.3097 5.90625 16.4541 6.10156 16.4541 6.10156V8.5625H15.1931C13.9509 8.5625 13.5635 9.33334 13.5635 10.1242V12H16.3369L15.8936 14.8906H13.5635V21.8785C18.3441 21.1283 22.001 16.9913 22.001 12C22.001 6.47715 17.5238 2 12.001 2Z" />
            </svg>
          </button>
          <button
            className="p-1.5 sm:p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
            disabled={isLoading}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.244 2.25H21.552L14.325 10.51L22.827 21.75H16.17L10.956 14.933L4.99 21.75H1.68L9.41 12.915L1.254 2.25H8.08L12.793 8.481L18.244 2.25ZM17.083 19.77H18.916L7.084 4.126H5.117L17.083 19.77Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        <div className="text-center mt-4 sm:mt-6">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className={`text-blue-600 dark:text-blue-400 hover:underline font-medium transition-colors ${isLoading ? "pointer-events-none opacity-50" : ""}`}
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
