import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { examQuestions } from '../../data/mockData'
import Button from '../ui/Button'

export default function ExamSessionPage() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [ragu, setRagu] = useState({})
  const [timeLeft, setTimeLeft] = useState(90 * 60)

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(p => p <= 0 ? (clearInterval(t), 0) : p - 1), 1000)
    return () => clearInterval(t)
  }, [])

  const fmt = (s) => {
    const m = Math.floor((s % 3600) / 60), sec = s % 60
    return String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0')
  }

  const q = examQuestions[current]
  const total = examQuestions.length

  return (
    <div className="flex min-h-[calc(100vh-70px)]">
      {/* Sidebar */}
      <aside className="w-[250px] bg-white border-r border-gray-100 p-4 overflow-y-auto flex-shrink-0">
        <div className="text-center mb-4">
          <div className="w-24 h-24 rounded-full border-2 border-gray-200 mx-auto mb-2 bg-gray-50 flex items-center justify-center text-4xl text-gray-200">
            <i className="fas fa-user"></i>
          </div>
          <div className="font-bold text-sm">Ahmad Fauzi</div>
          <div className="text-[11px] text-gray-400">PST-001</div>
        </div>
        <div className="text-center font-bold text-xs py-2 bg-gray-50 rounded-lg mb-3">Tes Kompetensi Dasar</div>
        <div className="flex flex-wrap gap-2">
          {examQuestions.map((_, i) => {
            const isActive = i === current, hasAns = answers[i] !== undefined, isRagu = ragu[i]
            return (
              <button key={i} onClick={() => setCurrent(i)}
                className={"relative w-10 h-10 rounded border text-sm font-bold transition " +
                  (isActive ? 'bg-primary-dark text-white border-primary-dark' : 'border-gray-300 text-primary-dark hover:bg-primary-dark hover:text-white hover:border-primary-dark')}>
                {i + 1}
                {hasAns && (
                  <span className={"absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[10px] flex items-center justify-center text-white " + (isRagu ? 'bg-amber-500' : 'bg-green-500')}>
                    {String.fromCharCode(65 + answers[i])}
                  </span>
                )}
                {!hasAns && isRagu && <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center">?</span>}
              </button>
            )
          })}
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center gap-3 px-5 py-3 bg-white border-b border-gray-100">
          <span className="text-xs text-gray-400">SOAL NOMOR</span>
          <span className="font-bold bg-primary text-white px-3 py-1 rounded text-sm">{current + 1}</span>
          <div className="ml-auto flex items-center gap-2">
            <button className="w-8 h-8 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50"><i className="fas fa-search-minus text-xs text-gray-500"></i></button>
            <button className="w-8 h-8 border border-gray-200 rounded flex items-center justify-center hover:bg-gray-50"><i className="fas fa-search-plus text-xs text-gray-500"></i></button>
            <div className="flex items-center border border-red-400 rounded-full px-4 py-1.5 ml-2">
              <span className="text-[11px] text-gray-500 mr-3">Sisa Waktu</span>
              <span className="font-bold text-red-500">{fmt(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* Soal area */}
        <div className="flex-1 overflow-y-auto p-5 bg-gray-50/50">
          <div className="bg-white border border-gray-100 border-t-[3px] rounded-lg p-5 mb-4" dangerouslySetInnerHTML={{ __html: q.soal }} />

          {/* Jawaban wrapper */}
          <div className="inline-flex items-center border border-gray-200 rounded-lg overflow-hidden mb-4">
            <div className="px-4 py-2.5 bg-gray-50 text-xs font-bold text-gray-600">JAWABAN</div>
            <div className="flex gap-2 px-3 py-2">
              {['A','B','C','D','E'].map((l, i) => (
                <button key={i} onClick={() => setAnswers(p => ({...p, [current]: i}))}
                  className={"w-7 h-7 rounded-full border-2 text-xs font-bold flex items-center justify-center transition " +
                    (answers[current] === i ? 'bg-gray-800 text-white border-gray-800' : 'border-gray-300 text-gray-500 hover:bg-gray-100')}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Jawaban text */}
          <div className="space-y-1.5">
            {q.jawaban.map((j, i) => (
              <button key={i} onClick={() => setAnswers(p => ({...p, [current]: i}))}
                className={"w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-left text-sm transition " +
                  (answers[current] === i ? 'border-primary bg-primary/5' : 'border-gray-100 bg-white hover:border-gray-200')}>
                <span className={"w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 " +
                  (answers[current] === i ? 'bg-primary text-white border-primary' : 'border-gray-300 text-gray-500')}>
                  {String.fromCharCode(65 + i)}
                </span>
                {j}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 px-5 py-3 bg-white border-t border-gray-100">
          <Button variant="ghost" icon="fa-arrow-left" onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0}>
            Sebelumnya
          </Button>
          <Button variant="ghost" iconRight="fa-arrow-right" onClick={() => setCurrent(Math.min(total - 1, current + 1))} disabled={current === total - 1} className="ml-auto">
            Selanjutnya
          </Button>
          <Button variant={ragu[current] ? 'warning' : 'outline'} size="md" onClick={() => setRagu(p => ({...p, [current]: !p[current]}))}>
            <span className={"w-3.5 h-3.5 rounded-sm border border-current inline-block " + (ragu[current] ? 'bg-white' : '')}></span>
            Ragu Ragu
          </Button>
          <Button variant="success" icon="fa-check-circle" onClick={() => navigate('/peserta/exam')} className="ml-2">
            SELESAI
          </Button>
        </div>
      </div>
    </div>
  )
}
