import { useNavigate } from 'react-router-dom'
import Particles from '../ui/Particles'
import Button from '../ui/Button'

export default function PendaftaranPage() {
  const navigate = useNavigate()
  const handleSubmit = (e) => { e.preventDefault(); alert('Pendaftaran berhasil!'); navigate('/') }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#edf2f9] p-5">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-[950px] flex max-md:flex-col">
        <div className="flex-[0_0_32%] bg-gradient-to-br from-accent to-primary-light text-white text-center flex flex-col items-center justify-center p-6 relative overflow-hidden max-md:flex-none">
          <Particles count={30} color="rgba(255,255,255,0.1)" />
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center text-3xl mb-4 mx-auto"><i className="fas fa-graduation-cap"></i></div>
            <h2 className="text-base font-medium">KEMENTERIAN PERTAHANAN RI</h2>
            <h6 className="text-[10px] tracking-[3px] uppercase opacity-75 mt-1">SISTEM UJIAN ONLINE</h6>
            <button onClick={() => navigate('/')} className="mt-6 bg-transparent border border-white/60 text-white px-5 py-1.5 rounded-full text-sm hover:bg-white/10 transition">Login</button>
          </div>
        </div>
        <div className="flex-1 p-6 max-h-[85vh] overflow-y-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-5">Pendaftaran Peserta Ujian</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-xs text-gray-500 mb-1">Username</label><input className="w-full border-0 border-b border-gray-300 px-0 py-2 text-sm focus:border-primary focus:ring-0" required /></div>
              <div><label className="block text-xs text-gray-500 mb-1">Nama Lengkap</label><input className="w-full border-0 border-b border-gray-300 px-0 py-2 text-sm focus:border-primary focus:ring-0 uppercase" required /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-xs text-gray-500 mb-1">Email</label><input type="email" className="w-full border-0 border-b border-gray-300 px-0 py-2 text-sm focus:border-primary focus:ring-0" required /></div>
              <div><label className="block text-xs text-gray-500 mb-1">Telepon</label><input type="number" className="w-full border-0 border-b border-gray-300 px-0 py-2 text-sm focus:border-primary focus:ring-0" required /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-xs text-gray-500 mb-1">Password</label><input type="password" className="w-full border-0 border-b border-gray-300 px-0 py-2 text-sm focus:border-primary focus:ring-0" required /></div>
              <div><label className="block text-xs text-gray-500 mb-1">Konfirmasi</label><input type="password" className="w-full border-0 border-b border-gray-300 px-0 py-2 text-sm focus:border-primary focus:ring-0" required /></div>
            </div>
            <div><label className="block text-xs text-gray-500 mb-1">NIP</label><input className="w-full border-0 border-b border-gray-300 px-0 py-2 text-sm focus:border-primary focus:ring-0" required /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-xs text-gray-500 mb-1">Jenis Ujian</label><select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"><option>-- Pilih --</option></select></div>
              <div><label className="block text-xs text-gray-500 mb-1">UO/Kotama</label><select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"><option>-- Pilih --</option></select></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-xs text-gray-500 mb-1">Satker</label><select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"><option>-- Pilih --</option></select></div>
              <div><label className="block text-xs text-gray-500 mb-1">Golongan</label><select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"><option>-- Pilih --</option></select></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-xs text-gray-500 mb-1">Pangkat</label><select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"><option>-- Pilih --</option></select></div>
              <div><label className="block text-xs text-gray-500 mb-1">Jabatan</label><select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"><option>-- Pilih --</option></select></div>
            </div>
            <div><label className="block text-xs text-gray-500 mb-1">Pendidikan</label><select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"><option>-- Pilih --</option></select></div>
            <div><label className="block text-xs text-gray-500 mb-1">Universitas</label><input className="w-full border-0 border-b border-gray-300 px-0 py-2 text-sm focus:border-primary focus:ring-0" required /></div>
            <Button type="submit" variant="primary" size="lg" rounded className="w-full mt-2">Daftar</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
