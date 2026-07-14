export default function DashboardPage() {
  return (
    <div>
      <h4 style={{ margin: '0 0 20px', color: '#333', fontWeight: 500 }}>
        <i className="fas fa-home" style={{ marginRight: 8 }}></i> Dashboard
      </h4>

      <div className="row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: 20 }}>
        <div className="small-box bg-primary">
          <div className="inner">
            <h3>150</h3>
            <p>Total Peserta</p>
          </div>
          <div className="icon"><i className="fas fa-users"></i></div>
          <a className="small-box-footer">Lihat Detail <i className="fas fa-arrow-circle-right"></i></a>
        </div>

        <div className="small-box bg-success">
          <div className="inner">
            <h3>12</h3>
            <p>Soal Aktif</p>
          </div>
          <div className="icon"><i className="fas fa-question-circle"></i></div>
          <a className="small-box-footer">Lihat Detail <i className="fas fa-arrow-circle-right"></i></a>
        </div>

        <div className="small-box bg-warning">
          <div className="inner">
            <h3>8</h3>
            <p>Jadwal Ujian</p>
          </div>
          <div className="icon"><i className="fas fa-calendar"></i></div>
          <a className="small-box-footer">Lihat Detail <i className="fas fa-arrow-circle-right"></i></a>
        </div>

        <div className="small-box bg-info">
          <div className="inner">
            <h3>5</h3>
            <p>Ruang Ujian</p>
          </div>
          <div className="icon"><i className="fas fa-door-open"></i></div>
          <a className="small-box-footer">Lihat Detail <i className="fas fa-arrow-circle-right"></i></a>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        <div className="card-admin">
          <div className="card-header">
            <span><i className="fas fa-chart-line" style={{ marginRight: 8 }}></i> Statistik Ujian</span>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px 0' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 36, fontWeight: 'bold', color: 'var(--primary)' }}>85%</div>
                <div style={{ fontSize: 12, color: '#999' }}>Rata-rata Nilai</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 36, fontWeight: 'bold', color: 'var(--success)' }}>92%</div>
                <div style={{ fontSize: 12, color: '#999' }}>Kelulusan</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 36, fontWeight: 'bold', color: 'var(--info)' }}>145</div>
                <div style={{ fontSize: 12, color: '#999' }}>Sudah Ujian</div>
              </div>
            </div>
            <div style={{ borderTop: '1px solid #eee', paddingTop: 15 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12 }}>Pengetahuan Umum</span>
                <span style={{ fontSize: 12, fontWeight: 'bold' }}>88%</span>
              </div>
              <div style={{ background: '#eee', borderRadius: 10, height: 8, marginBottom: 12 }}>
                <div style={{ background: 'var(--primary)', width: '88%', height: '100%', borderRadius: 10 }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12 }}>Bahasa Indonesia</span>
                <span style={{ fontSize: 12, fontWeight: 'bold' }}>76%</span>
              </div>
              <div style={{ background: '#eee', borderRadius: 10, height: 8, marginBottom: 12 }}>
                <div style={{ background: 'var(--success)', width: '76%', height: '100%', borderRadius: 10 }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12 }}>Matematika</span>
                <span style={{ fontSize: 12, fontWeight: 'bold' }}>82%</span>
              </div>
              <div style={{ background: '#eee', borderRadius: 10, height: 8 }}>
                <div style={{ background: 'var(--info)', width: '82%', height: '100%', borderRadius: 10 }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-admin">
          <div className="card-header">
            <span><i className="fas fa-clock" style={{ marginRight: 8 }}></i> Aktivitas Terbaru</span>
          </div>
          <div className="card-body">
            {[
              { icon: 'fa-user-plus', color: '#00a65a', text: 'Peserta baru terdaftar', time: '5 menit lalu' },
              { icon: 'fa-clipboard-check', color: '#00c0ef', text: 'Tes Kompetensi selesai', time: '1 jam lalu' },
              { icon: 'fa-key', color: '#f39c12', 'text': 'Token diperbarui', time: '2 jam lalu' },
              { icon: 'fa-upload', color: '#855b2f', text: 'Soal baru diimport', time: '3 jam lalu' },
              { icon: 'fa-user', color: '#dd4b39', 'text': 'User baru ditambahkan', time: '5 jam lalu' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: item.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 10, color: item.color }}>
                  <i className={"fas " + item.icon} style={{ fontSize: 13 }}></i>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12 }}>{item.text}</div>
                  <div style={{ fontSize: 11, color: '#999' }}>{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
