import { useNavigate } from 'react-router-dom'
import Particles from '../ui/Particles'
import Button from '../ui/Button'

export default function RegisterPage() {
  const navigate = useNavigate()
  const handleSubmit = (e) => { e.preventDefault(); alert('Pendaftaran berhasil!'); navigate('/') }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#edf2f9] p-5">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-[880px] flex max-md:flex-col max-md:max-w-[450px]">
        <div className="flex-[0_0_35%] bg-gradient-to-br from-accent to-primary-light text-white text-center flex flex-col items-center justify-center p-8 relative overflow-hidden max-md:flex-none max-md:p-6">
          <Particles count={35} color="rgba(255,255,255,0.1)" />
          <div className="relative z-10">
            <div className="w-20 h-20 rounded-full bg-white/15 flex items-center justify-center text-4xl mb-5 mx-auto"><i className="fas fa-graduation-cap"></i></div>
            <h2 className="text-lg font-medium">KEMENTERIAN PERTAHANAN RI</h2>
            <h6 className="text-[11px] tracking-[3px] uppercase opacity-75 mt-2">SISTEM UJIAN ONLINE</h6>
            <div className="mt-8">
              <p className="text-sm opacity-80 mb-3">Sudah Punya Akun?</p>
              <button onClick={() => navigate('/')} className="bg-transparent border border-white/60 text-white px-6 py-2 rounded-full text-sm hover:bg-white/10 transition">Login</button>
            </div>
          </div>
        </div>
        <div className="flex-1 p-6 max-h-[85vh] overflow-y-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-5">Buat Akun</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div><label className="block text-xs text-gray-500 mb-1">Username</label><input className="w-full border-0 border-b border-gray-300 px-0 py-2 text-sm focus:border-primary focus:ring-0" required /></div>
            <div><label className="block text-xs text-gray-500 mb-1">Nama</label><input className="w-full border-0 border-b border-gray-300 px-0 py-2 text-sm focus:border-primary focus:ring-0" required /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-xs text-gray-500 mb-1">Email</label><input type="email" className="w-full border-0 border-b border-gray-300 px-0 py-2 text-sm focus:border-primary focus:ring-0" required /></div>
              <div><label className="block text-xs text-gray-500 mb-1">Telepon</label><input type="number" className="w-full border-0 border-b border-gray-300 px-0 py-2 text-sm focus:border-primary focus:ring-0" required /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-xs text-gray-500 mb-1">Password</label><input type="password" className="w-full border-0 border-b border-gray-300 px-0 py-2 text-sm focus:border-primary focus:ring-0" required /></div>
              <div><label className="block text-xs text-gray-500 mb-1">Konfirmasi Password</label><input type="password" className="w-full border-0 border-b border-gray-300 px-0 py-2 text-sm focus:border-primary focus:ring-0" required /></div>
            </div>
            <div><label className="block text-xs text-gray-500 mb-1">NIP</label><input className="w-full border-0 border-b border-gray-300 px-0 py-2 text-sm focus:border-primary focus:ring-0" required /></div>
            <div><label className="block text-xs text-gray-500 mb-1">Jenis Ujian</label><select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"><option>-- Pilih --</option><option>Ujian Penyesuaian Kenaikan Pangkat</option><option>Ujian Dinas</option></select></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-xs text-gray-500 mb-1">UO/Kotama</label><select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"><option>-- Pilih --</option><option>Kotama A</option><option>Kotama B</option></select></div>
              <div><label className="block text-xs text-gray-500 mb-1">Satker</label><select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"><option>-- Pilih --</option><option>Satker 1</option><option>Satker 2</option></select></div>
            </div>
            <Button type="submit" variant="primary" size="lg" rounded className="w-full mt-2">Daftar</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
