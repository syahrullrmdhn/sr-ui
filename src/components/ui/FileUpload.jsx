import { useState, useRef, useCallback } from 'react'

/**
 * FileUpload - File upload with browse button (ported from Imat.TextBox type='file')
 *
 * Features:
 * - Browse button with file input
 * - File type filter (accept)
 * - Drag & drop support
 * - File preview (images)
 * - File size display
 * - Remove/clear file
 * - Upload action via URL
 *
 * Usage:
 *   <FileUpload
 *     name="berkas_01"
 *     label="Upload Ijazah"
 *     accept=".pdf,.jpg,.png"
 *     maxSize={5 * 1024 * 1024}
 *     onFileChange={(file) => console.log(file)}
 *   />
 */

function formatFileSize(bytes) {
  if (!bytes) return ''
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export default function FileUpload({
  name,
  label,
  accept = '',
  maxSize = 10 * 1024 * 1024, // 10MB
  multiple = false,
  required = false,
  disabled = false,
  uploadURL,
  value,
  error: externalError,
  onFileChange,
  onUpload,
  className = '',
  ...props
}) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState(externalError || '')
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef(null)

  const validateFile = useCallback((file) => {
    if (!file) return true

    if (maxSize && file.size > maxSize) {
      setError(`Ukuran file melebihi batas maksimum ${formatFileSize(maxSize)}`)
      return false
    }

    if (accept) {
      const ext = '.' + file.name.split('.').pop().toLowerCase()
      const types = accept.split(',').map(t => t.trim().toLowerCase())
      const allowed = types.some(t => {
        if (t.startsWith('.')) return ext === t
        if (t.includes('*')) return true
        return file.type === t
      })
      if (!allowed) {
        setError(`Tipe file tidak diizinkan. Format yang diterima: ${accept}`)
        return false
      }
    }

    setError('')
    return true
  }, [accept, maxSize])

  const processFile = useCallback((file) => {
    if (!validateFile(file)) return

    setSelectedFile(file)

    // Generate preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target.result)
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }

    if (onFileChange) onFileChange(file)
  }, [validateFile, onFileChange])

  const handleInputChange = useCallback((e) => {
    const file = e.target.files[0]
    if (file) processFile(file)
  }, [processFile])

  const handleBrowse = useCallback(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.click()
    }
  }, [disabled])

  const handleClear = useCallback((e) => {
    e.stopPropagation()
    setSelectedFile(null)
    setPreview(null)
    setError('')
    if (inputRef.current) inputRef.current.value = ''
    if (onFileChange) onFileChange(null)
  }, [onFileChange])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    if (disabled) return
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }, [disabled, processFile])

  const handleUpload = useCallback(async () => {
    if (!selectedFile || !uploadURL) return

    setUploading(true)
    const formData = new FormData()
    formData.append(name || 'file', selectedFile)

    try {
      const res = await fetch(uploadURL, { method: 'POST', body: formData })
      const result = await res.json()
      if (onUpload) onUpload(result, selectedFile)
    } catch (err) {
      setError('Gagal mengupload file')
    } finally {
      setUploading(false)
    }
  }, [selectedFile, uploadURL, name, onUpload])

  const displayError = externalError || error

  return (
    <div className={`space-y-1.5 w-full ${className}`}>
      {label && (
        <label className="block text-xs font-semibold text-[#2c2c2c] tracking-wide uppercase">
          {label}
          {required && <span className="text-rose-500 ml-0.5">*</span>}
        </label>
      )}

      <div
        className={`
          flex items-center gap-2 w-full px-3 py-2.5 text-sm bg-[#f8f5f1] border rounded-xl transition-all duration-200 cursor-pointer
          ${dragOver ? 'border-[#a86e2f] bg-[#a86e2f]/5 ring-2 ring-[#a86e2f]/20' : 'border-[#e8d9c7]'}
          ${displayError ? 'border-rose-500' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#a86e2f]/50'}
        `}
        onClick={handleBrowse}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
      >
        <input
          ref={inputRef}
          type="file"
          name={name}
          accept={accept}
          multiple={multiple}
          required={required}
          disabled={disabled}
          onChange={handleInputChange}
          className="hidden"
          {...props}
        />

        {/* Preview or Icon */}
        {preview ? (
          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-[#e8d9c7]">
            <img src={preview} alt="" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-lg bg-white border border-[#e8d9c7] flex items-center justify-center flex-shrink-0">
            <i className={`fas ${selectedFile ? 'fa-file text-[#a86e2f]' : 'fa-folder-open text-[#6b5e52]/50'} text-sm`}></i>
          </div>
        )}

        {/* Filename */}
        <div className="flex-1 min-w-0">
          {selectedFile ? (
            <div className="truncate">
              <span className="text-sm text-[#2c2c2c] font-medium">{selectedFile.name}</span>
              <span className="text-xs text-[#6b5e52] ml-2">{formatFileSize(selectedFile.size)}</span>
            </div>
          ) : (
            <span className="text-sm text-[#6b5e52]/50">
              {dragOver ? 'Lepaskan file di sini' : 'Pilih file atau drag & drop'}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {selectedFile && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[#6b5e52] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              title="Hapus file"
            >
              <i className="fas fa-times text-xs"></i>
            </button>
          )}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleBrowse() }}
            disabled={disabled}
            className="px-3 py-1.5 text-xs font-bold bg-white border border-[#e8d9c7] text-[#2c2c2c] rounded-lg hover:bg-[#f8f5f1] hover:border-[#a86e2f] transition-colors cursor-pointer disabled:opacity-50"
          >
            Browse
          </button>
        </div>
      </div>

      {/* Upload button */}
      {uploadURL && selectedFile && (
        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold bg-[#a86e2f] text-white rounded-xl hover:bg-[#895823] transition-colors cursor-pointer disabled:opacity-50"
        >
          {uploading ? (
            <><i className="fas fa-spinner fa-spin"></i> Mengupload...</>
          ) : (
            <><i className="fas fa-cloud-upload-alt"></i> Upload File</>
          )}
        </button>
      )}

      {displayError && <p className="text-[11px] font-medium text-rose-500 mt-1">{displayError}</p>}
    </div>
  )
}
