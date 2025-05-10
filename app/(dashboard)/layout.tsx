import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ScenarioProvider } from "@/context/scenario-context"
import { ChatProvider } from "@/context/chat-context"
import { LanguageProvider } from "@/context/language-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>
      <ScenarioProvider>
        <ChatProvider>
          <div className="flex flex-col md:flex-row h-screen w-full bg-main-bg dark:bg-gray-950 text-text-primary dark:text-white overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col w-full h-screen overflow-hidden">
              <Header />
              {children}
            </div>
          </div>
        </ChatProvider>
      </ScenarioProvider>
    </LanguageProvider>
  )
}
