import React from 'react'
import ClassicStatCard from './ClassicStatCard'

const solidBackgrounds = {
  primary: 'bg-[#a86e2f]',
  secondary: 'bg-[#2f69a8]',
  accent:  'bg-[#2fa86e]',
  success: 'bg-[#4a9c6e]',
  warning: 'bg-[#d97e2f]',
  danger:  'bg-rose-600',
  info:    'bg-[#2f69a8]',
  purple:  'bg-purple-600',
  bronze:  'bg-[#a86e2f]',
}

export default function StatCard({ icon, value, label, variant = 'primary', trend, className = '', onClick }) {
  const bgClass = solidBackgrounds[variant] || solidBackgrounds.primary

  return (
    <div 
      onClick={onClick}
      className={`relative overflow-hidden ${bgClass} rounded-2xl text-white p-5 shadow-sm transition-transform hover:-translate-y-1 duration-300 border border-white/15 font-sans ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Decorative Bubble Effects ("bubble bubble gitu") */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 blur-[1px] pointer-events-none animate-bubble"></div>
      <div className="absolute -bottom-8 left-1/3 w-20 h-20 rounded-full bg-white/10 blur-[1px] pointer-events-none animate-bubble-delayed"></div>

      <div className="relative z-10">
        <div className="text-3xl md:text-4xl font-extrabold tracking-tight font-sans">{value}</div>
        <div className="text-sm font-bold text-white/95 mt-1 truncate">{label}</div>
        {trend && <div className="text-xs mt-2 text-white/90 flex items-center gap-1.5 font-bold"><i className="fas fa-chart-line"></i> {trend}</div>}
      </div>
      <i className={`fas ${icon} absolute -bottom-4 -right-2 text-7xl text-white opacity-15 pointer-events-none z-0`}></i>
    </div>
  )
}

export { ClassicStatCard }
