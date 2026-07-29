import React from 'react'

const variants = {
  primary:   'bg-[#F4F6F9] text-[#855b2f] border border-[#d4c4ab]',
  secondary: 'bg-[#F4F6F9] text-[#2f69a8] border border-[#d4c4ab]',
  accent:    'bg-[#F4F6F9] text-[#4caf50] border border-[#d4c4ab]',
  success:   'bg-[#F4F6F9] text-[#4a9c6e] border border-[#d4c4ab]',
  warning:   'bg-[#F4F6F9] text-[#ff9800] border border-[#d4c4ab]',
  danger:    'bg-rose-50 text-rose-700 border border-rose-200/60',
  info:      'bg-[#F4F6F9] text-[#2f69a8] border border-[#d4c4ab]',
  purple:    'bg-purple-50 text-purple-700 border border-purple-200/60',
  gray:      'bg-[#F4F6F9] text-[#5A5A5A] border border-[#d4c4ab]',
}

export default function Badge({ variant = 'primary', children, dot = false, className = '' }) {
  const badgeClass = variants[variant] || variants.primary

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide shadow-2xs ${badgeClass} ${className}`}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${
          variant === 'success' || variant === 'accent' ? 'bg-[#4caf50]' : 
          variant === 'danger' ? 'bg-rose-500' : 
          variant === 'warning' ? 'bg-[#ff9800]' : 
          variant === 'info' || variant === 'secondary' ? 'bg-[#2f69a8]' :
          variant === 'purple' ? 'bg-purple-500' : 'bg-[#855b2f]'
        }`}></span>
      )}
      {children}
    </span>
  )
}
