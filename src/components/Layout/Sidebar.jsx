import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { mockMenus, systemInfo } from '../../data/mockData'

export default function Sidebar({ collapsed }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [openMenus, setOpenMenus] = useState({})

  const toggle = (key) => setOpenMenus(p => ({ ...p, [key]: !p[key] }))

  return (
    <aside className={"fixed top-0 bottom-0 left-0 w-[220px] bg-white z-50 overflow-y-auto shadow-md transition-all duration-500 " + (collapsed ? '-ml-[220px]' : '')}>
      <div className="text-center pt-4 pb-3 px-3 border-b border-gray-100">
        <div className="text-4xl text-primary mb-2"><i className="fas fa-graduation-cap"></i></div>
        <span className="block text-[11px] font-bold uppercase tracking-wide">{systemInfo.name}</span>
        <span className="block text-[10px] text-gray-400">{systemInfo.organization}</span>
        <span className="block text-[10px] text-gray-400">{systemInfo.office}</span>
      </div>

      <nav className="py-2">
        {mockMenus.map((group, gi) => (
          <div key={gi}>
            <div className="uppercase text-[11px] font-bold text-gray-400 mx-3 mt-3 mb-1 tracking-wider">{group.menu}</div>
            {group.hasChild && group.items.map((item, ii) => {
              const key = gi + '-' + ii
              const isActive = location.pathname === item.link
              const isOpen = openMenus[key]
              return (
                <div key={key}>
                  <button
                    onClick={() => item.hasChild ? toggle(key) : navigate(item.link)}
                    className={"w-full flex items-center gap-2.5 px-4 py-2 text-left text-[13px] transition-all duration-200 " +
                      (isActive ? 'bg-primary text-white' : 'text-[#505b72] hover:bg-primary hover:text-white')}
                  >
                    <i className={"fas " + item.icon + " w-7 text-center text-base " + (isActive ? 'text-white' : 'text-primary') + " [text-stroke:0.7px] " + (isActive ? '[text-stroke-color:white]' : '[text-stroke-color:#855b2f]')}></i>
                    <span className="flex-1">{item.menu}</span>
                    {item.hasChild && <i className={"fas fa-chevron-down text-[10px] transition-transform " + (isOpen ? 'rotate-180' : '')}></i>}
                  </button>
                  {item.hasChild && isOpen && (
                    <ul className="ml-7 border-l border-gray-200">
                      {item.items.map((sub, si) => (
                        <li key={si}>
                          <button onClick={() => navigate(sub.link)}
                            className={"w-full text-left px-4 py-1.5 text-xs transition " +
                              (location.pathname === sub.link ? 'text-primary font-medium border-l-2 border-primary -ml-px' : 'text-gray-500 hover:text-primary')}>
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
        ))}
      </nav>
    </aside>
  )
}
