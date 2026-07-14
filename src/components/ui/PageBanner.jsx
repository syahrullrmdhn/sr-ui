import React from 'react'

const bannerThemes = {
  teal: 'bg-gradient-to-r from-teal-500 to-emerald-500',
  blue: 'bg-gradient-to-r from-blue-600 to-indigo-600',
  indigo: 'bg-gradient-to-r from-indigo-500 to-purple-600',
  amber: 'bg-gradient-to-r from-amber-500 to-orange-500',
  rose: 'bg-gradient-to-r from-rose-500 to-pink-600',
  emerald: 'bg-gradient-to-r from-emerald-600 to-teal-600',
  slate: 'bg-gradient-to-r from-slate-700 to-slate-800',
}

export default function PageBanner({ 
  title, 
  icon, 
  subtitle, 
  badge, 
  actions, 
  theme = 'teal',
  className = '' 
}) {
  const bgClass = bannerThemes[theme] || bannerThemes.teal

  return (
    <div className={`${bgClass} rounded-xl shadow-sm p-4 md:p-5 flex flex-col sm:flex-row items-center justify-between text-white w-full ${className}`}>
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center text-lg shadow-inner border border-white/20">
            <i className={`fas ${icon} text-white`}></i>
          </div>
        )}
        <div>
          <h1 className="text-base md:text-lg font-semibold tracking-wide flex items-center gap-2">
            {!icon && <i className="fas fa-laptop-code text-teal-100"></i>} {title}
          </h1>
          {subtitle && <p className="text-xs text-white/80 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-3 sm:mt-0">
        {badge && (
          <div className="text-xs font-medium bg-white/10 px-4 py-1.5 rounded-full border border-white/20 shadow-inner">
            {badge}
          </div>
        )}
        {actions && <div>{actions}</div>}
      </div>
    </div>
  )
}
