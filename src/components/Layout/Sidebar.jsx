import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { mockMenus, systemInfo } from '../../data/mockData'

export default function Sidebar({ collapsed }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [openMenus, setOpenMenus] = useState({})

  const toggle = (key) => setOpenMenus(p => ({ ...p, [key]: !p[key] }))

  return (
    // PERHATIKAN: w-[260px] dan -ml-[260px] disamakan
    <aside className={`fixed top-0 bottom-0 left-0 w-[260px] bg-white z-50 overflow-y-auto border-r border-slate-200/60 transition-all duration-300 ease-in-out ${collapsed ? '-ml-[260px]' : ''}`}>
      
      <div className="flex flex-col items-center justify-center py-6 px-4 border-b border-slate-100">
        <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center text-3xl text-teal-600 mb-3 shadow-sm">
          <i className="fas fa-graduation-cap"></i>
        </div>
        <span className="text-sm font-bold text-slate-800 tracking-wide uppercase">{systemInfo.name}</span>
        <span className="text-[11px] font-medium text-slate-400 mt-0.5">{systemInfo.organization}</span>
      </div>

      <nav className="py-4 px-3 space-y-6">
        {mockMenus.map((group, gi) => (
          <div key={gi}>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">{group.menu}</div>
            
            <div className="space-y-1">
              {group.hasChild && group.items.map((item, ii) => {
                const key = gi + '-' + ii
                const isActive = location.pathname === item.link
                const isOpen = openMenus[key]
                
                return (
                  <div key={key}>
                    <button
                      onClick={() => item.hasChild ? toggle(key) : navigate(item.link)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-[13px] font-medium transition-colors duration-200 ${
                        isActive ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <i className={`fas ${item.icon} w-5 text-center text-sm ${isActive ? 'text-teal-600' : 'text-slate-400'}`}></i>
                      <span className="flex-1">{item.menu}</span>
                      {item.hasChild && (
                        <i className={`fas fa-chevron-down text-[10px] text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}></i>
                      )}
                    </button>
                    
                    {item.hasChild && isOpen && (
                      <ul className="ml-8 mt-1 space-y-1 border-l-2 border-slate-100 relative">
                        {item.items.map((sub, si) => (
                          <li key={si} className="relative">
                            <button 
                              onClick={() => navigate(sub.link)}
                              className={`w-full text-left pl-4 pr-3 py-2 text-xs transition-colors duration-200 ${
                                location.pathname === sub.link ? 'text-teal-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
                              }`}
                            >
                              {location.pathname === sub.link && (
                                <div className="absolute left-[-2px] top-0 bottom-0 w-0.5 bg-teal-500 rounded-r-full"></div>
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