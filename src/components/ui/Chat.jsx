import { useState, useRef, useEffect, useCallback } from 'react'

/**
 * Chat - Real-time chat panel (ported from Imat.Chat)
 *
 * Features:
 * - Message list with auto-scroll
 * - Send message via Enter or button
 * - Polling update support (updateURL)
 * - Avatar & name display
 * - Left/right message direction
 * - Sound notification
 *
 * Usage:
 *   <Chat
 *     sendURL="/api/chat/send"
 *     updateURL="/api/chat/messages"
 *     sound="/assets/sound.mp3"
 *   />
 */

export default function Chat({
  messages = [],
  sendURL,
  updateURL,
  sound,
  height = 400,
  interval = 3000,
  userName = 'Anda',
  avatar,
  onSend,
  onUpdate,
  className = '',
}) {
  const [chatMessages, setChatMessages] = useState(messages)
  const [inputValue, setInputValue] = useState('')
  const containerRef = useRef(null)
  const intervalRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      setTimeout(() => {
        containerRef.current.scrollTop = containerRef.current.scrollHeight
      }, 10)
    }
  }, [])

  // Polling for updates
  useEffect(() => {
    if (!updateURL) return

    const poll = async () => {
      try {
        const res = await fetch(updateURL, { method: 'POST' })
        const data = await res.json()
        if (data.update && data.data) {
          setChatMessages(prev => [...prev, ...data.data])
          scrollToBottom()
          if (sound && !document.hasFocus()) {
            new Audio(sound).play().catch(() => {})
          }
          if (onUpdate) onUpdate(data.data)
        }
      } catch (err) {
        console.error('Chat poll error:', err)
      }
    }

    intervalRef.current = setInterval(poll, interval)
    return () => clearInterval(intervalRef.current)
  }, [updateURL, interval, sound, onUpdate, scrollToBottom])

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages, scrollToBottom])

  const sendMessage = useCallback(async () => {
    const text = inputValue.trim()
    if (!text) return

    const newMsg = {
      id: Date.now(),
      name: userName,
      avatar: avatar || '',
      message: text,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      direction: 'right',
    }

    setChatMessages(prev => [...prev, newMsg])
    setInputValue('')

    if (onSend) {
      onSend(text)
    }

    if (sendURL) {
      try {
        await fetch(sendURL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ msg: text }),
        })
      } catch (err) {
        console.error('Chat send error:', err)
      }
    }
  }, [inputValue, userName, avatar, sendURL, onSend])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }, [sendMessage])

  return (
    <div className={`flex flex-col border border-[#d4c4ab] rounded-xl overflow-hidden bg-white ${className}`}>
      {/* Messages container */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
        style={{ height }}
      >
        {chatMessages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-[#5A5A5A]/50">
            <i className="fas fa-comments text-3xl mb-2"></i>
            <span className="text-sm">Belum ada pesan</span>
          </div>
        )}

        {chatMessages.map((msg, i) => (
          <div
            key={msg.id || i}
            className={`flex gap-3 ${msg.direction === 'right' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F4F6F9] border border-[#d4c4ab] flex items-center justify-center overflow-hidden">
              {msg.avatar ? (
                <img src={msg.avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                <i className="fas fa-user text-xs text-[#5A5A5A]"></i>
              )}
            </div>
            <div className={`max-w-[70%] ${msg.direction === 'right' ? 'items-end' : 'items-start'} flex flex-col gap-0.5`}>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#333333]">{msg.name}</span>
                <span className="text-[10px] text-[#5A5A5A]/60">{msg.time}</span>
              </div>
              <div
                className={`text-sm px-3.5 py-2 rounded-xl ${
                  msg.direction === 'right'
                    ? 'bg-[#855b2f] text-white rounded-tr-sm'
                    : 'bg-[#F4F6F9] text-[#333333] border border-[#d4c4ab] rounded-tl-sm'
                }`}
              >
                {msg.message}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="flex items-center gap-2 p-3 border-t border-[#d4c4ab] bg-[#F4F6F9]/50">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tulis pesan..."
          className="flex-1 px-4 py-2.5 text-sm bg-white border border-[#d4c4ab] rounded-xl text-[#333333] placeholder:text-[#5A5A5A]/50 focus:border-[#855b2f] focus:ring-2 focus:ring-[#855b2f]/20 outline-none transition-all"
        />
        <button
          onClick={sendMessage}
          disabled={!inputValue.trim()}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#855b2f] text-white hover:bg-[#5e3f1f] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <i className="fas fa-paper-plane text-sm"></i>
        </button>
      </div>
    </div>
  )
}
