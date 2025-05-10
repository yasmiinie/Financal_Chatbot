"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Globe, Circle, User, Bell } from "lucide-react"
import Image from "next/image"
import { useScenario } from "@/context/scenario-context"
import { useLanguage } from "@/context/language-context"

export function Header() {
  const { selectedScenario, setSelectedScenario } = useScenario()
  const { language, setLanguage, t } = useLanguage()
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [isScenarioDropdownOpen, setIsScenarioDropdownOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)

  const scenarioOptions = ["Use case scenarios", "Reverse transactions", "Standard enhancement", "Teams own"]

  const toggleLanguage = (lang: "english" | "arabic") => {
    setLanguage(lang)
    setIsLanguageDropdownOpen(false)
  }

  const selectScenario = (scenario: any) => {
    setSelectedScenario(scenario)
    setIsScenarioDropdownOpen(false)
  }

  // Map scenario options to translation keys
  const getScenarioTranslation = (scenario: string) => {
    const keyMap: Record<string, string> = {
      "Use case scenarios": "use_case_scenarios",
      "Reverse transactions": "reverse_transactions",
      "Standard enhancement": "standard_enhancement",
      "Teams own": "teams_own",
    }

    return t(keyMap[scenario] || scenario)
  }

  // Add a ref for the scenario dropdown
  const scenarioDropdownRef = useRef<HTMLDivElement>(null)
  const profileDropdownRef = useRef<HTMLDivElement>(null)

  // Add useEffect to handle clicks outside the dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (scenarioDropdownRef.current && !scenarioDropdownRef.current.contains(event.target as Node)) {
        setIsScenarioDropdownOpen(false)
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="border-b border-border-color dark:border-gray-700 bg-sidebar-bg dark:bg-gray-900 px-4 sm:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <div className="relative" ref={scenarioDropdownRef}>
          <button
            className="flex items-center gap-2 text-text-secondary dark:text-gray-300 hover:text-text-primary dark:hover:text-white"
            onClick={() => setIsScenarioDropdownOpen(!isScenarioDropdownOpen)}
          >
            <span className="hidden sm:inline">{getScenarioTranslation(selectedScenario)}</span>
            <span className="sm:hidden">Scenario</span>
            <ChevronDown size={16} />
          </button>

          {isScenarioDropdownOpen && (
            <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-border-color dark:border-gray-700 rounded-md shadow-md z-10">
              <ul className="py-1">
                {scenarioOptions.map((scenario) => (
                  <li key={scenario}>
                    <button
                      className={`w-full text-left px-4 py-2 flex items-center gap-2 font-medium ${
                        selectedScenario === scenario
                          ? "bg-message-blue dark:bg-blue-900 text-brand-blue dark:text-blue-400"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700 text-text-primary dark:text-gray-200"
                      }`}
                      onClick={() => selectScenario(scenario)}
                    >
                      <Circle
                        size={6}
                        className={
                          selectedScenario === scenario ? "text-brand-blue dark:text-blue-400" : "text-gray-400"
                        }
                        fill="currentColor"
                      />
                      {getScenarioTranslation(scenario)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
       

        <div className="relative" ref={profileDropdownRef}>
          <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="flex items-center gap-2">
            <div className="relative">
              <Image
                src="/professional-profile-avatar.png"
                alt="User avatar"
                width={36}
                height={36}
                className="rounded-full"
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-medium text-text-primary dark:text-white">CODEX</div>
              <div className="text-xs text-text-secondary dark:text-gray-400">Admin</div>
            </div>
          </button>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-border-color dark:border-gray-700 rounded-md shadow-md z-10">
              <div className="p-3 border-b border-gray-100 dark:border-gray-700 sm:hidden">
                <div className="font-medium text-text-primary dark:text-white">Moni Roy</div>
                <div className="text-xs text-text-secondary dark:text-gray-400">Admin</div>
              </div>
              <ul className="py-1">
                <li>
                  <button
                    onClick={() => toggleLanguage(language === "english" ? "arabic" : "english")}
                    className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-text-primary dark:text-gray-200"
                  >
                    <Globe size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                    {language === "english" ? "Switch to Arabic" : "Switch to English"}
                  </button>
                </li>
                <li>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-text-primary dark:text-gray-200">
                    <User size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                    Profile
                  </button>
                </li>
                <li>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 013-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
