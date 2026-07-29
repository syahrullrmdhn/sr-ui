import React, { useState } from 'react'

// ----------------------------------------------------------------------
// Bar Chart Interaktif Berbasis SVG & CSS (Clean Solid Roboto)
// ----------------------------------------------------------------------
export function BarChart({ data, title, subtitle, height = 240, color = 'bronze', unit = '' }) {
  const [hoverIndex, setHoverIndex] = useState(null)
  const maxVal = Math.max(...data.map(d => d.value), 1)

  const colorMap = {
    bronze: 'bg-[#855b2f] hover:bg-[#5e3f1f] text-[#855b2f]',
    secondary: 'bg-[#2f69a8] hover:bg-[#224c7a] text-[#2f69a8]',
    accent: 'bg-[#4caf50] hover:bg-[#237d52] text-[#4caf50]',
    teal: 'bg-[#4caf50] hover:bg-[#237d52] text-[#4caf50]',
    blue: 'bg-[#2f69a8] hover:bg-[#224c7a] text-[#2f69a8]',
    purple: 'bg-purple-600 hover:bg-purple-700 text-purple-600',
    orange: 'bg-[#ff9800] hover:bg-[#b36523] text-[#ff9800]',
  }

  const activeColor = colorMap[color] || colorMap.bronze

  return (
    <div className="w-full flex flex-col h-full font-['Roboto']">
      {(title || subtitle) && (
        <div className="mb-4 flex items-center justify-between">
          <div>
            {title && <h5 className="font-bold text-[#333333] text-sm m-0">{title}</h5>}
            {subtitle && <p className="text-xs text-[#5A5A5A] mt-0.5 m-0">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#855b2f] inline-block shadow-2xs"></span>
            <span className="text-xs text-[#5A5A5A] font-semibold">Statistik Aktif</span>
          </div>
        </div>
      )}

      <div className="flex-1 flex items-end justify-between gap-2 md:gap-4 pt-6 pb-2 px-2 border-b border-[#d4c4ab] relative" style={{ height: `${height}px` }}>
        {data.map((item, index) => {
          const percentage = Math.round((item.value / maxVal) * 100)
          const isHovered = hoverIndex === index

          return (
            <div 
              key={index} 
              className="flex-1 flex flex-col items-center h-full justify-end relative group cursor-pointer"
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {/* Tooltip */}
              <div className={`absolute -top-10 bg-[#333333] text-white text-[11px] font-bold py-1 px-2.5 rounded-lg shadow-lg pointer-events-none transition-all duration-200 z-20 whitespace-nowrap flex flex-col items-center font-['Roboto'] ${isHovered ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-1'}`}>
                <span>{item.label}: {item.value} {unit}</span>
                <div className="w-2 h-2 bg-[#333333] rotate-45 absolute -bottom-1"></div>
              </div>

              {/* Bar */}
              <div className="w-full max-w-[42px] bg-[#F4F6F9] rounded-t-lg overflow-hidden flex items-end h-full relative p-0.5 border border-[#d4c4ab]/50">
                <div 
                  className={`w-full rounded-t-md transition-all duration-500 ease-out shadow-xs ${activeColor.split(' ').slice(0, 2).join(' ')} ${isHovered ? 'brightness-110 scale-[1.02]' : ''}`}
                  style={{ height: `${Math.max(percentage, 6)}%` }}
                ></div>
              </div>

              {/* Label Bawah */}
              <span className={`text-[11px] font-bold mt-2.5 transition-colors truncate max-w-full ${isHovered ? 'text-[#855b2f]' : 'text-[#5A5A5A]'}`}>
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
// Donut / Pie Progress Chart (Clean Solid Roboto)
// ----------------------------------------------------------------------
export function DonutChart({ items = [], title, totalLabel = 'Total' }) {
  const total = items.reduce((s, i) => s + i.value, 0)
  let cumulativePercent = 0

  return (
    <div className="w-full flex flex-col h-full justify-between font-['Roboto']">
      {title && <h5 className="font-bold text-[#333333] text-sm mb-4 m-0">{title}</h5>}

      <div className="flex flex-col sm:flex-row items-center justify-around gap-6 my-auto py-2">
        {/* SVG Donut */}
        <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="40" className="stroke-[#F4F6F9]" strokeWidth="14" fill="none" />
            {items.map((item, index) => {
              const percent = total > 0 ? (item.value / total) * 100 : 0
              const dashArray = `${(percent / 100) * 251.2} 251.2`
              const dashOffset = -((cumulativePercent / 100) * 251.2)
              cumulativePercent += percent

              return (
                <circle 
                  key={index}
                  cx="50" cy="50" r="40" 
                  stroke={item.color || '#855b2f'} 
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
            <span className="text-2xl font-extrabold text-[#333333] font-['Roboto'] tracking-tight">{total}</span>
            <span className="text-[10px] font-bold text-[#5A5A5A] uppercase tracking-widest">{totalLabel}</span>
          </div>
        </div>

        {/* Legenda */}
        <div className="space-y-3 w-full sm:w-auto flex-1">
          {items.map((item, index) => {
            const percent = total > 0 ? Math.round((item.value / total) * 100) : 0
            return (
              <div key={index} className="flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2.5 truncate">
                  <span className="w-3 h-3 rounded-full flex-shrink-0 shadow-2xs" style={{ backgroundColor: item.color || '#855b2f' }}></span>
                  <span className="font-bold text-[#333333] truncate">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[#333333] font-['Roboto']">{item.value}</span>
                  <span className="text-[11px] font-bold text-[#5A5A5A] bg-[#F4F6F9] border border-[#d4c4ab] px-1.5 py-0.5 rounded">({percent}%)</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
