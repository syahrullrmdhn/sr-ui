import { useNavigate } from 'react-router-dom'
import Particles from '../ui/Particles'
import Button from '../ui/Button'

export default function ResetPage() {
  const navigate = useNavigate()
  const handleSubmit = (e) => { e.preventDefault(); alert('Password berhasil direset!'); navigate('/') }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#edf2f9] p-5">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-[700px] flex max-md:flex-col">
        <div className="flex-[0_0_40%] bg-gradient-to-br from-accent to-primary-light text-white text-center flex flex-col items-center justify-center p-8 relative overflow-hidden max-md:flex-none max-md:p-6">
          <Particles count={30} color="rgba(255,255,255,0.1)" />
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center text-3xl mb-4 mx-auto"><i className="fas fa-graduation-cap"></i></div>
            <h2 className="text-base font-medium">SISTEM UJIAN ONLINE</h2>
            <button onClick={() => navigate('/')} className="mt-6 bg-transparent border border-white/60 text-white px-5 py-1.5 rounded-full text-sm hover:bg-white/10 transition">Login</button>
          </div>
        </div>
        <div className="flex-1 p-8 flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Reset Password</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="block text-xs text-gray-500 mb-1">Password Baru</label><input type="password" className="w-full border-0 border-b border-gray-300 px-0 py-2.5 text-sm focus:border-primary focus:ring-0" required /></div>
            <div><label className="block text-xs text-gray-500 mb-1">Konfirmasi Password</label><input type="password" className="w-full border-0 border-b border-gray-300 px-0 py-2.5 text-sm focus:border-primary focus:ring-0" required /></div>
            <Button type="submit" variant="primary" size="lg" rounded className="w-full">Reset</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
