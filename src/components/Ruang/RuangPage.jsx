import { mockRuang } from '../../data/mockData'

export default function RuangPage() {
  return (
    <div>
      <h4 style={{ margin: '0 0 20px', color: '#333', fontWeight: 500 }}>
        <i className="fas fa-door-open" style={{ marginRight: 8 }}></i> Ruang Ujian
      </h4>
      <div className="card-admin">
        <div className="card-header">
          <span>Daftar Ruang</span>
          <button className="btn btn-primary btn-sm">
            <i className="fas fa-plus"></i> Tambah Ruang
          </button>
        </div>
        <div className="card-body">
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Kode</th>
                  <th>Nama Ruang</th>
                  <th>Kapasitas</th>
                  <th>Peserta</th>
                  <th>Lokasi</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {mockRuang.map((r, i) => (
                  <tr key={r.id}>
                    <td>{i + 1}</td>
                    <td style={{ fontWeight: 'bold' }}>{r.kode}</td>
                    <td>{r.namaRuang}</td>
                    <td>{r.kapasitas} orang</td>
                    <td>
                      <span>{r.peserta}</span>
                      <div style={{ background: '#eee', borderRadius: 10, height: 6, marginTop: 4, width: 80 }}>
                        <div style={{
                          background: r.peserta / r.kapasitas > 0.8 ? 'var(--danger)' : 'var(--success)',
                          width: ((r.peserta / r.kapasitas) * 100) + '%',
                          height: '100%', borderRadius: 10
                        }}></div>
                      </div>
                    </td>
                    <td>{r.lokasi}</td>
                    <td>
                      <span className={"badge " + (r.status === 'Aktif' ? 'badge-success' : 'badge-warning')}>
                        {r.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline" style={{ marginRight: 4 }}><i className="fas fa-users"></i></button>
                      <button className="btn btn-sm btn-outline" style={{ marginRight: 4 }}><i className="fas fa-edit"></i></button>
                      <button className="btn btn-sm btn-outline"><i className="fas fa-print"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
