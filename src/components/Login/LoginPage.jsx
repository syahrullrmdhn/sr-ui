import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../assets/css/login.css'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    // Mock login - navigate to admin
    if (username && password) {
      navigate('/admin/dashboard')
    }
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
            <p>Belum Punya Akun?</p>
            <button className="btn-outline-light" onClick={() => navigate('/register')}>
              Daftar Sekarang
            </button>
          </div>
        </div>
        <div className="auth-right">
          <h3>Login</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={"fas " + (showPassword ? 'fa-eye-slash' : 'fa-eye')}></i>
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
