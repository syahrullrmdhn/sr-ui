import { useState } from 'react'
import { mockPeserta } from '../../data/mockData'

export default function PesertaPage() {
  const [search, setSearch] = useState('')

  const filtered = mockPeserta.filter(p =>
    p.nama.toLowerCase().includes(search.toLowerCase()) ||
    p.nopes.toLowerCase().includes(search.toLowerCase()) ||
    p.nip.includes(search)
  )

  const getStatusBadge = (status) => {
    const map = { 'Diterima': 'badge-success', 'Verifikasi': 'badge-warning', 'Ditolak': 'badge-danger' }
    return map[status] || 'badge-info'
  }

  return (
    <div>
      <h4 style={{ margin: '0 0 20px', color: '#333', fontWeight: 500 }}>
        <i className="fas fa-user-graduate" style={{ marginRight: 8 }}></i> Data Peserta
      </h4>
      <div className="card-admin">
        <div className="card-header">
          <span>Daftar Peserta</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-success btn-sm">
              <i className="fas fa-file-export"></i> Export
            </button>
            <button className="btn btn-primary btn-sm">
              <i className="fas fa-plus"></i> Tambah Peserta
            </button>
          </div>
        </div>
        <div className="card-body">
          <div style={{ marginBottom: 15, display: 'flex', gap: 10 }}>
            <input
              type="text"
              className="form-control"
              placeholder="Cari peserta (nama, nopes, NIP)..."
              style={{ maxWidth: 350 }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nopes</th>
                  <th>Nama</th>
                  <th>NIP</th>
                  <th>JK</th>
                  <th>Kotama</th>
                  <th>Satker</th>
                  <th>Pangkat</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={p.id}>
                    <td>{i + 1}</td>
                    <td style={{ fontWeight: 'bold' }}>{p.nopes}</td>
                    <td>{p.nama}</td>
                    <td style={{ fontSize: 11 }}>{p.nip}</td>
                    <td>{p.gender}</td>
                    <td>{p.kotama}</td>
                    <td>{p.satker}</td>
                    <td>{p.pangkat}</td>
                    <td>
                      <span className={"badge " + getStatusBadge(p.status)}>
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline" style={{ marginRight: 4 }}><i className="fas fa-eye"></i></button>
                      <button className="btn btn-sm btn-outline" style={{ marginRight: 4 }}><i className="fas fa-edit"></i></button>
                      <button className="btn btn-sm btn-outline" style={{ marginRight: 4 }}><i className="fas fa-id-card"></i></button>
                      <button className="btn btn-sm btn-danger"><i className="fas fa-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 15, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#999' }}>
            <span>Menampilkan 1-{filtered.length} dari {filtered.length} data</span>
            <ul className="pagination">
              <li><a>&laquo;</a></li>
              <li className="active"><a>1</a></li>
              <li><a>&raquo;</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
