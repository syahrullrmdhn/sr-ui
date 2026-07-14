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
    <div className="font-sans min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-teal-50/30 p-4 sm:p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden w-full max-w-[920px] flex min-h-[560px] max-md:flex-col relative z-10">
        {/* Left Panel - Premium Banner matching Dashboard style */}
        <div className="flex-[0_0_45%] bg-gradient-to-br from-teal-600 via-emerald-600 to-teal-800 text-white flex flex-col justify-between p-8 md:p-10 relative overflow-hidden max-md:flex-none max-md:p-8">
          <Particles count={45} color="rgba(255,255,255,0.15)" />
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
          
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-lg border border-white/20 shadow-inner">
              <i className="fas fa-laptop-code text-white"></i>
            </div>
            <div>
              <div className="text-xs font-semibold tracking-wider text-teal-100 uppercase">Portal Resmi</div>
              <div className="text-sm font-bold tracking-tight">CBT EXAM SYSTEM</div>
            </div>
          </div>

          <div className="relative z-10 my-8">
            <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[11px] font-semibold tracking-wider border border-white/20 mb-4 text-teal-100">
              VERSI 3.5 PRO
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight mb-3">
              Sistem Ujian Online Berbasis Komputer
            </h2>
            <p className="text-sm text-teal-100/90 leading-relaxed font-normal">
              Platform evaluasi akademik yang aman, cepat, dan transparan untuk sekolah dan lembaga pendidikan.
            </p>
          </div>

          <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-teal-100/80">
            <span>Belum memiliki akun?</span>
            <button 
              type="button"
              onClick={() => navigate('/register')} 
              className="bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-1.5 rounded-lg border border-white/25 transition-all duration-200 cursor-pointer"
            >
              Daftar Sekarang <i className="fas fa-arrow-right ml-1 text-[10px]"></i>
            </button>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-sm mx-auto w-full">
            <div className="mb-8">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-xl mb-4 border border-teal-100 shadow-2xs">
                <i className="fas fa-user-shield"></i>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Selamat Datang!</h3>
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
                    className="text-slate-400 hover:text-slate-600 focus:outline-none p-1 transition-colors"
                  >
                    <i className={`fas ${showPw ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                }
              />

              <div className="flex items-center justify-between pt-1 text-xs">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                  <input type="checkbox" className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 w-4 h-4" />
                  <span>Ingat saya di perangkat ini</span>
                </label>
                <button 
                  type="button" 
                  onClick={() => navigate('/reset')} 
                  className="font-semibold text-teal-600 hover:text-teal-700 transition-colors"
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
                  className="w-full py-3 shadow-md shadow-teal-500/20 text-base font-semibold"
                >
                  Masuk ke Portal
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400">
                &copy; {new Date().getFullYear()} Portal CBT. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
