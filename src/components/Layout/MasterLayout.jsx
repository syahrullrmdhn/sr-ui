import { Outlet, useNavigate } from 'react-router-dom'
import { systemInfo } from '../../data/mockData'

export default function MasterLayout() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#E9E9E9]">
      <header className="bg-primary flex items-center px-5 h-[70px] sticky top-0 z-50">
        <div className="flex items-center gap-4 text-white">
          <div className="text-3xl"><i className="fas fa-graduation-cap"></i></div>
          <div>
            <h2 className="text-lg font-medium m-0">{systemInfo.organization}</h2>
            <h6 className="text-[11px] tracking-[3px] opacity-80 mt-0.5 m-0">{systemInfo.name}</h6>
          </div>
        </div>
        <div className="ml-auto flex items-center text-white">
          <h6 className="text-sm m-0 mr-3">Peserta Ujian</h6>
          <div className="bg-black/20 p-2.5 rounded-lg text-xl"><i className="fas fa-user-graduate"></i></div>
          <button onClick={() => navigate('/')} className="ml-4 bg-white text-primary border-none px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer hover:opacity-90 transition">
            Logout
          </button>
        </div>
      </header>
      <Outlet />
    </div>
  )
}
