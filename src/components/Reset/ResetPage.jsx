import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { systemInfo } from '../../data/mockData'

export default function ResetPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Password tidak cocok!')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1000)
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{fontFamily: "'Roboto', sans-serif", backgroundColor: '#edf2f9'}}
    >
      <div className="w-full py-3" style={{maxWidth: '900px'}}>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row h-full">
            
            {/* Left Panel - Gradient with Logo & Info */}
            <div 
              className="md:w-5/12 text-white text-center relative overflow-hidden"
              style={{background: 'linear-gradient(-45deg, #bd895f, #CC9C75)'}}
            >
              {/* Background shape */}
              <div 
                className="absolute bottom-0 left-0 right-0 z-0"
                style={{
                  backgroundImage: 'url(/assets/img/half-circle.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'bottom',
                  minHeight: '200px',
                  opacity: 0.3
                }}
              />
              
              <div className="relative z-[1] p-4 md:p-8 flex flex-col justify-between min-h-full">
                <div className="pt-4 md:pt-8">
                  {/* Logo */}
                  <div className="mb-4">
                    <div className="w-20 h-20 mx-auto bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <img src="/assets/img/logo-white.png" alt="Logo" className="w-16 h-16 object-contain"
                        onError={(e) => { e.target.style.display='none'; e.target.parentElement.innerHTML='<i class="fas fa-graduation-cap text-white text-4xl"></i>' }}
                      />
                    </div>
                  </div>
                  {/* System Info */}
                  <p className="text-white/75 text-center">
                    <span className="text-xs">{systemInfo.organization}</span><br/>
                    <span className="text-xs">{systemInfo.office}</span><br/>
                    <span className="text-[10px] font-bold">{systemInfo.name}</span>
                  </p>
                </div>

                <div className="mt-4 mb-4">
                  <p className="pt-3 text-sm">Sudah Punya Akun ?</p>
                  <button 
                    onClick={() => navigate('/')}
                    className="mt-2 px-6 py-2 border border-white text-white rounded text-sm font-semibold hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>

            {/* Right Panel - Reset Form */}
            <div className="md:w-7/12 flex items-center">
              <div className="p-4 md:p-6 flex-grow">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Reset Password</h3>
                
                {success ? (
                  <div>
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded text-sm mb-4">
                      <i className="fas fa-check-circle mr-2"></i>
                      Password berhasil direset! Silakan login dengan password baru.
                    </div>
                    <button
                      onClick={() => navigate('/')}
                      className="w-full py-3 bg-[#855b2f] hover:bg-[#5e3f1f] text-white font-bold rounded text-sm transition-colors"
                    >
                      Kembali ke Login
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Password Baru</label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#855b2f] focus:ring-1 focus:ring-[#855b2f]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoFocus
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Konfirmasi Password</label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#855b2f] focus:ring-1 focus:ring-[#855b2f]"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-[#855b2f] hover:bg-[#5e3f1f] text-white font-bold rounded text-sm transition-colors disabled:opacity-50 mt-3"
                    >
                      {loading ? 'Mereset...' : 'Reset'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
