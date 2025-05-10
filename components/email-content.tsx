"use client"

import { useState } from "react"
import {
  Mail,
  Star,
  Send,
  FileText,
  AlertTriangle,
  Bookmark,
  Trash2,
  Plus,
  ChevronLeft,
  Printer,
  StarIcon,
  Trash,
  MoreVertical,
  Paperclip,
  Mic,
  SendIcon,
} from "lucide-react"
import Image from "next/image"

export function EmailContent() {
  const [activeTab, setActiveTab] = useState("inbox")

  const folders = [
    { id: "inbox", name: "Inbox", icon: <Mail size={18} />, count: 1253 },
    { id: "starred", name: "Starred", icon: <Star size={18} />, count: 245 },
    { id: "sent", name: "Sent", icon: <Send size={18} />, count: 24532 },
    { id: "draft", name: "Draft", icon: <FileText size={18} />, count: 9 },
    { id: "spam", name: "Spam", icon: <AlertTriangle size={18} />, count: 14 },
    { id: "important", name: "Important", icon: <Bookmark size={18} />, count: 18 },
    { id: "bin", name: "Bin", icon: <Trash2 size={18} />, count: 9 },
  ]

  const labels = [
    { id: "primary", name: "Primary", color: "bg-blue-500" },
    { id: "social", name: "Social", color: "bg-indigo-500" },
    { id: "work", name: "Work", color: "bg-yellow-500" },
    { id: "friends", name: "Friends", color: "bg-purple-500" },
  ]

  return (
    <div className="flex h-full">
      {/* Left sidebar */}
      <div className="w-72 border-r border-border-color bg-card-bg">
        <div className="p-4">
          <button className="w-full bg-brand-blue hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center">
            <Plus size={18} className="mr-2" /> Compose
          </button>

          <div className="mt-6">
            <h3 className="font-medium text-text-primary mb-2">My Email</h3>
            <ul className="space-y-1">
              {folders.map((folder) => (
                <li key={folder.id}>
                  <button
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md ${
                      activeTab === folder.id ? "bg-blue-50 text-brand-blue" : "text-text-primary hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab(folder.id)}
                  >
                    <div className="flex items-center gap-3">
                      {folder.icon}
                      <span>{folder.name}</span>
                    </div>
                    <span className="text-xs font-medium text-text-secondary">{folder.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="font-medium text-text-primary mb-2">Label</h3>
            <ul className="space-y-2">
              {labels.map((label) => (
                <li key={label.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`label-${label.id}`}
                    className={`h-4 w-4 rounded border-gray-300 ${label.color} text-white focus:ring-brand-blue`}
                  />
                  <label htmlFor={`label-${label.id}`} className="text-text-primary">
                    {label.name}
                  </label>
                </li>
              ))}
              <li className="pt-2">
                <button className="flex items-center text-text-secondary hover:text-text-primary">
                  <Plus size={16} className="mr-2" /> Create New Label
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Email content */}
      <div className="flex-1 bg-card-bg">
        <div className="border-b border-border-color p-4 flex items-center">
          <button className="text-text-secondary hover:text-text-primary">
            <ChevronLeft size={20} />
          </button>
          <div className="ml-4">
            <h2 className="text-lg font-medium text-text-primary">Minerva Barnett</h2>
            <div className="text-xs bg-tag-purple text-purple-800 px-2 py-0.5 rounded-full inline-block">Friends</div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="text-text-secondary hover:text-text-primary">
              <Printer size={20} />
            </button>
            <button className="text-text-secondary hover:text-text-primary">
              <StarIcon size={20} />
            </button>
            <button className="text-text-secondary hover:text-text-primary">
              <Trash size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* First message */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-text-primary">
                  It is a long established fact that a reader will be distracted by the readable content of a page when
                  looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                  distribution of letters.
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div></div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-text-secondary">6:30 pm</span>
                    <button className="text-text-secondary hover:text-text-primary">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second message */}
          <div className="bg-brand-blue text-white rounded-lg p-4 ml-auto max-w-xl">
            <p>
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
              in some form, by injected humour.
            </p>
            <div className="flex justify-between items-center mt-2">
              <div></div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-blue-100">6:34 pm</span>
                <button className="text-blue-100 hover:text-white">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Third message */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-text-primary">
                  The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
                  opposed to using 'Content here, content here', making it look like readable English. Many desktop
                  publishing packages and web page editors now use Lorem Ipsum as their default.Contrary to popular
                  belief, Lorem Ipsum is not simply random text is the model text for your company.
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div></div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-text-secondary">6:38 pm</span>
                    <button className="text-text-secondary hover:text-text-primary">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message input */}
        <div className="border-t border-border-color p-4 flex items-center gap-2">
          <button className="text-text-secondary hover:text-text-primary">
            <Mic size={20} />
          </button>
          <input
            type="text"
            placeholder="Write message"
            className="flex-1 border-0 focus:ring-0 text-text-primary placeholder-text-muted bg-transparent"
          />
          <button className="text-text-secondary hover:text-text-primary">
            <Paperclip size={20} />
          </button>
          <button className="text-text-secondary hover:text-text-primary">
            <Image src="/generic-emoji-icon.png" alt="Emoji" width={20} height={20} />
          </button>
          <button className="bg-brand-blue hover:bg-blue-600 text-white rounded-full px-4 py-2 flex items-center">
            Send <SendIcon size={16} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
}
