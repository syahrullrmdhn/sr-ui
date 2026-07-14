import { useState, createContext, useContext } from 'react'

const AccordionCtx = createContext()

export function Accordion({ children, allowMultiple = false, className = '' }) {
  const [openItems, setOpenItems] = useState(new Set())

  const toggle = (id) => {
    setOpenItems(prev => {
      const next = new Set(allowMultiple ? prev : [])
      if (prev.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <AccordionCtx.Provider value={{ openItems, toggle }}>
      <div className={`divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden \${className}`}>
        {children}
      </div>
    </AccordionCtx.Provider>
  )
}

export function AccordionItem({ id, title, children, icon }) {
  const { openItems, toggle } = useContext(AccordionCtx)
  const isOpen = openItems.has(id)

  return (
    <div>
      <button
        onClick={() => toggle(id)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium hover:bg-gray-50 transition"
      >
        {icon && <i className={`fas \${icon} text-primary w-5 text-center`}></i>}
        <span className="flex-1">{title}</span>
        <i className={`fas fa-chevron-down text-xs text-gray-400 transition-transform duration-200 \${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      <div className={`overflow-hidden transition-all duration-200 \${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-3 text-sm text-gray-600 border-t border-gray-100 bg-gray-50/50">
          {children}
        </div>
      </div>
    </div>
  )
}
