import { useNavigate } from 'react-router-dom'
import '../../assets/css/login.css'

export default function ResetPage() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Password berhasil direset! Silakan login.')
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
          <h3>Reset Password</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Password Baru</label>
              <input type="password" className="form-control" required />
            </div>
            <div className="form-group">
              <label>Konfirmasi Password</label>
              <input type="password" className="form-control" required />
            </div>
            <button type="submit" className="btn btn-primary">
              Reset
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
