import React, { useState } from 'react'

// ----------------------------------------------------------------------
// Bar Chart Interaktif Berbasis SVG & CSS
// ----------------------------------------------------------------------
export function BarChart({ data, title, subtitle, height = 240, color = 'teal', unit = '' }) {
  const [hoverIndex, setHoverIndex] = useState(null)
  const maxVal = Math.max(...data.map(d => d.value), 1)

  const colorMap = {
    teal: 'from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-teal-600 bg-teal-50',
    blue: 'from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-blue-600 bg-blue-50',
    purple: 'from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-purple-600 bg-purple-50',
    orange: 'from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-orange-600 bg-amber-50',
  }

  const activeColor = colorMap[color] || colorMap.teal

  return (
    <div className="w-full flex flex-col h-full">
      {(title || subtitle) && (
        <div className="mb-4 flex items-center justify-between">
          <div>
            {title && <h5 className="font-bold text-slate-800 text-sm">{title}</h5>}
            {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 inline-block"></span>
            <span className="text-xs text-slate-500 font-medium">Statistik Aktif</span>
          </div>
        </div>
      )}

      <div className="flex-1 flex items-end justify-between gap-2 md:gap-4 pt-6 pb-2 px-2 border-b border-slate-100 relative" style={{ height: `${height}px` }}>
        {data.map((item, index) => {
          const percentage = Math.round((item.value / maxVal) * 100)
          const isHovered = hoverIndex === index

          return (
            <div 
              key={index} 
              className="flex-1 flex flex-col items-center h-full justify-end relative group"
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {/* Tooltip */}
              <div className={`absolute -top-10 bg-slate-800 text-white text-[11px] font-bold py-1 px-2.5 rounded-lg shadow-lg pointer-events-none transition-all duration-200 z-20 whitespace-nowrap flex flex-col items-center ${isHovered ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-1'}`}>
                <span>{item.label}: {item.value} {unit}</span>
                <div className="w-2 h-2 bg-slate-800 rotate-45 absolute -bottom-1"></div>
              </div>

              {/* Bar */}
              <div className="w-full max-w-[42px] bg-slate-100 rounded-t-lg overflow-hidden flex items-end h-full relative p-0.5">
                <div 
                  className={`w-full rounded-t-md bg-gradient-to-t transition-all duration-500 ease-out shadow-xs ${activeColor.split(' ').slice(0, 4).join(' ')} ${isHovered ? 'brightness-110 scale-[1.02]' : ''}`}
                  style={{ height: `${Math.max(percentage, 6)}%` }}
                ></div>
              </div>

              {/* Label Bawah */}
              <span className={`text-[11px] font-semibold mt-2.5 transition-colors truncate max-w-full ${isHovered ? 'text-teal-600 font-bold' : 'text-slate-500'}`}>
                {item.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ----------------------------------------------------------------------
// Donut / Pie Progress Chart
// ----------------------------------------------------------------------
export function DonutChart({ items = [], title, totalLabel = 'Total' }) {
  const total = items.reduce((s, i) => s + i.value, 0)
  let cumulativePercent = 0

  return (
    <div className="w-full flex flex-col h-full justify-between">
      {title && <h5 className="font-bold text-slate-800 text-sm mb-4">{title}</h5>}

      <div className="flex flex-col sm:flex-row items-center justify-around gap-6 my-auto py-2">
        {/* SVG Donut */}
        <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="40" className="stroke-slate-100" strokeWidth="14" fill="none" />
            {items.map((item, index) => {
              const percent = total > 0 ? (item.value / total) * 100 : 0
              const dashArray = `${(percent / 100) * 251.2} 251.2`
              const dashOffset = -((cumulativePercent / 100) * 251.2)
              cumulativePercent += percent

              return (
                <circle 
                  key={index}
                  cx="50" cy="50" r="40" 
                  stroke={item.color || '#0d9488'} 
                  strokeWidth="14" 
                  strokeDasharray={dashArray} 
                  strokeDashoffset={dashOffset} 
                  strokeLinecap="round"
                  fill="none" 
                  className="transition-all duration-700 ease-out hover:opacity-85"
                />
              )
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-extrabold text-slate-800 font-mono tracking-tight">{total}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{totalLabel}</span>
          </div>
        </div>

        {/* Legenda */}
        <div className="space-y-3 w-full sm:w-auto flex-1">
          {items.map((item, index) => {
            const percent = total > 0 ? Math.round((item.value / total) * 100) : 0
            return (
              <div key={index} className="flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2.5 truncate">
                  <span className="w-3 h-3 rounded-full flex-shrink-0 shadow-2xs" style={{ backgroundColor: item.color || '#0d9488' }}></span>
                  <span className="font-semibold text-slate-700 truncate">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-800 font-mono">{item.value}</span>
                  <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">({percent}%)</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
