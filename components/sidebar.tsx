"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageSquarePlus, Menu, MoreHorizontal, Trash2, Edit2, Plus, Globe, Moon, Sun, X } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useScenario } from "@/context/scenario-context"
import { useChat } from "@/context/chat-context"
import { useTheme } from "@/context/theme-context"
import Image from "next/image"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const { dir, t, language, setLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const { selectedScenario } = useScenario()
  const {
    loadConversation,
    currentConversation,
    clearMessages,
    createNewConversation,
    conversations,
    deleteConversation,
    renameConversation,
  } = useChat()
  const [menuOpen, setMenuOpen] = useState<string | null>(null)
  const [isRenaming, setIsRenaming] = useState<string | null>(null)
  const [newTitle, setNewTitle] = useState("")
  const renameInputRef = useRef<HTMLInputElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Get the appropriate history items based on selected scenario
  const currentHistoryItems = conversations[selectedScenario] ? Object.keys(conversations[selectedScenario]) : []

  // Handle item click to load conversation
  const handleItemClick = (item: string) => {
    loadConversation(selectedScenario, item)
    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      setIsOpen(false)
    }
  }

  // Handle new conversation click
  const handleNewConversation = () => {
    createNewConversation()
    // Close sidebar on mobile after creating new conversation
    if (window.innerWidth < 768) {
      setIsOpen(false)
    }
  }

  // Toggle conversation menu
  const toggleMenu = (conversationTitle: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setMenuOpen(menuOpen === conversationTitle ? null : conversationTitle)
  }

  // Start renaming a conversation
  const startRenaming = (conversationTitle: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setIsRenaming(conversationTitle)
    setNewTitle(conversationTitle)
    setMenuOpen(null)

    // Focus the input after rendering
    setTimeout(() => {
      if (renameInputRef.current) {
        renameInputRef.current.focus()
        renameInputRef.current.select()
      }
    }, 10)
  }

  // Handle rename submission
  const handleRename = (e: React.FormEvent) => {
    e.preventDefault()
    if (isRenaming && newTitle.trim()) {
      renameConversation(selectedScenario, isRenaming, newTitle.trim())
      setIsRenaming(null)
    }
  }

  // Handle delete conversation
  const handleDelete = (conversationTitle: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm(`Are you sure you want to delete "${conversationTitle}"?`)) {
      deleteConversation(selectedScenario, conversationTitle)
      setMenuOpen(null)
    }
  }

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(language === "english" ? "arabic" : "english")
  }

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        window.innerWidth < 768 &&
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Set sidebar to open by default on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }

    // Set initial state
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      {/* Mobile sidebar toggle */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 md:hidden bg-white dark:bg-gray-800 p-2 rounded-full shadow-md"
          aria-label="Open sidebar"
        >
          <Menu size={20} className="text-text-primary dark:text-gray-200" />
        </button>
      )}

      {/* Sidebar overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} aria-hidden="true" />
      )}

      <aside
        ref={sidebarRef}
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 bg-sidebar-bg dark:bg-gray-900 border-r border-border-color dark:border-gray-700 flex flex-col fixed md:relative z-40 h-full w-[280px] md:w-60 md:translate-x-0`}
        dir={dir}
      >
        <div className="flex items-center justify-between p-4 border-b border-border-color dark:border-gray-700">
          <h1 className="text-xl font-bold text-brand-blue dark:text-blue-400">DashStack</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <button
            className="w-full flex items-center gap-2 text-text-primary dark:text-gray-200 bg-message-blue dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800 p-2 rounded-md"
            onClick={handleNewConversation}
          >
            <MessageSquarePlus size={20} className="text-brand-blue dark:text-blue-400" />
            <span>{t("new_conversation")}</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="text-xs text-text-muted dark:text-gray-400 mb-2">{t("previous_days")}</div>
              <button
                className="text-xs text-brand-blue dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center"
                onClick={handleNewConversation}
              >
                <Plus size={14} className="mr-1" />
                New
              </button>
            </div>

            {currentHistoryItems.length === 0 ? (
              <div className="text-sm text-text-secondary dark:text-gray-400 py-2 px-3">No conversations yet</div>
            ) : (
              <ul className="space-y-1">
                {currentHistoryItems.map((item) => (
                  <li key={item} className="relative group">
                    {isRenaming === item ? (
                      <form onSubmit={handleRename} className="px-3 py-1">
                        <input
                          ref={renameInputRef}
                          type="text"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-brand-blue dark:border-blue-500 rounded-md focus:outline-none dark:bg-gray-800 dark:text-gray-200"
                          onBlur={handleRename}
                        />
                      </form>
                    ) : (
                      <>
                        <button
                          onClick={() => handleItemClick(item)}
                          className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                            currentConversation === item
                              ? "bg-brand-blue dark:bg-blue-700 text-white font-medium"
                              : "text-text-secondary dark:text-gray-300 hover:bg-active-item dark:hover:bg-gray-800 hover:text-text-primary dark:hover:text-white"
                          }`}
                        >
                          <div className="truncate pr-6">{item}</div>
                        </button>

                        <button
                          onClick={(e) => toggleMenu(item, e)}
                          className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md ${
                            currentConversation === item ? "text-white" : "text-text-secondary dark:text-gray-400"
                          } opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-gray-200 dark:hover:bg-gray-700`}
                        >
                          <MoreHorizontal size={16} />
                        </button>

                        {menuOpen === item && (
                          <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
                            <ul>
                              <li>
                                <button
                                  onClick={(e) => startRenaming(item, e)}
                                  className="flex items-center w-full px-3 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200"
                                >
                                  <Edit2 size={14} className="mr-2 text-gray-500 dark:text-gray-400" />
                                  Rename
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={(e) => handleDelete(item, e)}
                                  className="flex items-center w-full px-3 py-2 text-sm text-left text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                  <Trash2 size={14} className="mr-2" />
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Settings section at the bottom of sidebar */}
        <div className="mt-auto border-t border-border-color dark:border-gray-700 p-4 space-y-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-between w-full px-3 py-2 text-sm rounded-md text-text-secondary dark:text-gray-300 hover:bg-active-item dark:hover:bg-gray-800 hover:text-text-primary dark:hover:text-white transition-colors"
          >
            <div className="flex items-center">
              {theme === "dark" ? <Moon size={16} className="mr-2" /> : <Sun size={16} className="mr-2" />}
              <span>{t("appearance")}</span>
            </div>
            <div>
              <span>{theme === "dark" ? t("dark") : t("light")}</span>
            </div>
          </button>

          {/* Language switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center justify-between w-full px-3 py-2 text-sm rounded-md text-text-secondary dark:text-gray-300 hover:bg-active-item dark:hover:bg-gray-800 hover:text-text-primary dark:hover:text-white transition-colors"
          >
            <div className="flex items-center">
              <Globe size={16} className="mr-2" />
              <span>{t("language")}</span>
            </div>
            <div className="flex items-center">
              {language === "english" ? (
                <div className="flex items-center">
                  <Image src="/uk-flag.png" alt="English" width={20} height={20} className="rounded-sm mr-2" />
                  <span>English</span>
                </div>
              ) : (
                <div className="flex items-center" dir="rtl">
                  <span>العربية</span>
                </div>
              )}
            </div>
          </button>
        </div>
      </aside>
    </>
  )
}
