import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Particles from '../ui/Particles'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'

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
    <div className="font-sans min-h-screen flex items-center justify-center bg-[#f8f5f1] p-4 sm:p-6 relative overflow-hidden py-10">
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#a86e2f]/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#2f69a8]/10 blur-3xl pointer-events-none"></div>

      <div className="bg-white rounded-2xl shadow-xl border border-[#e8d9c7] overflow-hidden w-full max-w-[1020px] flex max-md:flex-col relative z-10 font-sans">
        {/* Left Banner - Clean Solid #a86e2f + Floating Bubble Circles ("bubble bubble gitu") */}
        <div className="flex-[0_0_35%] bg-[#a86e2f] text-white flex flex-col justify-between p-8 md:p-10 relative overflow-hidden max-md:flex-none max-md:p-8">
          <Particles count={35} color="rgba(255,255,255,0.2)" />
          {/* Decorative Floating Bubble Circles ("bubble bubble gitu") */}
          <div className="absolute -top-16 -left-16 w-60 h-60 rounded-full bg-white/10 blur-[2px] pointer-events-none animate-bubble"></div>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-[2px] pointer-events-none animate-bubble-delayed"></div>
          <div className="absolute top-1/2 left-1/3 w-28 h-28 rounded-full bg-white/10 blur-[1px] pointer-events-none"></div>
          <div className="absolute top-16 right-10 w-16 h-16 rounded-full bg-white/15 blur-[1px] pointer-events-none animate-bubble"></div>

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
              <Select
                label="Jenis Ujian"
                name="jenisUjian"
                icon="fa-clipboard-list"
                value={formData.jenisUjian}
                onChange={handleChange}
                emptyText="-- Pilih Jenis Ujian --"
                options={[
                  { key: 'Ujian Penyesuaian Kenaikan Pangkat', value: 'Ujian Penyesuaian Kenaikan Pangkat' },
                  { key: 'Ujian Dinas', value: 'Ujian Dinas' },
                ]}
              />

              <Select
                label="UO / Kotama"
                name="kotama"
                icon="fa-building"
                value={formData.kotama}
                onChange={handleChange}
                emptyText="-- Pilih Kotama --"
                options={[
                  { key: 'Kotama A', value: 'Kotama A' },
                  { key: 'Kotama B', value: 'Kotama B' },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Satker / Unit"
                name="satker"
                icon="fa-sitemap"
                value={formData.satker}
                onChange={handleChange}
                emptyText="-- Pilih Satker --"
                options={[
                  { key: 'Satker 1', value: 'Satker 1' },
                  { key: 'Satker 2', value: 'Satker 2' },
                ]}
              />

              <Select
                label="Golongan"
                name="golongan"
                icon="fa-layer-group"
                value={formData.golongan}
                onChange={handleChange}
                emptyText="-- Pilih Golongan --"
                options={[
                  { key: 'III/a', value: 'III/a - Penata Muda' },
                  { key: 'III/b', value: 'III/b - Penata Muda Tk. I' },
                  { key: 'III/c', value: 'III/c - Penata' },
                  { key: 'III/d', value: 'III/d - Penata Tk. I' },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Pangkat"
                name="pangkat"
                icon="fa-star"
                value={formData.pangkat}
                onChange={handleChange}
                emptyText="-- Pilih Pangkat --"
                options={[
                  { key: 'Penata Muda', value: 'Penata Muda' },
                  { key: 'Penata', value: 'Penata' },
                ]}
              />

              <Select
                label="Jabatan"
                name="jabatan"
                icon="fa-briefcase"
                value={formData.jabatan}
                onChange={handleChange}
                emptyText="-- Pilih Jabatan --"
                options={[
                  { key: 'Staf Pelaksana', value: 'Staf Pelaksana' },
                  { key: 'Kepala Subbagian', value: 'Kepala Subbagian' },
                  { key: 'Analis Fungsional', value: 'Analis Fungsional' },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Pendidikan Terakhir"
                name="pendidikan"
                icon="fa-user-graduate"
                value={formData.pendidikan}
                onChange={handleChange}
                emptyText="-- Pilih Pendidikan --"
                options={[
                  { key: 'D3', value: 'D3 (Diploma III)' },
                  { key: 'S1/D4', value: 'S1 / D4 (Sarjana)' },
                  { key: 'S2', value: 'S2 (Magister)' },
                ]}
              />

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
