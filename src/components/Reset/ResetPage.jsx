import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { systemInfo } from '../../data/mockData'

export default function ResetPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{fontFamily:"'Roboto', sans-serif", backgroundColor:'#855b2f'}}>
      <div className="fixed inset-0 z-0" style={{background:'url(/assets/img/pattern.png) repeat-x bottom, #855b2f'}}></div>
      
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="text-center mb-5">
          <div className="w-20 h-20 mx-auto bg-white/20 rounded-lg flex items-center justify-center mb-3">
            <i className="fas fa-graduation-cap text-white text-4xl"></i>
          </div>
          <div className="text-white text-lg font-bold uppercase tracking-wider">{systemInfo.organization}</div>
          <div className="text-white/80 text-sm">{systemInfo.office}</div>
        </div>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6">
            <h4 className="text-lg font-bold text-gray-800 mb-1">Reset Password</h4>
            <p className="text-sm text-gray-500 mb-4">
              Masukkan email yang terdaftar untuk mereset password Anda
            </p>

            {sent ? (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded text-sm mb-4">
                <i className="fas fa-check-circle mr-2"></i>
                Link reset password telah dikirim ke email Anda. Silakan cek inbox.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="relative mb-4">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#855b2f] focus:ring-1 focus:ring-[#855b2f]"
                    placeholder="Email terdaftar"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#855b2f] hover:bg-[#5e3f1f] text-white font-bold rounded text-sm transition-colors"
                >
                  Kirim Link Reset
                </button>
              </form>
            )}

            <div className="text-center mt-4">
              <a 
                href="javascript:void(0)"
                onClick={() => navigate('/')}
                className="text-sm text-[#855b2f] hover:underline"
              >
                ← Kembali ke Login
              </a>
            </div>
          </div>
          <div className="text-center py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
            Kementerian Pertahanan &copy; 2022
          </div>
        </div>
      </div>
    </div>
  )
}
