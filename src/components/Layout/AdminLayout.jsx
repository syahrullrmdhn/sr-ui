import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { ToastProvider } from '../ui/Toast'

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <ToastProvider>
      <div className="fixed inset-0 overflow-hidden bg-slate-100/70 font-sans text-slate-800 flex">
        <Sidebar collapsed={collapsed} />
        <Header collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        
        {/* PERHATIKAN: main langsung menjadi scroll container utama dengan overflow-y-auto 
            dan inner div menggunakan min-h-full agar selalu full page di layar kecil maupun tinggi dan pasti scrollable saat konten panjang */}
        <main className={`fixed top-[64px] bottom-0 right-0 transition-all duration-300 ease-in-out bg-slate-100/60 overflow-y-auto overflow-x-hidden ${collapsed ? 'left-0' : 'left-[260px]'}`}>
          <div className="min-h-full w-full p-4 md:p-6 flex flex-col">
            <Outlet />
          </div>
        </main>
      </div>
    </ToastProvider>
  )
}