"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { Paperclip, ChevronDown, Send, Check } from "lucide-react"
import { useScenario } from "@/context/scenario-context"
import { useChat } from "@/context/chat-context"
import { useLanguage } from "@/context/language-context"
import { FileAttachments } from "./file-attachments"

export function QuestionInput() {
  const { selectedScenario } = useScenario()
  const { language, dir, t } = useLanguage()
  const {
    addMessage,
    isTyping,
    uploadingFiles,
    addUploadingFile,
    removeUploadingFile,
    clearUploadingFiles,
    currentConversation,
    createNewConversation,
  } = useChat()
  const [question, setQuestion] = useState("")
  const [selectedFAS, setSelectedFAS] = useState("FAS 4")
  const [isFasDropdownOpen, setIsFasDropdownOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Define FAS options based on the selected scenario
  const getFasOptions = () => {
    switch (selectedScenario) {
      case "Use case scenarios":
        return ["FAS 4", "FAS 7", "FAS 10", "FAS 28", "FAS 32"]
      case "Standard enhancement":
        return ["FAS 4", "FAS 10", "FAS 32"]
      case "Teams own":
        return ["FAS 4", "FAS 7", "FAS 10", "FAS 28", "FAS 32"]
      default:
        return []
    }
  }

  const fasOptions = getFasOptions()

  // If the currently selected FAS is not in the new options list, reset to the first option
  if (fasOptions.length > 0 && !fasOptions.includes(selectedFAS)) {
    setSelectedFAS(fasOptions[0])
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFasDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = "auto"

    // Calculate new height (capped at ~7 lines)
    const lineHeight = 24 // Approximate line height in pixels
    const maxHeight = lineHeight * 7
    const newHeight = Math.min(textarea.scrollHeight, maxHeight)

    textarea.style.height = `${newHeight}px`

    // Add scrollbar if content exceeds max height
    textarea.style.overflowY = textarea.scrollHeight > maxHeight ? "auto" : "hidden"
  }, [question])

  const handleSend = async () => {
    if ((question.trim() || uploadingFiles.length > 0) && !isTyping) {
      if (!currentConversation) {
        // Create a new conversation with this message
        createNewConversation(
          question,
          selectedScenario !== "Reverse transactions" ? selectedFAS : undefined,
          uploadingFiles.length > 0 ? [...uploadingFiles] : undefined,
        )
      } else {
        // Add to existing conversation
        addMessage(
          question,
          "user",
          selectedScenario !== "Reverse transactions" ? selectedFAS : undefined,
          uploadingFiles.length > 0 ? [...uploadingFiles] : undefined,
        )
      }

      // Clear input and uploading files
      setQuestion("")
      clearUploadingFiles()

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const selectFAS = (fas: string) => {
    setSelectedFAS(fas)
    setIsFasDropdownOpen(false)
  }

  // Handle file selection from input
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // Process each file
    for (let i = 0; i < files.length; i++) {
      await addUploadingFile(files[i])
    }

    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Process dropped files
  const processFiles = useCallback(
    async (files: FileList) => {
      if (!files || files.length === 0) return

      // Process each file
      for (let i = 0; i < files.length; i++) {
        await addUploadingFile(files[i])
      }
    },
    [addUploadingFile],
  )

  // Drag and drop handlers
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      if (!isDragging) setIsDragging(true)
    },
    [isDragging],
  )

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    // Only set isDragging to false if we're leaving the dropzone (not entering a child element)
    if (dropZoneRef.current && !dropZoneRef.current.contains(e.relatedTarget as Node)) {
      setIsDragging(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files)
      }
    },
    [processFiles],
  )

  // Show FAS dropdown only if not in "Reverse transactions" mode
  const showFasDropdown = selectedScenario !== "Reverse transactions"

  return (
    <div
      ref={dropZoneRef}
      className={`bg-card-bg dark:bg-gray-800 rounded-2xl sm:rounded-[32px] p-2 sm:p-3 shadow-sm border ${
        isDragging
          ? "border-brand-blue border-dashed bg-blue-50 dark:bg-blue-900/20"
          : "border-border-color dark:border-gray-700"
      } w-[95%] mx-auto mb-4 sm:mb-[20px] transition-colors relative`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      dir={dir}
    >
      {/* Drag overlay message */}
      {isDragging && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 bg-opacity-90 rounded-2xl sm:rounded-[32px] z-10">
          <div className="text-brand-blue dark:text-blue-400 font-medium flex flex-col items-center">
            <Paperclip size={24} className="sm:size-[32px] mb-2" />
            <span className="text-sm sm:text-base">{t("drop_files")}</span>
          </div>
        </div>
      )}

      {/* File attachments preview */}
      {uploadingFiles.length > 0 && (
        <div className="mb-2 sm:mb-3 px-2">
          <FileAttachments attachments={uploadingFiles} onRemove={removeUploadingFile} isUploading={true} />
        </div>
      )}

      <div className="flex items-start gap-2 sm:gap-3">
        {/* File input (hidden) */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          multiple
          aria-label={t("attach_files")}
        />

        {/* File attachment button */}
        <button
          className="text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white p-1.5 sm:p-2 transition-colors duration-200 mt-1"
          onClick={() => fileInputRef.current?.click()}
          disabled={isTyping}
          aria-label={t("attach_files")}
          title={t("attach_files")}
        >
          <Paperclip size={18} className="sm:size-[20px]" />
        </button>

        {showFasDropdown && fasOptions.length > 0 && (
          <div className="relative mt-1" ref={dropdownRef}>
            <button
              className={`bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-text-primary dark:text-gray-200 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2 hover:bg-gray-50 dark:hover:bg-gray-600 shadow-sm transition-all duration-200 text-xs sm:text-sm ${
                isFasDropdownOpen ? "ring-2 ring-brand-blue dark:ring-blue-500 ring-opacity-50" : ""
              }`}
              onClick={() => setIsFasDropdownOpen(!isFasDropdownOpen)}
              disabled={isTyping}
              aria-haspopup="listbox"
              aria-expanded={isFasDropdownOpen}
            >
              <span className="font-medium">{selectedFAS}</span>
              <ChevronDown
                size={14}
                className={`text-gray-400 dark:text-gray-300 transition-transform duration-200 ${
                  isFasDropdownOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>

            {isFasDropdownOpen && (
              <div className="absolute left-0 bottom-full mb-2 w-36 sm:w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 overflow-hidden animate-fadeIn">
                <div className="py-1 max-h-48 sm:max-h-60 overflow-auto">
                  <div className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                    {t("select_standard")}
                  </div>
                  <ul role="listbox" className="py-1 px-1">
                    {fasOptions.map((fas) => (
                      <li key={fas} role="option" aria-selected={selectedFAS === fas} className="relative">
                        <button
                          className={`w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between rounded-lg text-xs sm:text-sm ${
                            selectedFAS === fas
                              ? "bg-blue-50 dark:bg-blue-900/40 text-brand-blue dark:text-blue-400 font-medium"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                          }`}
                          onClick={() => selectFAS(fas)}
                        >
                          {fas}
                          {selectedFAS === fas && <Check size={14} className="text-brand-blue dark:text-blue-400" />}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        <textarea
          ref={textareaRef}
          placeholder={isDragging ? t("drop_files") : t("write_question")}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 bg-transparent text-text-primary dark:text-white outline-none focus:outline-none placeholder:text-text-muted dark:placeholder:text-gray-500 resize-none min-h-[24px] max-h-[168px] py-1 overflow-y-auto text-sm sm:text-base"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
            // When Shift+Enter is pressed, the default behavior (new line) is preserved
          }}
          disabled={isTyping}
          dir={dir}
          rows={1}
        />

        <button
          className={`p-1.5 sm:p-2 rounded-full transition-colors duration-200 mt-1 ${
            (question.trim() || uploadingFiles.length > 0) && !isTyping
              ? "text-brand-blue dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              : "text-text-muted dark:text-gray-500"
          }`}
          onClick={handleSend}
          disabled={(!question.trim() && uploadingFiles.length === 0) || isTyping}
          aria-label="Send message"
        >
          <Send size={18} className="sm:size-[20px]" />
        </button>
      </div>
    </div>
  )
}
