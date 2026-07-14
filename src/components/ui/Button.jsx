import React from 'react'

const variants = {
  primary:   'bg-[#a86e2f] text-white shadow-sm hover:bg-[#895823] hover:shadow ring-1 ring-[#a86e2f]/20',
  secondary: 'bg-[#2f69a8] text-white shadow-sm hover:bg-[#224c7a] hover:shadow ring-1 ring-[#2f69a8]/20',
  accent:    'bg-[#2fa86e] text-white shadow-sm hover:bg-[#237d52] hover:shadow ring-1 ring-[#2fa86e]/20',
  success:   'bg-[#4a9c6e] text-white shadow-sm hover:bg-[#3a7d57] hover:shadow ring-1 ring-[#4a9c6e]/20',
  warning:   'bg-[#d97e2f] text-white shadow-sm hover:bg-[#b36523] hover:shadow ring-1 ring-[#d97e2f]/20',
  danger:    'bg-rose-600 text-white shadow-sm hover:bg-rose-700 hover:shadow ring-1 ring-rose-400/20',
  info:      'bg-[#2f69a8] text-white shadow-sm hover:bg-[#224c7a] hover:shadow ring-1 ring-[#2f69a8]/20',
  outline:   'bg-white border border-[#e8d9c7] text-[#2c2c2c] hover:bg-[#f8f5f1] hover:border-[#a86e2f] hover:text-[#a86e2f] shadow-2xs',
  ghost:     'bg-transparent text-[#6b5e52] hover:bg-[#f8f5f1] hover:text-[#a86e2f]',
}

const sizes = {
  xs: 'px-2.5 py-1 text-xs gap-1',
  sm: 'px-3.5 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-6 py-2.5 text-sm md:text-base gap-2.5 font-bold',
}

export default function Button({ variant = 'primary', size = 'md', icon, iconRight, loading, disabled, rounded = false, className = '', children, ...props }) {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-bold transition-all duration-200 cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${rounded ? 'rounded-full' : 'rounded-xl'} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {loading && <i className="fas fa-spinner fa-spin"></i>}
      {icon && !loading && <i className={`fas ${icon}`}></i>}
      {children}
      {iconRight && <i className={`fas ${iconRight}`}></i>}
    </button>
  )
}
