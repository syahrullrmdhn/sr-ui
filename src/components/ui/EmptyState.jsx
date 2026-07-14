export default function EmptyState({ icon = 'fa-inbox', title = 'Tidak ada data', description, action, className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 text-center \${className}`}>
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <i className={`fas \${icon} text-2xl text-gray-300`}></i>
      </div>
      <div className="font-medium text-gray-500 mb-1">{title}</div>
      {description && <div className="text-sm text-gray-400 mb-4">{description}</div>}
      {action}
    </div>
  )
}
