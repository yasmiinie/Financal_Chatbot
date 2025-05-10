"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "english" | "arabic"

type Translations = {
  [key: string]: {
    english: string
    arabic: string
  }
}

// Common UI translations
const translations: Translations = {
  // Header
  select_scenario: {
    english: "Select Scenario",
    arabic: "اختر السيناريو",
  },
  use_case_scenarios: {
    english: "Use case scenarios",
    arabic: "سيناريوهات الاستخدام",
  },
  reverse_transactions: {
    english: "Reverse transactions",
    arabic: "المعاملات العكسية",
  },
  standard_enhancement: {
    english: "Standard enhancement",
    arabic: "تحسين المعايير",
  },
  teams_own: {
    english: "Teams own",
    arabic: "فرق العمل",
  },

  // Sidebar
  new_conversation: {
    english: "New Conversation",
    arabic: "محادثة جديدة",
  },
  previous_days: {
    english: "30 days previous",
    arabic: "الـ 30 يومًا السابقة",
  },
  language: {
    english: "Language",
    arabic: "اللغة",
  },
  appearance: {
    english: "Appearance",
    arabic: "المظهر",
  },
  dark: {
    english: "Dark",
    arabic: "داكن",
  },
  light: {
    english: "Light",
    arabic: "فاتح",
  },

  // Chat
  write_question: {
    english: "Write your question",
    arabic: "اكتب سؤالك",
  },
  drop_files: {
    english: "Drop files to attach",
    arabic: "أفلت الملفات للإرفاق",
  },
  select_standard: {
    english: "Select Standard",
    arabic: "اختر المعيار",
  },
  you: {
    english: "You",
    arabic: "أنت",
  },
  ai: {
    english: "DashStack AI",
    arabic: "الذكاء الاصطناعي",
  },
  today: {
    english: "Today",
    arabic: "اليوم",
  },

  // File attachments
  attach_files: {
    english: "Attach files",
    arabic: "إرفاق ملفات",
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  dir: "ltr" | "rtl"
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("english")
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")

  // Update direction when language changes
  useEffect(() => {
    setDir(language === "arabic" ? "rtl" : "ltr")
    document.documentElement.dir = language === "arabic" ? "rtl" : "ltr"
    document.documentElement.lang = language === "arabic" ? "ar" : "en"
  }, [language])

  // Translation function
  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language]
    }
    // Fallback to the key if translation not found
    return key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, dir, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
