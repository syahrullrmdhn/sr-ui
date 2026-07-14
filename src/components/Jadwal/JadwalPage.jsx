import { mockJadwal } from '../../data/mockData'

export default function JadwalPage() {
  return (
    <div>
      <h4 style={{ margin: '0 0 20px', color: '#333', fontWeight: 500 }}>
        <i className="fas fa-calendar" style={{ marginRight: 8 }}></i> Jadwal Ujian
      </h4>
      <div className="card-admin">
        <div className="card-header">
          <span>Daftar Jadwal</span>
          <button className="btn btn-primary btn-sm">
            <i className="fas fa-plus"></i> Tambah Jadwal
          </button>
        </div>
        <div className="card-body">
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Tes</th>
                  <th>Tanggal</th>
                  <th>Jam Mulai</th>
                  <th>Jam Selesai</th>
                  <th>Sesi</th>
                  <th>Lokasi</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {mockJadwal.map((j, i) => (
                  <tr key={j.id}>
                    <td>{i + 1}</td>
                    <td style={{ fontWeight: 'bold' }}>{j.namaTes}</td>
                    <td>{j.tanggal}</td>
                    <td>{j.jamMulai}</td>
                    <td>{j.jamSelesai}</td>
                    <td>Sesi {j.sesi}</td>
                    <td>{j.lokasi}</td>
                    <td>
                      <span className={"badge " + (j.status === 'Terjadwal' ? 'badge-success' : 'badge-warning')}>
                        {j.status}
                      </span>
                    </td>
                    <td>
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
