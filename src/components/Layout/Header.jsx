import { useNavigate } from 'react-router-dom'
import { mockUser } from '../../data/mockData'
import Dropdown from '../ui/Dropdown'

export default function Header({ collapsed, onToggle }) {
  const navigate = useNavigate()

  return (
    // PERHATIKAN: left-[260px] disamakan dengan lebar Sidebar
    <header className={`fixed top-0 right-0 h-16 bg-gradient-to-r from-teal-700 to-emerald-600 z-40 flex items-center shadow-md transition-all duration-300 ease-in-out ${collapsed ? 'left-0' : 'left-[260px]'}`}>
      
      <button onClick={onToggle} className="text-white/80 hover:text-white text-lg px-6 transition-colors">
        <i className="fas fa-bars"></i>
      </button>

      <div className="ml-auto flex items-center gap-2 pr-6">
        <button className="relative text-white/90 p-2 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center h-9 w-9">
          <i className="far fa-bell"></i>
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-teal-600"></span>
        </button>

        <div className="w-px h-6 bg-white/20 mx-2"></div>

        <Dropdown align="right" trigger={
          <div className="flex items-center gap-3 px-2 py-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer select-none">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-medium text-white">{mockUser.nama}</span>
              <span className="text-[10px] text-teal-100 uppercase tracking-wider">Administrator</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm text-white shadow-inner border border-white/20">
              <i className="fas fa-user"></i>
            </div>
          </div>
        }>
          {(close) => (
            <div className="min-w-[200px] overflow-hidden rounded-xl">
              <div className="p-5 text-center border-b border-slate-100 bg-slate-50/50">
                <div className="w-14 h-14 rounded-full bg-teal-100 mx-auto flex items-center justify-center text-xl text-teal-600 mb-3 shadow-sm border border-teal-200">
                  <i className="fas fa-user"></i>
                </div>
                <div className="font-semibold text-slate-800 text-sm">{mockUser.nama}</div>
              </div>
              <div className="p-1.5">
                <button onClick={() => close()} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
                  <i className="fas fa-user-cog w-5 text-teal-600 text-center"></i> Pengaturan Akun
                </button>
                <button onClick={() => { close(); navigate('/') }} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-rose-600 hover:bg-rose-50 rounded-lg transition-colors mt-1">
                  <i className="fas fa-sign-out-alt w-5 text-center"></i> Keluar
                </button>
              </div>
            </div>
          )}
        </Dropdown>
      </div>
    </header>
  )
}