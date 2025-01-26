"use client"

import { useState, useEffect } from 'react'
import ChatMessage from './ChatMessage'
import TypingIndicator from './TypingIndicator'
import ProfileImage from './ProfileImage'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Array<{
    content: string
    isBot: boolean
    timestamp: Date
  }>>([])

  useEffect(() => {
    if (isOpen) {
      setIsTyping(true)
      // Simulate typing delay
      setTimeout(() => {
        setIsTyping(false)
        setMessages([{
          content: "Hey, LeBron here! I'm your risk agent. What can I help you with?",
          isBot: true,
          timestamp: new Date()
        }])
      }, 2000) // 2 second delay
    }
  }, [isOpen])

  const [input, setInput] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      content: input,
      isBot: false,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      })

      const data = await response.json()

      // Add bot response
      setMessages(prev => [...prev, {
        content: data.response,
        isBot: true,
        timestamp: new Date()
      }])
    } catch (error) {
      console.error('Chat error:', error)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-xl w-96 h-[500px] flex flex-col">
          <div className="p-4 border-b flex justify-between items-center bg-[#003087] rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <ProfileImage />
              <h3 className="text-lg font-semibold text-white">Live GOAT</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} {...msg} />
            ))}
            {isTyping && <TypingIndicator />}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:border-[#003087] focus:ring focus:ring-[#003087] focus:ring-opacity-50"
              />
              <button
                type="submit"
                className="bg-[#003087] text-white px-4 py-2 rounded-lg hover:bg-[#002670] transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#003087] text-white p-4 rounded-full shadow-lg hover:bg-[#002670] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
        </button>
      )}
    </div>
  )
}