import { useState } from 'react'

export function Tabs({ tabs, defaultTab, className = '' }) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id)
  const current = tabs.find(t => t.id === active)

  return (
    <div className={className}>
      <div className="flex gap-0 border-b border-gray-200 mb-4">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActive(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition -mb-px \${active === tab.id ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
            {tab.icon && <i className={`fas \${tab.icon} mr-2`}></i>}
            {tab.label}
          </button>
        ))}
      </div>
      {current?.content}
    </div>
  )
}

export function VerticalTabs({ tabs, defaultTab, sidebarContent, className = '' }) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id)
  const current = tabs.find(t => t.id === active)

  return (
    <div className={`flex gap-6 \${className}`}>
      <div className="w-56 flex-shrink-0">
        {sidebarContent}
        <div className="flex flex-col gap-0.5 mt-3">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActive(tab.id)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-left transition \${active === tab.id ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              <i className={`fas \${tab.icon} w-5 text-center`}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 border border-gray-200 rounded-xl p-5 min-h-[400px]">
        {current?.content}
      </div>
    </div>
  )
}
