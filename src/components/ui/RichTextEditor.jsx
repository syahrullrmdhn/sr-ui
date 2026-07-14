import React, { useState, useRef, useEffect } from 'react'

export default function RichTextEditor({
  value = '',
  onChange,
  placeholder = 'Ketik konten soal, materi, atau instruksi ujian di sini...',
  label = '',
  helperText = '',
  minHeight = '320px',
  readOnly = false,
  className = ''
}) {
  const [content, setContent] = useState(value)
  const [mode, setMode] = useState('visual') // 'visual' | 'code' | 'preview'
  const editorRef = useRef(null)

  useEffect(() => {
    if (value !== content && editorRef.current && mode === 'visual') {
      editorRef.current.innerHTML = value || ''
      setContent(value || '')
    }
  }, [value])

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML
      setContent(html)
      if (onChange) onChange(html)
    }
  }

  const execCommand = (command, arg = null) => {
    if (mode !== 'visual') return
    document.execCommand(command, false, arg)
    if (editorRef.current) {
      editorRef.current.focus()
      handleInput()
    }
  }

  const insertTemplate = (templateHtml) => {
    if (mode !== 'visual') return
    document.execCommand('insertHTML', false, templateHtml)
    if (editorRef.current) {
      editorRef.current.focus()
      handleInput()
    }
  }

  // Preset Template untuk CBT
  const insertMathTemplate = () => {
    const mathHtml = `<span style="background-color: #f8f5f1; border: 1px solid #e8d9c7; padding: 2px 8px; border-radius: 6px; font-family: monospace; font-weight: bold; color: #a86e2f;">\\( f(x) = \\int_{0}^{x} t^2 dt \\)</span>&nbsp;`
    insertTemplate(mathHtml)
  }

  const insertTableTemplate = () => {
    const tableHtml = `
      <table style="width: 100%; border-collapse: collapse; margin: 12px 0; border: 1px solid #e8d9c7;">
        <thead>
          <tr style="background-color: #f8f5f1; color: #2c2c2c;">
            <th style="border: 1px solid #e8d9c7; padding: 10px; text-align: left; font-weight: bold;">No</th>
            <th style="border: 1px solid #e8d9c7; padding: 10px; text-align: left; font-weight: bold;">Variabel / Parameter</th>
            <th style="border: 1px solid #e8d9c7; padding: 10px; text-align: left; font-weight: bold;">Keterangan & Nilai</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #e8d9c7; padding: 10px;">1</td>
            <td style="border: 1px solid #e8d9c7; padding: 10px;">Kecepatan Awal (v₀)</td>
            <td style="border: 1px solid #e8d9c7; padding: 10px;">20 m/s</td>
          </tr>
          <tr style="background-color: #f8f5f1/40;">
            <td style="border: 1px solid #e8d9c7; padding: 10px;">2</td>
            <td style="border: 1px solid #e8d9c7; padding: 10px;">Percepatan (a)</td>
            <td style="border: 1px solid #e8d9c7; padding: 10px;">5 m/s²</td>
          </tr>
        </tbody>
      </table>
      <p>&nbsp;</p>
    `
    insertTemplate(tableHtml)
  }

  const insertCallout = (type = 'info') => {
    const colors = {
      info: { bg: '#f8f5f1', border: '#2f69a8', color: '#2f69a8', icon: 'fa-info-circle', title: 'Catatan Penting' },
      warning: { bg: '#f8f5f1', border: '#d97e2f', color: '#d97e2f', icon: 'fa-exclamation-triangle', title: 'Perhatian' },
      success: { bg: '#f8f5f1', border: '#2fa86e', color: '#2fa86e', icon: 'fa-check-circle', title: 'Petunjuk Jawaban' }
    }[type] || { bg: '#f8f5f1', border: '#a86e2f', color: '#a86e2f', icon: 'fa-lightbulb', title: 'Tips Ujian' }

    const calloutHtml = `
      <div style="background-color: ${colors.bg}; border-left: 4px solid ${colors.border}; padding: 14px 18px; border-radius: 8px; margin: 14px 0; font-family: 'Poppins', sans-serif;">
        <div style="font-weight: bold; color: ${colors.color}; display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <i class="fas ${colors.icon}"></i> ${colors.title}
        </div>
        <div style="color: #2c2c2c; font-size: 13px;">Tuliskan penjelasan atau instruksi khusus butir soal di sini...</div>
      </div>
      <p>&nbsp;</p>
    `
    insertTemplate(calloutHtml)
  }

  const insertImagePrompt = () => {
    const url = window.prompt('Masukkan URL Gambar Soal / Diagram:', 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80')
    if (url) {
      const imgHtml = `<div style="text-align: center; margin: 16px 0;"><img src="${url}" alt="Diagram Soal" style="max-width: 100%; border-radius: 12px; border: 1px solid #e8d9c7; box-shadow: 0 4px 12px rgba(0,0,0,0.05);" /><p style="font-size: 11px; color: #6b5e52; margin-top: 6px; font-style: italic;">Gambar Diagram / Ilustrasi Butir Soal</p></div><p>&nbsp;</p>`
      insertTemplate(imgHtml)
    }
  }

  // Hitung statistik teks
  const textOnly = content.replace(/<[^>]*>/g, '').trim()
  const charCount = textOnly.length
  const wordCount = textOnly ? textOnly.split(/\s+/).filter(Boolean).length : 0
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <div className={`w-full flex flex-col font-sans ${className}`}>
      {label && (
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-[#2c2c2c] flex items-center gap-2">
            {label}
            <span className="text-[10px] bg-[#f8f5f1] text-[#a86e2f] px-2 py-0.5 rounded border border-[#e8d9c7] font-bold">
              Rich Text CBT Editor
            </span>
          </label>
          <div className="flex items-center gap-1 bg-[#f8f5f1] p-0.5 rounded-lg border border-[#e8d9c7]">
            <button
              type="button"
              onClick={() => setMode('visual')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${mode === 'visual' ? 'bg-[#a86e2f] text-white shadow-2xs' : 'text-[#6b5e52] hover:text-[#2c2c2c]'}`}
            >
              <i className="fas fa-edit mr-1"></i> Visual
            </button>
            <button
              type="button"
              onClick={() => setMode('code')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${mode === 'code' ? 'bg-[#a86e2f] text-white shadow-2xs' : 'text-[#6b5e52] hover:text-[#2c2c2c]'}`}
            >
              <i className="fas fa-code mr-1"></i> HTML Code
            </button>
            <button
              type="button"
              onClick={() => setMode('preview')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${mode === 'preview' ? 'bg-[#2fa86e] text-white shadow-2xs' : 'text-[#6b5e52] hover:text-[#2c2c2c]'}`}
            >
              <i className="fas fa-eye mr-1"></i> Live Preview
            </button>
          </div>
        </div>
      )}

      {/* Editor Container */}
      <div className="border border-[#e8d9c7] rounded-2xl bg-white overflow-hidden shadow-sm flex flex-col focus-within:border-[#a86e2f] focus-within:ring-2 focus-within:ring-[#a86e2f]/15 transition-all">
        
        {/* Toolbar (Muncul saat mode visual) */}
        {mode === 'visual' && !readOnly && (
          <div className="bg-[#f8f5f1] border-b border-[#e8d9c7] p-2 flex flex-wrap items-center gap-1 text-[#2c2c2c]">
            {/* Group 1: Typography */}
            <div className="flex items-center gap-0.5 border-r border-[#e8d9c7] pr-1.5 mr-1">
              <button
                type="button"
                onClick={() => execCommand('bold')}
                className="w-8 h-8 rounded-lg hover:bg-white hover:text-[#a86e2f] hover:shadow-2xs flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                title="Bold (Ctrl+B)"
              >
                <i className="fas fa-bold"></i>
              </button>
              <button
                type="button"
                onClick={() => execCommand('italic')}
                className="w-8 h-8 rounded-lg hover:bg-white hover:text-[#a86e2f] hover:shadow-2xs flex items-center justify-center text-xs transition-colors cursor-pointer"
                title="Italic (Ctrl+I)"
              >
                <i className="fas fa-italic"></i>
              </button>
              <button
                type="button"
                onClick={() => execCommand('underline')}
                className="w-8 h-8 rounded-lg hover:bg-white hover:text-[#a86e2f] hover:shadow-2xs flex items-center justify-center text-xs transition-colors cursor-pointer"
                title="Underline (Ctrl+U)"
              >
                <i className="fas fa-underline"></i>
              </button>
              <button
                type="button"
                onClick={() => execCommand('strikeThrough')}
                className="w-8 h-8 rounded-lg hover:bg-white hover:text-[#a86e2f] hover:shadow-2xs flex items-center justify-center text-xs transition-colors cursor-pointer"
                title="Strikethrough"
              >
                <i className="fas fa-strikethrough"></i>
              </button>
            </div>

            {/* Group 2: Headings & Sizes */}
            <div className="flex items-center gap-0.5 border-r border-[#e8d9c7] pr-1.5 mr-1">
              <button
                type="button"
                onClick={() => execCommand('formatBlock', '<h3>')}
                className="px-2 h-8 rounded-lg hover:bg-white hover:text-[#a86e2f] hover:shadow-2xs flex items-center justify-center text-xs font-extrabold transition-colors cursor-pointer gap-1"
                title="Heading Soal (H3)"
              >
                <span>H1</span>
              </button>
              <button
                type="button"
                onClick={() => execCommand('formatBlock', '<h4>')}
                className="px-2 h-8 rounded-lg hover:bg-white hover:text-[#a86e2f] hover:shadow-2xs flex items-center justify-center text-xs font-bold transition-colors cursor-pointer gap-1"
                title="Sub-Heading (H4)"
              >
                <span>H2</span>
              </button>
              <button
                type="button"
                onClick={() => execCommand('formatBlock', '<p>')}
                className="px-2 h-8 rounded-lg hover:bg-white hover:text-[#a86e2f] hover:shadow-2xs flex items-center justify-center text-xs font-semibold transition-colors cursor-pointer"
                title="Paragraph / Normal"
              >
                <span>¶ P</span>
              </button>
            </div>

            {/* Group 3: Alignment */}
            <div className="flex items-center gap-0.5 border-r border-[#e8d9c7] pr-1.5 mr-1">
              <button
                type="button"
                onClick={() => execCommand('justifyLeft')}
                className="w-8 h-8 rounded-lg hover:bg-white hover:text-[#a86e2f] hover:shadow-2xs flex items-center justify-center text-xs transition-colors cursor-pointer"
                title="Align Left"
              >
                <i className="fas fa-align-left"></i>
              </button>
              <button
                type="button"
                onClick={() => execCommand('justifyCenter')}
                className="w-8 h-8 rounded-lg hover:bg-white hover:text-[#a86e2f] hover:shadow-2xs flex items-center justify-center text-xs transition-colors cursor-pointer"
                title="Align Center"
              >
                <i className="fas fa-align-center"></i>
              </button>
              <button
                type="button"
                onClick={() => execCommand('justifyRight')}
                className="w-8 h-8 rounded-lg hover:bg-white hover:text-[#a86e2f] hover:shadow-2xs flex items-center justify-center text-xs transition-colors cursor-pointer"
                title="Align Right"
              >
                <i className="fas fa-align-right"></i>
              </button>
            </div>

            {/* Group 4: Lists & Indents */}
            <div className="flex items-center gap-0.5 border-r border-[#e8d9c7] pr-1.5 mr-1">
              <button
                type="button"
                onClick={() => execCommand('insertUnorderedList')}
                className="w-8 h-8 rounded-lg hover:bg-white hover:text-[#a86e2f] hover:shadow-2xs flex items-center justify-center text-xs transition-colors cursor-pointer"
                title="Bullet List"
              >
                <i className="fas fa-list-ul"></i>
              </button>
              <button
                type="button"
                onClick={() => execCommand('insertOrderedList')}
                className="w-8 h-8 rounded-lg hover:bg-white hover:text-[#a86e2f] hover:shadow-2xs flex items-center justify-center text-xs transition-colors cursor-pointer"
                title="Numbered List"
              >
                <i className="fas fa-list-ol"></i>
              </button>
            </div>

            {/* Group 5: Advanced CBT Insertions (Math, Tables, Callouts, Images) */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={insertMathTemplate}
                className="px-2.5 h-8 rounded-lg bg-white border border-[#e8d9c7] text-[#a86e2f] hover:bg-[#a86e2f] hover:text-white flex items-center justify-center text-xs font-bold transition-all cursor-pointer gap-1.5 shadow-2xs"
                title="Sisipkan Formula / Rumus Matematika"
              >
                <i className="fas fa-square-root-alt"></i> Rumus
              </button>
              <button
                type="button"
                onClick={insertTableTemplate}
                className="px-2.5 h-8 rounded-lg bg-white border border-[#e8d9c7] text-[#2f69a8] hover:bg-[#2f69a8] hover:text-white flex items-center justify-center text-xs font-bold transition-all cursor-pointer gap-1.5 shadow-2xs"
                title="Sisipkan Tabel Data Soal"
              >
                <i className="fas fa-table"></i> Tabel
              </button>
              <button
                type="button"
                onClick={() => insertCallout('info')}
                className="px-2.5 h-8 rounded-lg bg-white border border-[#e8d9c7] text-[#2fa86e] hover:bg-[#2fa86e] hover:text-white flex items-center justify-center text-xs font-bold transition-all cursor-pointer gap-1.5 shadow-2xs"
                title="Sisipkan Callout / Catatan Instruksi"
              >
                <i className="fas fa-comment-dots"></i> Callout
              </button>
              <button
                type="button"
                onClick={insertImagePrompt}
                className="px-2.5 h-8 rounded-lg bg-white border border-[#e8d9c7] text-[#6b5e52] hover:bg-[#2c2c2c] hover:text-white flex items-center justify-center text-xs font-bold transition-all cursor-pointer gap-1.5 shadow-2xs"
                title="Sisipkan Gambar / Diagram Soal"
              >
                <i className="fas fa-image"></i> Gambar
              </button>
            </div>

            {/* Group 6: History Undo / Redo */}
            <div className="ml-auto flex items-center gap-0.5">
              <button
                type="button"
                onClick={() => execCommand('undo')}
                className="w-8 h-8 rounded-lg hover:bg-white hover:text-[#2c2c2c] hover:shadow-2xs flex items-center justify-center text-xs transition-colors cursor-pointer text-[#6b5e52]"
                title="Undo (Ctrl+Z)"
              >
                <i className="fas fa-undo"></i>
              </button>
              <button
                type="button"
                onClick={() => execCommand('redo')}
                className="w-8 h-8 rounded-lg hover:bg-white hover:text-[#2c2c2c] hover:shadow-2xs flex items-center justify-center text-xs transition-colors cursor-pointer text-[#6b5e52]"
                title="Redo (Ctrl+Y)"
              >
                <i className="fas fa-redo"></i>
              </button>
            </div>
          </div>
        )}

        {/* Mode 1: Visual WYSIWYG Editor */}
        {mode === 'visual' && (
          <div
            ref={editorRef}
            contentEditable={!readOnly}
            onInput={handleInput}
            onBlur={handleInput}
            dangerouslySetInnerHTML={{ __html: content }}
            className="p-4 md:p-6 overflow-y-auto outline-none focus:outline-none prose prose-sm max-w-none font-sans text-[#2c2c2c] leading-relaxed"
            style={{ minHeight }}
            data-placeholder={placeholder}
          />
        )}

        {/* Mode 2: HTML / Markdown Code Editor */}
        {mode === 'code' && (
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
              if (onChange) onChange(e.target.value)
            }}
            readOnly={readOnly}
            placeholder={placeholder}
            className="p-4 md:p-6 font-mono text-xs text-[#2c2c2c] bg-[#f8f5f1] w-full outline-none resize-y leading-normal border-0"
            style={{ minHeight }}
          />
        )}

        {/* Mode 3: Live Preview */}
        {mode === 'preview' && (
          <div
            className="p-4 md:p-6 overflow-y-auto bg-[#f8f5f1]/50 font-sans text-[#2c2c2c] leading-relaxed"
            style={{ minHeight }}
          >
            <div className="text-[10px] font-bold text-[#2fa86e] uppercase tracking-widest mb-3 pb-2 border-b border-[#e8d9c7] flex items-center gap-1.5">
              <i className="fas fa-check-circle"></i> Tampilan Nyata Peserta Saat Ujian Berlangsung
            </div>
            {content ? (
              <div dangerouslySetInnerHTML={{ __html: content }} className="prose prose-sm max-w-none" />
            ) : (
              <div className="text-center py-12 text-[#6b5e52] italic text-xs">Belum ada konten untuk ditampilkan di preview.</div>
            )}
          </div>
        )}

        {/* Footer Statistics Bar */}
        <div className="bg-[#f8f5f1] border-t border-[#e8d9c7] px-4 py-2 flex items-center justify-between text-[11px] text-[#6b5e52] font-semibold">
          <div className="flex items-center gap-4">
            <span><i className="fas fa-font text-[#a86e2f] mr-1"></i> {wordCount} Kata</span>
            <span><i className="fas fa-keyboard text-[#2f69a8] mr-1"></i> {charCount} Karakter</span>
            <span><i className="fas fa-clock text-[#2fa86e] mr-1"></i> ~{readTime} Menit baca</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2fa86e] inline-block animate-pulse"></span>
            <span className="text-[#2c2c2c] font-bold">Auto-Save Ready</span>
          </div>
        </div>
      </div>

      {helperText && <p className="text-xs text-[#6b5e52] mt-1.5 m-0">{helperText}</p>}
    </div>
  )
}
