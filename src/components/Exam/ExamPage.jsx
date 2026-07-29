import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { systemInfo } from '../../data/mockData'

export default function ExamPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('home')

  const tabs = [
    { id: 'home', icon: 'fa-home', label: 'Home' },
    { id: 'profile', icon: 'fa-user', label: 'Profile' },
    { id: 'jadwal', icon: 'fa-calendar', label: 'Jadwal Ujian' },
    { id: 'kartu', icon: 'fa-id-card', label: 'Kartu Peserta' },
  ]

  const peserta = {
    nopes: 'PST-001',
    nama: 'AHMAD FAUZI',
    nip: '198501012010011001',
    tmp_lahir: 'Jakarta',
    tgl_lahir: '1 Januari 1985',
    gender: 'Laki-laki',
    nama_kotama: 'Kotama A - Sekretariat Jenderal',
    nama_ou: 'Satker 1 - Biro SDM dan Organisasi',
    pangkat: 'Pembina / IV-a',
    jabatan: 'Analis Kepegawaian Madya',
  }

  const tes = [
    { nama_tes: 'Tes Kompetensi Dasar & Pengetahuan Umum', tanggal: '20 Juli 2026', benar: 85, persen: 85 },
    { nama_tes: 'Tes Bahasa Indonesia & Bahasa Inggris', tanggal: '20 Juli 2026', benar: 78, persen: 78 },
  ]

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Sidebar - Photo + Nav Pills */}
          <div className="w-full md:w-1/4 p-4 border-r border-gray-200">
            {/* Photo */}
            <div className="w-[150px] h-[150px] rounded-full overflow-hidden bg-gray-100 border-4 border-gray-200 mx-auto mb-3 mt-2">
              <div className="w-full h-full flex items-center justify-center text-5xl text-gray-300">
                <i className="fas fa-user"></i>
              </div>
            </div>
            <div className="text-center font-bold text-sm mt-1">{peserta.nopes}</div>
            <div className="text-center text-sm text-gray-600 mb-4">{peserta.nama}</div>

            {/* Nav Pills */}
            <div className="flex flex-col gap-1">
              {tabs.map(tab => (
                <a
                  key={tab.id}
                  href="javascript:void(0)"
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded text-sm transition-all duration-200"
                  style={{
                    color: activeTab === tab.id ? '#fff' : '#855b2f',
                    backgroundColor: activeTab === tab.id ? '#855b2f' : 'transparent',
                    fontWeight: activeTab === tab.id ? '600' : '400',
                  }}
                >
                  <span className={`fas ${tab.icon} w-5`}></span>
                  {tab.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full md:w-3/4 p-4">
            <div className="border border-gray-200 rounded-lg p-4 min-h-[400px]">
              
              {/* Home Tab */}
              {activeTab === 'home' && (
                <div>
                  <h6 className="font-bold text-base mb-4 flex items-center gap-2">
                    <span className="fas fa-comments mr-2 text-[#855b2f]"></span>
                    Selamat Datang {peserta.nama}
                  </h6>

                  {/* Alert info */}
                  <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded text-sm mb-4">
                    Peserta {peserta.nopes} sudah diterima. Silakan cek jadwal ujian di menu Jadwal Ujian.
                  </div>

                  {/* Score Cards */}
                  {tes.map((row, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4 flex items-center gap-4">
                      {/* Circular Progress */}
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="3"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#855b2f"
                            strokeWidth="3"
                            strokeDasharray={`${row.persen}, 100`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold text-[#855b2f]">{row.benar}</span>
                        </div>
                      </div>

                      <div>
                        <div className="font-bold text-sm text-gray-800">{row.nama_tes}</div>
                        <div className="text-xs text-gray-500 mt-1">{row.tanggal}</div>
                      </div>
                    </div>
                  ))}

                  {/* Start Exam Button */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                    <div>
                      <div className="font-bold text-base text-gray-800">Tes Kompetensi Dasar (CBT)</div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-3">
                        <span><i className="far fa-calendar-alt text-[#855b2f]"></i> 20 Juli 2026</span>
                        <span><i className="far fa-clock text-[#855b2f]"></i> 120 Menit</span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/peserta/exam/start')}
                      className="px-8 py-3 bg-[#855b2f] hover:bg-[#5e3f1f] text-white font-bold rounded text-sm transition-colors flex items-center gap-2 shadow-md"
                    >
                      <i className="fas fa-play text-xs"></i> Mulai Ujian Sekarang
                    </button>
                  </div>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h6 className="font-bold text-base mb-4 flex items-center gap-2">
                    <span className="fas fa-user mr-2 text-[#855b2f]"></span>
                    Profil Peserta
                  </h6>
                  <div className="space-y-3">
                    {[
                      ['NIP', peserta.nip],
                      ['Nama Peserta', peserta.nama],
                      ['Tempat Lahir', peserta.tmp_lahir],
                      ['Tanggal Lahir', peserta.tgl_lahir],
                      ['Jenis Kelamin', peserta.gender],
                      ['Kotama/UO', peserta.nama_kotama],
                      ['Satker/Balakpus', peserta.nama_ou],
                      ['Golongan / Pangkat', peserta.pangkat],
                      ['Jabatan', peserta.jabatan],
                    ].map(([label, value]) => (
                      <div key={label} className="flex flex-col sm:flex-row sm:items-center border-b border-gray-100 pb-2">
                        <label className="text-xs text-gray-500 font-semibold sm:w-40 flex-shrink-0">{label}</label>
                        <p className="text-sm text-gray-800 m-0">{value}&nbsp;</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Jadwal Tab */}
              {activeTab === 'jadwal' && (
                <div>
                  <h6 className="font-bold text-base mb-4 flex items-center gap-2">
                    <span className="fas fa-calendar mr-2 text-[#855b2f]"></span>
                    Jadwal Ujian
                  </h6>
                  <div className="space-y-3">
                    {[
                      { nama: 'Tes Kompetensi Dasar & Wawasan Kebangsaan', waktu: '08:00 - 10:00 WIB', tgl: '20 Juli 2026', status: 'Siap Dikerjakan' },
                      { nama: 'Tes Bahasa Indonesia & Bahasa Inggris Kedinasan', waktu: '10:30 - 12:00 WIB', tgl: '20 Juli 2026', status: 'Menunggu Sesi' },
                      { nama: 'Tes Analisis Logika & Pemecahan Masalah', waktu: '13:00 - 14:30 WIB', tgl: '21 Juli 2026', status: 'Terjadwal' },
                    ].map((j, i) => (
                      <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-[#855b2f] text-white flex items-center justify-center text-sm">
                            <i className="fas fa-clipboard-list"></i>
                          </div>
                          <div>
                            <div className="font-bold text-sm text-gray-800">{j.nama}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-3 mt-1">
                              <span><i className="far fa-calendar text-[#855b2f]"></i> {j.tgl}</span>
                              <span><i className="far fa-clock text-[#855b2f]"></i> {j.waktu}</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full font-bold bg-green-100 text-green-800 border border-green-300">
                          {j.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Kartu Tab */}
              {activeTab === 'kartu' && (
                <div>
                  <h6 className="font-bold text-base mb-4 flex items-center gap-2">
                    <span className="fas fa-id-card mr-2 text-[#855b2f]"></span>
                    Kartu Peserta
                  </h6>
                  <div className="max-w-md mx-auto border-2 border-gray-200 rounded-lg p-6 bg-white">
                    <div className="text-center border-b-2 border-dashed border-gray-200 pb-4 mb-4">
                      <div className="w-10 h-10 rounded bg-[#855b2f] text-white flex items-center justify-center text-lg mx-auto mb-2">
                        <i className="fas fa-graduation-cap"></i>
                      </div>
                      <div className="text-sm font-bold uppercase tracking-wider text-gray-800">KARTU PESERTA UJIAN</div>
                      <div className="text-xs text-[#855b2f] font-semibold mt-1">SISTEM CAT KEMHAN 2026</div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-24 h-32 bg-gray-100 rounded flex flex-col items-center justify-center text-gray-400 border-2 border-gray-200 flex-shrink-0">
                        <i className="fas fa-user text-3xl mb-1"></i>
                        <span className="text-[9px] font-bold text-gray-500">Pas Foto 3x4</span>
                      </div>
                      <div className="text-xs space-y-2 flex-1">
                        <div className="border-b border-gray-100 pb-1">
                          <span className="text-gray-400 block font-semibold text-[10px]">NAMA LENGKAP</span>
                          <span className="font-bold text-gray-800">{peserta.nama}</span>
                        </div>
                        <div className="border-b border-gray-100 pb-1">
                          <span className="text-gray-400 block font-semibold text-[10px]">NIP</span>
                          <span className="font-bold text-gray-800 font-mono">{peserta.nip}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-gray-400 block font-semibold text-[10px]">USERNAME</span>
                            <span className="font-bold text-[#855b2f] font-mono">{peserta.nopes}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block font-semibold text-[10px]">RUANG</span>
                            <span className="font-bold text-gray-800 font-mono">LOK-01</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-200 text-center">
                      <button 
                        onClick={() => window.print()}
                        className="px-4 py-2 border border-[#855b2f] text-[#855b2f] rounded text-xs font-bold hover:bg-[#855b2f] hover:text-white transition-colors"
                      >
                        <i className="fas fa-print mr-1"></i> Cetak Kartu Ujian
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
