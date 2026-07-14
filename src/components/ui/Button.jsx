import React from 'react'

const variants = {
  primary:   'bg-gradient-to-r from-[#895823] via-[#a86e2f] to-[#bf9571] text-white shadow-sm hover:from-[#6b441c] hover:to-[#a86e2f] hover:shadow ring-1 ring-[#a86e2f]/25',
  secondary: 'bg-gradient-to-r from-[#224c7a] to-[#2f69a8] text-white shadow-sm hover:from-[#1d3f66] hover:to-[#224c7a] hover:shadow ring-1 ring-[#2f69a8]/25',
  accent:    'bg-gradient-to-r from-[#237d52] to-[#2fa86e] text-white shadow-sm hover:from-[#1b613f] hover:to-[#237d52] hover:shadow ring-1 ring-[#2fa86e]/25',
  success:   'bg-gradient-to-r from-[#3a7d57] to-[#4a9c6e] text-white shadow-sm hover:from-[#2e6345] hover:to-[#3a7d57] hover:shadow ring-1 ring-[#4a9c6e]/25',
  warning:   'bg-gradient-to-r from-[#b36523] to-[#d97e2f] text-white shadow-sm hover:from-[#94521c] hover:to-[#b36523] hover:shadow ring-1 ring-[#d97e2f]/25',
  danger:    'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-sm hover:from-rose-600 hover:to-red-700 hover:shadow ring-1 ring-rose-400/20',
  info:      'bg-gradient-to-r from-[#224c7a] to-[#2f69a8] text-white shadow-sm hover:from-[#1d3f66] hover:to-[#224c7a] hover:shadow ring-1 ring-[#2f69a8]/25',
  outline:   'bg-white border border-[#e8d9c7] text-[#2c2c2c] hover:bg-[#f8f5f1] hover:border-[#a86e2f] hover:text-[#a86e2f] shadow-2xs',
  ghost:     'bg-transparent text-[#6b5e52] hover:bg-[#f8f5f1] hover:text-[#a86e2f]',
}

const sizes = {
  xs: 'px-2.5 py-1 text-xs gap-1',
  sm: 'px-3.5 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-6 py-2.5 text-sm md:text-base gap-2.5 font-semibold',
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
