import { useState, useCallback, createContext, useContext } from 'react'

const ToastCtx = createContext()

const positions = {
  'top-right': 'top-5 right-5',
  'top-left': 'top-5 left-5',
  'bottom-right': 'bottom-5 right-5',
  'bottom-left': 'bottom-5 left-5',
  'top-center': 'top-5 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-5 left-1/2 -translate-x-1/2',
}

const variantStyles = {
  info:    'border-l-4 border-sky-500 bg-white ring-1 ring-slate-200/80',
  success: 'border-l-4 border-emerald-500 bg-white ring-1 ring-slate-200/80',
  warning: 'border-l-4 border-amber-500 bg-white ring-1 ring-slate-200/80',
  danger:  'border-l-4 border-rose-500 bg-white ring-1 ring-slate-200/80',
}

const variantIcons = {
  info: 'fa-circle-info text-sky-500 text-lg',
  success: 'fa-circle-check text-emerald-500 text-lg',
  warning: 'fa-triangle-exclamation text-amber-500 text-lg',
  danger: 'fa-circle-xmark text-rose-500 text-lg',
}

export function ToastProvider({ children, position = 'top-right' }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback(({ title, message, variant = 'info', duration = 4000 }) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, title, message, variant }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
  }, [])

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id))

  return (
    <ToastCtx.Provider value={{ addToast }}>
      {children}
      <div className={`fixed z-[99999] flex flex-col gap-3 pointer-events-none ${positions[position] || positions['top-right']}`}>
        {toasts.map(t => (
          <div 
            key={t.id} 
            className={`pointer-events-auto flex items-start gap-3.5 rounded-xl shadow-xl p-4 min-w-[320px] max-w-[420px] animate-[slideIn_0.3s_cubic-bezier(0.16,1,0.3,1)] ${variantStyles[t.variant] || variantStyles.info}`}
          >
            <i className={`fas ${variantIcons[t.variant] || variantIcons.info} mt-0.5 flex-shrink-0`}></i>
            <div className="flex-1 min-w-0">
              {t.title && <div className="font-bold text-sm text-slate-800 tracking-tight">{t.title}</div>}
              <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">{t.message}</div>
            </div>
            <button 
              onClick={() => removeToast(t.id)} 
              className="w-6 h-6 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer flex-shrink-0"
            >
              <i className="fas fa-xmark text-sm"></i>
            </button>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(30px) scale(0.95); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
      `}</style>
    </ToastCtx.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastCtx)
  if (!context) {
    return {
      addToast: ({ title, message }) => console.log(`[Toast]: ${title} - ${message}`)
    }
  }
  return context
}
