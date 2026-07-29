import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { systemInfo } from '../../data/mockData'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (username && password) {
      setLoading(true)
      setTimeout(() => {
        if (username === 'admin') {
          navigate('/admin/dashboard')
        } else {
          navigate('/peserta/exam')
        }
      }, 500)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{fontFamily:"'Roboto', sans-serif", backgroundColor:'#855b2f'}}>
      {/* Background pattern */}
      <div className="fixed inset-0 z-0" style={{background:'url(/assets/img/pattern.png) repeat-x bottom, #855b2f'}}></div>
      
      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo & System Info Header */}
        <div className="text-center mb-5">
          <div className="mb-3">
            <div className="w-20 h-20 mx-auto bg-white/20 rounded-lg flex items-center justify-center">
              <i className="fas fa-graduation-cap text-white text-4xl"></i>
            </div>
          </div>
          <div className="text-white text-lg font-bold uppercase tracking-wider mb-1">
            {systemInfo.organization}
          </div>
          <div className="white text-white/90 text-sm">
            {systemInfo.office}
          </div>
          <div className="text-white/70 text-xs font-bold uppercase tracking-[4px] mt-1">
            {systemInfo.name}
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6">
            <h4 className="text-lg font-bold text-gray-800 mb-1">Selamat Datang</h4>
            <p className="text-sm text-gray-500 mt-3 mb-4">
              Silahkan login dengan username dan password yang Anda miliki
            </p>

            <form onSubmit={handleLogin}>
              {/* Username */}
              <div className="relative mb-4">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  <i className="fas fa-user"></i>
                </span>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#855b2f] focus:ring-1 focus:ring-[#855b2f] transition-colors"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              {/* Password */}
              <div className="relative mb-4">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  <i className="fas fa-lock"></i>
                </span>
                <input
                  type={showPw ? 'text' : 'password'}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#855b2f] focus:ring-1 focus:ring-[#855b2f] transition-colors"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 text-sm"
                  onClick={() => setShowPw(!showPw)}
                >
                  <i className={`fas ${showPw ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </span>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#855b2f] hover:bg-[#5e3f1f] text-white font-bold rounded text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="fas fa-spinner fa-spin text-sm"></span>
                    Loading...
                  </>
                ) : (
                  'Login'
                )}
              </button>

              {/* Forgot Password Link */}
              <div className="text-center mt-4">
                <a 
                  href="javascript:void(0)" 
                  className="text-sm text-[#855b2f] hover:underline"
                >
                  Lupa Password ?
                </a>
              </div>
            </form>
          </div>

          {/* Card Footer */}
          <div className="text-center py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
            Kementerian Pertahanan &copy; 2022
          </div>
        </div>
      </div>
    </div>
  )
}
