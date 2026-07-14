import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { mockMenus, systemInfo } from '../../data/mockData'

export default function Sidebar({ collapsed }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [openMenus, setOpenMenus] = useState({})

  const toggleSubmenu = (key) => {
    setOpenMenus(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className={"sidebar " + (collapsed ? 'collapsed' : '')}>
      <div className="sidebar-header">
        <div style={{ fontSize: 40, color: 'var(--primary)' }}>
          <i className="fas fa-graduation-cap"></i>
        </div>
        <span style={{ fontWeight: 'bold', fontSize: 12 }}>{systemInfo.name}</span>
        <span style={{ fontSize: 10 }}>{systemInfo.organization}</span>
        <span style={{ fontSize: 10 }}>{systemInfo.office}</span>
        <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #eee' }} />
      </div>
      <ul className="sidebar-menu">
        {mockMenus.map((group, gi) => (
          <div key={gi}>
            <li className="sidebar-label">{group.menu}</li>
            {group.hasChild && group.items.map((item, ii) => {
              const key = gi + '-' + ii
              const isActive = location.pathname === item.link
              const isOpen = openMenus[key]
              return (
                <div key={key}>
                  <li>
                    <a
                      className={isActive ? 'active' : ''}
                      onClick={() => {
                        if (item.hasChild) {
                          toggleSubmenu(key)
                        } else {
                          navigate(item.link)
                        }
                      }}
                    >
                      <span className={"fas " + item.icon + " menu-icon"}></span>
                      <span className="menu-title">{item.menu}</span>
                      {item.hasChild && (
                        <span className={"fas fa-chevron-down caret-icon " + (isOpen ? 'open' : '')}></span>
                      )}
                    </a>
                  </li>
                  {item.hasChild && isOpen && (
                    <ul className="sub-menu">
                      {item.items.map((sub, si) => (
                        <li key={si}>
                          <a
                            className={location.pathname === sub.link ? 'active' : ''}
                            onClick={() => navigate(sub.link)}
                          >
                            {sub.menu}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </ul>
    </div>
  )
}
