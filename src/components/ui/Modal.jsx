import { useEffect } from 'react'

export default function Modal({ open, onClose, title, children, size = 'md', footer, icon }) {
  const sizes = { 
    sm: 'max-w-sm', 
    md: 'max-w-lg', 
    lg: 'max-w-2xl', 
    xl: 'max-w-4xl' 
  }

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className={`relative bg-white rounded-2xl shadow-2xl border border-slate-200/80 w-full ${sizes[size] || sizes.md} animate-[modalIn_0.25s_cubic-bezier(0.16,1,0.3,1)] max-h-[90vh] flex flex-col z-10 overflow-hidden my-auto`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-sm border border-teal-100 shadow-2xs">
                <i className={`fas ${icon}`}></i>
              </div>
            )}
            <h3 className="font-bold text-base md:text-lg text-slate-800 tracking-tight">{title}</h3>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
            title="Tutup Modal"
          >
            <i className="fas fa-xmark text-base"></i>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 overflow-y-auto flex-1 text-sm text-slate-700">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 bg-slate-50/90 border-t border-slate-100/80 flex items-center justify-end gap-2.5">
            {footer}
          </div>
        )}
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}
