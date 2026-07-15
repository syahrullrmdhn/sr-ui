import React, { useRef, useCallback, createContext, useContext } from 'react'

/**
 * Form - Form wrapper with validation & submit pattern (ported from Imat.Form)
 *
 * Features:
 * - Auto-collect form data (serializeObject pattern)
 * - Validation via allowBlank/required
 * - onSubmit / onPost helpers
 * - showField / hideField
 * - Form context for nested inputs
 *
 * Usage:
 *   <Form url="/api/save" onSubmit={(data) => console.log(data)}>
 *     <Input name="nama" required />
 *     <Select name="kotama" options={[...]} />
 *   </Form>
 */

const FormCtx = createContext()

export function useForm() {
  return useContext(FormCtx) || {}
}

export default function Form({
  children,
  className = '',
  url = '',
  method = 'POST',
  dataType = 'json',
  onSubmit,
  onPost,
  onSuccess,
  onError,
  validate: customValidate,
  ...props
}) {
  const formRef = useRef(null)

  const serializeObject = useCallback(() => {
    if (!formRef.current) return {}
    const data = {}
    const elements = formRef.current.elements

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i]
      if (!el.name || el.disabled) continue

      if (el.type === 'checkbox') {
        data[el.name] = el.checked
      } else if (el.type === 'radio') {
        if (el.checked) data[el.name] = el.value
      } else if (el.type === 'file') {
        data[el.name] = el.files[0] || null
      } else {
        data[el.name] = el.value
      }
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
          const group = formRef.current.querySelectorAll(`input[name="${el.name}"]`)
          const checked = Array.from(group).some(r => r.checked)
          if (!checked) return false
        } else if (el.type !== 'file' && !el.value?.trim()) {
          return false
        }
      }
    }

    return true
  }, [])

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

    if (onPost) {
      return onPost(data, fetchOptions)
    }

    if (url) {
      return fetch(url, fetchOptions)
        .then(res => res.json())
        .then(result => {
          if (!result.success && result.redirect) {
            window.location = result.redirect
            return
          }
          if (onSuccess) onSuccess(result)
        })
        .catch(err => {
          if (onError) onError(err)
        })
    }

    return Promise.resolve(data)
  }, [serializeObject, method, url, onPost, onSuccess, onError])

  const context = { serializeObject, isValid, post }

  return (
    <FormCtx.Provider value={context}>
      <form
        ref={formRef}
        method={method}
        className={`space-y-4 ${className}`}
        onSubmit={handleSubmit}
        {...props}
      >
        {children}
      </form>
    </FormCtx.Provider>
  )
}
