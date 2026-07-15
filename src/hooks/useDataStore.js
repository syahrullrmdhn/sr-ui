import { useState, useCallback, useRef } from 'react'

/**
 * useDataStore - Data fetching hook (ported from Imat.Store pattern)
 *
 * Replaces the jQuery Imat.Store with a React-friendly data fetching abstraction.
 * Supports POST-based API with { success, rows, totalRows, redirect } response format.
 *
 * Usage:
 *   const { data, loading, error, load, refresh, setData, clear } = useDataStore({
 *     url: '/api/peserta',
 *     params: { start: 0, limit: 20, orderBy: '', sortBy: '' },
 *     autoLoad: true,
 *   })
 *
 *   // data = { rows: [...], totalRows: N }
 *   // load({ params: { start: 20, limit: 20 } }) - reload with new params
 */

export default function useDataStore({
  url = '',
  params: defaultParams = {},
  type = 'json',
  data: initialData = null,
  autoLoad = false,
  onError,
  onLoad,
  global = true,
} = {}) {
  const [data, setData] = useState(initialData || { rows: [], totalRows: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [params, setParams] = useState(defaultParams)
  const abortRef = useRef(null)

  const load = useCallback(async (options = {}) => {
    if (!url) return data

    // Abort previous request
    if (abortRef.current) abortRef.current.abort()
    abortRef.current = new AbortController()

    const mergedParams = { ...defaultParams, ...params, ...options.params }
    setParams(mergedParams)
    setLoading(true)
    setError(null)

    try {
      const formData = new URLSearchParams()
      Object.entries(mergedParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value)
        }
      })

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData,
        signal: abortRef.current.signal,
      })

      const result = await res.json()

      // Handle redirect (session expired)
      if (!result.success && result.redirect) {
        window.location = result.redirect
        return data
      }

      if (result.rows !== undefined && result.totalRows !== undefined) {
        setData(result)
        setError(null)
        if (onLoad) onLoad(result, mergedParams)
        return result
      } else {
        const err = { status: false, message: 'Format data tidak sesuai' }
        setError(err)
        if (onError) onError(err)
        return data
      }
    } catch (err) {
      if (err.name === 'AbortError') return data
      const errorObj = { status: false, message: 'Data tidak ditemukan' }
      setError(errorObj)
      if (onError) onError(errorObj)
      return data
    } finally {
      setLoading(false)
    }
  }, [url, params, defaultParams, data, onLoad, onError])

  const refresh = useCallback(() => {
    return load({ params })
  }, [load, params])

  const clear = useCallback(() => {
    setData({ rows: [], totalRows: 0 })
    setError(null)
  }, [])

  return {
    data,
    loading,
    error,
    params,
    load,
    refresh,
    setData,
    clear,
    setParams,
  }
}
