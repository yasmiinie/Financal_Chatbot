"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useScenario } from "./scenario-context"

export type FileAttachment = {
  id: string
  name: string
  type: string
  size: number
  url: string
  thumbnailUrl?: string
}

export type Message = {
  id: string
  content: string
  sender: "user" | "system"
  timestamp: Date
  fas?: string
  attachments?: FileAttachment[]
}

// Sample conversations for each history item
const sampleConversations: Record<string, Record<string, Message[]>> = {
  "Use case scenarios": {
    "Ijarah MBT Contract Analysis": [
      {
        id: "ijarah-1",
        content: "Can you explain how FAS 4 applies to Ijarah Muntahia Bittamleek contracts?",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        fas: "FAS 4",
      },
      {
        id: "ijarah-2",
        content:
          "In Ijarah Muntahia Bittamleek (IMB) contracts under FAS 4, the lessor maintains the leased asset on their balance sheet and depreciates it over its useful life, not the lease term. Rental income is recognized on a straight-line basis.\n\nThe key distinction of IMB is the transfer of ownership to the lessee at the end of the lease term, which can occur through:\n\n1. Gift (Hibah)\n2. Gradual transfer during the lease term\n3. Sale for a token or other amount\n\nThe accounting treatment varies based on the transfer method. For example, if transfer is through sale, the sale price is recognized as a receivable at the end of the lease.",
        sender: "system",
        timestamp: new Date(Date.now() - 1000 * 60 * 29),
      },
      {
        id: "ijarah-3",
        content: "How should maintenance expenses be treated in an IMB contract?",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 25),
        fas: "FAS 4",
      },
      {
        id: "ijarah-4",
        content:
          "According to FAS 4, maintenance expenses in an IMB contract are treated as follows:\n\n1. Major repairs and ordinary maintenance are the lessor's responsibility and should be recognized as expenses when incurred.\n\n2. If the lessee undertakes maintenance as per the agreement, the lessor should estimate the expected maintenance expenses and allocate a portion of the rental to cover them.\n\n3. If maintenance is contractually the lessee's responsibility, all maintenance expenses are borne by the lessee and recognized in their financial statements.",
        sender: "system",
        timestamp: new Date(Date.now() - 1000 * 60 * 24),
      },
    ],
    "Murabaha Sale Documentation": [
      {
        id: "murabaha-1",
        content: "What documentation is required for a Murabaha sale according to FAS 28?",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        fas: "FAS 28",
      },
      {
        id: "murabaha-2",
        content:
          "According to FAS 28, a Murabaha sale requires comprehensive documentation to ensure Shariah compliance and proper accounting. The key documents include:\n\n1. Master Murabaha Agreement - Outlining the general terms and conditions\n2. Purchase Order - From the customer to the bank requesting purchase of specific goods\n3. Promise to Purchase - Customer's undertaking to purchase the goods from the bank\n4. Agency Agreement - If the customer acts as the bank's agent to purchase the goods\n5. Sale Contract - The actual sale of goods from bank to customer\n6. Delivery Receipt - Confirming the customer received the goods\n\nThese documents must clearly disclose the cost of the goods and the agreed profit margin to comply with FAS 28 disclosure requirements.",
        sender: "system",
        timestamp: new Date(Date.now() - 1000 * 60 * 44),
      },
    ],
  },
  "Reverse transactions": {
    "Equity Buy-out Entry Analysis": [
      {
        id: "equity-1",
        content:
          "I have these journal entries for an equity buy-out. Which FAS standards would apply?\n\nDr. Investment in Subsidiary $5,000,000\nCr. Cash $5,000,000\n\nFollowed by:\n\nDr. Minority Interest $1,200,000\nDr. Goodwill $800,000\nCr. Investment in Associate $2,000,000",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 120),
      },
      {
        id: "equity-2",
        content:
          "Based on the journal entries provided, these appear to be related to a business combination where a controlling interest was acquired. The primary applicable standards would be:\n\n1. FAS 21 (Financial Reporting for Islamic Banks and Financial Institutions) - As the overarching framework\n\n2. FAS 22 (Segment Reporting) - If this acquisition creates a new reportable segment\n\n3. FAS 23 (Consolidation) - Primary standard applicable here as it deals with parent-subsidiary relationships and acquisition accounting\n\n4. FAS 24 (Investments in Associates) - Relevant for the investment in associate entry\n\nThe entries suggest a transition from an associate (equity method) to a subsidiary (consolidation), with recognition of goodwill and minority interest, which is primarily governed by FAS 23.",
        sender: "system",
        timestamp: new Date(Date.now() - 1000 * 60 * 119),
      },
    ],
  },
  "Standard enhancement": {
    "Digital Asset Treatment Proposal": [
      {
        id: "digital-1",
        content: "How could FAS standards be enhanced to better address digital assets and cryptocurrencies?",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 180),
        fas: "FAS 4",
      },
      {
        id: "digital-2",
        content:
          "To enhance FAS standards for digital assets and cryptocurrencies, I recommend the following improvements:\n\n1. Classification Framework: Develop a clear classification system for digital assets based on their purpose (medium of exchange, investment, utility tokens) and Shariah compliance status.\n\n2. Valuation Guidance: Provide specific guidance on fair value measurement for volatile digital assets, including frequency of valuation and handling of forks/airdrops.\n\n3. Ownership & Custody: Address the unique custody arrangements of digital assets and clarify when true ownership (and thus recognition) occurs.\n\n4. Disclosure Requirements: Enhance disclosure requirements for risk exposure, security measures, and Shariah compliance verification methods.\n\n5. Zakat Treatment: Provide clear guidance on Zakat calculation for digital assets, addressing questions of nisab threshold and valuation timing.\n\n6. Smart Contracts: Develop accounting treatments for automated smart contracts that may create contingent assets/liabilities.\n\nThese enhancements would help Islamic financial institutions properly account for digital assets while maintaining Shariah compliance.",
        sender: "system",
        timestamp: new Date(Date.now() - 1000 * 60 * 179),
      },
    ],
  },
  "Teams own": {
    "Choix Challenge Hackathon": [
      {
        id: "hackathon-1",
        content:
          "We're participating in the Choix Challenge Hackathon. Can you help us understand how to implement FAS standards in our fintech solution?",
        sender: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 240),
        fas: "FAS 28",
      },
      {
        id: "hackathon-2",
        content:
          "For your fintech solution in the Choix Challenge Hackathon, implementing FAS standards effectively requires a strategic approach:\n\n1. API-Based Compliance Engine: Build a modular compliance engine that validates transactions against relevant FAS rules in real-time.\n\n2. Smart Contract Templates: For blockchain implementations, develop Shariah-compliant smart contract templates pre-validated against FAS standards.\n\n3. Automated Classification: Implement machine learning to automatically classify transactions according to appropriate FAS standards.\n\n4. Reporting Automation: Create automated reporting tools that generate FAS-compliant financial statements and disclosures.\n\n5. Audit Trail: Maintain comprehensive audit trails showing how each transaction was validated against FAS requirements.\n\n6. User Experience: Design intuitive interfaces that guide users through FAS-compliant processes without requiring deep knowledge of the standards.\n\nFocus particularly on FAS 28 for Murabaha transactions, ensuring your solution properly tracks cost, profit margins, and deferred payment aspects while maintaining appropriate documentation.",
        sender: "system",
        timestamp: new Date(Date.now() - 1000 * 60 * 239),
      },
    ],
  },
}

