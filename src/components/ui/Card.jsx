export function Card({ children, className = '', ...props }) {
  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden flex flex-col w-full ${className}`} 
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '', action }) {
  return (
    <div 
      className={`flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/40 w-full ${className}`}
    >
      <div className="font-bold text-sm text-slate-800 tracking-wide flex items-center gap-2">{children}</div>
      {action && <div className="flex items-center gap-1.5">{action}</div>}
    </div>
  )
}

export function CardBody({ children, className = '' }) {
  return <div className={`p-5 flex-1 w-full ${className}`}>{children}</div>
}

export function CardFooter({ children, className = '' }) {
  return (
    <div 
      className={`px-5 py-4 bg-slate-50/80 border-t border-slate-100/80 w-full ${className}`}
    >
      {children}
    </div>
  )
}