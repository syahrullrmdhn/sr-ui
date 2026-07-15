import React, { useState, useCallback } from 'react'

/**
 * Frame - Iframe wrapper (ported from Imat.Frame)
 *
 * Features:
 * - Lazy loading
 * - Loading state
 * - Responsive sizing
 * - Error handling
 *
 * Usage:
 *   <Frame src="https://example.com" title="Dokumen" height={500} />
 */

export default function Frame({
  src,
  title = '',
  width = '100%',
  height = 400,
  className = '',
  sandbox,
  allowFullScreen = false,
  onLoad,
  onError,
  ...props
}) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleLoad = useCallback(() => {
    setLoading(false)
    if (onLoad) onLoad()
  }, [onLoad])

  const handleError = useCallback(() => {
    setLoading(false)
    setError(true)
    if (onError) onError()
  }, [onError])

  return (
    <div className={`relative rounded-xl overflow-hidden border border-[#e8d9c7] ${className}`} style={{ width, height }}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#f8f5f1]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-4 border-[#e8d9c7] border-t-[#a86e2f] animate-spin" />
            <span className="text-xs text-[#6b5e52]">Memuat...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#f8f5f1]">
          <div className="flex flex-col items-center gap-2 text-[#6b5e52]/60">
            <i className="fas fa-exclamation-triangle text-2xl text-[#d97e2f]"></i>
            <span className="text-sm font-medium">Gagal memuat konten</span>
            <button
              onClick={() => { setError(false); setLoading(true) }}
              className="text-xs text-[#a86e2f] hover:underline cursor-pointer"
            >
              Coba lagi
            </button>
          </div>
        </div>
      )}

      <iframe
        src={src}
        title={title}
        width="100%"
        height="100%"
        className="border-0"
        sandbox={sandbox}
        allowFullScreen={allowFullScreen}
        onLoad={handleLoad}
        onError={handleError}
        style={{ display: error ? 'none' : 'block' }}
        {...props}
      />
    </div>
  )
}
