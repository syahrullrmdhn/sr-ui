import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { mockUser } from '../../data/mockData'

export default function Header({ collapsed, onToggle }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [showNotif, setShowNotif] = useState(false)
  const [showUser, setShowUser] = useState(false)

  return (
    <header 
      className="fixed top-0 right-0 z-[9] flex items-center"
      style={{
        height: '50px',
        left: collapsed ? '0' : '220px',
        backgroundColor: '#855b2f',
        opacity: 0.9,
        boxShadow: '0px 10px 10px 0px rgba(0,0,0,0.1)',
        transition: 'all 0.5s ease-in-out'
      }}
    >
      {/* Toggle Menu Button */}
      <a 
        href="#" 
        className="flex items-center justify-center text-white hover:bg-white/10 transition-all"
        style={{padding: '15px'}}
        onClick={(e) => { e.preventDefault(); onToggle(); }}
      >
        <span className="fas fa-bars text-sm"></span>
      </a>

      {/* Right side */}
      <ul className="flex items-center list-none m-0 p-0 ml-auto">
        {/* Notification Bell */}
        <li className="relative">
          <a 
            href="#" 
            className="flex items-center text-white hover:bg-white/10 transition-all relative"
            style={{padding: '15px'}}
            onClick={(e) => { e.preventDefault(); setShowNotif(!showNotif); setShowUser(false); }}
          >
            <span className="far fa-bell text-sm"></span>
            <span className="absolute top-2 right-2 bg-warning text-white text-[10px] px-1 py-0.5 rounded min-w-[15px] text-center font-bold" style={{backgroundColor:'#f0ad4e'}}>
              0
            </span>
          </a>
          
          {/* Notification Dropdown */}
          {showNotif && (
            <ul className="absolute right-0 top-full bg-white rounded shadow-lg min-w-[250px] z-50 list-none p-0 m-0" style={{borderRadius:'3px',fontSize:'12px'}}>
              <li>
                <a 
                  href="javascript:void(0)" 
                  className="flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:bg-gray-50 transition-colors"
                  onClick={() => { setShowNotif(false); navigate('/admin/dashboard'); }}
                >
                  <span className="fas fa-comments-o text-[#855b2f]"></span>
                  <span>Anda mendapatkan <strong>0</strong> pesan belum dibaca</span>
                </a>
              </li>
            </ul>
          )}
        </li>

        {/* User Menu */}
        <li className="relative">
          <a 
            href="#" 
            className="flex items-center gap-2 text-white hover:bg-white/10 transition-all"
            style={{padding: '9px 15px'}}
            onClick={(e) => { e.preventDefault(); setShowUser(!showUser); setShowNotif(false); }}
          >
            <div className="w-[30px] h-[30px] rounded-full bg-white/30 flex items-center justify-center text-xs text-white">
              <i className="fas fa-user"></i>
            </div>
            <span className="text-[13px] hidden sm:inline">{mockUser.nama}</span>
            <span className="fas fa-caret-down text-xs"></span>
          </a>

          {/* User Dropdown */}
          {showUser && (
            <ul className="absolute right-0 top-full bg-white rounded shadow-lg min-w-[200px] z-50 list-none p-0 m-0" style={{borderRadius:'3px',fontSize:'12px'}}>
              <li className="p-3 text-center border-b border-gray-100">
                <div className="w-[100px] h-[100px] mx-auto rounded-full bg-gray-100 flex items-center justify-center text-4xl text-gray-400">
                  <i className="fas fa-user"></i>
                </div>
              </li>
              <li>
                <a 
                  href="javascript:void(0)" 
                  className="flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:bg-gray-50 transition-colors"
                  onClick={() => { setShowUser(false); navigate('/admin/account'); }}
                >
                  <span className="fas fa-user text-[#855b2f]"></span>
                  <span>Pengaturan Akun</span>
                </a>
              </li>
              <li className="border-t border-gray-100">
                <a 
                  href="javascript:void(0)" 
                  className="flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors"
                  onClick={() => { setShowUser(false); navigate('/'); }}
                >
                  <span className="fas fa-sign-out-alt"></span>
                  <span>Keluar</span>
                </a>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </header>
  )
}
