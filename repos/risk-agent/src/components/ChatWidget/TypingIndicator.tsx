export default function TypingIndicator() {
  return (
    <div className="flex items-center space-x-2 p-3 bg-[#E8EEF7] rounded-2xl max-w-[100px]">
      <div className="w-2 h-2 bg-[#003087] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-[#003087] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-[#003087] rounded-full animate-bounce"></div>
    </div>
  )
}