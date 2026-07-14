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
      '/admin/soal/editor': { category: 'Master Data', name: 'Editor Butir Soal (Rich Text)', icon: 'fa-file-alt' },
      '/admin/soal/import': { category: 'Master Data', name: 'Import Soal Excel/Word', icon: 'fa-file-import' },
      '/admin/berita': { category: 'Master Data', name: 'Pengumuman & Berita (Rich Text)', icon: 'fa-newspaper' },
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
    // PERHATIKAN: left-[260px] disamakan dengan lebar Sidebar - clean solid #a86e2f without gradient
    <header className={`fixed top-0 right-0 h-16 bg-[#a86e2f] z-40 flex items-center justify-between px-4 sm:px-6 shadow-md border-b border-white/10 transition-all duration-300 ease-in-out ${collapsed ? 'left-0' : 'left-[260px]'}`}>
      
      {/* Kiri: Toggle Sidebar & Breadcrumb Navigation */}
      <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
        <button 
          onClick={onToggle} 
          className="w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 text-white flex items-center justify-center text-base border border-white/20 transition-all cursor-pointer flex-shrink-0 shadow-2xs"
          title="Toggle Navigation Menu"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="h-6 w-px bg-white/20 hidden sm:block flex-shrink-0"></div>

        {/* Dynamic Navigasi Menu Breadcrumbs */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 shadow-inner text-xs text-white/95 truncate">
          <i className={`fas ${current.icon} text-[#e8d9c7] text-sm flex-shrink-0`}></i>
          <span className="text-white/80 font-medium hidden md:inline">{current.category}</span>
          <i className="fas fa-chevron-right text-[10px] text-white/40 hidden md:inline"></i>
          <span className="font-bold text-white tracking-wide truncate">{current.name}</span>
        </div>
      </div>

      {/* Kanan: Profil Admin & Notifikasi */}
      <div className="flex items-center gap-3">
        <button className="relative w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors border border-white/20 shadow-2xs cursor-pointer">
          <i className="far fa-bell text-sm"></i>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#2fa86e] rounded-full border-2 border-[#a86e2f] animate-pulse"></span>
        </button>

        <div className="w-px h-6 bg-white/20 mx-1 hidden sm:block"></div>

        <Dropdown align="right" trigger={
          <div className="flex items-center gap-3 px-2.5 py-1 hover:bg-white/15 rounded-full transition-colors cursor-pointer select-none border border-transparent hover:border-white/20">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-sm font-bold text-white leading-tight">{mockUser.nama}</span>
              <span className="text-[10px] text-[#e8d9c7] uppercase tracking-wider font-semibold">Super Admin</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold text-white shadow-inner border border-white/30 ring-2 ring-white/15">
              <i className="fas fa-user"></i>
            </div>
          </div>
        }>
          {(close) => (
            <div className="min-w-[220px] overflow-hidden rounded-2xl shadow-xl border border-[#e8d9c7] bg-white">
              <div className="p-5 text-center border-b border-[#e8d9c7]/80 bg-[#f8f5f1]">
                <div className="w-14 h-14 rounded-2xl bg-white mx-auto flex items-center justify-center text-xl text-[#a86e2f] mb-2.5 shadow-xs border border-[#e8d9c7]">
                  <i className="fas fa-user-shield"></i>
                </div>
                <div className="font-bold text-[#2c2c2c] text-sm">{mockUser.nama}</div>
                <div className="text-[11px] text-[#6b5e52] mt-0.5 font-mono">admin@kemhan.go.id</div>
              </div>
              <div className="p-2 space-y-1">
                <button onClick={() => { close(); navigate('/admin/account') }} className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-[#6b5e52] hover:bg-[#f8f5f1] hover:text-[#a86e2f] rounded-xl transition-colors cursor-pointer">
                  <i className="fas fa-user-cog w-5 text-[#a86e2f] text-center text-sm"></i> Pengaturan Akun & Profil
                </button>
                <button onClick={() => { close(); navigate('/admin/settings') }} className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-[#6b5e52] hover:bg-[#f8f5f1] hover:text-[#a86e2f] rounded-xl transition-colors cursor-pointer">
                  <i className="fas fa-sliders-h w-5 text-[#a86e2f] text-center text-sm"></i> Konfigurasi Sistem CBT
                </button>
                <div className="border-t border-[#e8d9c7]/60 my-1 pt-1">
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