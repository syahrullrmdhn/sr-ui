import { useState, useMemo } from 'react'

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
    <div className={className}>
      {searchable && (
        <div className="mb-3">
          <input
            type="text"
            className="w-full max-w-xs px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
            placeholder="Cari..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          />
        </div>
      )}
      <div className="overflow-x-auto rounded-lg border border-gray-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((col, i) => (
                <th key={i} className="px-4 py-3 text-left font-medium text-gray-500 whitespace-nowrap">{col.header}</th>
              ))}
              {actions && <th className="px-4 py-3 text-left font-medium text-gray-500">Aksi</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paged.map((row, ri) => (
              <tr key={ri} className="hover:bg-amber-50/30 transition">
                {columns.map((col, ci) => (
                  <td key={ci} className="px-4 py-3 whitespace-nowrap">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
                {actions && <td className="px-4 py-3">{actions(row)}</td>}
              </tr>
            ))}
            {paged.length === 0 && (
              <tr><td colSpan={columns.length + 1} className="px-4 py-8 text-center text-gray-400">Tidak ada data</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
          <span>Menampilkan {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, filtered.length)} dari {filtered.length} data</span>
          <div className="flex gap-1">
            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-2.5 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-40">&laquo;</button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)} className={`px-2.5 py-1 border rounded transition \${p === page ? 'bg-primary text-white border-primary' : 'border-gray-200 hover:bg-gray-50'}`}>{p}</button>
            ))}
            <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="px-2.5 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-40">&raquo;</button>
          </div>
        </div>
      )}
    </div>
  )
}
