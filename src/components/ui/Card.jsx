export function Card({ children, className = '', ...props }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden \${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '', action }) {
  return (
    <div className={`flex items-center justify-between px-5 py-3.5 border-b border-gray-100 \${className}`}>
      <div className="font-medium text-sm text-gray-800">{children}</div>
      {action && <div>{action}</div>}
    </div>
  )
}

export function CardBody({ children, className = '' }) {
  return <div className={`px-5 py-4 \${className}`}>{children}</div>
}

export function CardFooter({ children, className = '' }) {
  return <div className={`px-5 py-3 bg-gray-50/50 border-t border-gray-100 \${className}`}>{children}</div>
}
