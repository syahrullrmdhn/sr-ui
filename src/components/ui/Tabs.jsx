import { useState } from 'react'

export function Tabs({ tabs, defaultTab, className = '' }) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id)
  const current = tabs.find(t => t.id === active)

  return (
    <div className={`w-full flex flex-col flex-1 ${className}`}>
      <div className="flex gap-1 border-b border-[#d4c4ab] mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActive(tab.id)}
            className={`px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap -mb-px flex items-center gap-2 ${active === tab.id ? 'border-[#855b2f] text-[#855b2f] bg-[#F4F6F9]/80' : 'border-transparent text-[#5A5A5A] hover:text-[#333333] hover:border-[#d4c4ab]'}`}>
            {tab.icon && <i className={`fas ${tab.icon}`}></i>}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex-1 w-full flex flex-col text-[#333333]">
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
      <div className="w-full md:w-64 flex-shrink-0 bg-white p-5 rounded-2xl border border-[#d4c4ab] shadow-sm flex flex-col">
        {sidebarContent}
        <div className="flex flex-col gap-1.5 mt-5 border-t border-[#d4c4ab]/60 pt-4 flex-1">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActive(tab.id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-left transition-all cursor-pointer ${active === tab.id ? 'bg-[#855b2f] text-white shadow-sm ring-1 ring-[#855b2f]/20' : 'text-[#5A5A5A] hover:bg-[#F4F6F9] hover:text-[#855b2f]'}`}>
              <i className={`fas ${tab.icon} w-5 text-center`}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 bg-white border border-[#d4c4ab] rounded-2xl p-6 shadow-sm flex flex-col w-full min-h-[450px] text-[#333333]">
        {current?.content}
      </div>
    </div>
  )
}
