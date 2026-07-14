import { useState, useEffect, createContext, useContext, useCallback } from 'react'

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
  info:    'border-l-4 border-sky-500',
  success: 'border-l-4 border-green-500',
  warning: 'border-l-4 border-yellow-500',
  danger:  'border-l-4 border-red-500',
}
const variantIcons = {
  info: 'fa-circle-info text-sky-500',
  success: 'fa-circle-check text-green-500',
  warning: 'fa-triangle-exclamation text-yellow-500',
  danger: 'fa-circle-xmark text-red-500',
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
      <div className={`fixed z-[99999] flex flex-col gap-2 \${positions[position]}`}>
        {toasts.map(t => (
          <div key={t.id} className={`flex items-start gap-3 bg-white rounded-lg shadow-lg p-4 min-w-[300px] max-w-[400px] animate-[slideIn_0.3s_ease-out] \${variantStyles[t.variant]}`}>
            <i className={`fas \${variantIcons[t.variant]} mt-0.5`}></i>
            <div className="flex-1">
              {t.title && <div className="font-semibold text-sm text-gray-800">{t.title}</div>}
              <div className="text-xs text-gray-600">{t.message}</div>
            </div>
            <button onClick={() => removeToast(t.id)} className="text-gray-400 hover:text-gray-600">
              <i className="fas fa-xmark text-xs"></i>
            </button>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </ToastCtx.Provider>
  )
}

export function useToast() {
  return useContext(ToastCtx)
}
