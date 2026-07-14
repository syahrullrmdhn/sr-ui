import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Particles from '../ui/Particles'
import Button from '../ui/Button'
import Input from '../ui/Input'

export default function PendaftaranPage() {
  const [formData, setFormData] = useState({
    username: '',
    nama: '',
    email: '',
    telepon: '',
    password: '',
    confirmPassword: '',
    nip: '',
    jenisUjian: '',
    kotama: '',
    satker: '',
    golongan: '',
    pangkat: '',
    jabatan: '',
    pendidikan: '',
    universitas: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      alert('Pendaftaran peserta ujian berhasil!')
      navigate('/')
    }, 600)
  }

  return (
    <div className="font-sans min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-teal-50/30 p-4 sm:p-6 relative overflow-hidden py-10">
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden w-full max-w-[1020px] flex max-md:flex-col relative z-10">
        {/* Left Banner */}
        <div className="flex-[0_0_35%] bg-gradient-to-br from-teal-600 via-emerald-600 to-teal-800 text-white flex flex-col justify-between p-8 md:p-10 relative overflow-hidden max-md:flex-none max-md:p-8">
          <Particles count={40} color="rgba(255,255,255,0.15)" />
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-lg border border-white/20 shadow-inner">
              <i className="fas fa-file-signature text-white"></i>
            </div>
            <div>
              <div className="text-xs font-semibold tracking-wider text-teal-100 uppercase">Portal Resmi</div>
              <div className="text-sm font-bold tracking-tight">CBT EXAM REGISTRATION</div>
            </div>
          </div>

          <div className="relative z-10 my-8">
            <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[11px] font-semibold tracking-wider border border-white/20 mb-4 text-teal-100">
              PENDAFTARAN PESERTA
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight mb-3">
              Formulir Data Lengkap Peserta
            </h2>
            <p className="text-sm text-teal-100/90 leading-relaxed font-normal">
              Pastikan seluruh informasi kedinasan dan akademik diisi dengan akurat sesuai data SK terakhir Anda.
            </p>
          </div>

          <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-teal-100/80">
            <span>Sudah terdaftar?</span>
            <button 
              type="button"
              onClick={() => navigate('/')} 
              className="bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-1.5 rounded-lg border border-white/25 transition-all duration-200 cursor-pointer"
            >
              Login <i className="fas fa-sign-in-alt ml-1 text-[10px]"></i>
            </button>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="flex-1 p-6 md:p-10 max-h-[90vh] overflow-y-auto bg-white">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Pendaftaran Peserta Ujian</h3>
            <p className="text-xs md:text-sm text-slate-500 mt-1">Lengkapi data pribadi dan kepegawaian di bawah ini.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Username" name="username" icon="fa-user" placeholder="Username" value={formData.username} onChange={handleChange} required />
              <Input label="Nama Lengkap (Sesuai SK)" name="nama" icon="fa-id-card" placeholder="Nama lengkap Anda" value={formData.nama} onChange={handleChange} required className="uppercase" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Email" name="email" type="email" icon="fa-envelope" placeholder="email@contoh.com" value={formData.email} onChange={handleChange} required />
              <Input label="No. Telepon / WhatsApp" name="telepon" type="number" icon="fa-phone" placeholder="0812xxxx" value={formData.telepon} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Password" name="password" type="password" icon="fa-lock" placeholder="Password akun" value={formData.password} onChange={handleChange} required />
              <Input label="Konfirmasi Password" name="confirmPassword" type="password" icon="fa-lock" placeholder="Ulangi password" value={formData.confirmPassword} onChange={handleChange} required />
            </div>

            <Input label="NIP / NIS" name="nip" icon="fa-hashtag" placeholder="Nomor Induk Pegawai" value={formData.nip} onChange={handleChange} required />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">Jenis Ujian</label>
                <div className="relative rounded-xl shadow-2xs">
                  <i className="fas fa-clipboard-list absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none"></i>
                  <select name="jenisUjian" value={formData.jenisUjian} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/60 border border-slate-200/80 rounded-xl text-slate-800 focus:bg-white focus:border-teal-500 outline-none">
                    <option value="">-- Pilih Jenis Ujian --</option>
                    <option value="Ujian Penyesuaian Kenaikan Pangkat">Ujian Penyesuaian Kenaikan Pangkat</option>
                    <option value="Ujian Dinas">Ujian Dinas</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">UO / Kotama</label>
                <div className="relative rounded-xl shadow-2xs">
                  <i className="fas fa-building absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none"></i>
                  <select name="kotama" value={formData.kotama} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/60 border border-slate-200/80 rounded-xl text-slate-800 focus:bg-white focus:border-teal-500 outline-none">
                    <option value="">-- Pilih Kotama --</option>
                    <option value="Kotama A">Kotama A</option>
                    <option value="Kotama B">Kotama B</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">Satker / Unit</label>
                <div className="relative rounded-xl shadow-2xs">
                  <i className="fas fa-sitemap absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none"></i>
                  <select name="satker" value={formData.satker} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/60 border border-slate-200/80 rounded-xl text-slate-800 focus:bg-white focus:border-teal-500 outline-none">
                    <option value="">-- Pilih Satker --</option>
                    <option value="Satker 1">Satker 1</option>
                    <option value="Satker 2">Satker 2</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">Golongan</label>
                <div className="relative rounded-xl shadow-2xs">
                  <i className="fas fa-layer-group absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none"></i>
                  <select name="golongan" value={formData.golongan} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/60 border border-slate-200/80 rounded-xl text-slate-800 focus:bg-white focus:border-teal-500 outline-none">
                    <option value="">-- Pilih Golongan --</option>
                    <option value="III/a">III/a - Penata Muda</option>
                    <option value="III/b">III/b - Penata Muda Tk. I</option>
                    <option value="III/c">III/c - Penata</option>
                    <option value="III/d">III/d - Penata Tk. I</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">Pangkat</label>
                <div className="relative rounded-xl shadow-2xs">
                  <i className="fas fa-star absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none"></i>
                  <select name="pangkat" value={formData.pangkat} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/60 border border-slate-200/80 rounded-xl text-slate-800 focus:bg-white focus:border-teal-500 outline-none">
                    <option value="">-- Pilih Pangkat --</option>
                    <option value="Penata Muda">Penata Muda</option>
                    <option value="Penata">Penata</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">Jabatan</label>
                <div className="relative rounded-xl shadow-2xs">
                  <i className="fas fa-briefcase absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none"></i>
                  <select name="jabatan" value={formData.jabatan} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/60 border border-slate-200/80 rounded-xl text-slate-800 focus:bg-white focus:border-teal-500 outline-none">
                    <option value="">-- Pilih Jabatan --</option>
                    <option value="Staf Pelaksana">Staf Pelaksana</option>
                    <option value="Kepala Subbagian">Kepala Subbagian</option>
                    <option value="Analis Fungsional">Analis Fungsional</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 tracking-wide uppercase">Pendidikan Terakhir</label>
                <div className="relative rounded-xl shadow-2xs">
                  <i className="fas fa-user-graduate absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none"></i>
                  <select name="pendidikan" value={formData.pendidikan} onChange={handleChange} className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/60 border border-slate-200/80 rounded-xl text-slate-800 focus:bg-white focus:border-teal-500 outline-none">
                    <option value="">-- Pilih Pendidikan --</option>
                    <option value="D3">D3 (Diploma III)</option>
                    <option value="S1/D4">S1 / D4 (Sarjana)</option>
                    <option value="S2">S2 (Magister)</option>
                  </select>
                </div>
              </div>

              <Input label="Universitas / Asal Kampus" name="universitas" icon="fa-university" placeholder="Nama Universitas / Perguruan Tinggi" value={formData.universitas} onChange={handleChange} required />
            </div>

            <div className="pt-3">
              <Button type="submit" variant="primary" size="lg" loading={loading} icon="fa-paper-plane" className="w-full py-3 shadow-md shadow-teal-500/20 text-base font-semibold">
                Kirim Pendaftaran Peserta
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
