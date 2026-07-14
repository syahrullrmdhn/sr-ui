import { useState } from 'react'

const variants = {
  info:    'bg-blue-50 text-blue-800 border-blue-300',
  success: 'bg-green-50 text-green-800 border-green-300',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-300',
  danger:  'bg-red-50 text-red-800 border-red-300',
}
const icons = { info: 'fa-circle-info', success: 'fa-circle-check', warning: 'fa-triangle-exclamation', danger: 'fa-circle-xmark' }

export default function Alert({ variant = 'info', title, children, dismissible = false, icon = true, className = '' }) {
  const [show, setShow] = useState(true)
  if (!show) return null
  return (
    <div className={`flex items-start gap-3 p-4 mb-4 border rounded-lg \${variants[variant]} \${className}`} role="alert">
      {icon && <i className={`fas \${icons[variant]} mt-0.5`}></i>}
      <div className="flex-1">
        {title && <div className="font-semibold mb-1">{title}</div>}
        <div className="text-sm">{children}</div>
      </div>
      {dismissible && (
        <button onClick={() => setShow(false)} className="ml-auto -mt-1 -mr-1 p-1 rounded hover:bg-black/5 transition">
          <i className="fas fa-xmark text-sm"></i>
        </button>
      )}
    </div>
  )
}
