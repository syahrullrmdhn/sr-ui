import { useState } from 'react'
import { mockTes } from '../../data/mockData'

export default function TesPage() {
  return (
    <div>
      <h4 style={{ margin: '0 0 20px', color: '#333', fontWeight: 500 }}>
        <i className="fas fa-clipboard-list" style={{ marginRight: 8 }}></i> Tes / Subtes
      </h4>
      <div className="card-admin">
        <div className="card-header">
          <span>Daftar Tes</span>
          <button className="btn btn-primary btn-sm">
            <i className="fas fa-plus"></i> Tambah Tes
          </button>
        </div>
        <div className="card-body">
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Tes</th>
                  <th>Materi</th>
                  <th>Jumlah Soal</th>
                  <th>Waktu (menit)</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {mockTes.map((tes, i) => (
                  <tr key={tes.id}>
                    <td>{i + 1}</td>
                    <td style={{ fontWeight: 'bold' }}>{tes.namaTes}</td>
                    <td>{tes.materi}</td>
                    <td>{tes.jumlahSoal} soal</td>
                    <td>{tes.waktu} menit</td>
                    <td>{tes.tanggal}</td>
                    <td>
                      <span className={"badge " + (tes.status === 'Aktif' ? 'badge-success' : 'badge-warning')}>
                        {tes.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline" style={{ marginRight: 4 }}><i className="fas fa-edit"></i></button>
                      <button className="btn btn-sm btn-outline" style={{ marginRight: 4 }}><i className="fas fa-random"></i></button>
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
