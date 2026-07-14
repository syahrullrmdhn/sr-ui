import React from 'react'

const variants = {
  primary:   'bg-[#f8f5f1] text-[#a86e2f] border border-[#e8d9c7]',
  secondary: 'bg-[#f8f5f1] text-[#2f69a8] border border-[#e8d9c7]',
  accent:    'bg-[#f8f5f1] text-[#2fa86e] border border-[#e8d9c7]',
  success:   'bg-[#f8f5f1] text-[#4a9c6e] border border-[#e8d9c7]',
  warning:   'bg-[#f8f5f1] text-[#d97e2f] border border-[#e8d9c7]',
  danger:    'bg-rose-50 text-rose-700 border border-rose-200/60',
  info:      'bg-[#f8f5f1] text-[#2f69a8] border border-[#e8d9c7]',
  purple:    'bg-purple-50 text-purple-700 border border-purple-200/60',
  gray:      'bg-[#f8f5f1] text-[#6b5e52] border border-[#e8d9c7]',
}

export default function Badge({ variant = 'primary', children, dot = false, className = '' }) {
  const badgeClass = variants[variant] || variants.primary

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide shadow-2xs ${badgeClass} ${className}`}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${
          variant === 'success' || variant === 'accent' ? 'bg-[#2fa86e]' : 
          variant === 'danger' ? 'bg-rose-500' : 
          variant === 'warning' ? 'bg-[#d97e2f]' : 
          variant === 'info' || variant === 'secondary' ? 'bg-[#2f69a8]' :
          variant === 'purple' ? 'bg-purple-500' : 'bg-[#a86e2f]'
        }`}></span>
      )}
      {children}
    </span>
  )
}
