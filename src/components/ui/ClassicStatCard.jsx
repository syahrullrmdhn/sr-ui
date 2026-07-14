import React from 'react'

const themes = {
  bronze: {
    bg: 'bg-[#a86e2f]',
    footer: 'bg-[#895823]/60 hover:bg-[#895823]',
  },
  gold: {
    bg: 'bg-[#b36523]',
    footer: 'bg-[#895823]/60 hover:bg-[#895823]',
  },
  blue: {
    bg: 'bg-[#2f69a8]',
    footer: 'bg-[#224c7a]/60 hover:bg-[#224c7a]',
  },
  orange: {
    bg: 'bg-[#d97e2f]',
    footer: 'bg-[#b36523]/60 hover:bg-[#b36523]',
  },
  red: {
    bg: 'bg-rose-600',
    footer: 'bg-rose-800/60 hover:bg-rose-800',
  },
  green: {
    bg: 'bg-[#4a9c6e]',
    footer: 'bg-[#3a7d57]/60 hover:bg-[#3a7d57]',
  },
  teal: {
    bg: 'bg-[#2fa86e]',
    footer: 'bg-[#237d52]/60 hover:bg-[#237d52]',
  },
  purple: {
    bg: 'bg-purple-600',
    footer: 'bg-purple-800/60 hover:bg-purple-800',
  },
  indigo: {
    bg: 'bg-indigo-600',
    footer: 'bg-indigo-800/60 hover:bg-indigo-800',
  },
  cyan: {
    bg: 'bg-[#2f69a8]',
    footer: 'bg-[#224c7a]/60 hover:bg-[#224c7a]',
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
    <div className={`relative rounded-2xl overflow-hidden shadow-sm ${currentTheme.bg} flex flex-col text-white transition-transform hover:-translate-y-1 duration-300 w-full border border-white/15 font-sans ${className}`}>
      {/* Decorative Bubble Effects ("bubble bubble gitu") */}
      <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10 blur-[2px] pointer-events-none animate-bubble"></div>
      <div className="absolute top-10 right-1/3 w-16 h-16 rounded-full bg-white/10 blur-[1px] pointer-events-none animate-bubble-delayed"></div>
      <div className="absolute -bottom-8 left-6 w-20 h-20 rounded-full bg-white/10 blur-[1px] pointer-events-none"></div>

      <i className={`fas ${icon} absolute -bottom-4 -right-2 text-7xl text-white opacity-15 pointer-events-none z-0`}></i>
      
      <div className="p-5 flex-1 relative z-10">
        <div className="text-4xl font-extrabold tracking-tight mb-1 font-sans">{value}</div>
        <div className="text-white/95 text-sm font-bold truncate">{title}</div>
      </div>
      {(footerText || onClick) && (
        <button 
          onClick={onClick}
          type={onClick ? 'button' : undefined}
          className={`w-full py-2.5 text-xs font-bold text-white/95 flex justify-center items-center gap-1.5 transition-colors z-10 ${currentTheme.footer} ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
        >
          {footerText} {footerText && <i className="fas fa-arrow-circle-right text-[10px]"></i>}
        </button>
      )}
    </div>
  )
}
