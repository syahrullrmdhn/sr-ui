import { useNavigate } from 'react-router-dom'
import '../../assets/css/login.css'

export default function PendaftaranPage() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Pendaftaran berhasil! Silakan tunggu verifikasi.')
    navigate('/')
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card" style={{ maxWidth: 950 }}>
        <div className="auth-left" style={{ flex: '0 0 35%' }}>
          <div className="logo-icon">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <h2>KEMENTERIAN PERTAHANAN RI</h2>
          <h6>SISTEM UJIAN ONLINE</h6>
          <div className="auth-redirect">
            <p>Sudah Punya Akun?</p>
            <button className="btn-outline-light" onClick={() => navigate('/')}>
              Login
            </button>
          </div>
        </div>
        <div className="auth-right" style={{ padding: 25 }}>
          <h3>Pendaftaran Peserta Ujian</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input type="text" className="form-control" required style={{ textTransform: 'uppercase' }} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" required />
              </div>
              <div className="form-group">
                <label>Telepon</label>
                <input type="number" className="form-control" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" required />
              </div>
              <div className="form-group">
                <label>Konfirmasi Password</label>
                <input type="password" className="form-control" required />
              </div>
            </div>
            <div className="form-group">
              <label>NIP</label>
              <input type="text" className="form-control" required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Jenis Ujian</label>
                <select className="form-control" required>
                  <option value="">-- Pilih --</option>
                  <option>Ujian Penyesuaian Kenaikan Pangkat</option>
                  <option>Ujian Dinas</option>
                </select>
              </div>
              <div className="form-group">
                <label>UO/Kotama</label>
                <select className="form-control" required>
                  <option value="">-- Pilih --</option>
                  <option>Kotama A</option>
                  <option>Kotama B</option>
                  <option>Kotama C</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Satker/Balakpus</label>
                <select className="form-control" required>
                  <option value="">-- Pilih --</option>
                  <option>Satker 1</option>
                  <option>Satker 2</option>
                </select>
              </div>
              <div className="form-group">
                <label>Golongan</label>
                <select className="form-control" required>
                  <option value="">-- Pilih --</option>
                  <option>III-a</option>
                  <option>III-b</option>
                  <option>III-c</option>
                  <option>III-d</option>
                  <option>IV-a</option>
                  <option>IV-b</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Pangkat</label>
                <select className="form-control" required>
                  <option value="">-- Pilih --</option>
                  <option>Penata Muda</option>
                  <option>Penata</option>
                  <option>Pembina</option>
                </select>
              </div>
              <div className="form-group">
                <label>Jabatan</label>
                <select className="form-control" required>
                  <option value="">-- Pilih --</option>
                  <option>Staf</option>
                  <option>Kepala Sub Bagian</option>
                  <option>Kepala Bagian</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Pendidikan</label>
              <select className="form-control" required>
                <option value="">-- Pilih --</option>
                <option>SMA</option>
                <option>D3</option>
                <option>S1</option>
                <option>S2</option>
              </select>
            </div>
            <div className="form-group">
              <label>Universitas</label>
              <input type="text" className="form-control" required />
            </div>
            <button type="submit" className="btn btn-primary">
              Daftar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
