import { useState } from 'react'

export function Tabs({ tabs, defaultTab, className = '' }) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id)
  const current = tabs.find(t => t.id === active)

  return (
    <div className={`w-full flex flex-col flex-1 ${className}`}>
      <div className="flex gap-1 border-b border-slate-200/80 mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActive(tab.id)}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap -mb-px flex items-center gap-2 ${active === tab.id ? 'border-teal-600 text-teal-700 bg-teal-50/40' : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'}`}>
            {tab.icon && <i className={`fas ${tab.icon}`}></i>}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex-1 w-full flex flex-col">
        {current?.content}
      </div>
    </div>
  )
}

export function VerticalTabs({ tabs, defaultTab, sidebarContent, className = '' }) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id)
  const current = tabs.find(t => t.id === active)

  return (
    <div className={`flex flex-col md:flex-row gap-6 w-full flex-1 ${className}`}>
      <div className="w-full md:w-64 flex-shrink-0 bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col">
        {sidebarContent}
        <div className="flex flex-col gap-1.5 mt-5 border-t border-slate-100 pt-4 flex-1">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActive(tab.id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-left transition-all cursor-pointer ${active === tab.id ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-teal-700'}`}>
              <i className={`fas ${tab.icon} w-5 text-center`}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm flex flex-col w-full min-h-[450px]">
        {current?.content}
      </div>
    </div>
  )
}
