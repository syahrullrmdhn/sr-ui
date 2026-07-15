import { useState, useCallback, createContext, useContext } from 'react'

/**
 * Notify - Persistent notification alerts (ported from Imat.Notify)
 *
 * Different from Toast: Notify items persist until dismissed, can be stacked,
 * and support a fixed top-center position. Used for system-level alerts.
 *
 * Usage:
 *   const { notify } = useNotify()
 *   notify({ text: 'Server sedang dalam maintenance', variant: 'warning' })
 */

const NotifyCtx = createContext()

const positionClasses = {
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
}

const variantStyles = {
  info:    'bg-[#2f69a8] text-white',
  success: 'bg-[#4a9c6e] text-white',
  warning: 'bg-[#d97e2f] text-white',
  danger:  'bg-rose-600 text-white',
}

const variantIcons = {
  info: 'fa-circle-info',
  success: 'fa-circle-check',
  warning: 'fa-triangle-exclamation',
  danger: 'fa-circle-xmark',
}

export function NotifyProvider({ children, position = 'top-center' }) {
  const [items, setItems] = useState([])

  const notify = useCallback(({ text, variant = 'info', icon, duration = 0 }) => {
    const id = Date.now() + Math.random()
    const item = { id, text, variant, icon }
    setItems(prev => [...prev, item])

    if (duration > 0) {
      setTimeout(() => {
        setItems(prev => prev.filter(n => n.id !== id))
      }, duration)
    }

    return id
  }, [])

  const dismiss = useCallback((id) => {
    setItems(prev => prev.filter(n => n.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setItems([])
  }, [])

  return (
    <NotifyCtx.Provider value={{ notify, dismiss, clearAll, items }}>
      {children}
      {items.length > 0 && (
        <div className={`fixed z-[99998] flex flex-col gap-2 pointer-events-none ${positionClasses[position] || positionClasses['top-center']}`}>
          {items.map(item => (
            <div
              key={item.id}
              className={`pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg min-w-[300px] max-w-[600px] animate-[slideDown_0.3s_cubic-bezier(0.16,1,0.3,1)] ${variantStyles[item.variant] || variantStyles.info}`}
            >
              <i className={`fas ${item.icon || variantIcons[item.variant] || variantIcons.info} text-sm opacity-90`}></i>
              <span className="flex-1 text-sm font-medium">{item.text}</span>
              <button
                onClick={() => dismiss(item.id)}
                className="w-6 h-6 rounded-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors cursor-pointer flex-shrink-0"
              >
                <i className="fas fa-xmark text-xs"></i>
              </button>
            </div>
          ))}
          <style>{`
            @keyframes slideDown {
              from { opacity: 0; transform: translateY(-12px) scale(0.96); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>
        </div>
      )}
    </NotifyCtx.Provider>
  )
}

export function useNotify() {
  return useContext(NotifyCtx) || { notify: () => {}, dismiss: () => {}, clearAll: () => {}, items: [] }
}
