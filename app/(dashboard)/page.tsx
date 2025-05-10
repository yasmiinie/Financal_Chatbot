import { QuestionInput } from "@/components/question-input"
import { ChatMessages } from "@/components/chat-messages"

export default function Dashboard() {
  return (
    <>
      <main className="flex-1 overflow-hidden flex flex-col">
        <ChatMessages />
      </main>
      <QuestionInput />
    </>
  )
}
