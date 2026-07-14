import { Outlet, useNavigate } from 'react-router-dom'
import { systemInfo } from '../../data/mockData'

export default function MasterLayout() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#f8f5f1] font-sans flex flex-col w-full overflow-x-hidden text-[#2c2c2c]">
      <header className="bg-gradient-to-r from-[#895823] via-[#a86e2f] to-[#bf9571] shadow-md flex items-center justify-between px-6 md:px-10 h-[72px] sticky top-0 z-50 w-full border-b border-white/10">
        
        {/* Logo Kiri */}
        <div className="flex items-center gap-4 text-white">
          <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl shadow-inner border border-white/20 text-[#e8d9c7]">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <div>
            <h2 className="text-base md:text-lg font-bold tracking-wide m-0 text-white">{systemInfo.organization}</h2>
            <h6 className="text-[10px] md:text-[11px] font-semibold tracking-widest text-[#e8d9c7] uppercase mt-0.5 m-0">
              {systemInfo.name}
            </h6>
          </div>
        </div>

        {/* Profil Kanan */}
        <div className="flex items-center text-white">
          <div className="hidden md:flex flex-col items-end mr-4">
            <h6 className="text-sm font-bold m-0 text-white">Peserta Ujian</h6>
            <span className="text-[10px] text-[#e8d9c7] font-semibold">Sedang Aktif</span>
          </div>
          
          <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center text-lg shadow-inner border border-white/20 mr-5 text-[#f8f5f1]">
            <i className="fas fa-user-graduate"></i>
          </div>
          
          {/* Tombol Logout elegan dengan efek glassmorphism */}
          <button 
            onClick={() => navigate('/')} 
            className="bg-white/15 hover:bg-rose-500 hover:border-rose-400 border border-white/25 text-white px-5 py-2 rounded-full text-xs font-bold cursor-pointer transition-all duration-300 shadow-sm flex items-center gap-2"
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