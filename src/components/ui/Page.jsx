import React from 'react'
import PageBanner from './PageBanner'

export default function Page({ 
  title, 
  icon, 
  subtitle,
  badge = 'Admin Portal',
  actions, 
  banner = true,
  bannerTheme = 'teal',
  children, 
  className = '' 
}) {
  return (
    <div className={`space-y-6 w-full max-w-full flex-1 flex flex-col pb-6 ${className}`}>
      {title && banner && (
        <PageBanner 
          title={title} 
          icon={icon} 
          subtitle={subtitle} 
          badge={badge} 
          actions={actions} 
          theme={bannerTheme} 
        />
      )}

      {title && !banner && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4.5 rounded-xl border border-slate-200/60 shadow-sm w-full">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-base border border-teal-100 shadow-2xs">
                <i className={`fas ${icon}`}></i>
              </div>
            )}
            <div>
              <h4 className="text-base md:text-lg font-bold text-slate-800 mb-0 tracking-tight">{title}</h4>
              {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}

      <div className="w-full flex-1 flex flex-col space-y-6">
        {children}
      </div>
    </div>
  )
}
