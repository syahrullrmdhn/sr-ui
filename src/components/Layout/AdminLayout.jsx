import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { ToastProvider } from '../ui/Toast'

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <ToastProvider>
      <div className="fixed inset-0 overflow-auto bg-[#F4F6F9] font-['Roboto'] text-[#5A5A5A]" style={{outline:'none'}}>
        <Sidebar collapsed={collapsed} />
        <Header collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        
        <main 
          className="fixed bottom-0 right-0 overflow-y-auto overflow-x-hidden bg-[#F4F6F9]"
          style={{
            top: '50px',
            left: collapsed ? '0' : '220px',
            transition: 'all 0.5s ease-in-out'
          }}
        >
          <div className="min-h-full w-full p-4 flex flex-col">
            <Outlet />
          </div>
        </main>
      </div>
    </ToastProvider>
  )
}
