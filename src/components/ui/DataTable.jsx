import React, { useState, useMemo } from 'react'

export default function DataTable({ columns, data, searchable = true, pageSize = 10, actions, className = '' }) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    if (!search) return data
    return data.filter(row =>
      columns.some(col => {
        const val = col.accessor ? row[col.accessor] : ''
        return String(val).toLowerCase().includes(search.toLowerCase())
      })
    )
  }, [data, search, columns])

  const totalPages = Math.ceil(filtered.length / pageSize)
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className={`space-y-4 ${className}`}>
      {searchable && (
        <div className="flex justify-between items-center gap-3">
          <div className="relative w-full max-w-xs">
            <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
            <input
              type="text"
              className="w-full pl-9 pr-4 py-2 text-xs md:text-sm bg-slate-50/60 border border-slate-200/80 rounded-xl focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none text-slate-700 placeholder:text-slate-400"
              placeholder="Cari data..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            />
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Total: <span className="text-slate-800 font-semibold">{filtered.length}</span> data
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto rounded-xl border border-slate-200/60 shadow-2xs">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/60">
              {columns.map((col, i) => (
                <th key={i} className="px-5 py-3.5 text-left font-semibold text-slate-700 text-xs tracking-wide uppercase whitespace-nowrap">{col.header}</th>
              ))}
              {actions && <th className="px-5 py-3.5 text-right font-semibold text-slate-700 text-xs tracking-wide uppercase">Aksi</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {paged.map((row, ri) => (
              <tr key={ri} className="hover:bg-slate-50/80 transition-colors">
                {columns.map((col, ci) => (
                  <td key={ci} className="px-5 py-3.5 text-slate-600 whitespace-nowrap">
                    {col.render ? col.render(row, (page - 1) * pageSize + ri) : row[col.accessor]}
                  </td>
                ))}
                {actions && <td className="px-5 py-3.5 text-right">{actions(row)}</td>}
              </tr>
            ))}
            {paged.length === 0 && (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-5 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-2.5 border border-slate-100">
                      <i className="fas fa-inbox text-lg text-slate-300"></i>
                    </div>
                    <p className="text-xs font-medium text-slate-500">Data tidak ditemukan atau masih kosong.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
          <span className="font-medium">
            Menampilkan <span className="text-slate-800 font-semibold">{(page - 1) * pageSize + 1}</span> - <span className="text-slate-800 font-semibold">{Math.min(page * pageSize, filtered.length)}</span> dari <span className="text-slate-800 font-semibold">{filtered.length}</span> data
          </span>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setPage(Math.max(1, page - 1))} 
              disabled={page === 1} 
              className="px-3 py-1.5 border border-slate-200/80 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent font-medium transition-colors"
            >
              <i className="fas fa-chevron-left text-[10px]"></i>
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              // Calculate page numbers around current page
              let p = i + 1
              if (totalPages > 5 && page > 3) {
                p = page - 2 + i
                if (p > totalPages) p = totalPages - 4 + i
              }
              return (
                <button 
                  key={p} 
                  onClick={() => setPage(p)} 
                  className={`px-3 py-1.5 border rounded-lg font-semibold transition-colors ${
                    p === page ? 'bg-teal-500 text-white border-teal-500 shadow-2xs' : 'border-slate-200/80 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {p}
                </button>
              )
            })}
            <button 
              onClick={() => setPage(Math.min(totalPages, page + 1))} 
              disabled={page === totalPages} 
              className="px-3 py-1.5 border border-slate-200/80 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent font-medium transition-colors"
            >
              <i className="fas fa-chevron-right text-[10px]"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
