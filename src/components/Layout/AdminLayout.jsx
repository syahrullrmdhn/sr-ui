import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { ToastProvider } from '../ui/Toast'

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <ToastProvider>
      <div className="fixed inset-0 overflow-auto bg-[#F4F6F9]">
        <Sidebar collapsed={collapsed} />
        <Header collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        <main className={"fixed top-[50px] bottom-0 right-0 transition-all duration-500 " + (collapsed ? 'left-0' : 'left-[220px]')}>
          <div className="absolute top-0 left-0 right-0 h-[80px] bg-primary"></div>
          <div className="absolute inset-0 overflow-y-auto p-5 pt-7">
            <div className="relative">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </ToastProvider>
  )
}
