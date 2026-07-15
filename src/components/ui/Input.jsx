import React, { useState, useCallback, useRef, useEffect } from 'react'

/**
 * Input - Enhanced input component (ported from Imat.TextBox)
 *
 * NEW features:
 * - textarea mode (type='textarea')
 * - static mode (type='static') — read-only display
 * - number mode with min/max clamping
 * - autoGrow for textarea
 * - allowBlank validation (isValid)
 * - readOnly prop
 * - minlength / maxlength validation
 * - onSubmit (Enter key handler)
 * - leftAddon / rightAddon
 * - align (text-align)
 */

export default function Input({
  label,
  error: externalError,
  icon,
  rightAction,
  className = '',
  id,
  name,
  type = 'text',
  // NEW props
  readOnly = false,
  required = false,
  allowBlank = true,
  minLength,
  maxLength,
  min,
  max,
  onSubmit,
  autoGrow = false,
  align,
  rows = 3,
  leftAddon,
  rightAddon,
  value,
  defaultValue,
  placeholder,
  disabled,
  onChange,
  ...props
}) {
  const [error, setError] = useState(externalError || '')
  const [localValue, setLocalValue] = useState(value ?? defaultValue ?? '')
  const textareaRef = useRef(null)
  const inputId = id || name || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  // Sync controlled value
  useEffect(() => {
    if (value !== undefined) setLocalValue(value)
  }, [value])

  // Auto-grow textarea
  useEffect(() => {
    if (autoGrow && type === 'textarea' && textareaRef.current) {
      const el = textareaRef.current
      el.style.height = 'auto'
      el.style.height = el.scrollHeight + 'px'
    }
  }, [localValue, autoGrow, type])

  // Validation
  const validate = useCallback(() => {
    const val = String(localValue || '')
    if (required && !allowBlank && !val.trim()) {
      setError('Field ini wajib diisi')
      return false
    }
    if (minLength && val.length > 0 && val.length < minLength) {
      setError('Minimal ' + minLength + ' karakter')
      return false
    }
    if (maxLength && val.length > maxLength) {
      setError('Maksimal ' + maxLength + ' karakter')
      return false
    }
    setError('')
    return true
  }, [localValue, required, allowBlank, minLength, maxLength])

  const handleChange = useCallback((e) => {
    let val = e.target.value
    // Number clamping
    if (type === 'number') {
      if (val !== '' && !isNaN(val)) {
        const num = parseFloat(val)
        if (min !== undefined && num < min) val = String(min)
        if (max !== undefined && num > max) val = String(max)
      }
    }
    setLocalValue(val)
    setError('')
    if (onChange) onChange({ ...e, target: { ...e.target, value: val, name } })
  }, [type, min, max, onChange, name])

  const handleKeyDown = useCallback((e) => {
    // Number: block non-numeric keys
    if (type === 'number') {
      const allowed = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End']
      if (allowed.includes(e.key)) return
      if (e.key === '.' && !String(localValue).includes('.')) return
      if (e.key === '-' && !String(localValue).includes('-')) return
      if (!/[0-9]/.test(e.key)) { e.preventDefault(); return }
    }
    // Enter key handler
    if (e.key === 'Enter' && type !== 'textarea' && onSubmit) {
      e.preventDefault()
      onSubmit()
    }
  }, [type, localValue, onSubmit])

  const handlePaste = useCallback((e) => {
    if (type === 'number') {
      const pasted = e.clipboardData.getData('text')
      if (isNaN(pasted)) e.preventDefault()
    }
  }, [type])

  // Static mode (read-only display like Imat.TextBox type='static')
  if (type === 'static') {
    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">{label}</label>
        )}
        <p className="px-3.5 py-2.5 text-sm text-[#2c2c2c] bg-[#f8f5f1]/60 border border-[#e8d9c7]/40 rounded-xl min-h-[38px]" style={{ textAlign: align }}>
          {localValue || <span className="text-slate-400">-</span>}
        </p>
      </div>
    )
  }

  // Textarea mode
  if (type === 'textarea') {
    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">
            {label}
            {required && <span className="text-rose-500 ml-0.5">*</span>}
          </label>
        )}
        <textarea
          ref={textareaRef}
          id={inputId}
          name={name}
          value={localValue}
          onChange={handleChange}
          onBlur={validate}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          rows={rows}
          maxLength={maxLength}
          className={'w-full px-3.5 py-2.5 text-sm bg-slate-50/60 border border-slate-200/80 rounded-xl text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#a86e2f] focus:ring-2 focus:ring-[#a86e2f]/20 outline-none transition-all duration-200 resize-y ' +
            (error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20 ' : '') +
            (readOnly ? 'bg-slate-100 cursor-default ' : '') + className}
          style={{ textAlign: align, overflow: autoGrow ? 'hidden' : undefined }}
          {...props}
        />
        <div className="flex justify-between">
          {error && <p className="text-[11px] font-medium text-rose-500">{error}</p>}
          {maxLength && (
            <p className="text-[11px] text-slate-400 ml-auto">{String(localValue).length}/{maxLength}</p>
          )}
        </div>
      </div>
    )
  }

  // Standard input (text, number, date, etc.)
  const inputElement = (
    <input
      id={inputId}
      name={name}
      type={type === 'number' ? 'text' : type} // text to allow our custom filtering
      inputMode={type === 'number' ? 'numeric' : undefined}
      value={localValue}
      onChange={handleChange}
      onBlur={validate}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      minLength={minLength}
      maxLength={maxLength}
      required={required}
      className={'w-full ' + (icon || leftAddon ? 'pl-10' : 'pl-3.5') + ' ' + (rightAction || rightAddon ? 'pr-10' : 'pr-3.5') + ' py-2.5 text-sm bg-slate-50/60 border border-slate-200/80 rounded-xl text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#a86e2f] focus:ring-2 focus:ring-[#a86e2f]/20 outline-none transition-all duration-200 ' +
        (error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20 ' : '') +
        (readOnly ? 'bg-slate-100 cursor-default ' : '') + className}
      style={{ textAlign: align }}
      {...props}
    />
  )

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">
          {label}
          {required && <span className="text-rose-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative rounded-xl shadow-2xs">
        {(icon || leftAddon) && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-sm">
            {icon && <i className={'fas ' + icon}></i>}
            {leftAddon && <span className="text-xs text-slate-500">{leftAddon}</span>}
          </div>
        )}
        {inputElement}
        {(rightAction || rightAddon) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightAddon && <span className="text-xs text-slate-500 mr-1">{rightAddon}</span>}
            {rightAction}
          </div>
        )}
      </div>
      {error && <p className="text-[11px] font-medium text-rose-500 mt-1">{error}</p>}
    </div>
  )
}
