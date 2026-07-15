import React, { useState, useEffect, useCallback } from 'react'

/**
 * CheckBox - Enhanced checkbox & radio (ported from Imat.CheckBox)
 *
 * NEW:
 * - DataSource: render multiple checkboxes from data array
 * - static mode (read-only check/times icons)
 * - inline mode
 * - setValue (comma-separated)
 * - allowBlank validation
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
  type = 'checkbox', // 'checkbox' | 'radio' | 'switch' | 'static'
  variant = 'primary',
  disabled = false,
  required = false,
  allowBlank = true,
  className = '',
  // NEW: DataSource props
  dataSource,
  inline = false,
  direction = 'vertical', // 'vertical' | 'horizontal'
  defaultValue: initialDataSourceValue,
  ...props
}) {
  const [options, setOptions] = useState([])
  const [selectedValues, setSelectedValues] = useState(new Set())
  const inputId = name ? name + '-' + (value || 'field') : undefined

  // Fetch options from DataSource
  useEffect(() => {
    if (!dataSource) return

    const fetchOptions = async () => {
      try {
        let items = []
        if (dataSource.type === 'ajax' && dataSource.url) {
          const formData = new URLSearchParams()
          if (dataSource.params) {
            Object.entries(dataSource.params).forEach(([k, v]) => formData.append(k, v))
          }
          const res = await fetch(dataSource.url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData,
          })
          const data = await res.json()
          if (!data.success && data.redirect) { window.location = data.redirect; return }
          items = data.rows || data.data || data
        } else if (dataSource.type === 'array' && dataSource.data) {
          items = dataSource.data
        }

        if (Array.isArray(items)) {
          setOptions(items)
          // Auto-check from initialDataSourceValue
          if (initialDataSourceValue) {
            const vals = String(initialDataSourceValue).split(',').map(v => v.trim())
            setSelectedValues(new Set(vals))
          }
        }
      } catch (err) {
        console.error('CheckBox DataSource error:', err)
      }
    }

    fetchOptions()
  }, [dataSource?.url, JSON.stringify(dataSource?.params)])

  // setValue — comma-separated string
  const setValueFromCSV = useCallback((csv) => {
    const vals = String(csv).split(',').map(v => v.trim()).filter(Boolean)
    setSelectedValues(new Set(vals))
  }, [])

  // Static mode (read-only check/times icons)
  if (type === 'static') {
    const isChecked = checked !== undefined ? checked : defaultChecked
    return (
      <span className={'inline-flex items-center gap-1.5 ' + className}>
        {isChecked ? (
          <i className="fas fa-check-circle text-[#4a9c6e]"></i>
        ) : (
          <i className="fas fa-times-circle text-rose-400"></i>
        )}
        {label && <span className="text-sm text-[#2c2c2c]">{label}</span>}
      </span>
    )
  }

  // DataSource mode — render multiple checkboxes
  if (options.length > 0) {
    const handleOptionChange = (optValue, isChecked) => {
      const next = new Set(selectedValues)
      if (isChecked) next.add(String(optValue))
      else next.delete(String(optValue))
      setSelectedValues(next)
      if (onChange) {
        const csv = Array.from(next).join(',')
        onChange({ target: { name, value: csv, checked: isChecked } })
      }
    }

    const containerClass = direction === 'horizontal'
      ? 'flex flex-wrap gap-4'
      : 'space-y-2'

    return (
      <div className={'space-y-1.5 w-full ' + className}>
        {label && (
          <label className="block text-xs font-semibold text-[#2c2c2c] tracking-wide uppercase">
            {label}
            {required && <span className="text-rose-500 ml-0.5">*</span>}
          </label>
        )}
        <div className={containerClass}>
          {options.map((opt, i) => {
            const optKey = opt.key ?? opt.value ?? opt.id
            const optLabel = opt.value ?? opt.label ?? opt.name ?? opt.text ?? optKey
            const isChecked = selectedValues.has(String(optKey))

            return (
              <label
                key={i}
                className={'flex items-center gap-2.5 cursor-pointer select-none ' + (disabled ? 'opacity-50 cursor-not-allowed' : '')}
              >
                <input
                  type={type === 'radio' ? 'radio' : 'checkbox'}
                  name={name}
                  value={optKey}
                  checked={isChecked}
                  disabled={disabled}
                  onChange={(e) => handleOptionChange(optKey, e.target.checked)}
                  className={'w-4 h-4 rounded border-slate-300 ' + (variantColors[variant] || variantColors.primary) + ' focus:ring-[#a86e2f]/20 focus:ring-2 transition-colors'}
                />
                <span className="text-sm text-[#2c2c2c]">{optLabel}</span>
              </label>
            )
          })}
        </div>
      </div>
    )
  }

  // Switch toggle
  if (type === 'switch') {
    return (
      <label
        className={'flex items-center gap-3 cursor-pointer select-none group ' + (disabled ? 'opacity-50 cursor-not-allowed' : '') + ' ' + className}
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

  // Standard checkbox/radio
  return (
    <label
      className={'flex items-start gap-3 cursor-pointer select-none group ' + (disabled ? 'opacity-50 cursor-not-allowed' : '') + ' ' + className}
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
        className={'mt-0.5 w-4 h-4 rounded border-slate-300 ' + (variantColors[variant] || variantColors.primary) + ' focus:ring-[#a86e2f]/20 focus:ring-2 transition-colors'}
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
