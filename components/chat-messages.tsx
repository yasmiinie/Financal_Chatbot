"use client"

import { useEffect, useRef, useState } from "react"
import { useScenario } from "@/context/scenario-context"
import { useChat } from "@/context/chat-context"
import { useLanguage } from "@/context/language-context"
import { FileAttachments } from "./file-attachments"
import { ChevronDown, Copy, Check, Download, FileText, FileJson } from "lucide-react"

export function ChatMessages() {
  const { selectedScenario } = useScenario()
  const { messages, isTyping } = useChat()
  const { dir, t } = useLanguage()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)
  const [openDownloadMenu, setOpenDownloadMenu] = useState<string | null>(null)

  // Scroll to bottom when messages change or when typing status changes
  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Function to scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Track scroll position to show/hide scroll button
  useEffect(() => {
    const container = messagesContainerRef.current
    if (!container) return

    const handleScroll = () => {
      // Show button when scrolled up more than 200px from bottom
      const isScrolledUp = container.scrollHeight - container.scrollTop - container.clientHeight > 200
      setShowScrollButton(isScrolledUp)
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Copy message content to clipboard
  const copyToClipboard = (messageId: string, content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopiedMessageId(messageId)
      setTimeout(() => setCopiedMessageId(null), 2000)
    })
  }

  // Toggle download menu
  const toggleDownloadMenu = (messageId: string) => {
    if (openDownloadMenu === messageId) {
      setOpenDownloadMenu(null)
    } else {
      setOpenDownloadMenu(messageId)
    }
  }

  // Download message in different formats
  const downloadMessage = (message: any, format: string) => {
    let content = ""
    let filename = `message-${new Date().toISOString().slice(0, 10)}`
    let mimeType = ""

    switch (format) {
      case "pdf":
        // In a real app, you would use a library like jsPDF to generate PDF
        alert("PDF download would be implemented with a PDF generation library")
        return
      case "markdown":
        content = message.content
        filename += ".md"
        mimeType = "text/markdown"
        break
      case "json":
        content = JSON.stringify(message, null, 2)
        filename += ".json"
        mimeType = "application/json"
        break
      case "text":
        content = message.content
        filename += ".txt"
        mimeType = "text/plain"
        break
      default:
        content = message.content
        filename += ".txt"
        mimeType = "text/plain"
    }

    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setOpenDownloadMenu(null)
  }

  // Function to render markdown content safely
  const renderMarkdown = (content: string) => {
    // Simple markdown table rendering
    const renderTable = (tableContent: string) => {
      const rows = tableContent.trim().split("\n")
      const headers = rows[0]
        .split("|")
        .filter((cell) => cell.trim() !== "")
        .map((cell) => cell.trim())
      const isHeaderSeparator = (row: string) => row.includes("---") || row.includes("===")

      // Find the data rows (skip header and separator)
      const dataRows = rows.filter((row, index) => index > 0 && !isHeaderSeparator(row) && row.includes("|"))

      return (
        <div className="overflow-x-auto my-4">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {headers.map((header, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {dataRows.map((row, rowIndex) => {
                const cells = row
                  .split("|")
                  .filter((cell) => cell.trim() !== "")
                  .map((cell) => cell.trim())
                return (
                  <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    {cells.map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-4 py-3 text-sm dark:text-gray-300">
                        {cell}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )
    }

    // Process content to handle markdown elements
    let processedContent = content

    // Handle headings
    processedContent = processedContent.replace(
      /^# (.*$)/gm,
      '<h1 class="text-xl font-bold mb-4 mt-6 dark:text-white">$1</h1>',
    )
    processedContent = processedContent.replace(
      /^## (.*$)/gm,
      '<h2 class="text-lg font-semibold mb-3 mt-5 dark:text-white">$1</h2>',
    )
    processedContent = processedContent.replace(
      /^### (.*$)/gm,
      '<h3 class="text-md font-semibold mb-2 mt-4 dark:text-white">$1</h3>',
    )

    // Handle paragraphs
    processedContent = processedContent.replace(
      /^(?!<h[1-6]|<ul|<ol|<table)(.+)$/gm,
      '<p class="mb-4 dark:text-gray-300">$1</p>',
    )

    // Handle lists
    processedContent = processedContent.replace(/^(\d+\. .*)$/gm, '<li class="mb-1 dark:text-gray-300">$1</li>')
    processedContent = processedContent.replace(/^(- .*)$/gm, '<li class="mb-1 dark:text-gray-300">$1</li>')

    // Wrap lists
    let inOrderedList = false
    let inUnorderedList = false
    const lines = processedContent.split("\n")
    const processedLines = lines.map((line) => {
      if (line.match(/^<li.*\d+\. /)) {
        if (!inOrderedList) {
          inOrderedList = true
          return '<ol class="list-decimal pl-5 mb-4">' + line
        }
      } else if (inOrderedList && !line.match(/^<li.*\d+\. /)) {
        inOrderedList = false
        return "</ol>" + line
      }

      if (line.match(/^<li.*- /)) {
        if (!inUnorderedList) {
          inUnorderedList = true
          return '<ul class="list-disc pl-5 mb-4">' + line
        }
      } else if (inUnorderedList && !line.match(/^<li.*- /)) {
        inUnorderedList = false
        return "</ul>" + line
      }

      return line
    })

    // Close any open lists
    if (inOrderedList) processedLines.push("</ol>")
    if (inUnorderedList) processedLines.push("</ul>")

    processedContent = processedLines.join("\n")

    // Extract and process tables
    const tableRegex = /\|(.+)\|[\s\S]*?\|[-:| ]+\|[\s\S]*?(?=\n\n|\n$|$)/g
    const tables = content.match(tableRegex)

    if (tables) {
      tables.forEach((table) => {
        // Replace the table markdown with a placeholder
        const placeholder = `__TABLE_PLACEHOLDER_${Math.random().toString(36).substring(2, 9)}__`
        processedContent = processedContent.replace(table, placeholder)

        // Render the table and store it
        const tableHtml = renderTable(table)
        // In a real implementation, you'd store this and replace the placeholder later
      })
    }

    // Return the processed content
    return <div dangerouslySetInnerHTML={{ __html: processedContent }} />
  }

  // Sample table data for demonstration
  const sampleTableMessage = {
    id: "table-example",
    content: `
# FAS Standards Comparison

| Standard | Title | Key Focus Areas | Effective Date |
| -------- | ----- | --------------- | -------------- |
| FAS 4 | Ijarah and Ijarah Muntahia Bittamleek | Lease recognition, Ownership transfer | Jan 1, 1998 |
| FAS 7 | Salam and Parallel Salam | Advance payment, Delivery obligations | Jan 1, 1999 |
| FAS 10 | Istisna'a and Parallel Istisna'a | Construction contracts, Progress payments | Jan 1, 2000 |
| FAS 28 | Murabaha and Other Deferred Payment Sales | Cost-plus financing, Profit recognition | Jan 1, 2019 |
| FAS 32 | Sukuk Issuance | Securitization, Asset-backed securities | Jan 1, 2020 |

## Implementation Timeline

1. Initial assessment: 2 weeks
2. Gap analysis: 3 weeks
3. System configuration: 4 weeks
4. Testing: 2 weeks
5. Training: 1 week
`,
    sender: "system",
    timestamp: new Date(),
  }

  // Add the sample table message to the displayed messages for demonstration
  const displayMessages = [...messages]
  if (messages.length > 0 && !messages.some((m) => m.id === "table-example")) {
    displayMessages.push(sampleTableMessage as any)
  }

  return (
    <div
      ref={messagesContainerRef}
      className="flex-1 overflow-y-auto px-2 sm:px-4 py-4 sm:py-6 pb-20 sm:pb-24 relative"
      dir={dir}
    >
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* Scenario title */}
        <div className="text-center mb-4 sm:mb-8">
          <h2 className="text-base sm:text-lg font-medium text-text-primary dark:text-white">{selectedScenario}</h2>
          <p className="text-xs sm:text-sm text-text-secondary dark:text-gray-400">{t("today")}</p>
        </div>

        {/* Messages */}
        {displayMessages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[90%] sm:max-w-[80%] rounded-xl sm:rounded-2xl p-3 sm:p-4 ${
                message.sender === "user"
                  ? "bg-brand-blue dark:bg-blue-700 text-white"
                  : "bg-card-bg dark:bg-gray-800 border border-border-color dark:border-gray-700"
              }`}
              dir={dir}
            >
              <div className={`flex items-center mb-2 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                {message.sender === "system" && (
                  <div className={dir === "rtl" ? "ml-2" : "mr-2"}>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-brand-blue dark:bg-blue-600 flex items-center justify-center text-white">
                      <span className="text-xs sm:text-sm font-semibold">AI</span>
                    </div>
                  </div>
                )}
                <div className="flex-1">
                  <p
                    className={`text-xs sm:text-sm font-medium ${message.sender === "user" ? "text-white" : "text-text-primary dark:text-white"}`}
                  >
                    {message.sender === "user" ? t("you") : t("ai")}
                  </p>
                </div>
                <div className={`flex items-center ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                  {message.fas && (
                    <span
                      className={`text-xs bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-1.5 sm:px-2 py-0.5 rounded-full ${dir === "rtl" ? "ml-2" : "mr-2"}`}
                    >
                      {message.fas}
                    </span>
                  )}
                  <p
                    className={`text-xs ${message.sender === "user" ? "text-blue-100" : "text-text-secondary dark:text-gray-400"}`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>

              {/* Message content */}
              <div
                className={`text-sm sm:text-base ${message.sender === "user" ? "text-white" : "text-text-primary dark:text-gray-200"}`}
              >
                {message.sender === "system" ? (
                  renderMarkdown(message.content)
                ) : (
                  <div className="whitespace-pre-line">{message.content}</div>
                )}
              </div>

              {/* File attachments */}
              {message.attachments && message.attachments.length > 0 && (
                <div
                  className={`mt-3 ${message.sender === "user" ? "bg-blue-600 dark:bg-blue-800 p-2 rounded-lg" : ""}`}
                >
                  <FileAttachments attachments={message.attachments} showRemove={false} />
                </div>
              )}

              {/* Action buttons for AI messages */}
              {message.sender === "system" && (
                <div className="flex justify-end mt-3 space-x-2">
                  {/* Copy button */}
                  <button
                    onClick={() => copyToClipboard(message.id, message.content)}
                    className="p-1 sm:p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors"
                    title="Copy to clipboard"
                  >
                    {copiedMessageId === message.id ? (
                      <Check size={14} className="sm:size-[16px] text-green-500" />
                    ) : (
                      <Copy size={14} className="sm:size-[16px]" />
                    )}
                  </button>

                  {/* Download button with dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => toggleDownloadMenu(message.id)}
                      className="p-1 sm:p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors"
                      title="Download"
                    >
                      <Download size={14} className="sm:size-[16px]" />
                    </button>

                    {/* Download format dropdown */}
                    {openDownloadMenu === message.id && (
                      <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 w-32 sm:w-40 z-10">
                        <button
                          onClick={() => downloadMessage(message, "pdf")}
                          className="flex items-center w-full px-3 py-2 text-xs sm:text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200"
                        >
                          <FileText size={14} className="sm:size-[16px] mr-2 text-gray-500 dark:text-gray-400" />
                          PDF
                        </button>
                        <button
                          onClick={() => downloadMessage(message, "markdown")}
                          className="flex items-center w-full px-3 py-2 text-xs sm:text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200"
                        >
                          <FileText size={14} className="sm:size-[16px] mr-2 text-gray-500 dark:text-gray-400" />
                          Markdown
                        </button>
                        <button
                          onClick={() => downloadMessage(message, "json")}
                          className="flex items-center w-full px-3 py-2 text-xs sm:text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200"
                        >
                          <FileJson size={14} className="sm:size-[16px] mr-2 text-gray-500 dark:text-gray-400" />
                          JSON
                        </button>
                        <button
                          onClick={() => downloadMessage(message, "text")}
                          className="flex items-center w-full px-3 py-2 text-xs sm:text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200"
                        >
                          <FileText size={14} className="sm:size-[16px] mr-2 text-gray-500 dark:text-gray-400" />
                          Text
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[90%] sm:max-w-[80%] rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-card-bg dark:bg-gray-800 border border-border-color dark:border-gray-700">
              <div className={`flex items-center ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                <div className={dir === "rtl" ? "ml-2" : "mr-2"}>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-brand-blue dark:bg-blue-600 flex items-center justify-center text-white">
                    <span className="text-xs sm:text-sm font-semibold">AI</span>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                  <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "600ms" }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to bottom button */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className={`fixed bottom-20 sm:bottom-24 ${dir === "rtl" ? "left-4 sm:left-8" : "right-4 sm:right-8"} bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 sm:p-3 flex items-center justify-center text-brand-blue dark:text-blue-400 border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200 animate-fadeIn z-10`}
          aria-label="Scroll to bottom"
        >
          <ChevronDown size={20} className="sm:size-[24px]" />
          <span className="sr-only">Scroll to bottom</span>
        </button>
      )}
    </div>
  )
}
