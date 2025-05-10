"use client"

import { X } from "lucide-react"
import Image from "next/image"
import type { FileAttachment } from "@/context/chat-context"

interface FileAttachmentPreviewProps {
  file: FileAttachment
  onRemove?: (id: string) => void
  isUploading?: boolean
  showRemove?: boolean
}

export function FileAttachmentPreview({
  file,
  onRemove,
  isUploading = false,
  showRemove = true,
}: FileAttachmentPreviewProps) {
  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Determine if file is an image
  const isImage = file.type.startsWith("image/")

  return (
    <div className="relative flex items-center p-1.5 sm:p-2 bg-gray-50 dark:bg-gray-700 rounded-md sm:rounded-lg border border-border-color dark:border-gray-600 group flex-shrink-0 max-w-[150px] sm:max-w-[200px] min-w-[120px] sm:min-w-[150px]">
      <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 mr-2 sm:mr-3 overflow-hidden rounded">
        <Image
          src={file.thumbnailUrl || file.url}
          alt={file.name}
          width={40}
          height={40}
          className={`w-full h-full object-cover ${isImage ? "" : "object-contain p-1"}`}
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs sm:text-sm font-medium text-text-primary dark:text-white truncate">{file.name}</p>
        <p className="text-[10px] sm:text-xs text-text-secondary dark:text-gray-400">{formatFileSize(file.size)}</p>
      </div>

      {isUploading && (
        <div className="w-full absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-600">
          <div className="h-full bg-brand-blue dark:bg-blue-500 animate-pulse"></div>
        </div>
      )}

      {showRemove && onRemove && (
        <button
          onClick={() => onRemove(file.id)}
          className="ml-1 sm:ml-2 p-0.5 sm:p-1 text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X size={14} className="sm:size-[16px]" />
        </button>
      )}
    </div>
  )
}
