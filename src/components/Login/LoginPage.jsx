import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Particles from '../ui/Particles'
import Button from '../ui/Button'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (username && password) navigate('/admin/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#edf2f9] p-5">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-[880px] flex min-h-[500px] max-md:flex-col max-md:max-w-[450px]">
        {/* Left */}
        <div className="flex-[0_0_40%] bg-gradient-to-br from-accent to-primary-light text-white text-center flex flex-col items-center justify-center p-8 relative overflow-hidden max-md:flex-none max-md:p-6">
          <Particles count={40} color="rgba(255,255,255,0.12)" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-white/15 flex items-center justify-center text-4xl mb-5 backdrop-blur-sm">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <h2 className="text-lg font-medium m-1">KEMENTERIAN PERTAHANAN RI</h2>
            <h2 className="text-lg font-medium m-1">SEKRETARIAT JENDERAL</h2>
            <h6 className="text-[11px] tracking-[3px] uppercase opacity-75 mt-2">SISTEM UJIAN ONLINE</h6>
            <div className="mt-8">
              <p className="text-sm opacity-80 mb-3">Belum Punya Akun?</p>
              <button onClick={() => navigate('/register')} className="bg-transparent border border-white/60 text-white px-6 py-2 rounded-full text-sm cursor-pointer hover:bg-white/10 transition">
                Daftar Sekarang
              </button>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 p-8 flex flex-col justify-center max-md:p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-5">
              <label className="block text-xs text-gray-500 mb-1.5">Username</label>
              <input type="text" className="w-full border-0 border-b border-gray-300 rounded-none px-0 py-2.5 text-sm focus:border-primary focus:ring-0 transition" placeholder="Masukkan username" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div className="mb-5">
              <label className="block text-xs text-gray-500 mb-1.5">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} className="w-full border-0 border-b border-gray-300 rounded-none px-0 py-2.5 text-sm focus:border-primary focus:ring-0 pr-8 transition" placeholder="Masukkan password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <i className={"fas " + (showPw ? 'fa-eye-slash' : 'fa-eye')}></i>
                </button>
              </div>
            </div>
            <Button type="submit" variant="primary" size="lg" rounded className="w-full mt-2">
              Masuk
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
