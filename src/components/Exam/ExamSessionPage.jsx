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
    <div className="flex flex-col md:flex-row flex-1 w-full min-h-[calc(100vh-72px)] bg-slate-50">
      {/* Sidebar Navigasi Soal - Full Height */}
      <aside className="w-full md:w-[280px] bg-white border-b md:border-b-0 md:border-r border-slate-200/80 p-5 overflow-y-auto flex-shrink-0 flex flex-col justify-between shadow-xs">
        <div>
          <div className="text-center mb-5 pb-4 border-b border-slate-100">
            <div className="w-20 h-20 rounded-2xl border-2 border-teal-100 mx-auto mb-2.5 bg-teal-50 flex items-center justify-center text-3xl text-teal-600 shadow-inner">
              <i className="fas fa-user-graduate"></i>
            </div>
            <div className="font-bold text-base text-slate-800">Ahmad Fauzi</div>
            <div className="text-xs text-teal-600 font-mono font-semibold bg-teal-50/80 px-3 py-0.5 rounded-full inline-block mt-1">PST-001</div>
          </div>

          <div className="text-center font-extrabold text-xs py-2.5 px-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl mb-4 shadow-2xs tracking-wide uppercase">
            Tes Kompetensi Dasar (CBT)
          </div>

          <div className="text-xs font-semibold text-slate-500 mb-2.5 flex items-center justify-between">
            <span>NAVIGASI BUTIR SOAL</span>
            <span className="text-teal-600">{Object.keys(answers).length} / {total} Dijawab</span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {examQuestions.map((_, i) => {
              const isActive = i === current, hasAns = answers[i] !== undefined, isRagu = ragu[i]
              return (
                <button key={i} onClick={() => setCurrent(i)}
                  className={"relative aspect-square rounded-xl border text-sm font-bold transition-all duration-200 cursor-pointer flex items-center justify-center shadow-2xs " +
                    (isActive ? 'bg-teal-600 text-white border-teal-600 scale-105 shadow-md ring-2 ring-teal-200' : hasAns ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100' : isRagu ? 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300')}>
                  {i + 1}
                  {hasAns && (
                    <span className={"absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-extrabold text-white shadow-2xs " + (isRagu ? 'bg-amber-500 ring-1 ring-white' : 'bg-emerald-600 ring-1 ring-white')}>
                      {String.fromCharCode(65 + answers[i])}
                    </span>
                  )}
                  {!hasAns && isRagu && <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] flex items-center justify-center ring-1 ring-white">?</span>}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-[11px] font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-emerald-600 inline-block"></span> Dijawab
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-amber-500 inline-block"></span> Ragu-ragu
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-white border border-slate-300 inline-block"></span> Belum dijawab
          </div>
        </div>
      </aside>

      {/* Main Area Soal - Full Width & Height */}
      <div className="flex-1 flex flex-col w-full h-full bg-slate-50/60 overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 bg-white border-b border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Soal Nomor</span>
            <span className="font-extrabold bg-teal-600 text-white px-3.5 py-1.5 rounded-xl text-base shadow-inner">{current + 1}</span>
            <span className="text-xs text-slate-400 hidden sm:inline">dari {total} butir soal</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200">
              <button className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-white text-slate-600 cursor-pointer transition" title="Perkecil Teks"><i className="fas fa-font text-xs"></i> -</button>
              <button className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-white text-slate-600 cursor-pointer transition" title="Perbesar Teks"><i className="fas fa-font text-sm"></i> +</button>
            </div>

            <div className="flex items-center border-2 border-rose-400/80 bg-rose-50/80 rounded-full px-5 py-2 shadow-2xs">
              <span className="text-xs font-bold text-rose-800 mr-3 flex items-center gap-1.5">
                <i className="far fa-clock text-rose-600 animate-pulse"></i> Sisa Waktu
              </span>
              <span className="font-extrabold text-rose-600 font-mono text-base tracking-wider">{fmt(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* Soal area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 w-full flex flex-col max-w-none">
          <div className="bg-white border border-slate-200/80 border-t-4 border-t-teal-600 rounded-2xl p-6 md:p-8 mb-6 shadow-sm text-base text-slate-800 leading-relaxed font-normal" dangerouslySetInnerHTML={{ __html: q.soal }} />

          {/* Jawaban wrapper */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-3 flex-1">
            <div className="text-xs font-bold tracking-wider uppercase text-slate-400 mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>Pilihan Jawaban (Klik pada opsi untuk memilih)</span>
              {answers[current] !== undefined && (
                <span className="text-emerald-600 font-bold flex items-center gap-1 text-xs">
                  <i className="fas fa-check-circle"></i> Opsi {String.fromCharCode(65 + answers[current])} Terpilih
                </span>
              )}
            </div>

            <div className="space-y-2.5">
              {q.jawaban.map((j, i) => (
                <button key={i} onClick={() => setAnswers(p => ({...p, [current]: i}))}
                  className={"w-full flex items-center gap-4 px-5 py-4 rounded-xl border text-left text-sm md:text-base font-medium transition-all duration-200 cursor-pointer " +
                    (answers[current] === i ? 'border-teal-600 bg-teal-50/60 text-teal-900 shadow-2xs ring-1 ring-teal-500/30' : 'border-slate-200/80 bg-white hover:border-teal-300 hover:bg-slate-50/60 text-slate-700')}>
                  <span className={"w-8 h-8 rounded-xl border-2 flex items-center justify-center text-sm font-extrabold flex-shrink-0 transition-colors " +
                    (answers[current] === i ? 'bg-teal-600 text-white border-teal-600 shadow-sm' : 'border-slate-300 text-slate-500 bg-slate-50')}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{j}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Navigasi Bawah */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-white border-t border-slate-200/80 shadow-sm">
          <Button variant="outline" size="lg" icon="fa-arrow-left" onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0} className="font-semibold">
            Soal Sebelumnya
          </Button>

          <div className="flex items-center gap-3 ml-auto">
            <Button variant={ragu[current] ? 'warning' : 'outline'} size="lg" onClick={() => setRagu(p => ({...p, [current]: !p[current]}))} className="font-semibold">
              <i className="fas fa-question-circle mr-1"></i> Ragu - Ragu
            </Button>

            {current < total - 1 ? (
              <Button variant="primary" size="lg" iconRight="fa-arrow-right" onClick={() => setCurrent(Math.min(total - 1, current + 1))} className="font-semibold shadow-md">
                Soal Selanjutnya
              </Button>
            ) : (
              <Button variant="success" size="lg" icon="fa-check-double" onClick={() => navigate('/peserta/exam')} className="font-bold shadow-md shadow-emerald-500/20 px-8">
                SELESAI UJIAN
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
