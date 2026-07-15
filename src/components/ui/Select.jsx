import React, { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Select - Enhanced select component (ported from Imat.ComboBox)
 *
 * NEW features:
 * - DataSource: fetch options from URL (ajax autoLoad)
 * - emptyText placeholder option
 * - searchable mode (like select2)
 * - allowBlank validation
 * - single-item auto-select
 * - onLoad / onComplete events
 */

export default function Select({
  label,
  error: externalError,
  icon,
  options: staticOptions = [],
  value,
  defaultValue,
  onChange,
  className = '',
  id,
  name,
  disabled = false,
  required = false,
  // NEW: DataSource props
  dataSource,
  emptyText = '',
  searchable = false,
  allowBlank = true,
  placeholder = 'Pilih...',
  onLoad,
  onComplete,
  format,
  ...props
}) {
  const [options, setOptions] = useState(staticOptions)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(externalError || '')
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef(null)
  const containerRef = useRef(null)

  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  // Fetch options from DataSource
  useEffect(() => {
    if (!dataSource) return

    const fetchOptions = async () => {
      setLoading(true)
      try {
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

          if (!data.success && data.redirect) {
            window.location = data.redirect
            return
          }

          const items = data.rows || data.data || data
          if (Array.isArray(items)) {
            setOptions(items.map(item => ({
              key: item.key ?? item.id ?? item.value,
              value: item.value ?? item.label ?? item.name ?? item.text,
            })))
          }
          if (onLoad) onLoad(items)
        } else if (dataSource.type === 'array' && dataSource.data) {
          setOptions(dataSource.data)
          if (onLoad) onLoad(dataSource.data)
        }
      } catch (err) {
        console.error('Select DataSource error:', err)
        setError('Gagal memuat data')
      } finally {
        setLoading(false)
        if (onComplete) onComplete()
      }
    }

    fetchOptions()
  }, [dataSource?.url, JSON.stringify(dataSource?.params)])

  // Sync static options
  useEffect(() => {
    if (!dataSource) setOptions(staticOptions)
  }, [staticOptions, dataSource])

  // Single-item auto-select
  useEffect(() => {
    if (options.length === 1 && !value && onChange) {
      const syntheticEvent = { target: { value: options[0].key, name } }
      onChange(syntheticEvent)
    }
  }, [options])

  // Close dropdown on outside click
  useEffect(() => {
    if (!searchable) return
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [searchable])

  // Validation
  const validate = useCallback(() => {
    if (required && !allowBlank && !value) {
      setError('Field ini wajib diisi')
      return false
    }
    setError('')
    return true
  }, [required, allowBlank, value])

  const handleChange = useCallback((e) => {
    setError('')
    if (onChange) onChange(e)
  }, [onChange])

  const filteredOptions = searchable && search
    ? options.filter(opt => String(opt.value).toLowerCase().includes(search.toLowerCase()))
    : options

  // Searchable mode: custom dropdown
  if (searchable) {
    const selectedLabel = options.find(opt => String(opt.key) === String(value))?.value || placeholder

    return (
      <div className="space-y-1.5 w-full" ref={containerRef}>
        {label && (
          <label htmlFor={selectId} className="block text-xs font-semibold text-[#2c2c2c] tracking-wide uppercase">
            {label}
            {required && <span className="text-rose-500 ml-0.5">*</span>}
          </label>
        )}
        <div className="relative rounded-xl shadow-2xs">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6b5e52] text-sm z-10">
              <i className={'fas ' + icon}></i>
            </div>
          )}
          <div
            className={'w-full ' + (icon ? 'pl-10' : 'pl-3.5') + ' pr-10 py-2.5 text-sm bg-[#f8f5f1] border rounded-xl cursor-pointer transition-all duration-200 ' +
              (error ? 'border-rose-500 ' : 'border-[#e8d9c7] hover:border-[#a86e2f]/50 ') +
              (isOpen ? 'border-[#a86e2f] ring-2 ring-[#a86e2f]/20 bg-white ' : '') +
              className}
            onClick={() => !disabled && setIsOpen(!isOpen)}
          >
            {loading ? (
              <span className="text-[#6b5e52]/50"><i className="fas fa-spinner fa-spin mr-2"></i>Memuat...</span>
            ) : (
              <span className={value ? 'text-[#2c2c2c]' : 'text-[#6b5e52]/50'}>{selectedLabel}</span>
            )}
          </div>

          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#6b5e52] text-xs">
            <i className={'fas ' + (isOpen ? 'fa-chevron-up' : 'fa-chevron-down')}></i>
          </div>

          {isOpen && !disabled && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e8d9c7] rounded-xl shadow-xl z-50 overflow-hidden animate-[fadeIn_0.15s_ease-out]">
              <div className="p-2 border-b border-[#e8d9c7]/60">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari..."
                  className="w-full px-3 py-1.5 text-xs bg-[#f8f5f1] border border-[#e8d9c7] rounded-lg outline-none focus:border-[#a86e2f]"
                  autoFocus
                />
              </div>
              <div className="max-h-48 overflow-y-auto">
                {emptyText && (
                  <div
                    className={'px-3 py-2 text-xs cursor-pointer hover:bg-[#f8f5f1] ' + (!value ? 'bg-[#a86e2f]/10 text-[#a86e2f] font-semibold' : 'text-[#6b5e52]/50')}
                    onClick={() => { handleChange({ target: { value: '', name } }); setIsOpen(false); setSearch('') }}
                  >
                    {emptyText}
                  </div>
                )}
                {filteredOptions.map((opt, i) => (
                  <div
                    key={i}
                    className={'px-3 py-2 text-xs cursor-pointer hover:bg-[#f8f5f1] ' +
                      (String(opt.key) === String(value) ? 'bg-[#a86e2f]/10 text-[#a86e2f] font-semibold' : 'text-[#2c2c2c]')}
                    onClick={() => { handleChange({ target: { value: opt.key, name } }); setIsOpen(false); setSearch('') }}
                  >
                    {format ? format(opt.key, opt.value) : opt.value}
                  </div>
                ))}
                {filteredOptions.length === 0 && (
                  <div className="px-3 py-4 text-xs text-[#6b5e52]/50 text-center">Tidak ada data</div>
                )}
              </div>
            </div>
          )}
        </div>
        {(error || externalError) && <p className="text-[11px] font-medium text-rose-500 mt-1">{error || externalError}</p>}
        <style>{'@keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }'}</style>
      </div>
    )
  }

  // Standard mode (native select)
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-semibold text-[#2c2c2c] tracking-wide uppercase">
          {label}
          {required && <span className="text-rose-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative rounded-xl shadow-2xs">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6b5e52] text-sm">
            <i className={'fas ' + icon}></i>
          </div>
        )}
        <select
          ref={selectRef}
          id={selectId}
          name={name}
          value={value ?? ''}
          defaultValue={defaultValue}
          onChange={handleChange}
          onBlur={validate}
          disabled={disabled || loading}
          className={'w-full ' + (icon ? 'pl-10' : 'pl-3.5') + ' pr-10 py-2.5 text-sm bg-[#f8f5f1] border border-[#e8d9c7] rounded-xl text-[#2c2c2c] focus:bg-white focus:border-[#a86e2f] focus:ring-2 focus:ring-[#a86e2f]/20 outline-none transition-all duration-200 cursor-pointer ' +
            ((error || externalError) ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20 ' : '') +
            (loading ? 'opacity-60 ' : '') + className}
          {...props}
        >
          {emptyText && <option value="">{emptyText}</option>}
          {options.map((opt, idx) => (
            <option key={idx} value={opt.key ?? opt.value}>
              {format ? format(opt.key, opt.value) : (opt.value ?? opt.label)}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#6b5e52] text-xs">
          {loading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-chevron-down"></i>}
        </div>
      </div>
      {(error || externalError) && <p className="text-[11px] font-medium text-rose-500 mt-1">{error || externalError}</p>}
    </div>
  )
}
