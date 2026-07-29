import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { examQuestions } from '../../data/mockData'

export default function ExamSessionPage() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [ragu, setRagu] = useState({})
  const [timeLeft, setTimeLeft] = useState(90 * 60)
  const [zoom, setZoom] = useState(100)

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(p => p <= 0 ? (clearInterval(t), 0) : p - 1), 1000)
    return () => clearInterval(t)
  }, [])

  // Keyboard shortcuts for answers A-E
  useEffect(() => {
    const handler = (e) => {
      if (e.key >= 'a' && e.key <= 'e') {
        const idx = e.key.charCodeAt(0) - 97
        if (idx < q.jawaban.length) setAnswers(p => ({...p, [current]: idx}))
      }
      if (e.key === 'ArrowLeft') setCurrent(p => Math.max(0, p - 1))
      if (e.key === 'ArrowRight') setCurrent(p => Math.min(total - 1, p + 1))
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [current])

  const fmt = (s) => {
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60
    return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0')
  }

  const q = examQuestions[current]
  const total = examQuestions.length

  return (
    <div className="flex flex-col md:flex-row min-h-screen" style={{fontFamily:"'Roboto', sans-serif", backgroundColor:'#E9E9E9'}}>
      
      {/* Sidebar - Photo + Question Numbers */}
      <aside className="w-full md:w-[260px] bg-white border-b md:border-b-0 md:border-r border-gray-200 flex flex-col flex-shrink-0">
        {/* Photo Box */}
        <div className="p-4 text-center border-b border-gray-200">
          <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-gray-100 border-4 border-gray-200 mx-auto mb-2">
            <div className="w-full h-full flex items-center justify-center text-4xl text-gray-300">
              <i className="fas fa-user"></i>
            </div>
          </div>
          <div className="font-bold text-xs">198501012010011001</div>
          <div className="text-xs text-gray-500">AHMAD FAUZI</div>
        </div>

        {/* Test Name */}
        <div className="px-4 py-2 text-center text-xs font-bold text-gray-600 border-b border-gray-200">
          Tes Kompetensi Dasar (CBT)
        </div>

        {/* Question Numbers Grid */}
        <div className="p-3 flex-1 overflow-y-auto">
          <div className="grid grid-cols-5 gap-1.5">
            {examQuestions.map((_, i) => {
              const isActive = i === current
              const hasAns = answers[i] !== undefined
              const isRagu = ragu[i]

              return (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="relative aspect-square rounded border text-xs font-bold transition-all duration-150 cursor-pointer flex items-center justify-center"
                  style={{
                    backgroundColor: isActive ? '#855b2f' : hasAns ? '#e8f5e9' : isRagu ? '#fff3e0' : '#fff',
                    color: isActive ? '#fff' : hasAns ? '#2e7d32' : isRagu ? '#e65100' : '#333',
                    borderColor: isActive ? '#855b2f' : hasAns ? '#4caf50' : isRagu ? '#ff9800' : '#ddd',
                  }}
                >
                  {i + 1}
                  {hasAns && (
                    <span 
                      className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full text-[8px] flex items-center justify-center font-bold text-white"
                      style={{backgroundColor: isRagu ? '#ff9800' : '#4caf50'}}
                    >
                      {String.fromCharCode(65 + answers[i])}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="p-3 border-t border-gray-200 text-[10px] text-gray-500 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-[#4caf50] inline-block"></span> Dijawab
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-[#ff9800] inline-block"></span> Ragu-ragu
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-white border border-gray-300 inline-block"></span> Belum dijawab
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full">
        
        {/* Top Bar - Soal Nomor + Timer */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500 uppercase">SOAL NOMOR</span>
            <span className="bg-[#855b2f] text-white px-3 py-1 rounded text-sm font-bold">{current + 1}</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setZoom(p => Math.max(80, p - 10))}
              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center text-gray-600 cursor-pointer transition-colors"
              title="Perkecil"
            >
              <i className="fas fa-search-minus text-xs"></i>
            </button>
            <button 
              onClick={() => setZoom(p => Math.min(150, p + 10))}
              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center text-gray-600 cursor-pointer transition-colors"
              title="Perbesar"
            >
              <i className="fas fa-search-plus text-xs"></i>
            </button>

            <div className="flex items-center border-2 border-red-400 bg-red-50 rounded px-4 py-1.5 ml-2">
              <span className="text-xs font-bold text-red-800 mr-2 flex items-center gap-1">
                <i className="far fa-clock text-red-600 animate-pulse"></i> Sisa Waktu
              </span>
              <span className="font-bold text-red-600 font-mono text-sm tracking-wider">{fmt(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* Soal Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8" style={{fontSize: `${zoom}%`}}>
          <div 
            className="bg-white border border-gray-200 rounded-lg p-6 mb-4 shadow-sm text-sm text-gray-800 leading-relaxed"
            style={{borderTop: '4px solid #855b2f'}}
            dangerouslySetInnerHTML={{ __html: q.soal }} 
          />

          {/* Jawaban - Answer Buttons matching source (A-E buttons) */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="text-xs font-bold tracking-wider uppercase text-gray-400 mb-4 pb-2 border-b border-gray-100">
              JAWABAN
            </div>

            <div className="flex flex-wrap gap-2">
              {q.jawaban.map((j, i) => (
                <button
                  key={i}
                  onClick={() => setAnswers(p => ({...p, [current]: i}))}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded border text-left text-sm transition-all duration-200 cursor-pointer"
                  style={{
                    borderColor: answers[current] === i ? '#855b2f' : '#e5e7eb',
                    backgroundColor: answers[current] === i ? '#fdf2e9' : '#fff',
                    color: answers[current] === i ? '#855b2f' : '#374151',
                  }}
                >
                  <span 
                    className="w-8 h-8 rounded border-2 flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{
                      borderColor: answers[current] === i ? '#855b2f' : '#d1d5db',
                      backgroundColor: answers[current] === i ? '#855b2f' : '#f9fafb',
                      color: answers[current] === i ? '#fff' : '#6b7280',
                    }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{j}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation Bar - matching source exactly */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-white border-t border-gray-200 shadow-sm">
          <button
            onClick={() => setCurrent(Math.max(0, current - 1))}
            disabled={current === 0}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <i className="fas fa-arrow-left text-xs"></i> Sebelumnya
          </button>

          <button
            onClick={() => setCurrent(Math.min(total - 1, current + 1))}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            Selanjutnya <i className="fas fa-arrow-right text-xs"></i>
          </button>

          <button
            onClick={() => setRagu(p => ({...p, [current]: !p[current]}))}
            className="px-4 py-2 rounded text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            style={{
              backgroundColor: ragu[current] ? '#ff9800' : '#ffc107',
              color: '#fff',
            }}
          >
            <i className="fas fa-question-circle text-xs"></i> Ragu Ragu
          </button>

          <button
            onClick={() => navigate('/peserta/exam')}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            SELESAI <i className="fas fa-check-circle text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  )
}
