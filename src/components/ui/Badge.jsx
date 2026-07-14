const variants = {
  primary:  'bg-primary-light/20 text-primary-dark',
  success:  'bg-green-100 text-green-800',
  warning:  'bg-yellow-100 text-yellow-800',
  danger:   'bg-red-100 text-red-800',
  info:     'bg-blue-100 text-blue-800',
  gray:     'bg-gray-100 text-gray-700',
}

export default function Badge({ variant = 'primary', children, dot = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium \${variants[variant]} \${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full \${variant === 'success' ? 'bg-green-500' : variant === 'danger' ? 'bg-red-500' : variant === 'warning' ? 'bg-yellow-500' : 'bg-primary'}`}></span>}
      {children}
    </span>
  )
}
