const gradients = {
  primary: 'from-primary to-primary-light',
  success: 'from-green-600 to-emerald-400',
  warning: 'from-amber-500 to-yellow-400',
  danger:  'from-red-600 to-red-400',
  info:    'from-sky-600 to-cyan-400',
}

export default function StatCard({ icon, value, label, variant = 'primary', trend, className = '' }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br \${gradients[variant]} rounded-xl text-white p-5 shadow-lg \${className}`}>
      <div className="relative z-10">
        <div className="text-3xl font-bold">{value}</div>
        <div className="text-sm opacity-90 mt-1">{label}</div>
        {trend && <div className="text-xs mt-2 opacity-75">{trend}</div>}
      </div>
      <i className={`fas \${icon} absolute -bottom-2 -right-2 text-7xl opacity-10`}></i>
    </div>
  )
}
