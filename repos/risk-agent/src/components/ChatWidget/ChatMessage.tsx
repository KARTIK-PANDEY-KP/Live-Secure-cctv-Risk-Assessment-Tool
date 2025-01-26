import ProfileImage from './ProfileImage'

interface ChatMessage {
  content: string
  isBot: boolean
  timestamp: Date
}

export default function ChatMessage({ content, isBot, timestamp }: ChatMessage) {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4 items-start space-x-2`}>
      {isBot && <ProfileImage />}
      <div className={`rounded-lg px-4 py-2 max-w-[75%] ${
        isBot ? 'bg-[#E8EEF7] text-[#003087]' : 'bg-[#003087] text-white'
      }`}>
        <p className="text-sm">{content}</p>
        <span className={`text-xs ${isBot ? 'text-[#003087] opacity-70' : 'text-white opacity-70'}`}>
          {timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  )
}