import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Particles from '../ui/Particles'
import Button from '../ui/Button'
import Input from '../ui/Input'

export default function ResetPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Password dan konfirmasi password tidak sama!')
      return
    }
    setLoading(true)
    setTimeout(() => {
      alert('Password berhasil direset! Silakan login dengan password baru.')
      navigate('/')
    }, 500)
  }

  return (
    <div className="font-sans min-h-screen flex items-center justify-center bg-[#f8f5f1] p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#a86e2f]/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#2f69a8]/10 blur-3xl pointer-events-none"></div>

      <div className="bg-white rounded-2xl shadow-xl border border-[#e8d9c7] overflow-hidden w-full max-w-[800px] flex max-md:flex-col relative z-10 font-sans">
        {/* Left Banner - Clean Solid #a86e2f + Floating Bubble Circles ("bubble bubble gitu") */}
        <div className="flex-[0_0_42%] bg-[#a86e2f] text-white text-center flex flex-col items-center justify-center p-8 relative overflow-hidden max-md:flex-none max-md:p-8">
          <Particles count={35} color="rgba(255,255,255,0.2)" />
          {/* Decorative Floating Bubble Circles ("bubble bubble gitu") */}
          <div className="absolute -top-16 -left-16 w-60 h-60 rounded-full bg-white/10 blur-[2px] pointer-events-none animate-bubble"></div>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-[2px] pointer-events-none animate-bubble-delayed"></div>
          <div className="absolute top-1/2 left-1/3 w-28 h-28 rounded-full bg-white/10 blur-[1px] pointer-events-none"></div>
          <div className="absolute top-16 right-10 w-16 h-16 rounded-full bg-white/15 blur-[1px] pointer-events-none animate-bubble"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-3xl mb-5 mx-auto border border-white/20 shadow-inner">
              <i className="fas fa-key text-white"></i>
            </div>
            <div className="text-xs font-semibold tracking-wider text-teal-100 uppercase mb-1">Keamanan Akun</div>
            <h2 className="text-xl font-bold tracking-tight">SISTEM UJIAN ONLINE</h2>
            <p className="text-xs text-teal-100/90 mt-2 max-w-xs">
              Pastikan Anda menggunakan kombinasi password yang kuat dan mudah diingat.
            </p>

            <div className="mt-8 pt-6 border-t border-white/15 w-full">
              <button 
                type="button"
                onClick={() => navigate('/')} 
                className="bg-white/10 hover:bg-white/20 text-white font-medium px-5 py-2 rounded-xl border border-white/25 text-xs transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 mx-auto"
              >
                <i className="fas fa-arrow-left"></i> Kembali ke Login
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center bg-white">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Atur Ulang Password</h3>
            <p className="text-xs md:text-sm text-slate-500 mt-1">Masukkan password baru untuk akun CBT Anda.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              label="Password Baru" 
              type="password" 
              icon="fa-lock" 
              placeholder="Minimal 6 karakter" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
            <Input 
              label="Konfirmasi Password Baru" 
              type="password" 
              icon="fa-lock" 
              placeholder="Ulangi password baru" 
              value={confirmPassword} 
              onChange={e => setConfirmPassword(e.target.value)} 
              required 
            />

            <div className="pt-2">
              <Button type="submit" variant="primary" size="lg" loading={loading} icon="fa-save" className="w-full py-3 shadow-md shadow-teal-500/20 text-base font-semibold">
                Simpan Password Baru
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
