import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { examQuestions } from '../../data/mockData'

export default function ExamSessionPage() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [raguRagu, setRaguRagu] = useState({})
  const [timeLeft, setTimeLeft] = useState(90 * 60) // 90 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return (h > 0 ? h + ':' : '') + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0')
  }

  const question = examQuestions[current]
  const total = examQuestions.length

  const selectAnswer = (index) => {
    setAnswers(prev => ({ ...prev, [current]: index }))
  }

  const toggleRagu = () => {
    setRaguRagu(prev => ({ ...prev, [current]: !prev[current] }))
  }

  return (
    <div className="exam-layout">
      {/* Sidebar nomor soal */}
      <div className="exam-sidebar">
        <div className="photo-box">
          <div className="photo-circle">
            <i className="fas fa-user"></i>
          </div>
          <div style={{ fontWeight: 700 }}>{current + 1}</div>
          <div style={{ fontSize: 13 }}>Ahmad Fauzi</div>
        </div>
        <div className="sidebar-title">Tes Kompetensi Dasar</div>
        <ul className="nomor-soal">
          {examQuestions.map((_, i) => {
            const isActive = i === current
            const hasAnswer = answers[i] !== undefined
            const isRagu = raguRagu[i]
            let cls = ''
            if (isActive) cls += ' active'
            if (hasAnswer) cls += ' isi'
            if (isRagu) cls += ' ragu'
            return (
              <li key={i}>
                <a className={cls.trim()} onClick={() => setCurrent(i)}>
                  {i + 1}
                  {hasAnswer && <span className="answer-badge">
                    {String.fromCharCode(65 + answers[i])}
                  </span>}
                </a>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Main soal area */}
      <div className="exam-main">
        <div className="exam-bar">
          <span style={{ fontSize: 12, color: '#999' }}>SOAL NOMOR</span>
          <span className="soal-nomor">{current + 1}</span>
          <div className="zoom-btns">
            <button><i className="fas fa-search-minus"></i></button>
            <button><i className="fas fa-search-plus"></i></button>
          </div>
          <div className="timer">
            <span className="timer-label">Sisa Waktu</span>
            <span className="timer-time">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="soal-area">
          <div className="soal-content" dangerouslySetInnerHTML={{ __html: question.soal }} />

          <div className="jawaban-wrapper">
            <div className="jawaban-title">JAWABAN</div>
            <div className="jawaban-options">
              {['A', 'B', 'C', 'D', 'E'].map((label, i) => (
                <div
                  key={i}
                  className={"jawaban-option " + (answers[current] === i ? 'active' : '')}
                  onClick={() => selectAnswer(i)}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Jawaban text */}
          <div style={{ marginTop: 15 }}>
            {question.jawaban.map((j, i) => (
              <div
                key={i}
                onClick={() => selectAnswer(i)}
                style={{
                  padding: '10px 15px', marginBottom: 6, borderRadius: 6,
                  border: '1px solid ' + (answers[current] === i ? 'var(--primary)' : '#eee'),
                  background: answers[current] === i ? '#f0e8db' : 'white',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
                  transition: 'all 0.2s'
                }}
              >
                <span style={{
                  width: 24, height: 24, borderRadius: '50%',
                  border: '2px solid ' + (answers[current] === i ? 'var(--primary)' : '#999'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 'bold',
                  background: answers[current] === i ? 'var(--primary)' : 'transparent',
                  color: answers[current] === i ? 'white' : '#666'
                }}>
                  {String.fromCharCode(65 + i)}
                </span>
                {j}
              </div>
            ))}
          </div>
        </div>

        <div className="exam-footer">
          <button
            className="btn-exam btn-sebelum"
            onClick={() => setCurrent(Math.max(0, current - 1))}
            disabled={current === 0}
          >
            <i className="fas fa-arrow-left"></i> Sebelumnya
          </button>
          <button
            className="btn-exam btn-selanjut"
            onClick={() => setCurrent(Math.min(total - 1, current + 1))}
            disabled={current === total - 1}
          >
            Selanjutnya <i className="fas fa-arrow-right"></i>
          </button>
          <button
            className={"btn-exam btn-ragu " + (raguRagu[current] ? '' : '')}
            onClick={toggleRagu}
          >
            <span className={"check-box " + (raguRagu[current] ? 'active' : '')}></span>
            Ragu Ragu
          </button>
          <button className="btn-exam btn-selesai" onClick={() => navigate('/peserta/exam')}>
            SELESAI <i className="fas fa-check-circle"></i>
          </button>
        </div>
      </div>
    </div>
  )
}
