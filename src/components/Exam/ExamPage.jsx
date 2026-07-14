import { useNavigate } from 'react-router-dom'
import '../../assets/css/exam.css'

export default function ExamPage() {
  const navigate = useNavigate()

  const peserta = {
    nama: 'Ahmad Fauzi',
    nopes: 'PST-001',
    nip: '198501012010011001',
  }

  const tabs = [
    { id: 'home', icon: 'fa-home', label: 'Home' },
    { id: 'profile', icon: 'fa-user', label: 'Profile' },
    { id: 'jadwal', icon: 'fa-calendar', label: 'Jadwal Ujian' },
    { id: 'kartu', icon: 'fa-id-card', label: 'Kartu Peserta' },
  ]

  return (
    <div className="exam-content">
      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: 20 }}>
        {/* Left sidebar */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 150, height: 150, borderRadius: '50%', overflow: 'hidden',
            background: '#fff', border: '4px solid #CCC', margin: '10px auto',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 60, color: '#ccc'
          }}>
            <i className="fas fa-user"></i>
          </div>
          <div style={{ fontWeight: 700, marginTop: 5 }}>{peserta.nopes}</div>
          <div style={{ fontSize: 14, marginBottom: 15 }}>{peserta.nama}</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {tabs.map((tab, i) => (
              <a key={tab.id} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 15px', borderRadius: 6,
                background: i === 0 ? 'var(--primary)' : 'transparent',
                color: i === 0 ? 'white' : 'var(--primary)',
                cursor: 'pointer', fontSize: 14, transition: 'all 0.2s'
              }}>
                <i className={"fas " + tab.icon} style={{ width: 25 }}></i> {tab.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right content */}
        <div style={{ border: '1px solid #ddd', borderRadius: 10, padding: 20, minHeight: 400 }}>
          <h6 style={{ marginBottom: 15, fontWeight: 'bold' }}>
            <i className="fas fa-comments" style={{ marginRight: 8 }}></i>
            Selamat Datang {peserta.nama}
          </h6>

          <div style={{ background: '#d1ecf1', color: '#0c5460', padding: 15, borderRadius: 8, fontSize: 13 }}>
            Silahkan pilih menu <strong>Jadwal Ujian</strong> untuk melihat jadwal ujian yang tersedia.
            Pastikan Anda telah terverifikasi untuk dapat mengikuti ujian.
          </div>

          {/* Card Tes */}
          <div style={{
            background: 'white', border: '1px solid #eee', borderRadius: 10,
            padding: 20, marginTop: 20, display: 'flex', alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <div style={{
              width: 80, height: 80, border: '6px solid var(--primary)',
              borderRadius: '50%', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 24, fontWeight: 'bold',
              color: 'var(--primary)', marginRight: 20, flexShrink: 0
            }}>
              85
            </div>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: 15 }}>Tes Kompetensi Dasar</div>
              <div style={{ fontSize: 12, color: '#999' }}>20 Juli 2026</div>
            </div>
          </div>

          {/* Mulai button */}
          <div style={{ marginTop: 30, textAlign: 'center' }}>
            <button
              className="btn btn-primary"
              style={{ padding: '12px 40px', fontSize: 15, borderRadius: 50 }}
              onClick={() => navigate('/peserta/exam/start')}
            >
              <i className="fas fa-play"></i> Mulai Ujian
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
