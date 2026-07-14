import { useNavigate } from 'react-router-dom'
import '../../assets/css/login.css'

export default function RegisterPage() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Pendaftaran berhasil! Silakan login.')
    navigate('/')
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-left">
          <div className="logo-icon">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <h2>KEMENTERIAN PERTAHANAN RI</h2>
          <h2>SEKRETARIAT JENDERAL</h2>
          <h6>SISTEM UJIAN ONLINE</h6>
          <div className="auth-redirect">
            <p>Sudah Punya Akun?</p>
            <button className="btn-outline-light" onClick={() => navigate('/')}>
              Login
            </button>
          </div>
        </div>
        <div className="auth-right">
          <h3>Buat Akun</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input type="text" className="form-control" required />
            </div>
            <div className="form-group">
              <label>Nama</label>
              <input type="text" className="form-control" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" required />
            </div>
            <div className="form-group">
              <label>Telepon</label>
              <input type="number" className="form-control" required />
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
            <div className="form-group">
              <label>Jenis Ujian</label>
              <select className="form-control" required>
                <option value="">-- Pilih --</option>
                <option value="1">Ujian Penyesuaian Kenaikan Pangkat</option>
                <option value="2">Ujian Dinas</option>
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>UO/Kotama</label>
                <select className="form-control" required>
                  <option value="">-- Pilih --</option>
                  <option>Kotama A</option>
                  <option>Kotama B</option>
                </select>
              </div>
              <div className="form-group">
                <label>Satker/Balakpus</label>
                <select className="form-control" required>
                  <option value="">-- Pilih --</option>
                  <option>Satker 1</option>
                  <option>Satker 2</option>
                </select>
              </div>
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
