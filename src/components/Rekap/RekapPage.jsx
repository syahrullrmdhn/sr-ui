import { mockRekap } from '../../data/mockData'

export default function RekapPage() {
  return (
    <div>
      <h4 style={{ margin: '0 0 20px', color: '#333', fontWeight: 500 }}>
        <i className="fas fa-chart-bar" style={{ marginRight: 8 }}></i> Rekapitulasi Nilai
      </h4>
      <div className="card-admin">
        <div className="card-header">
          <span>Rekap Nilai Peserta</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-success btn-sm">
              <i className="fas fa-file-excel"></i> Export Excel
            </button>
            <button className="btn btn-danger btn-sm">
              <i className="fas fa-file-pdf"></i> Export PDF
            </button>
            <button className="btn btn-outline btn-sm">
              <i className="fas fa-print"></i> Cetak
            </button>
          </div>
        </div>
        <div className="card-body">
          <div style={{ marginBottom: 15, display: 'flex', gap: 10 }}>
            <select className="form-control" style={{ maxWidth: 200 }}>
              <option>Semua Tes</option>
              <option>Tes Kompetensi Dasar</option>
              <option>Tes Bahasa</option>
            </select>
            <input type="text" className="form-control" placeholder="Cari peserta..." style={{ maxWidth: 250 }} />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th rowSpan="2" style={{ verticalAlign: 'middle' }}>No</th>
                  <th rowSpan="2" style={{ verticalAlign: 'middle' }}>Nama</th>
                  <th rowSpan="2" style={{ verticalAlign: 'middle' }}>NIP</th>
                  <th rowSpan="2" style={{ verticalAlign: 'middle' }}>Pangkat</th>
                  <th colSpan="3" style={{ textAlign: 'center' }}>Nilai Tes</th>
                  <th rowSpan="2" style={{ verticalAlign: 'middle' }}>Rata-rata</th>
                  <th rowSpan="2" style={{ verticalAlign: 'middle' }}>Status</th>
                </tr>
                <tr>
                  <th>Pengetahuan Umum</th>
                  <th>Bahasa Indonesia</th>
                  <th>Matematika</th>
                </tr>
              </thead>
              <tbody>
                {mockRekap.map((p, i) => {
                  const avg = Math.round(p.tes.reduce((s, t) => s + t.nilai, 0) / p.tes.length)
                  return (
                    <tr key={p.id}>
                      <td>{i + 1}</td>
                      <td style={{ fontWeight: 'bold' }}>{p.nama}</td>
                      <td style={{ fontSize: 11 }}>{p.nip}</td>
                      <td>{p.pangkat}</td>
                      {p.tes.map((t, ti) => (
                        <td key={ti} style={{ textAlign: 'center' }}>
                          <span style={{
                            fontWeight: 'bold',
                            color: t.nilai >= 70 ? 'var(--success)' : 'var(--danger)'
                          }}>
                            {t.nilai}
                          </span>
                        </td>
                      ))}
                      <td style={{ textAlign: 'center' }}>
                        <strong style={{ color: 'var(--primary)' }}>{avg}</strong>
                      </td>
                      <td>
                        <span className={"badge " + (avg >= 70 ? 'badge-success' : 'badge-danger')}>
                          {avg >= 70 ? 'Lulus' : 'Tidak Lulus'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
