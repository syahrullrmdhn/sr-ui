import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({ open, onClose, title, children, size = 'md', footer, icon }) {
  const sizes = { 
    sm: 'max-w-sm', 
    md: 'max-w-lg', 
    lg: 'max-w-2xl', 
    xl: 'max-w-4xl' 
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { 
      document.body.style.overflow = '' 
    }
  }, [open])

  if (!open) return null

  const modalContent = (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 overflow-y-auto font-sans">
      {/* Backdrop overlay full screen dengan blur di SELURUH layar (Sidebar, Header, Konten) */}
      <div 
        className="fixed inset-0 bg-slate-900/65 backdrop-blur-md transition-opacity animate-[fadeIn_0.2s_ease-out]" 
        onClick={onClose}
      ></div>
      
      <div className={`relative bg-white rounded-2xl shadow-2xl border border-[#e8d9c7] w-full ${sizes[size] || sizes.md} animate-[modalIn_0.25s_cubic-bezier(0.16,1,0.3,1)] max-h-[90vh] flex flex-col z-10 overflow-hidden my-auto font-sans`}>
        {/* Header Modal - Clean Solid Neutral #f8f5f1 */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#f8f5f1] border-b border-[#e8d9c7]">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="w-10 h-10 rounded-xl bg-white text-[#a86e2f] flex items-center justify-center text-sm border border-[#e8d9c7] shadow-xs">
                <i className={`fas ${icon}`}></i>
              </div>
            )}
            <h3 className="font-bold text-base md:text-lg text-[#2c2c2c] tracking-tight m-0">{title}</h3>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-white hover:bg-rose-50 text-[#6b5e52] hover:text-rose-600 border border-[#e8d9c7] transition-colors cursor-pointer"
            title="Tutup Modal"
          >
            <i className="fas fa-xmark text-base"></i>
          </button>
        </div>

        {/* Body Modal */}
        <div className="p-6 overflow-y-auto flex-1 text-[#2c2c2c]">
          {children}
        </div>

        {/* Footer Modal */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-[#f8f5f1]/80 border-t border-[#e8d9c7]">
            {footer}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )

  return createPortal(modalContent, document.body)
}
