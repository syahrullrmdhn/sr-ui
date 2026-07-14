import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockUser } from '../../data/mockData'

export default function Header({ collapsed, onToggle }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className={"admin-header " + (collapsed ? 'collapsed' : '')}>
      <div className="header-left">
        <a className="toggle-menu" onClick={onToggle}>
          <i className="fas fa-bars"></i>
        </a>
      </div>
      <ul className="header-right">
        <li>
          <a>
            <i className="far fa-bell"></i>
            <span className="badge">0</span>
          </a>
        </li>
        <li ref={dropdownRef} style={{ position: 'relative' }}>
          <a onClick={() => setDropdownOpen(!dropdownOpen)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <div className="user-avatar">
              <i className="fas fa-user"></i>
            </div>
            <span className="user-name">{mockUser.nama}</span>
            <i className="fas fa-caret-down" style={{ marginLeft: 5 }}></i>
          </a>
          <div className={"user-dropdown " + (dropdownOpen ? 'show' : '')}>
            <div className="photo-section">
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#eee', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, color: '#ccc' }}>
                <i className="fas fa-user"></i>
              </div>
            </div>
            <a onClick={() => { setDropdownOpen(false) }}>
              <i className="fas fa-user"></i> Pengaturan Akun
            </a>
            <a onClick={() => { navigate('/') }}>
              <i className="fas fa-sign-out-alt"></i> Keluar
            </a>
          </div>
        </li>
      </ul>
    </div>
  )
}
