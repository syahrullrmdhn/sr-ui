const variants = {
  primary:   'bg-primary text-white hover:bg-primary-dark',
  success:   'bg-green-600 text-white hover:bg-green-700',
  danger:    'bg-red-600 text-white hover:bg-red-700',
  warning:   'bg-yellow-500 text-white hover:bg-yellow-600',
  info:      'bg-sky-500 text-white hover:bg-sky-600',
  outline:   'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
  ghost:     'bg-transparent text-gray-600 hover:bg-gray-100',
}
const sizes = {
  xs: 'px-2 py-1 text-xs gap-1',
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-6 py-2.5 text-base gap-2',
}

export default function Button({ variant = 'primary', size = 'md', icon, iconRight, loading, disabled, rounded = false, className = '', children, ...props }) {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-medium transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed \${rounded ? 'rounded-full' : 'rounded-lg'} \${variants[variant]} \${sizes[size]} \${className}`}
      {...props}
    >
      {loading && <i className="fas fa-spinner fa-spin"></i>}
      {icon && !loading && <i className={`fas \${icon}`}></i>}
      {children}
      {iconRight && <i className={`fas \${iconRight}`}></i>}
    </button>
  )
}
