import React from 'react'

export default function Input({
  label,
  error,
  icon,
  rightAction,
  className = '',
  id,
  type = 'text',
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">
          {label}
        </label>
      )}
      <div className="relative rounded-xl shadow-2xs">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-sm">
            <i className={`fas ${icon}`}></i>
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={`w-full ${icon ? 'pl-10' : 'pl-3.5'} ${rightAction ? 'pr-10' : 'pr-3.5'} py-2.5 text-sm bg-slate-50/60 border border-slate-200/80 rounded-xl text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all duration-200 ${
            error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20' : ''
          } ${className}`}
          {...props}
        />
        {rightAction && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightAction}
          </div>
        )}
      </div>
      {error && <p className="text-[11px] font-medium text-rose-500 mt-1">{error}</p>}
    </div>
  )
}
