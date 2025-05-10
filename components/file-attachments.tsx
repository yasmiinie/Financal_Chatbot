import type { FileAttachment } from "@/context/chat-context"
import { FileAttachmentPreview } from "./file-attachment-preview"

interface FileAttachmentsProps {
  attachments: FileAttachment[]
  onRemove?: (id: string) => void
  isUploading?: boolean
  showRemove?: boolean
}

export function FileAttachments({
  attachments,
  onRemove,
  isUploading = false,
  showRemove = true,
}: FileAttachmentsProps) {
  if (!attachments || attachments.length === 0) return null

  return (
    <div className="flex gap-2 mt-2 overflow-x-auto pb-2 flex-nowrap">
      {attachments.map((file) => (
        <FileAttachmentPreview
          key={file.id}
          file={file}
          onRemove={onRemove}
          isUploading={isUploading}
          showRemove={showRemove}
        />
      ))}
    </div>
  )
}