// Sample initial messages for demonstration
const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'd like to understand more about FAS 4 and how it applies to Ijarah contracts.",
    sender: "user",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    fas: "FAS 4",
  },
  {
    id: "2",
    content:
      "FAS 4 covers Ijarah and Ijarah Muntahia Bittamleek. It defines Ijarah as a transfer of the right to use an asset for an agreed period in exchange for an agreed consideration. For Ijarah contracts, the standard requires recognition of the leased asset at cost and depreciation over its useful life. Rental income should be recognized on a straight-line basis over the lease term unless another systematic basis is more representative.",
    sender: "system",
    timestamp: new Date(Date.now() - 1000 * 60 * 14), // 14 minutes ago
  },
  {
    id: "3",
    content: "What's the difference between Ijarah and Ijarah Muntahia Bittamleek?",
    sender: "user",
    timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
    fas: "FAS 4",
  },
  {
    id: "4",
    content:
      "The key difference is that Ijarah is a simple lease where the asset returns to the lessor at the end of the lease term, while Ijarah Muntahia Bittamleek (IMB) includes a promise to transfer ownership to the lessee at the end of the lease term. \n\nIn IMB, the transfer of ownership can occur through:\n1. Gift (Hibah)\n2. Sale for a token consideration or other amount specified in the lease\n3. Gradual transfer of ownership during the lease term\n\nFAS 4 requires different accounting treatments for these two types of arrangements, particularly regarding the transfer of ownership and risk.",
    sender: "system",
    timestamp: new Date(Date.now() - 1000 * 60 * 9), // 9 minutes ago
  },
  {
    id: "5",
    content:
      "Here's a sample Ijarah contract template. How should we account for maintenance expenses in this type of contract?",
    sender: "user",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    fas: "FAS 4",
    attachments: [
      {
        id: "att1",
        name: "ijarah_contract_template.pdf",
        type: "application/pdf",
        size: 2457600, // 2.4 MB
        url: "/sample-files/ijarah_contract_template.pdf",
        thumbnailUrl: "/sample-files/pdf-thumbnail.png",
      },
    ],
  },
  {
    id: "6",
    content:
      "According to FAS 4, maintenance expenses are treated as follows:\n\n1. Major repairs and ordinary maintenance: These are the lessor's responsibility and should be recognized as expenses when incurred, unless they are for prior periods in which case they should be recovered from the lessee.\n\n2. If the lessee undertakes maintenance as per the lease agreement, the lessor should estimate the expected maintenance expenses and allocate a portion of the rental to cover them.\n\n3. If maintenance is the contractual responsibility of the lessee, then all maintenance expenses are borne by the lessee and recognized in their financial statements.",
    sender: "system",
    timestamp: new Date(Date.now() - 1000 * 60 * 4), // 4 minutes ago
  },
]

