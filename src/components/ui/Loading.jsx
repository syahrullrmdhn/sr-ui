import { useState, useCallback, createContext, useContext, useEffect, useRef } from 'react'

/**
 * Loading - Full-screen loading overlay (ported from Imat.Loading)
 *
 * NEW: fetch interceptor for automatic show/hide on API calls
 * NEW: window.onerror auto-hide
 *
 * Usage:
 *   <LoadingProvider autoIntercept>
 *     <App />
 *   </LoadingProvider>
 */

const LoadingCtx = createContext()

export function LoadingProvider({ children, autoIntercept = false }) {
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')
  const activeCount = useRef(0)
  const timerRef = useRef(null)

  const showLoading = useCallback((message = '') => {
    setText(message)
    setLoading(true)
  }, [])

  const hideLoading = useCallback(() => {
    setLoading(false)
    setText('')
  }, [])

  // Auto-intercept fetch calls
  useEffect(() => {
    if (!autoIntercept) return

    const originalFetch = window.fetch
    let debounceTimer = null

    window.fetch = async (...args) => {
      activeCount.current++

      // Debounce: show loading only if fetch takes >300ms
      debounceTimer = setTimeout(() => {
        if (activeCount.current > 0) {
          setText('')
          setLoading(true)
        }
      }, 300)

      try {
        const result = await originalFetch.apply(window, args)
        return result
      } finally {
        activeCount.current--
        clearTimeout(debounceTimer)
        if (activeCount.current <= 0) {
          activeCount.current = 0
          setLoading(false)
          setText('')
        }
      }
    }

    // Auto-hide on uncaught errors
    const errorHandler = (e) => {
      console.error('[LoadingProvider] Uncaught error:', e.message)
      activeCount.current = 0
      setLoading(false)
      setText('')
    }
    window.addEventListener('error', errorHandler)

    return () => {
      window.fetch = originalFetch
      window.removeEventListener('error', errorHandler)
    }
  }, [autoIntercept])

  return (
    <LoadingCtx.Provider value={{ loading, showLoading, hideLoading }}>
      {children}
      {loading && (
        <div className="fixed inset-0 z-[999998] flex items-center justify-center font-sans">
          <div className="fixed inset-0 bg-[#2c2c2c]/40 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]" />
          <div className="relative flex flex-col items-center gap-4 p-8 bg-white rounded-2xl shadow-2xl border border-[#e8d9c7] animate-[scaleIn_0.2s_cubic-bezier(0.16,1,0.3,1)]">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-4 border-[#e8d9c7]" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#a86e2f] animate-spin" />
            </div>
            {text && <span className="text-sm font-medium text-[#6b5e52]">{text}</span>}
          </div>
          <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
          `}</style>
        </div>
      )}
    </LoadingCtx.Provider>
  )
}

export function useLoading() {
  return useContext(LoadingCtx) || { loading: false, showLoading: () => {}, hideLoading: () => {} }
}

/**
 * Inline spinner variant - for use inside buttons/cards
 */
export function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-[3px]',
    lg: 'w-10 h-10 border-4',
  }

  return (
    <div className={(sizes[size] || sizes.md) + ' rounded-full border-[#e8d9c7] border-t-[#a86e2f] animate-spin ' + className} />
  )
}
