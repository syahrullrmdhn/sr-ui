import React, { useState, useCallback, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'

/**
 * Frame - Enhanced iframe wrapper (ported from Imat.Frame)
 *
 * NEW: navigate(url, params), print(), reload(), save() via ref
 */

const Frame = forwardRef(function Frame({
  src: initialSrc,
  title = '',
  width = '100%',
  height = 400,
  className = '',
  sandbox,
  allowFullScreen = false,
  onLoad,
  onError,
  ...props
}, ref) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [src, setSrc] = useState(initialSrc)
  const iframeRef = useRef(null)

  useEffect(() => { setSrc(initialSrc) }, [initialSrc])

  // Imperative API via ref
  useImperativeHandle(ref, () => ({
    navigate(url, params = {}) {
      let fullUrl = url
      const searchParams = new URLSearchParams(params)
      searchParams.append('_dc', Date.now())
      fullUrl += (url.includes('?') ? '&' : '?') + searchParams.toString()
      setSrc(fullUrl)
      setLoading(true)
      setError(false)
    },
    print() {
      if (iframeRef.current?.contentWindow) {
        try { iframeRef.current.contentWindow.print() } catch (e) { window.print() }
      }
    },
    reload() {
      if (iframeRef.current) {
        const currentSrc = iframeRef.current.src
        setSrc('')
        setTimeout(() => setSrc(currentSrc), 50)
        setLoading(true)
        setError(false)
      }
    },
    save() {
      if (iframeRef.current?.contentWindow) {
        try {
          const currentSrc = iframeRef.current.src
          const sep = currentSrc.includes('?') ? '&' : '?'
          setSrc(currentSrc + sep + 'save=Y&_dc=' + Date.now())
        } catch (e) { console.error('Save failed', e) }
      }
    },
    getElement: () => iframeRef.current,
  }), [])

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
    <div className={'relative rounded-xl overflow-hidden border border-[#d4c4ab] ' + className} style={{ width, height }}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#F4F6F9] z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-4 border-[#d4c4ab] border-t-[#855b2f] animate-spin" />
            <span className="text-xs text-[#5A5A5A]">Memuat...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#F4F6F9] z-10">
          <div className="flex flex-col items-center gap-2 text-[#5A5A5A]/60">
            <i className="fas fa-exclamation-triangle text-2xl text-[#ff9800]"></i>
            <span className="text-sm font-medium">Gagal memuat konten</span>
            <button
              onClick={() => { setError(false); setLoading(true); setSrc(''); setTimeout(() => setSrc(initialSrc), 50) }}
              className="text-xs text-[#855b2f] hover:underline cursor-pointer"
            >
              Coba lagi
            </button>
          </div>
        </div>
      )}

      {src && (
        <iframe
          ref={iframeRef}
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
      )}
    </div>
  )
})

export default Frame
