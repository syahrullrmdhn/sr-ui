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
    <div className="font-sans min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-teal-50/30 p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden w-full max-w-[800px] flex max-md:flex-col relative z-10">
        <div className="flex-[0_0_42%] bg-gradient-to-br from-teal-600 via-emerald-600 to-teal-800 text-white text-center flex flex-col items-center justify-center p-8 relative overflow-hidden max-md:flex-none max-md:p-8">
          <Particles count={35} color="rgba(255,255,255,0.15)" />
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>

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
