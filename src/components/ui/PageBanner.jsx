import React from 'react'

const bannerThemes = {
  bronze: 'bg-gradient-to-r from-[#8c5822] via-[#a86e2f] to-[#d99244]',
  teal: 'bg-gradient-to-r from-[#8c5822] via-[#a86e2f] to-[#d99244]',
  blue: 'bg-gradient-to-r from-[#6f4318] via-[#a86e2f] to-[#d99244]',
  indigo: 'bg-gradient-to-r from-[#3d230e] via-[#6f4318] to-[#a86e2f]',
  amber: 'bg-gradient-to-r from-[#a86e2f] via-[#d99244] to-[#f59e0b]',
  rose: 'bg-gradient-to-r from-[#8c5822] via-[#a86e2f] to-[#eeba54]',
  emerald: 'bg-gradient-to-r from-[#065f46] via-[#059669] to-[#10b981]',
  slate: 'bg-gradient-to-r from-[#334155] to-[#1e293b]',
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
    <div className={`${bgClass} rounded-xl shadow-md p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between text-white w-full border border-white/10 ${className}`}>
      <div className="flex items-center gap-3.5">
        {icon && (
          <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-lg shadow-inner border border-white/20 text-amber-200 flex-shrink-0">
            <i className={`fas ${icon}`}></i>
          </div>
        )}
        <div>
          <h1 className="text-base md:text-lg font-bold tracking-tight flex items-center gap-2 m-0 text-white">
            {!icon && <i className="fas fa-layer-group text-amber-200"></i>} {title}
          </h1>
          {subtitle && <p className="text-xs text-white/85 mt-0.5 m-0 leading-relaxed">{subtitle}</p>}
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-3 sm:mt-0 flex-shrink-0">
        {badge && (
          <div className="text-xs font-semibold bg-white/15 px-4 py-1.5 rounded-full border border-white/25 shadow-inner text-amber-100 flex items-center gap-1.5">
            <i className="fas fa-sparkles text-[10px] text-amber-300"></i> {badge}
          </div>
        )}
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  )
}
