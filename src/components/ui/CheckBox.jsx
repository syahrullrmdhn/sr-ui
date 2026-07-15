import React from 'react'

/**
 * CheckBox - Checkbox & Radio component (ported from Imat.CheckBox)
 *
 * Features:
 * - Checkbox or Radio mode (type prop)
 * - Inline/switch toggle style
 * - Label with description
 * - Disabled state
 *
 * Usage:
 *   <CheckBox name="agree" label="Setuju" type="checkbox" />
 *   <CheckBox name="gender" label="Laki-laki" type="radio" value="L" />
 *   <CheckBox name="active" label="Aktif" type="switch" />
 */

const variantColors = {
  primary: 'accent-[#a86e2f]',
  success: 'accent-[#4a9c6e]',
  danger: 'accent-rose-600',
  info: 'accent-[#2f69a8]',
}

export default function CheckBox({
  name,
  label,
  description,
  value = '',
  checked,
  defaultChecked,
  onChange,
  type = 'checkbox', // 'checkbox' | 'radio' | 'switch'
  variant = 'primary',
  disabled = false,
  required = false,
  className = '',
  ...props
}) {
  const inputId = name ? `${name}-${value || 'field'}` : undefined

  if (type === 'switch') {
    return (
      <label
        className={`flex items-center gap-3 cursor-pointer select-none group ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        htmlFor={inputId}
      >
        <div className="relative">
          <input
            id={inputId}
            name={name}
            type="checkbox"
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className="sr-only peer"
            {...props}
          />
          <div className="w-10 h-5 bg-slate-200 rounded-full peer-checked:bg-[#a86e2f] transition-colors duration-200" />
          <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-xs peer-checked:translate-x-5 transition-transform duration-200" />
        </div>
        {label && (
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[#2c2c2c]">{label}</span>
            {description && <span className="text-xs text-[#6b5e52] mt-0.5">{description}</span>}
          </div>
        )}
      </label>
    )
  }

  return (
    <label
      className={`flex items-start gap-3 cursor-pointer select-none group ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      htmlFor={inputId}
    >
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`mt-0.5 w-4 h-4 rounded border-slate-300 ${variantColors[variant] || variantColors.primary} focus:ring-[#a86e2f]/20 focus:ring-2 transition-colors`}
        {...props}
      />
      {label && (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-[#2c2c2c]">{label}</span>
          {description && <span className="text-xs text-[#6b5e52] mt-0.5">{description}</span>}
        </div>
      )}
    </label>
  )
}
