import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockUser } from '../../data/mockData'
import Dropdown from '../ui/Dropdown'

export default function Header({ collapsed, onToggle }) {
  const navigate = useNavigate()

  return (
    <header className={"fixed top-0 right-0 h-[50px] bg-primary/95 z-40 flex items-center shadow-md transition-all duration-500 " +
      (collapsed ? 'left-0' : 'left-[220px]')}>
      <button onClick={onToggle} className="text-white text-xl px-4 hover:opacity-80 transition">
        <i className="fas fa-bars"></i>
      </button>

      <div className="ml-auto flex items-center gap-0 mr-2">
        <button className="relative text-white px-3 py-3 hover:bg-white/10 rounded transition">
          <i className="far fa-bell text-sm"></i>
          <span className="absolute top-1 right-0.5 bg-amber-400 text-white text-[10px] px-1.5 py-0.5 rounded min-w-[18px] text-center font-medium">0</span>
        </button>

        <Dropdown align="right" trigger={
          <div className="flex items-center gap-2 text-white px-3 py-2 hover:bg-white/10 rounded transition cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-primary-light/40 flex items-center justify-center text-sm">
              <i className="fas fa-user"></i>
            </div>
            <span className="text-sm hidden md:inline">{mockUser.nama}</span>
            <i className="fas fa-caret-down text-xs"></i>
          </div>
        }>
          {(close) => (
            <div>
              <div className="p-4 text-center border-b border-gray-100">
                <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto flex items-center justify-center text-2xl text-gray-300">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <button onClick={() => close()} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition">
                <i className="fas fa-user-cog text-primary w-5 text-center"></i> Pengaturan Akun
              </button>
              <button onClick={() => { close(); navigate('/') }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition">
                <i className="fas fa-sign-out-alt w-5 text-center"></i> Keluar
              </button>
            </div>
          )}
        </Dropdown>
      </div>
    </header>
  )
}
