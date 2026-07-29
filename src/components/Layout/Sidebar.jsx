import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { mockMenus, systemInfo } from '../../data/mockData'

export default function Sidebar({ collapsed }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [openMenus, setOpenMenus] = useState({})

  const toggle = (key) => setOpenMenus(p => ({ ...p, [key]: !p[key] }))

  return (
    <div 
      className="fixed top-0 bottom-0 left-0 overflow-y-auto overflow-x-hidden z-[999]"
      style={{
        width: '220px',
        backgroundColor: '#855b2f',
        marginLeft: collapsed ? '-220px' : '0',
        transition: 'all 0.5s ease-in-out'
      }}
    >
      {/* Menu Header - Logo + System Info */}
      <div className="flex flex-col items-center py-5 px-4 text-center">
        <div className="mb-3">
          <div className="w-[70px] h-[70px] mx-auto bg-white/20 rounded-lg flex items-center justify-center">
            <i className="fas fa-graduation-cap text-white text-3xl"></i>
          </div>
        </div>
        <span className="text-white text-sm font-bold block">{systemInfo.name}</span>
        <span className="text-white/80 text-xs block mt-0.5">{systemInfo.organization}</span>
        <span className="text-white/60 text-[11px] block mt-0.5">{systemInfo.office}</span>
        <div className="w-full h-px bg-white/20 mt-4"></div>
      </div>

      {/* Navigation Menu */}
      <ul className="list-none p-0 m-0">
        {mockMenus.map((group, gi) => (
          <li key={gi}>
            {/* Menu Label */}
            <div className="px-4 py-2 text-[10px] font-bold text-white/50 uppercase tracking-wider">
              {group.menu}
            </div>

            {group.hasChild && group.items.map((item, ii) => {
              const key = gi + '-' + ii
              const isActive = location.pathname === item.link
              const isOpen = openMenus[key]

              return (
                <li key={key} className="relative">
                  <a
                    href="javascript:void(0)"
                    onClick={() => item.hasChild ? toggle(key) : navigate(item.link)}
                    className="flex items-center px-4 py-2.5 text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
                    style={{
                      backgroundColor: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
                      color: isActive ? '#fff' : undefined
                    }}
                  >
                    <span className="fa fa-home side-menu-icon mr-3 w-5 text-center text-sm" style={{display: item.icon ? 'none' : 'inline'}}>
                    </span>
                    {item.icon && (
                      <span className={`fas ${item.icon} mr-3 w-5 text-center text-sm`}></span>
                    )}
                    <span className="flex-1 text-[13px]">{item.menu}</span>
                    {item.hasChild && (
                      <span className={`fas fa-caret-down text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}></span>
                    )}
                  </a>

                  {/* Submenu */}
                  {item.hasChild && isOpen && (
                    <ul className="list-none p-0 m-0 bg-black/10">
                      {item.items.map((sub, si) => (
                        <li key={si}>
                          <a
                            href="javascript:void(0)"
                            onClick={() => navigate(sub.link)}
                            className="flex items-center pl-12 pr-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer text-[12px]"
                            style={{
                              backgroundColor: location.pathname === sub.link ? 'rgba(255,255,255,0.15)' : 'transparent',
                              color: location.pathname === sub.link ? '#fff' : undefined
                            }}
                          >
                            {sub.menu}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </li>
        ))}
      </ul>
    </div>
  )
}
