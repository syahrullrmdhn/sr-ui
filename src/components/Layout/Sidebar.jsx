import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { mockMenus, systemInfo } from '../../data/mockData'

export default function Sidebar({ collapsed }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [openMenus, setOpenMenus] = useState({})

  const toggle = (key) => setOpenMenus(p => ({ ...p, [key]: !p[key] }))

  return (
    // PERHATIKAN: w-[260px] dan -ml-[260px] disamakan - clean solid border & background
    <aside className={`fixed top-0 bottom-0 left-0 w-[260px] bg-white z-50 overflow-y-auto border-r border-[#e8d9c7] transition-all duration-300 ease-in-out ${collapsed ? '-ml-[260px]' : ''}`}>
      
      <div className="flex flex-col items-center justify-center py-6 px-4 border-b border-[#e8d9c7]/80 bg-[#f8f5f1]">
        <div className="w-14 h-14 bg-[#a86e2f] rounded-2xl flex items-center justify-center text-3xl text-white mb-3 shadow-sm border border-[#e8d9c7]">
          <i className="fas fa-graduation-cap"></i>
        </div>
        <span className="text-sm font-extrabold text-[#2c2c2c] tracking-wide uppercase">{systemInfo.name}</span>
        <span className="text-[11px] font-bold text-[#a86e2f] mt-0.5">{systemInfo.organization}</span>
      </div>

      <nav className="py-4 px-3 space-y-6">
        {mockMenus.map((group, gi) => (
          <div key={gi}>
            <div className="text-[10px] font-extrabold text-[#6b5e52] uppercase tracking-widest px-3 mb-2">{group.menu}</div>
            
            <div className="space-y-1">
              {group.hasChild && group.items.map((item, ii) => {
                const key = gi + '-' + ii
                const isActive = location.pathname === item.link
                const isOpen = openMenus[key]
                
                return (
                  <div key={key}>
                    <button
                      onClick={() => item.hasChild ? toggle(key) : navigate(item.link)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-[13px] transition-all duration-200 cursor-pointer ${
                        isActive ? 'bg-[#a86e2f] text-white font-bold shadow-sm ring-1 ring-[#a86e2f]/20' : 'text-[#6b5e52] font-semibold hover:bg-[#f8f5f1] hover:text-[#a86e2f]'
                      }`}
                    >
                      <i className={`fas ${item.icon} w-5 text-center text-sm ${isActive ? 'text-white' : 'text-[#6b5e52]'}`}></i>
                      <span className="flex-1">{item.menu}</span>
                      {item.hasChild && (
                        <i className={`fas fa-chevron-down text-[10px] transition-transform duration-200 ${isActive ? 'text-white/80' : 'text-[#6b5e52]'} ${isOpen ? 'rotate-180' : ''}`}></i>
                      )}
                    </button>
                    
                    {item.hasChild && isOpen && (
                      <ul className="ml-8 mt-1.5 space-y-1 border-l-2 border-[#e8d9c7] relative">
                        {item.items.map((sub, si) => (
                          <li key={si} className="relative">
                            <button 
                              onClick={() => navigate(sub.link)}
                              className={`w-full text-left pl-4 pr-3 py-2 text-xs transition-colors duration-200 rounded-r-lg cursor-pointer ${
                                location.pathname === sub.link ? 'text-[#a86e2f] font-bold bg-[#f8f5f1]' : 'text-[#6b5e52] hover:text-[#2c2c2c] hover:bg-[#f8f5f1]/60'
                              }`}
                            >
                              {location.pathname === sub.link && (
                                <div className="absolute left-[-2px] top-0 bottom-0 w-0.5 bg-[#a86e2f] rounded-r-full shadow-2xs"></div>
                              )}
                              {sub.menu}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}