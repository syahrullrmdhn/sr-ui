import { Outlet, useNavigate } from 'react-router-dom'
import { systemInfo } from '../../data/mockData'

export default function MasterLayout() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-100/60 font-sans flex flex-col w-full overflow-x-hidden">
      <header className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 shadow-md flex items-center justify-between px-6 md:px-10 h-[72px] sticky top-0 z-50 w-full">
        
        {/* Logo Kiri */}
        <div className="flex items-center gap-4 text-white">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl shadow-inner border border-white/20">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <div>
            <h2 className="text-base md:text-lg font-semibold tracking-wide m-0">{systemInfo.organization}</h2>
            <h6 className="text-[10px] md:text-[11px] font-medium tracking-widest text-teal-100 uppercase mt-0.5 m-0">
              {systemInfo.name}
            </h6>
          </div>
        </div>

        {/* Profil Kanan */}
        <div className="flex items-center text-white">
          <div className="hidden md:flex flex-col items-end mr-4">
            <h6 className="text-sm font-semibold m-0">Peserta Ujian</h6>
            <span className="text-[10px] text-teal-100">Sedang Aktif</span>
          </div>
          
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-lg shadow-inner border border-white/20 mr-5">
            <i className="fas fa-user-graduate"></i>
          </div>
          
          {/* Tombol Logout elegan dengan efek glassmorphism */}
          <button 
            onClick={() => navigate('/')} 
            className="bg-white/10 hover:bg-rose-500 hover:border-rose-400 border border-white/20 text-white px-5 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all duration-300 shadow-sm flex items-center gap-2"
          >
            <i className="fas fa-power-off text-[10px]"></i> Selesai
          </button>
        </div>
      </header>
      
      <main className="w-full flex-1 flex flex-col p-4 md:p-6 overflow-y-auto">
        <div className="w-full min-h-full flex-1 flex flex-col">
          <Outlet />
        </div>
      </main>
    </div>
  )
}