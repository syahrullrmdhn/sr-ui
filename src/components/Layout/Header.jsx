import { useNavigate, useLocation } from 'react-router-dom'
import { mockUser } from '../../data/mockData'
import Dropdown from '../ui/Dropdown'

export default function Header({ collapsed, onToggle }) {
  const navigate = useNavigate()
  const location = useLocation()

  // Pemetaan rute aktif untuk Navigasi Breadcrumbs di Header
  const getPageInfo = (path) => {
    const map = {
      '/admin': { category: 'Dashboard', name: 'Beranda Utama', icon: 'fa-home' },
      '/admin/dashboard': { category: 'Dashboard', name: 'Beranda Utama', icon: 'fa-home' },
      '/admin/users': { category: 'Master Data', name: 'Manajemen Users', icon: 'fa-users' },
      '/admin/soal': { category: 'Master Data', name: 'Bank Soal Ujian', icon: 'fa-question-circle' },
      '/admin/soal/import': { category: 'Master Data', name: 'Import Soal Excel/Word', icon: 'fa-file-import' },
      '/admin/tes': { category: 'Master Data', name: 'Daftar Tes & Subtes', icon: 'fa-clipboard-list' },
      '/admin/materi': { category: 'Master Data', name: 'Materi & Silabus', icon: 'fa-book' },
      '/admin/paket': { category: 'Master Data', name: 'Paket Soal CBT', icon: 'fa-box' },
      '/admin/peserta': { category: 'Manajemen Peserta', name: 'Data Induk Peserta', icon: 'fa-user-graduate' },
      '/admin/pendaftaran': { category: 'Manajemen Peserta', name: 'Registrasi Peserta', icon: 'fa-user-plus' },
      '/admin/jadwal': { category: 'Pelaksanaan Ujian', name: 'Jadwal Sesi & Gelombang', icon: 'fa-calendar-alt' },
      '/admin/token': { category: 'Pelaksanaan Ujian', name: 'Token Keamanan CBT', icon: 'fa-key' },
      '/admin/ruang': { category: 'Pelaksanaan Ujian', name: 'Ruang & Laboratorium', icon: 'fa-door-open' },
      '/admin/sesi': { category: 'Pelaksanaan Ujian', name: 'Rotasi Sesi Waktu', icon: 'fa-clock' },
      '/admin/rekap': { category: 'Rekapitulasi Nilai', name: 'Hasil & Kelulusan Akhir', icon: 'fa-chart-bar' },
      '/admin/rekap/lokasi': { category: 'Rekapitulasi Nilai', name: 'Rekap Nilai per Lokasi', icon: 'fa-map-marker-alt' },
      '/admin/rekap/jenis': { category: 'Rekapitulasi Nilai', name: 'Rekap Nilai per Jenis Ujian', icon: 'fa-clipboard-check' },
      '/admin/settings': { category: 'Pengaturan', name: 'Konfigurasi Sistem', icon: 'fa-cog' },
      '/admin/account': { category: 'Pengaturan', name: 'Profil & Akun Admin', icon: 'fa-user-cog' },
    }
    return map[path] || { category: 'Sistem CBT', name: 'Menu Aktif', icon: 'fa-folder-open' }
  }

  const current = getPageInfo(location.pathname)

  return (
    // PERHATIKAN: left-[260px] disamakan dengan lebar Sidebar
    <header className={`fixed top-0 right-0 h-16 bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 z-40 flex items-center justify-between px-4 sm:px-6 shadow-md transition-all duration-300 ease-in-out ${collapsed ? 'left-0' : 'left-[260px]'}`}>
      
      {/* Kiri: Toggle Sidebar & Breadcrumb Navigation */}
      <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
        <button 
          onClick={onToggle} 
          className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-base border border-white/15 transition-all cursor-pointer flex-shrink-0 shadow-2xs"
          title="Toggle Navigation Menu"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="h-6 w-px bg-white/20 hidden sm:block flex-shrink-0"></div>

        {/* Dynamic Navigasi Menu Breadcrumbs */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 shadow-inner text-xs text-white/90 truncate">
          <i className={`fas ${current.icon} text-teal-200 text-sm flex-shrink-0`}></i>
          <span className="text-white/70 font-medium hidden md:inline">{current.category}</span>
          <i className="fas fa-chevron-right text-[10px] text-white/40 hidden md:inline"></i>
          <span className="font-bold text-white tracking-wide truncate">{current.name}</span>
        </div>
      </div>

      {/* Kanan: Profil Admin & Notifikasi */}
      <div className="flex items-center gap-3">
        <button className="relative w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/15 shadow-2xs cursor-pointer">
          <i className="far fa-bell text-sm"></i>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-teal-700 animate-pulse"></span>
        </button>

        <div className="w-px h-6 bg-white/20 mx-1 hidden sm:block"></div>

        <Dropdown align="right" trigger={
          <div className="flex items-center gap-3 px-2.5 py-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer select-none border border-transparent hover:border-white/15">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-sm font-bold text-white leading-tight">{mockUser.nama}</span>
              <span className="text-[10px] text-teal-100 uppercase tracking-wider font-semibold">Super Admin</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold text-white shadow-inner border border-white/30 ring-2 ring-white/10">
              <i className="fas fa-user"></i>
            </div>
          </div>
        }>
          {(close) => (
            <div className="min-w-[220px] overflow-hidden rounded-2xl shadow-xl border border-slate-200/80 bg-white">
              <div className="p-5 text-center border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 mx-auto flex items-center justify-center text-xl text-teal-600 mb-2.5 shadow-xs border border-teal-100">
                  <i className="fas fa-user-shield"></i>
                </div>
                <div className="font-bold text-slate-800 text-sm">{mockUser.nama}</div>
                <div className="text-[11px] text-slate-400 mt-0.5 font-mono">admin@kemhan.go.id</div>
              </div>
              <div className="p-2 space-y-1">
                <button onClick={() => { close(); navigate('/admin/account') }} className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-teal-600 rounded-xl transition-colors cursor-pointer">
                  <i className="fas fa-user-cog w-5 text-teal-600 text-center text-sm"></i> Pengaturan Akun & Profil
                </button>
                <button onClick={() => { close(); navigate('/admin/settings') }} className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-teal-600 rounded-xl transition-colors cursor-pointer">
                  <i className="fas fa-sliders-h w-5 text-teal-600 text-center text-sm"></i> Konfigurasi Sistem CBT
                </button>
                <div className="border-t border-slate-100 my-1 pt-1">
                  <button onClick={() => { close(); navigate('/') }} className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer">
                    <i className="fas fa-sign-out-alt w-5 text-center text-sm"></i> Keluar / Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </Dropdown>
      </div>
    </header>
  )
}