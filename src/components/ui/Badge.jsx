import React from 'react'

const variants = {
  primary:  'bg-teal-50 text-teal-700 border border-teal-200/60',
  success:  'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
  warning:  'bg-amber-50 text-amber-700 border border-amber-200/60',
  danger:   'bg-rose-50 text-rose-700 border border-rose-200/60',
  info:     'bg-blue-50 text-blue-700 border border-blue-200/60',
  purple:   'bg-purple-50 text-purple-700 border border-purple-200/60',
  gray:     'bg-slate-100 text-slate-700 border border-slate-200/60',
}

export default function Badge({ variant = 'primary', children, dot = false, className = '' }) {
  const badgeClass = variants[variant] || variants.primary

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide shadow-2xs ${badgeClass} ${className}`}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${
          variant === 'success' ? 'bg-emerald-500' : 
          variant === 'danger' ? 'bg-rose-500' : 
          variant === 'warning' ? 'bg-amber-500' : 
          variant === 'info' ? 'bg-blue-500' :
          variant === 'purple' ? 'bg-purple-500' : 'bg-teal-500'
        }`}></span>
      )}
      {children}
    </span>
  )
}
