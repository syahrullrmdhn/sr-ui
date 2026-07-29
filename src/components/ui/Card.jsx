export function Card({ children, className = '', ...props }) {
  return (
    <div 
      className={`bg-white rounded-2xl shadow-sm border border-[#d4c4ab]/80 overflow-hidden flex flex-col w-full hover:border-[#855b2f]/30 transition-colors duration-200 ${className}`} 
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '', action, actions }) {
  const headerAction = action || actions
  return (
    <div 
      className={`flex items-center justify-between px-5 py-4 border-b border-[#d4c4ab]/60 bg-[#F4F6F9]/70 w-full ${className}`}
    >
      <div className="font-extrabold text-sm text-[#333333] tracking-tight flex items-center gap-2.5">{children}</div>
      {headerAction && <div className="flex items-center gap-1.5">{headerAction}</div>}
    </div>
  )
}

export function CardBody({ children, className = '' }) {
  return <div className={`p-5 flex-1 w-full text-[#333333] ${className}`}>{children}</div>
}

export function CardFooter({ children, className = '' }) {
  return (
    <div 
      className={`px-5 py-4 bg-[#F4F6F9]/80 border-t border-[#d4c4ab]/60 w-full ${className}`}
    >
      {children}
    </div>
  )
}

export default Card