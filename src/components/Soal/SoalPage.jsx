import { useState } from 'react'
import { mockSoal } from '../../data/mockData'

export default function SoalPage() {
  const [search, setSearch] = useState('')

  const filtered = mockSoal.filter(u =>
    u.materi.toLowerCase().includes(search.toLowerCase()) ||
    u.kode.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h4 style={{ margin: '0 0 20px', color: '#333', fontWeight: 500 }}>
        <i className="fas fa-question-circle" style={{ marginRight: 8 }}></i> Bank Soal
      </h4>
      <div className="card-admin">
        <div className="card-header">
          <span>Daftar Soal</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-success btn-sm">
              <i className="fas fa-file-import"></i> Import
            </button>
            <button className="btn btn-primary btn-sm">
              <i className="fas fa-plus"></i> Tambah Soal
            </button>
          </div>
        </div>
        <div className="card-body">
          <div style={{ marginBottom: 15 }}>
            <input
              type="text"
              className="form-control"
              placeholder="Cari soal..."
              style={{ maxWidth: 300 }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Kode</th>
                  <th>Materi</th>
                  <th>Jumlah Soal</th>
                  <th>Tipe</th>
                  <th>Status</th>
                  <th>Tanggal</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((soal, i) => (
                  <tr key={soal.id}>
                    <td>{i + 1}</td>
                    <td style={{ fontWeight: 'bold' }}>{soal.kode}</td>
                    <td>{soal.materi}</td>
                    <td>{soal.jumlahSoal} soal</td>
                    <td>{soal.tipe}</td>
                    <td>
                      <span className={"badge " + (soal.status === 'Aktif' ? 'badge-success' : 'badge-warning')}>
                        {soal.status}
                      </span>
                    </td>
                    <td>{soal.createdAt}</td>
                    <td>
                      <button className="btn btn-sm btn-outline" style={{ marginRight: 4 }}><i className="fas fa-eye"></i></button>
                      <button className="btn btn-sm btn-outline" style={{ marginRight: 4 }}><i className="fas fa-edit"></i></button>
                      <button className="btn btn-sm btn-danger"><i className="fas fa-trash"></i></button>
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
