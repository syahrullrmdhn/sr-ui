import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import '../../assets/css/admin.css'

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="admin-wrapper">
      <Sidebar collapsed={collapsed} />
      <Header collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className={"admin-content-wrapper " + (collapsed ? 'collapsed' : '')}>
        <div className="bg-breadcrumbs"></div>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
