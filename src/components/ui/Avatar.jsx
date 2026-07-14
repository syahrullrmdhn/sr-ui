const sizes = { xs: 'w-6 h-6 text-[10px]', sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg', xl: 'w-20 h-20 text-2xl' }

export default function Avatar({ src, name, size = 'md', className = '' }) {
  const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?'

  if (src) {
    return <img src={src} alt={name} className={`rounded-full object-cover \${sizes[size]} \${className}`} />
  }

  return (
    <div className={`rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold \${sizes[size]} \${className}`}>
      {initials}
    </div>
  )
}
