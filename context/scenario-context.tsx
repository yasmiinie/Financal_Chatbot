"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type ScenarioType = "Use case scenarios" | "Reverse transactions" | "Standard enhancement" | "Teams own"

interface ScenarioContextType {
  selectedScenario: ScenarioType
  setSelectedScenario: (scenario: ScenarioType) => void
}

const ScenarioContext = createContext<ScenarioContextType | undefined>(undefined)

export function ScenarioProvider({ children }: { children: ReactNode }) {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioType>("Use case scenarios")

  return (
    <ScenarioContext.Provider value={{ selectedScenario, setSelectedScenario }}>{children}</ScenarioContext.Provider>
  )
}

export function useScenario() {
  const context = useContext(ScenarioContext)
  if (context === undefined) {
    throw new Error("useScenario must be used within a ScenarioProvider")
  }
  return context
}
