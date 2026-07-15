import { useState, useCallback, createContext, useContext } from 'react'
import { createPortal } from 'react-dom'
import Button from './Button'

/**
 * MessageBox - Confirm/Alert dialog (ported from Imat.MessageBox)
 *
 * Usage:
 *   // Via hook (recommended):
 *   const { confirm, alert } = useMessageBox()
 *
 *   const confirmed = await confirm({
 *     title: 'Hapus Data?',
 *     message: 'Data yang dihapus tidak dapat dikembalikan.',
 *     variant: 'danger',
 *     confirmText: 'Ya, Hapus',
 *   })
 *
 *   await alert({
 *     title: 'Berhasil',
 *     message: 'Data telah disimpan.',
 *     variant: 'success',
 *   })
 */

const MsgCtx = createContext()

const variantConfig = {
  success: { icon: 'fa-circle-check', color: 'text-[#4a9c6e]', bg: 'bg-[#4a9c6e]/10', border: 'border-[#4a9c6e]/20', btnVariant: 'success' },
  danger:  { icon: 'fa-circle-xmark', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', btnVariant: 'danger' },
  warning: { icon: 'fa-triangle-exclamation', color: 'text-[#d97e2f]', bg: 'bg-[#d97e2f]/10', border: 'border-[#d97e2f]/20', btnVariant: 'warning' },
  info:    { icon: 'fa-circle-info', color: 'text-[#2f69a8]', bg: 'bg-[#2f69a8]/10', border: 'border-[#2f69a8]/20', btnVariant: 'info' },
  question:{ icon: 'fa-circle-question', color: 'text-[#a86e2f]', bg: 'bg-[#a86e2f]/10', border: 'border-[#a86e2f]/20', btnVariant: 'primary' },
}

export function MessageBoxProvider({ children }) {
  const [state, setState] = useState(null)
  const [resolveRef, setResolveRef] = useState(null)

  const show = useCallback((config) => {
    return new Promise((resolve) => {
      setState(config)
      setResolveRef(() => resolve)
    })
  }, [])

  const confirm = useCallback(({ title = 'Konfirmasi', message = '', variant = 'question', confirmText = 'Ya', cancelText = 'Batal', icon }) => {
    return show({ type: 'confirm', title, message, variant, confirmText, cancelText, icon })
  }, [show])

  const alert = useCallback(({ title = 'Informasi', message = '', variant = 'info', okText = 'OK', icon }) => {
    return show({ type: 'alert', title, message, variant, okText, icon })
  }, [show])

  const handleClose = useCallback((result) => {
    setState(null)
    if (resolveRef) resolveRef(result)
    setResolveRef(null)
  }, [resolveRef])

  const config = state ? (variantConfig[state.variant] || variantConfig.info) : null
  const displayIcon = state?.icon || config?.icon

  return (
    <MsgCtx.Provider value={{ confirm, alert }}>
      {children}
      {state && createPortal(
        <div className="fixed inset-0 z-[999997] flex items-center justify-center p-4 font-sans">
          <div className="fixed inset-0 bg-[#2c2c2c]/50 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]" onClick={() => state.type === 'confirm' && handleClose(false)} />

          <div className="relative bg-white rounded-2xl shadow-2xl border border-[#e8d9c7] w-full max-w-sm animate-[modalIn_0.25s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
            {/* Content */}
            <div className="p-6 flex flex-col items-center text-center gap-4">
              {displayIcon && (
                <div className={`w-16 h-16 rounded-full ${config.bg} ${config.border} border flex items-center justify-center`}>
                  <i className={`fas ${displayIcon} text-2xl ${config.color}`}></i>
                </div>
              )}
              <div>
                <h3 className="font-bold text-lg text-[#2c2c2c] tracking-tight mb-2">{state.title}</h3>
                <p className="text-sm text-[#6b5e52] leading-relaxed">{state.message}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-3 px-6 pb-6">
              {state.type === 'confirm' && (
                <Button variant="ghost" onClick={() => handleClose(false)}>
                  {state.cancelText}
                </Button>
              )}
              <Button
                variant={config.btnVariant}
                onClick={() => handleClose(state.type === 'confirm' ? true : true)}
              >
                {state.type === 'confirm' ? state.confirmText : state.okText}
              </Button>
            </div>
          </div>

          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes modalIn {
              from { opacity: 0; transform: scale(0.95) translateY(12px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
            }
          `}</style>
        </div>,
        document.body
      )}
    </MsgCtx.Provider>
  )
}

export function useMessageBox() {
  return useContext(MsgCtx) || {
    confirm: (opts) => { console.log('[MessageBox confirm]', opts); return Promise.resolve(window.confirm(opts.message)) },
    alert: (opts) => { console.log('[MessageBox alert]', opts); return Promise.resolve(alert(opts.message)) },
  }
}
