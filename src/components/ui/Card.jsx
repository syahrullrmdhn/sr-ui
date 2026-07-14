export function Card({ children, className = '', ...props }) {
  return (
    <div 
      className={`bg-white rounded-2xl shadow-sm border border-[#e8d9c7]/80 overflow-hidden flex flex-col w-full hover:border-[#a86e2f]/30 transition-colors duration-200 ${className}`} 
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '', action }) {
  return (
    <div 
      className={`flex items-center justify-between px-5 py-4 border-b border-[#e8d9c7]/60 bg-[#f8f5f1]/70 w-full ${className}`}
    >
      <div className="font-extrabold text-sm text-[#2c2c2c] tracking-tight flex items-center gap-2.5">{children}</div>
      {action && <div className="flex items-center gap-1.5">{action}</div>}
    </div>
  )
}

export function CardBody({ children, className = '' }) {
  return <div className={`p-5 flex-1 w-full text-[#2c2c2c] ${className}`}>{children}</div>
}

export function CardFooter({ children, className = '' }) {
  return (
    <div 
      className={`px-5 py-4 bg-[#f8f5f1]/80 border-t border-[#e8d9c7]/60 w-full ${className}`}
    >
      {children}
    </div>
  )
}

export default Card