import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Particles from '../ui/Particles'
import Button from '../ui/Button'
import Input from '../ui/Input'

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
        navigate('/admin/dashboard')
      }, 500)
    }
  }

  return (
    <div className="font-sans min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-[#fdfaf6] to-[#fbeecb]/40 p-4 sm:p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#a86e2f]/15 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#d99244]/15 blur-3xl pointer-events-none"></div>

      <div className="bg-white rounded-2xl shadow-xl border border-[#e8d9c7] overflow-hidden w-full max-w-[920px] flex min-h-[560px] max-md:flex-col relative z-10 font-sans">
        {/* Left Panel - Clean Solid #a86e2f + Floating Bubble Circles ("bubble bubble gitu") */}
        <div className="flex-[0_0_45%] bg-[#a86e2f] text-white flex flex-col justify-between p-8 md:p-10 relative overflow-hidden max-md:flex-none max-md:p-8">
          <Particles count={35} color="rgba(255,255,255,0.2)" />
          {/* Decorative Floating Bubble Circles ("bubble bubble gitu") */}
          <div className="absolute -top-16 -left-16 w-60 h-60 rounded-full bg-white/10 blur-[2px] pointer-events-none animate-bubble"></div>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-[2px] pointer-events-none animate-bubble-delayed"></div>
          <div className="absolute top-1/2 left-1/3 w-28 h-28 rounded-full bg-white/10 blur-[1px] pointer-events-none"></div>
          <div className="absolute top-16 right-10 w-16 h-16 rounded-full bg-white/15 blur-[1px] pointer-events-none animate-bubble"></div>
          
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-lg border border-white/20 shadow-inner text-amber-200">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div>
              <div className="text-xs font-semibold tracking-wider text-amber-100 uppercase">Portal Resmi</div>
              <div className="text-sm font-bold tracking-tight text-white">CBT EXAM SYSTEM</div>
            </div>
          </div>

          <div className="relative z-10 my-8">
            <div className="inline-block px-3.5 py-1 bg-white/15 backdrop-blur-md rounded-full text-[11px] font-bold tracking-wider border border-white/25 mb-4 text-amber-100 shadow-2xs flex items-center gap-1.5 w-fit">
              <i className="fas fa-sparkles text-amber-300 text-xs"></i> VERSI 3.5 BRONZE PRO
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight mb-3 text-white">
              Sistem Ujian Online Berbasis Komputer
            </h2>
            <p className="text-sm text-amber-100/90 leading-relaxed font-normal">
              Platform evaluasi akademik yang aman, cepat, dan transparan untuk sekolah dan lembaga pemerintahan.
            </p>
          </div>

          <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-amber-100/90">
            <span>Belum memiliki akun?</span>
            <button 
              type="button"
              onClick={() => navigate('/register')} 
              className="bg-white/15 hover:bg-white/25 text-white font-semibold px-4 py-1.5 rounded-lg border border-white/30 transition-all duration-200 cursor-pointer shadow-xs"
            >
              Daftar Sekarang <i className="fas fa-arrow-right ml-1 text-[10px]"></i>
            </button>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-sm mx-auto w-full">
            <div className="mb-8">
              <div className="w-14 h-14 rounded-2xl bg-[#fbeecb] text-[#a86e2f] flex items-center justify-center text-2xl mb-4 border border-[#f5dc97] shadow-sm">
                <i className="fas fa-user-shield"></i>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">Selamat Datang!</h3>
              <p className="text-sm text-slate-500 mt-1">Silakan masuk menggunakan kredensial akun Anda.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="Username / NIP / NIS"
                icon="fa-user"
                placeholder="Masukkan username atau NIP"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />

              <Input
                label="Password"
                icon="fa-lock"
                type={showPw ? 'text' : 'password'}
                placeholder="Masukkan password Anda"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                rightAction={
                  <button 
                    type="button" 
                    onClick={() => setShowPw(!showPw)} 
                    className="text-slate-400 hover:text-[#a86e2f] focus:outline-none p-1 transition-colors cursor-pointer"
                  >
                    <i className={`fas ${showPw ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                }
              />

              <div className="flex items-center justify-between pt-1 text-xs">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                  <input type="checkbox" className="rounded border-slate-300 text-[#a86e2f] focus:ring-[#a86e2f] w-4 h-4" />
                  <span className="font-medium">Ingat saya di perangkat ini</span>
                </label>
                <button 
                  type="button" 
                  onClick={() => navigate('/reset')} 
                  className="font-bold text-[#a86e2f] hover:text-[#8c5822] transition-colors cursor-pointer"
                >
                  Lupa Password?
                </button>
              </div>

              <div className="pt-2">
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  loading={loading}
                  icon="fa-sign-in-alt"
                  className="w-full py-3.5 shadow-lg shadow-[#a86e2f]/25 text-base font-bold"
                >
                  Masuk ke Portal
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400 font-medium">
                &copy; {new Date().getFullYear()} CBT Exam System. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
