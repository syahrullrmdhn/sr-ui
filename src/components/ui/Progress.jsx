const colors = {
  primary: 'bg-primary',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500',
  info: 'bg-sky-500',
}

export function ProgressBar({ value = 0, max = 100, variant = 'primary', size = 'md', label, showPercent = true, className = '' }) {
  const percent = Math.min(100, (value / max) * 100)
  const heights = { sm: 'h-1.5', md: 'h-2', lg: 'h-3' }

  return (
    <div className={className}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-xs font-medium text-gray-600">{label}</span>}
          {showPercent && <span className="text-xs font-semibold text-gray-500">{Math.round(percent)}%</span>}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden \${heights[size]}`}>
        <div className={`\${colors[variant]} \${heights[size]} rounded-full transition-all duration-500`} style={{ width: percent + '%' }}></div>
      </div>
    </div>
  )
}

export function CircularProgress({ value = 0, size = 80, strokeWidth = 8, variant = 'primary', label }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference
  const strokeColors = { primary: '#855b2f', success: '#22c55e', warning: '#eab308', danger: '#ef4444', info: '#0ea5e9' }

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={strokeColors[variant]} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-700" />
      </svg>
      <div className="absolute text-center">
        <div className="text-lg font-bold text-gray-800">{value}</div>
        {label && <div className="text-[10px] text-gray-500">{label}</div>}
      </div>
    </div>
  )
}
