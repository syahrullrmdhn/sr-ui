import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { systemInfo } from '../../data/mockData'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: '', nama: '', email: '', telepon: '', 
    password: '', confirm_password: '', nip: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (field, value) => setForm(p => ({...p, [field]: value}))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/')
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{fontFamily:"'Roboto', sans-serif", backgroundColor:'#edf2f9'}}>
      <div className="w-full max-w-[900px]">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Panel - Gradient */}
            <div className="md:w-5/12 text-white text-center relative overflow-hidden" style={{background:'linear-gradient(-45deg, #bd895f, #CC9C75)'}}>
              <div className="relative z-10 p-6 md:p-10 flex flex-col justify-between min-h-full">
                <div className="mt-4 md:mt-8">
                  <div className="mb-4">
                    <div className="w-20 h-20 mx-auto bg-white/20 rounded-lg flex items-center justify-center">
                      <i className="fas fa-graduation-cap text-white text-4xl"></i>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm">
                    <span className="text-xs">{systemInfo.organization}</span><br/>
                    <span className="text-xs">{systemInfo.office}</span><br/>
                    <span className="text-[10px] font-bold">{systemInfo.name}</span>
                  </p>
                </div>

                <div className="mt-6 mb-4">
                  <p className="text-sm">Sudah Punya Akun ?</p>
                  <button 
                    onClick={() => navigate('/')}
                    className="mt-2 px-6 py-2 border border-white text-white rounded text-sm font-semibold hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Login
                  </button>
                </div>
              </div>
              {/* Decorative background shape */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-white/5" style={{clipPath:'ellipse(70% 100% at 50% 100%)'}}></div>
            </div>

            {/* Right Panel - Form */}
            <div className="md:w-7/12 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Buat Akun</h3>
              
              <form onSubmit={handleSubmit}>
                {[
                  { label: 'Username', field: 'username', type: 'text', required: true },
                  { label: 'Nama', field: 'nama', type: 'text', required: true },
                  { label: 'Email', field: 'email', type: 'email', required: true },
                  { label: 'Telepon', field: 'telepon', type: 'number', required: true },
                  { label: 'NIP', field: 'nip', type: 'text', required: true },
                ].map(({label, field, type, required}) => (
                  <div key={field} className="mb-3">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
                    <input
                      type={type}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#855b2f] focus:ring-1 focus:ring-[#855b2f]"
                      value={form[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      required={required}
                    />
                  </div>
                ))}

                <div className="flex gap-3 mb-3">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Password</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#855b2f] focus:ring-1 focus:ring-[#855b2f]"
                      value={form.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Konfirmasi Password</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#855b2f] focus:ring-1 focus:ring-[#855b2f]"
                      value={form.confirm_password}
                      onChange={(e) => handleChange('confirm_password', e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Select fields */}
                {[
                  { label: 'Jenis Ujian', field: 'kegiatan_id' },
                  { label: 'UO/Kotama', field: 'kotama_id' },
                  { label: 'Satker/Balakpus', field: 'satker_id' },
                  { label: 'Golongan', field: 'golongan_id' },
                  { label: 'Pangkat', field: 'pangkat_id' },
                  { label: 'Jabatan', field: 'jabatan_id' },
                ].map(({label, field}) => (
                  <div key={field} className="mb-3">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#855b2f] bg-white"
                      defaultValue=""
                    >
                      <option value="" disabled>-- Pilih {label} --</option>
                      <option value="1">Opsi 1</option>
                      <option value="2">Opsi 2</option>
                    </select>
                  </div>
                ))}

                <div className="mb-3">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Pendidikan</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#855b2f] bg-white" defaultValue="">
                    <option value="" disabled>-- Pilih Pendidikan --</option>
                    <option value="S1">S1</option>
                    <option value="S2">S2</option>
                    <option value="S3">S3</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Universitas</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#855b2f] focus:ring-1 focus:ring-[#855b2f]"
                    placeholder="Nama Universitas"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#855b2f] hover:bg-[#5e3f1f] text-white font-bold rounded text-sm transition-colors disabled:opacity-50"
                >
                  {loading ? 'Mendaftarkan...' : 'Daftar'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
