import React from 'react'

export default function Select({
  label,
  error,
  icon,
  options = [],
  value,
  onChange,
  className = '',
  id,
  ...props
}) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className="space-y-1.5 w-full font-sans">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-semibold text-[#2c2c2c] tracking-wide uppercase">
          {label}
        </label>
      )}
      <div className="relative rounded-xl shadow-2xs">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6b5e52] text-sm">
            <i className={`fas ${icon}`}></i>
          </div>
        )}
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          className={`w-full ${icon ? 'pl-10' : 'pl-3.5'} pr-10 py-2.5 text-sm bg-[#f8f5f1] border border-[#e8d9c7] rounded-xl text-[#2c2c2c] focus:bg-white focus:border-[#a86e2f] focus:ring-2 focus:ring-[#a86e2f]/20 outline-none transition-all duration-200 cursor-pointer ${
            error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20' : ''
          } ${className}`}
          {...props}
        >
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#6b5e52] text-xs">
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
      {error && <p className="text-[11px] font-medium text-rose-500 mt-1">{error}</p>}
    </div>
  )
}
