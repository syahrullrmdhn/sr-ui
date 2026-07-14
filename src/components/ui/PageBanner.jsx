import React from 'react'

const bannerThemes = {
  bronze: 'bg-[#a86e2f]',
  teal: 'bg-[#2fa86e]',
  blue: 'bg-[#2f69a8]',
  indigo: 'bg-[#2f69a8]',
  amber: 'bg-[#d97e2f]',
  rose: 'bg-rose-600',
  emerald: 'bg-[#4a9c6e]',
  slate: 'bg-[#2c2c2c]',
}

export default function PageBanner({ 
  title, 
  icon, 
  subtitle, 
  badge, 
  actions, 
  theme = 'bronze',
  className = '' 
}) {
  const bgClass = bannerThemes[theme] || bannerThemes.bronze

  return (
    <div className={`${bgClass} rounded-2xl shadow-md p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between text-white w-full border border-white/10 relative overflow-hidden font-sans ${className}`}>
      {/* Decorative Floating Bubble Circles ("bubble bubble gitu") */}
      <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/10 blur-[2px] pointer-events-none animate-bubble"></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-white/10 blur-[1px] pointer-events-none animate-bubble-delayed"></div>
      <div className="absolute -bottom-10 left-1/3 w-36 h-36 rounded-full bg-white/10 blur-[2px] pointer-events-none"></div>
      <div className="absolute top-2 left-10 w-16 h-16 rounded-full bg-white/10 blur-[1px] pointer-events-none"></div>

      <div className="flex items-center gap-3.5 relative z-10">
        {icon && (
          <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-lg shadow-inner border border-white/20 text-[#f8f5f1] flex-shrink-0">
            <i className={`fas ${icon}`}></i>
          </div>
        )}
        <div>
          <h1 className="text-base md:text-lg font-bold tracking-tight flex items-center gap-2 m-0 text-white font-sans">
            {!icon && <i className="fas fa-layer-group text-[#f8f5f1]"></i>} {title}
          </h1>
          {subtitle && <p className="text-xs text-white/90 mt-0.5 m-0 leading-relaxed">{subtitle}</p>}
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-3 sm:mt-0 flex-shrink-0 relative z-10">
        {badge && (
          <div className="text-xs font-bold bg-white/15 px-4 py-1.5 rounded-full border border-white/25 shadow-inner text-white flex items-center gap-1.5">
            <i className="fas fa-sparkles text-[10px] text-[#f8f5f1]"></i> {badge}
          </div>
        )}
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  )
}
