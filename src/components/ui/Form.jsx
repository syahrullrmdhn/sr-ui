import React, { useRef, useCallback, createContext, useContext, useImperativeHandle, forwardRef } from 'react'

/**
 * Form - Enhanced form wrapper (ported from Imat.Form)
 *
 * NEW: showValue(data), showField/hideField, setLabel, imperative handle
 */

const FormCtx = createContext()

export function useForm() {
  return useContext(FormCtx) || {}
}

const Form = forwardRef(function Form({
  children,
  className = '',
  url = '',
  method = 'POST',
  onSubmit,
  onPost,
  onSuccess,
  onError,
  validate: customValidate,
  type = 'default', // 'default' | 'horizontal' | 'inline'
  labelWidth,
  ...props
}, ref) {
  const formRef = useRef(null)

  const serializeObject = useCallback(() => {
    if (!formRef.current) return {}
    const data = {}
    const elements = formRef.current.elements
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i]
      if (!el.name || el.disabled) continue
      if (el.type === 'checkbox') data[el.name] = el.checked
      else if (el.type === 'radio') { if (el.checked) data[el.name] = el.value }
      else if (el.type === 'file') data[el.name] = el.files[0] || null
      else data[el.name] = el.value
    }
    return data
  }, [])

  const isValid = useCallback(() => {
    if (!formRef.current) return true
    const elements = formRef.current.elements
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i]
      const required = el.hasAttribute('required') || el.dataset.required === 'true'
      if (required && !el.disabled) {
        if (el.type === 'checkbox' && !el.checked) return false
        if (el.type === 'radio') {
          const group = formRef.current.querySelectorAll('input[name="' + el.name + '"]')
          if (!Array.from(group).some(r => r.checked)) return false
        } else if (el.type !== 'file' && !el.value?.trim()) return false
      }
    }
    return true
  }, [])

  // NEW: showValue - populate all form fields from data object
  const showValue = useCallback((data) => {
    if (!formRef.current || !data) return
    const elements = formRef.current.elements
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i]
      if (!el.name) continue
      const val = data[el.name]
      if (val === undefined) continue
      if (el.type === 'checkbox') el.checked = !!val
      else if (el.type === 'radio') el.checked = (el.value === String(val))
      else el.value = val ?? ''
    }
  }, [])

  // NEW: showField / hideField - toggle field visibility
  const showField = useCallback((id) => {
    if (!formRef.current) return
    const el = formRef.current.querySelector('#' + id)
    if (el) {
      const group = el.closest('.form-group') || el.closest('.space-y-1\\.5') || el.parentElement?.parentElement
      if (group) group.style.display = ''
    }
  }, [])

  const hideField = useCallback((id) => {
    if (!formRef.current) return
    const el = formRef.current.querySelector('#' + id)
    if (el) {
      const group = el.closest('.form-group') || el.closest('.space-y-1\\.5') || el.parentElement?.parentElement
      if (group) group.style.display = 'none'
    }
  }, [])

  // NEW: setLabel
  const setLabel = useCallback((id, text) => {
    if (!formRef.current) return
    const el = formRef.current.querySelector('#' + id)
    if (el) {
      const label = el.closest('.space-y-1\\.5')?.querySelector('label') || el.previousElementSibling
      if (label) label.textContent = text
    }
  }, [])

  // Imperative handle
  useImperativeHandle(ref, () => ({
    serializeObject,
    isValid,
    showValue,
    showField,
    hideField,
    setLabel,
    submit: () => { if (formRef.current) formRef.current.requestSubmit() },
    getElement: () => formRef.current,
  }), [serializeObject, isValid, showValue, showField, hideField, setLabel])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (!isValid()) {
      if (onError) onError({ message: 'Mohon lengkapi semua field yang wajib diisi.' })
      return
    }
    const data = serializeObject()
    if (customValidate && !customValidate(data)) return
    if (onSubmit) onSubmit(data)
  }, [isValid, serializeObject, customValidate, onSubmit, onError])

  const post = useCallback((options = {}) => {
    const data = serializeObject()
    const fetchOptions = {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, ...options.params }),
    }
    if (onPost) return onPost(data, fetchOptions)
    if (url) {
      return fetch(url, fetchOptions)
        .then(res => res.json())
        .then(result => {
          if (!result.success && result.redirect) { window.location = result.redirect; return }
          if (onSuccess) onSuccess(result)
        })
        .catch(err => { if (onError) onError(err) })
    }
    return Promise.resolve(data)
  }, [serializeObject, method, url, onPost, onSuccess, onError])

  const context = { serializeObject, isValid, showValue, showField, hideField, setLabel, post }
  const formClass = type === 'horizontal' ? 'form-horizontal' : type === 'inline' ? 'form-inline' : ''

  return (
    <FormCtx.Provider value={context}>
      <form
        ref={formRef}
        method={method}
        className={(formClass ? formClass + ' ' : '') + 'space-y-4 ' + className}
        onSubmit={handleSubmit}
        {...props}
      >
        {children}
      </form>
    </FormCtx.Provider>
  )
})

export default Form