// Update the ChatContextType interface to include new conversation management
interface ChatContextType {
  messages: Message[]
  addMessage: (content: string, sender: "user" | "system", fas?: string, attachments?: FileAttachment[]) => void
  isTyping: boolean
  clearMessages: () => void
  uploadingFiles: FileAttachment[]
  addUploadingFile: (file: File) => Promise<FileAttachment>
  removeUploadingFile: (id: string) => void
  clearUploadingFiles: () => void
  loadConversation: (scenarioType: string, conversationTitle: string) => void
  currentConversation: string | null
  createNewConversation: (initialMessage?: string, fas?: string, attachments?: FileAttachment[]) => void
  conversations: Record<string, Record<string, Message[]>>
  deleteConversation: (scenarioType: string, conversationTitle: string) => void
  renameConversation: (scenarioType: string, oldTitle: string, newTitle: string) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

// Update the ChatProvider to include new conversation management
export function ChatProvider({ children }: { children: ReactNode }) {
  const { selectedScenario } = useScenario()
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isTyping, setIsTyping] = useState(false)
  const [uploadingFiles, setUploadingFiles] = useState<FileAttachment[]>([])
  const [currentConversation, setCurrentConversation] = useState<string | null>(null)
  const [conversations, setConversations] = useState<Record<string, Record<string, Message[]>>>(sampleConversations)

