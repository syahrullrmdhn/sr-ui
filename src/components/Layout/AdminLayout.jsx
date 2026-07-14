import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { ToastProvider } from '../ui/Toast'

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <ToastProvider>
      <div className="fixed inset-0 overflow-hidden bg-slate-50 font-sans text-slate-800 flex">
        <Sidebar collapsed={collapsed} />
        <Header collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        
        {/* PERHATIKAN: left-[260px] disamakan agar main content tidak bergeser dan w-full h-full agar full page tanpa sudut sia-sia */}
        <main className={`fixed top-[64px] bottom-0 right-0 transition-all duration-300 ease-in-out bg-slate-50 flex flex-col ${collapsed ? 'left-0' : 'left-[260px]'}`}>
          <div className="absolute inset-0 overflow-y-auto overflow-x-hidden p-4 md:p-6 w-full h-full flex flex-col">
            <div className="w-full min-h-full flex-1 flex flex-col">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </ToastProvider>
  )
}