"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Hash, Users, Plus, Send, Menu, X } from "lucide-react"

// Sample data for channels and DMs
const channels = [
  { id: 1, name: "general" },
  { id: 2, name: "pharmacy-updates" },
  { id: 3, name: "it-support" },
]

const directMessages = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Dr. Williams" },
]

// Sample messages for a conversation
const sampleMessages = [
  { id: 1, sender: "John Doe", content: "Has anyone seen the new inventory report?", timestamp: "2023-06-20 09:30" },
  { id: 2, sender: "Jane Smith", content: "I just uploaded it to the shared drive.", timestamp: "2023-06-20 09:32" },
  { id: 3, sender: "John Doe", content: "Great, thanks! I'll take a look.", timestamp: "2023-06-20 09:33" },
]

export default function MessagesClient() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("general")
  const [messages, setMessages] = useState(sampleMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "You",
          content: newMessage,
          timestamp: new Date().toLocaleString(),
        },
      ])
      setNewMessage("")
    }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-gray-100 p-4 transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X className="h-6 w-6" />
        </Button>
        <h2 className="mb-4 text-lg font-semibold">Channels</h2>
        <ul className="space-y-2">
          {channels.map((channel) => (
            <li key={channel.id}>
              <Button
                variant={selectedConversation === channel.name ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  setSelectedConversation(channel.name)
                  setIsSidebarOpen(false)
                }}
              >
                <Hash className="mr-2 h-4 w-4" />
                {channel.name}
              </Button>
            </li>
          ))}
          <li>
            <Button variant="ghost" className="w-full justify-start">
              <Plus className="mr-2 h-4 w-4" />
              Add Channel
            </Button>
          </li>
        </ul>

        <Separator className="my-4" />

        <h2 className="mb-4 text-lg font-semibold">Direct Messages</h2>
        <ul className="space-y-2">
          {directMessages.map((dm) => (
            <li key={dm.id}>
              <Button
                variant={selectedConversation === dm.name ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  setSelectedConversation(dm.name)
                  setIsSidebarOpen(false)
                }}
              >
                <Users className="mr-2 h-4 w-4" />
                {dm.name}
              </Button>
            </li>
          ))}
          <li>
            <Button variant="ghost" className="w-full justify-start">
              <Plus className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Conversation Header */}
        <div className="flex items-center border-b p-4">
          <Button variant="ghost" size="icon" className="mr-2 lg:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
          <h2 className="text-xl font-semibold">
            {selectedConversation ? `#${selectedConversation}` : "Select a conversation"}
          </h2>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          {messages.map((message) => (
            <div key={message.id} className="mb-4">
              <div className="flex items-start">
                <Avatar className="mr-2">
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.sender}`} />
                  <AvatarFallback>{message.sender[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{message.sender}</p>
                  <p>{message.content}</p>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">{message.timestamp}</p>
            </div>
          ))}
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t p-4">
          <div className="flex items-center">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage()
                }
              }}
            />
            <Button onClick={handleSendMessage} className="ml-2">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  )
}

