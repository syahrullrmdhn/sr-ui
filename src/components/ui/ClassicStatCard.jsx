import React from 'react'

const themes = {
  bronze: {
    bg: 'bg-gradient-to-br from-[#8c5822] to-[#a86e2f]',
    footer: 'bg-[#3d230e]/40 hover:bg-[#3d230e]/60',
  },
  gold: {
    bg: 'bg-gradient-to-br from-[#a86e2f] to-[#d99244]',
    footer: 'bg-[#6f4318]/40 hover:bg-[#6f4318]/60',
  },
  blue: {
    bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
    footer: 'bg-blue-700/30 hover:bg-blue-700/50',
  },
  orange: {
    bg: 'bg-gradient-to-br from-amber-500 to-amber-600',
    footer: 'bg-amber-700/30 hover:bg-amber-700/50',
  },
  red: {
    bg: 'bg-gradient-to-br from-rose-500 to-rose-600',
    footer: 'bg-rose-700/30 hover:bg-rose-700/50',
  },
  green: {
    bg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    footer: 'bg-emerald-700/30 hover:bg-emerald-700/50',
  },
  teal: {
    bg: 'bg-gradient-to-br from-[#8c5822] to-[#a86e2f]',
    footer: 'bg-[#3d230e]/40 hover:bg-[#3d230e]/60',
  },
  purple: {
    bg: 'bg-gradient-to-br from-purple-500 to-purple-600',
    footer: 'bg-purple-700/30 hover:bg-purple-700/50',
  },
  indigo: {
    bg: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    footer: 'bg-indigo-700/30 hover:bg-indigo-700/50',
  },
  cyan: {
    bg: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
    footer: 'bg-cyan-700/30 hover:bg-cyan-700/50',
  },
}

export default function ClassicStatCard({ 
  title, 
  value, 
  colorTheme = 'bronze', 
  icon = 'fa-chart-bar', 
  footerText = 'More info',
  onClick,
  className = '' 
}) {
  const currentTheme = themes[colorTheme] || themes.bronze

  return (
    <div className={`relative rounded-xl overflow-hidden shadow-sm ${currentTheme.bg} flex flex-col text-white transition-transform hover:-translate-y-1 duration-300 w-full border border-white/10 ${className}`}>
      <i className={`fas ${icon} absolute -bottom-4 -right-2 text-7xl text-white opacity-20 pointer-events-none z-0`}></i>
      <div className="p-5 flex-1 relative z-10">
        <div className="text-4xl font-extrabold tracking-tight mb-1 font-mono">{value}</div>
        <div className="text-white/95 text-sm font-bold truncate">{title}</div>
      </div>
      {(footerText || onClick) && (
        <button 
          onClick={onClick}
          type={onClick ? 'button' : undefined}
          className={`w-full py-2.5 text-xs font-semibold text-white/90 flex justify-center items-center gap-1.5 transition-colors z-10 ${currentTheme.footer} ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
        >
          {footerText} {footerText && <i className="fas fa-arrow-circle-right text-[10px]"></i>}
        </button>
      )}
    </div>
  )
}
