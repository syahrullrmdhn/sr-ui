import React from 'react'
import ClassicStatCard from './ClassicStatCard'

const gradients = {
  primary: 'bg-gradient-to-br from-teal-500 to-emerald-600',
  success: 'bg-gradient-to-br from-emerald-500 to-teal-600',
  warning: 'bg-gradient-to-br from-amber-500 to-orange-600',
  danger:  'bg-gradient-to-br from-rose-500 to-red-600',
  info:    'bg-gradient-to-br from-blue-500 to-indigo-600',
  purple:  'bg-gradient-to-br from-purple-500 to-indigo-600',
}

export default function StatCard({ icon, value, label, variant = 'primary', trend, className = '', onClick }) {
  const gradientClass = gradients[variant] || gradients.primary

  return (
    <div 
      onClick={onClick}
      className={`relative overflow-hidden ${gradientClass} rounded-xl text-white p-5 shadow-sm transition-transform hover:-translate-y-1 duration-300 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div className="relative z-10">
        <div className="text-3xl md:text-4xl font-bold tracking-tight">{value}</div>
        <div className="text-sm font-medium text-white/90 mt-1 truncate">{label}</div>
        {trend && <div className="text-xs mt-2 text-white/80 flex items-center gap-1 font-medium"><i className="fas fa-chart-line"></i> {trend}</div>}
      </div>
      <i className={`fas ${icon} absolute -bottom-4 -right-2 text-7xl text-white opacity-20 pointer-events-none z-0`}></i>
    </div>
  )
}

export { ClassicStatCard }