  // Simulate AI response (moved inside the component)
  const simulateAIResponse = async (userMessage: string, fas?: string) => {
    setIsTyping(true)
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000)) // Simulate delay

    let response = ""

    // Generate different responses based on the scenario and FAS
    if (selectedScenario === "Use case scenarios") {
      try {
        const apiResponse = await fetch("http://localhost:8000/ask/ ", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "query": userMessage,
            "transaction_type": "loan"
          }),
        });
        
        if (apiResponse.ok) {
          const data = await apiResponse.json();
          response = data.answer || "I'm sorry, I couldn't find a specific answer to your question.";
        } else {
          response = "There was an error processing your request. Please try again later.";
        }
      } catch (error) {
        console.error("Error calling API:", error);
        response = "There was an error processing your request. Please try again later.";
      }
    } else if (selectedScenario === "Reverse transactions") {
      try {
        const apiResponse = await fetch("https://isdb-chatbot.onrender.com/process_fas", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "scenario": userMessage
          }),
        });
        
        if (apiResponse.ok) {
          const data = await apiResponse.json();
          response = data.response;
        } else {
          response = "There was an error processing your request. Please try again later.";
        }
      } catch (error) {
        console.error("Error calling API:", error);
        response = "There was an error processing your request. Please try again later.";
      }
    } else if (selectedScenario === "Standard enhancement") {
      try {
        // First API call to start processing
        const initialResponse = await fetch("http://localhost:8000/api/process", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "standard_text": userMessage,
            "enhancement_focus": "digital assets",
            "standard_id": fas || "AAOIFI-17"
          }),
        });
        
        if (initialResponse.ok) {
          const initialData = await initialResponse.json();
          const taskId = initialData.task_id;
          
          // Simulating a waiting period to allow processing
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Second API call to get results
          const resultResponse = await fetch(`http://localhost:8000/api/task/${taskId}`);
          
          if (resultResponse.ok) {
            const resultData = await resultResponse.json();
            
            // Format the response based on the API result
            if (resultData.status === "completed") {
              response = `Standard Enhancement Analysis for ${resultData.results.standard_id}:\n\n` +
                         `Review: ${resultData.results.review}\n\n` +
                         `Recommended Enhancements: ${resultData.results.enhancements}`;
            } else {
              response = `Your enhancement request is still being processed (Task ID: ${taskId}). Please check back later for results.`;
            }
          } else {
            response = "There was an error retrieving the results. Please try again later.";
          }
        } else {
          response = "There was an error processing your enhancement request. Please try again later.";
        }
      } catch (error) {
        console.error("Error calling API:", error);
        response = "There was an error processing your request. Please try again later.";
      }
    } else if (selectedScenario === "Teams own") {
      try {
        // Determine appropriate parameters based on user message
        let productType = "Murabaha"; // Default
        
        // Basic text analysis to determine product type
        if (userMessage.toLowerCase().includes("murabaha")) {
          productType = "Murabaha";
        } else if (userMessage.toLowerCase().includes("ijarah")) {
          productType = "Ijarah";
        } else if (userMessage.toLowerCase().includes("musharaka")) {
          productType = "Musharaka";
        } else if (userMessage.toLowerCase().includes("sukuk")) {
          productType = "Sukuk";
        }
        
        // Simple detection for countries mentioned
        const countries = [];
        if (userMessage.toLowerCase().includes("uae") || userMessage.toLowerCase().includes("emirates")) {
          countries.push("UAE");
        }
        if (userMessage.toLowerCase().includes("saudi") || userMessage.toLowerCase().includes("ksa")) {
          countries.push("Saudi Arabia");
        }
        if (countries.length === 0) {
          countries.push("UAE", "Saudi Arabia"); // Default if none specified
        }
        
        const apiResponse = await fetch("http://localhost:8001/api/compliance/analyze", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "query_text": userMessage,
            "product_type": productType,
            "fiqh_schools": ["Hanbali"],
            "regulatory_frameworks": ["SAMA"],
            "cross_border_factors": countries
          }),
        });
        
        if (apiResponse.ok) {
          const data = await apiResponse.json();
          
          // Format the response based on the API result
          response = `## Compliance Analysis: ${data.product_type}\n\n` +
                     `**Analysis:** ${data.analysis}\n\n` +
                     `**Compliance Status:** ${data.compliance_status.summary}\n\n` +
                     `**Recommendations:**\n`;
                     
          // Add recommendations as bullet points
         // Add recommendations section
response += `\n**Recommendations:**\n`;

// Safely handle recommendations in different formats
if (data.recommendations) {
  if (Array.isArray(data.recommendations)) {
    // It's an array, iterate through it
    for (let i = 0; i < data.recommendations.length; i++) {
      response += `${i + 1}. ${data.recommendations[i]}\n`;
    }
  } else if (typeof data.recommendations === 'string') {
    // It's a string, add as single recommendation
    response += `- ${data.recommendations}\n`;
  } else {
    // It's some other format
    response += `- ${JSON.stringify(data.recommendations)}\n`;
  }
} else {
  // No recommendations provided
  response += "No specific recommendations provided.\n";
}
          // Add jurisdiction-specific details if available
          if (data.compliance_status.details) {
            response += `\n**Jurisdictional Details:**\n`;
            for (const [country, detail] of Object.entries(data.compliance_status.details)) {
              response += `- **${country}:** ${detail}\n`;
            }
          }
        } else {
          response = "There was an error analyzing the compliance of this structure. Please try again later.";
        }
      } catch (error) {
        console.error("Error calling API:", error);
        response = "There was an error processing your request. Please try again later.";
      }
    }else {
      response = `I understand you're asking about ${fas || "Islamic accounting standards"}. Could you please provide more context or specific questions about the application or interpretation you're interested in?`
    }

    addMessage(response, "system")
    setIsTyping(false)
  }

  // Function to create a new conversation
  const createNewConversation = (initialMessage?: string, fas?: string, attachments?: FileAttachment[]) => {
    // Generate a new conversation title based on the current time
    const newTitle = `New Conversation ${new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })}`

    // Create a new conversation with initial message if provided
    const newMessages: Message[] = []

    if (initialMessage) {
      const newUserMessage: Message = {
        id: Date.now().toString(),
        content: initialMessage,
        sender: "user",
        timestamp: new Date(),
        fas,
        attachments,
      }
      newMessages.push(newUserMessage)
    }

    // Update conversations state
    setConversations((prev) => {
      const updatedConversations = { ...prev }

      // Create scenario category if it doesn't exist
      if (!updatedConversations[selectedScenario]) {
        updatedConversations[selectedScenario] = {}
      }

      // Add new conversation to the scenario
      updatedConversations[selectedScenario][newTitle] = newMessages

      return updatedConversations
    })

    // Set current conversation to the new one
    setCurrentConversation(newTitle)

    // Set messages to the new conversation messages
    setMessages(newMessages)

    // If initial message was provided, simulate AI response
    if (initialMessage) {
      simulateAIResponse(initialMessage, fas)
    }
  }

  // Function to delete a conversation
  const deleteConversation = (scenarioType: string, conversationTitle: string) => {
    setConversations((prev) => {
      const updatedConversations = { ...prev }

      if (updatedConversations[scenarioType] && updatedConversations[scenarioType][conversationTitle]) {
        // Create a new object without the deleted conversation
        const { [conversationTitle]: _, ...remainingConversations } = updatedConversations[scenarioType]
        updatedConversations[scenarioType] = remainingConversations
      }

      return updatedConversations
    })

    // If the deleted conversation was the current one, reset to initial state
    if (currentConversation === conversationTitle) {
      setCurrentConversation(null)
      setMessages(initialMessages)
    }
  }

  // Function to rename a conversation
  const renameConversation = (scenarioType: string, oldTitle: string, newTitle: string) => {
    if (oldTitle === newTitle) return

    setConversations((prev) => {
      const updatedConversations = { ...prev }

      if (updatedConversations[scenarioType] && updatedConversations[scenarioType][oldTitle]) {
        // Get the messages from the old conversation
        const conversationMessages = updatedConversations[scenarioType][oldTitle]

        // Create a new object without the old conversation
        const { [oldTitle]: _, ...remainingConversations } = updatedConversations[scenarioType]

        // Add the conversation with the new title
        updatedConversations[scenarioType] = {
          ...remainingConversations,
          [newTitle]: conversationMessages,
        }
      }

      return updatedConversations
    })

    // Update current conversation if it was the renamed one
    if (currentConversation === oldTitle) {
      setCurrentConversation(newTitle)
    }
  }

  // Function to load a specific conversation
  const loadConversation = (scenarioType: string, conversationTitle: string) => {
    const conversationMessages = conversations[scenarioType]?.[conversationTitle]
    if (conversationMessages) {
      setMessages(conversationMessages)
      setCurrentConversation(conversationTitle)
    } else {
      setMessages(initialMessages)
      setCurrentConversation(null)
    }
  }

  // Function to add a new message
  const addMessage = (content: string, sender: "user" | "system", fas?: string, attachments?: FileAttachment[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
      fas,
      attachments,
    }

    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newMessage]

      // If we're in a conversation, update the conversation in state
      if (currentConversation) {
        setConversations((prev) => {
          const updatedConversations = { ...prev }

          if (updatedConversations[selectedScenario]) {
            updatedConversations[selectedScenario][currentConversation] = updatedMessages
          }

          return updatedConversations
        })
      }

      return updatedMessages
    })

    // If user sent a message, simulate AI response
    if (sender === "user") {
      simulateAIResponse(content, fas)
    }
  }

  // Function to clear all messages and start a new conversation
  const clearMessages = () => {
    setMessages([])
    setCurrentConversation(null)
  }

  // Function to add a file that's being uploaded
  const addUploadingFile = async (file: File): Promise<FileAttachment> => {
    // Create a unique ID for the file
    const fileId = `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

    // Create object URL for preview
    const url = URL.createObjectURL(file)

    // Create thumbnail URL based on file type
    let thumbnailUrl = url
    if (!file.type.startsWith("image/")) {
      // Use appropriate icon based on file type
      if (file.type.includes("pdf")) {
        thumbnailUrl = "/sample-files/pdf-thumbnail.png"
      } else if (file.type.includes("word") || file.type.includes("document")) {
        thumbnailUrl = "/sample-files/doc-thumbnail.png"
      } else if (file.type.includes("excel") || file.type.includes("spreadsheet")) {
        thumbnailUrl = "/sample-files/xls-thumbnail.png"
      } else if (file.type.includes("presentation") || file.type.includes("powerpoint")) {
        thumbnailUrl = "/sample-files/ppt-thumbnail.png"
      } else {
        thumbnailUrl = "/sample-files/file-thumbnail.png"
      }
    }

    const newFile: FileAttachment = {
      id: fileId,
      name: file.name,
      type: file.type,
      size: file.size,
      url,
      thumbnailUrl,
    }

    // Add to uploading files
    setUploadingFiles((prev) => [...prev, newFile])

    // Simulate upload process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return newFile
  }

  // Function to remove a file from uploading files
  const removeUploadingFile = (id: string) => {
    setUploadingFiles((prev) => prev.filter((file) => file.id !== id))
  }

  // Function to clear all uploading files
  const clearUploadingFiles = () => {
    setUploadingFiles([])
  }

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        isTyping,
        clearMessages,
        uploadingFiles,
        addUploadingFile,
        removeUploadingFile,
        clearUploadingFiles,
        loadConversation,
        currentConversation,
        createNewConversation,
        conversations,
        deleteConversation,
        renameConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
