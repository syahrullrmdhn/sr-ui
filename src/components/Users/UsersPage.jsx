import { useState } from 'react'
import { mockUsers } from '../../data/mockData'

export default function UsersPage() {
  const [search, setSearch] = useState('')

  const filtered = mockUsers.filter(u =>
    u.nama.toLowerCase().includes(search.toLowerCase()) ||
    u.username.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h4 style={{ margin: '0 0 20px', color: '#333', fontWeight: 500 }}>
        <i className="fas fa-users" style={{ marginRight: 8 }}></i> Manajemen Users
      </h4>
      <div className="card-admin">
        <div className="card-header">
          <span>Daftar Users</span>
          <button className="btn btn-primary btn-sm">
            <i className="fas fa-plus"></i> Tambah User
          </button>
        </div>
        <div className="card-body">
          <div style={{ marginBottom: 15, display: 'flex', gap: 10 }}>
            <input
              type="text"
              className="form-control"
              placeholder="Cari user..."
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
                  <th>Username</th>
                  <th>Nama</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Terakhir Login</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user, i) => (
                  <tr key={user.id}>
                    <td>{i + 1}</td>
                    <td style={{ fontWeight: 'bold' }}>{user.username}</td>
                    <td>{user.nama}</td>
                    <td><span className="badge badge-primary">{user.role}</span></td>
                    <td>{user.email}</td>
                    <td>
                      <span className={"badge " + (user.status === 'Aktif' ? 'badge-success' : 'badge-danger')}>
                        {user.status}
                      </span>
                    </td>
                    <td>{user.lastLogin}</td>
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
