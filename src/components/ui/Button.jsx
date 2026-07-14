import React from 'react'

const variants = {
  primary:   'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-sm hover:from-teal-600 hover:to-emerald-700 hover:shadow',
  success:   'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-sm hover:from-emerald-600 hover:to-emerald-700 hover:shadow',
  danger:    'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-sm hover:from-rose-600 hover:to-red-700 hover:shadow',
  warning:   'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm hover:from-amber-600 hover:to-orange-600 hover:shadow',
  info:      'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm hover:from-blue-600 hover:to-indigo-700 hover:shadow',
  outline:   'bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-2xs',
  ghost:     'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-800',
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
      className={`inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${rounded ? 'rounded-full' : 'rounded-xl'} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {loading && <i className="fas fa-spinner fa-spin"></i>}
      {icon && !loading && <i className={`fas ${icon}`}></i>}
      {children}
      {iconRight && <i className={`fas ${iconRight}`}></i>}
    </button>
  )
}
