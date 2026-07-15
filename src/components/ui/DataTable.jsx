import React, { useState, useMemo, useCallback } from 'react'

/**
 * DataTable - Enhanced data table component (ported from Imat.DataTable)
 *
 * Features:
 * - Sortable column headers (ASC/DESC)
 * - Advanced pagination: First/Prev/Page#/Next/Last + page size selector
 * - "Menampilkan data X-Y dari Z" caption (Indonesian locale)
 * - Client-side or server-side data mode
 * - Row selection with onRowClick/onRowDblClick
 * - Row highlight support
 * - Search/filter
 * - Custom column renderers
 * - Actions column
 * - Empty state
 *
 * @param {Array} columns - Column definitions: { header, accessor?, render?, sort?, align?, width?, cls? }
 * @param {Array} data - Row data array
 * @param {boolean} searchable - Show search input (default: true)
 * @param {number} pageSize - Default rows per page (default: 20)
 * @param {Array} pageSizeOptions - Page size dropdown options (default: [10,20,50,100])
 * @param {Function} actions - Render-prop for action buttons: (row, index) => JSX
 * @param {string} className - Extra CSS class
 * @param {Function} onRowClick - Callback when row is clicked: (row, index) => void
 * @param {Function} onRowDblClick - Callback when row is double-clicked: (row, index) => void
 * @param {string} sortMode - 'local' (default) or 'server'
 * @param {Function} onSort - Server-side sort callback: (sortBy, orderBy) => void
 * @param {Function} onPageChange - Server-side page callback: (start, limit) => void
 * @param {number} totalRows - Total rows for server-side mode (overrides data.length)
 * @param {boolean} bordered - Show table borders (default: true)
 * @param {boolean} striped - Stripe alternate rows (default: false)
 * @param {string} headerAlign - Header text alignment (default: 'left')
 * @param {string} pagination - 'advanced' (default), 'simple', or 'hidden'
 * @param {boolean} wrap - Wrap cell text (default: false)
 * @param {boolean} fixedHeader - Sticky header (default: false)
 * @param {string} emptyText - Custom empty state message
 * @param {number|null} selectedRowIndex - Controlled selected row index
 */
export default function DataTable({
  columns = [],
  data = [],
  searchable = true,
  pageSize: defaultPageSize = 20,
  pageSizeOptions = [10, 20, 50, 100],
  actions,
  className = '',
  onRowClick,
  onRowDblClick,
  sortMode = 'local',
  onSort,
  onPageChange,
  totalRows: serverTotalRows,
  bordered = true,
  striped = false,
  headerAlign = 'left',
  pagination = 'advanced',
  wrap = false,
  fixedHeader = false,
  emptyText = 'Data tidak ditemukan atau masih kosong.',
  selectedRowIndex: controlledSelectedRow,
}) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(defaultPageSize)
  const [orderBy, setOrderBy] = useState('')
  const [sortBy, setSortBy] = useState('') // 'ASC' or 'DESC'
  const [internalSelected, setInternalSelected] = useState(null)

  const selectedRow = controlledSelectedRow !== undefined ? controlledSelectedRow : internalSelected

  // -- Sorting --
  const sortedData = useMemo(() => {
    if (sortMode !== 'local' || !orderBy || !sortBy) return data

    return [...data].sort((a, b) => {
      let valA = a[orderBy]
      let valB = b[orderBy]

      // Handle null/undefined
      if (valA == null) valA = ''
      if (valB == null) valB = ''

      // Try numeric comparison
      const numA = parseFloat(valA)
      const numB = parseFloat(valB)
      if (!isNaN(numA) && !isNaN(numB)) {
        return sortBy === 'ASC' ? numA - numB : numB - numA
      }

      // Try date comparison
      const dateA = new Date(valA)
      const dateB = new Date(valB)
      if (!isNaN(dateA) && !isNaN(dateB) && valA && valB) {
        return sortBy === 'ASC' ? dateA - dateB : dateB - dateA
      }

      // String comparison
      const strA = String(valA).toLowerCase()
      const strB = String(valB).toLowerCase()
      if (sortBy === 'ASC') return strA > strB ? 1 : strA < strB ? -1 : 0
      return strB > strA ? 1 : strB < strA ? -1 : 0
    })
  }, [data, orderBy, sortBy, sortMode])

  // -- Filtering --
  const filtered = useMemo(() => {
    if (!search) return sortedData
    return sortedData.filter(row =>
      columns.some(col => {
        const val = col.accessor ? row[col.accessor] : ''
        return String(val).toLowerCase().includes(search.toLowerCase())
      })
    )
  }, [sortedData, search, columns])

  // -- Pagination --
  const isServerMode = sortMode === 'server' && !!onPageChange
  const totalRows = isServerMode && serverTotalRows !== undefined ? serverTotalRows : filtered.length
  const totalPages = Math.max(1, Math.ceil(totalRows / limit))
  const currentPage = Math.min(page, totalPages)

  const paged = useMemo(() => {
    if (isServerMode) return filtered // server already paginated
    return filtered.slice((currentPage - 1) * limit, currentPage * limit)
  }, [filtered, currentPage, limit, isServerMode])

  const rangeStart = totalRows > 0 ? (currentPage - 1) * limit + 1 : 0
  const rangeEnd = Math.min(currentPage * limit, totalRows)

  // -- Handlers --
  const handleSort = useCallback((col) => {
    if (col.sort === false) return

    const accessor = col.dataIndex || col.accessor
    if (!accessor) return

    let newSortBy = 'ASC'
    if (orderBy === accessor && sortBy === 'ASC') {
      newSortBy = 'DESC'
    }

    setOrderBy(accessor)
    setSortBy(newSortBy)
    setPage(1)

    if (sortMode === 'server' && onSort) {
      onSort(accessor, newSortBy)
    }
  }, [orderBy, sortBy, sortMode, onSort])

  const goToPage = useCallback((p) => {
    const newPage = Math.max(1, Math.min(p, totalPages))
    setPage(newPage)

    if (isServerMode && onPageChange) {
      onPageChange((newPage - 1) * limit, limit)
    }
  }, [totalPages, isServerMode, onPageChange, limit])

  const handleLimitChange = useCallback((newLimit) => {
    setLimit(newLimit)
    setPage(1)

    if (isServerMode && onPageChange) {
      onPageChange(0, newLimit)
    }
  }, [isServerMode, onPageChange])

  const handleRowSelect = useCallback((row, index) => {
    setInternalSelected(index)
    if (onRowClick) onRowClick(row, index)
  }, [onRowClick])

  // -- Page number buttons (max 5 visible) --
  const pageNumbers = useMemo(() => {
    const maxButtons = 5
    if (totalPages <= maxButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    let start = Math.max(1, currentPage - 2)
    let end = start + maxButtons - 1

    if (end > totalPages) {
      end = totalPages
      start = end - maxButtons + 1
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }, [totalPages, currentPage])

  // -- Render --
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Top bar: search + page size selector */}
      {searchable && (
        <div className="flex flex-wrap justify-between items-center gap-3">
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
          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
            {pagination !== 'hidden' && (
              <div className="flex items-center gap-1.5">
                <span>Jumlah Per Halaman</span>
                <select
                  value={limit}
                  onChange={(e) => handleLimitChange(Number(e.target.value))}
                  className="px-2 py-1.5 text-xs bg-white border border-slate-200/80 rounded-lg focus:border-teal-500 outline-none font-semibold text-slate-700 cursor-pointer"
                >
                  {pageSizeOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            )}
            <span className="text-slate-400">|</span>
            <span>
              Total: <span className="text-slate-800 font-semibold">{totalRows}</span> data
            </span>
          </div>
        </div>
      )}

      {/* Table */}
      <div className={`${fixedHeader ? 'max-h-[600px] overflow-y-auto' : 'overflow-x-auto'} rounded-xl ${bordered ? 'border border-slate-200/60' : ''} shadow-2xs`}>
        <table className={`w-full text-sm ${wrap ? '' : 'whitespace-nowrap'}`}>
          <thead className={fixedHeader ? 'sticky top-0 z-10' : ''}>
            <tr className="bg-slate-50/80 border-b border-slate-200/60">
              {columns.map((col, i) => {
                const isSortable = col.sort !== false && (col.dataIndex || col.accessor) && sortMode !== 'none'
                return (
                  <th
                    key={i}
                    className={`px-5 py-3.5 font-semibold text-slate-700 text-xs tracking-wide uppercase ${col.cls || ''} ${isSortable ? 'cursor-pointer select-none hover:bg-slate-100/80 transition-colors' : ''}`}
                    style={{
                      width: col.width || undefined,
                      textAlign: col.align || headerAlign,
                    }}
                    onClick={isSortable ? () => handleSort(col) : undefined}
                  >
                    <div className="flex items-center gap-1.5" style={{ justifyContent: headerAlign === 'right' ? 'flex-end' : headerAlign === 'center' ? 'center' : 'flex-start' }}>
                      <span>{col.header}</span>
                      {isSortable && orderBy === (col.dataIndex || col.accessor) && (
                        <i className={`fas ${sortBy === 'ASC' ? 'fa-caret-up' : 'fa-caret-down'} text-teal-500 text-xs`}></i>
                      )}
                    </div>
                  </th>
                )
              })}
              {actions && (
                <th className="px-5 py-3.5 text-right font-semibold text-slate-700 text-xs tracking-wide uppercase">
                  Aksi
                </th>
              )}
            </tr>
          </thead>
          <tbody className={`divide-y divide-slate-100 ${striped ? 'bg-white' : 'bg-white'}`}>
            {paged.map((row, ri) => {
              const actualIndex = isServerMode ? ri : (currentPage - 1) * limit + ri
              const isSelected = selectedRow === actualIndex
              const highlightClass = row.highlight || ''

              return (
                <tr
                  key={row.id || ri}
                  className={`
                    ${onRowClick || onRowDblClick ? 'cursor-pointer' : ''}
                    ${isSelected ? 'bg-teal-50/60 ring-1 ring-teal-200/50' : 'hover:bg-slate-50/80'}
                    ${highlightClass}
                    transition-colors
                  `}
                  onClick={() => handleRowSelect(row, actualIndex)}
                  onDoubleClick={() => onRowDblClick && onRowDblClick(row, actualIndex)}
                >
                  {columns.map((col, ci) => (
                    <td
                      key={ci}
                      className={`px-5 py-3.5 text-slate-600 ${wrap ? '' : 'whitespace-nowrap'} ${col.cellCls || ''}`}
                      style={{
                        width: col.width || undefined,
                        textAlign: col.align || 'left',
                        verticalAlign: col.valign || 'middle',
                      }}
                    >
                      {col.render ? col.render(row, actualIndex) : (row[col.accessor] ?? '')}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-5 py-3.5 text-right">{actions(row, actualIndex)}</td>
                  )}
                </tr>
              )
            })}
            {paged.length === 0 && (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-5 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-2.5 border border-slate-100">
                      <i className="fas fa-inbox text-lg text-slate-300"></i>
                    </div>
                    <p className="text-xs font-medium text-slate-500">{emptyText}</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      {pagination !== 'hidden' && totalRows > 0 && (
        <div className="flex flex-wrap items-center justify-between pt-1 text-xs text-slate-500 gap-2">
          {/* Caption */}
          <span className="font-medium">
            Menampilkan data{' '}
            <span className="text-slate-800 font-semibold">{rangeStart}</span>
            {' - '}
            <span className="text-slate-800 font-semibold">{rangeEnd}</span>
            {' dari '}
            <span className="text-slate-800 font-semibold">{totalRows}</span>
          </span>

          {/* Navigation buttons */}
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              {/* First */}
              <button
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
                className="px-2.5 py-1.5 border border-slate-200/80 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent font-medium transition-colors"
                title="Halaman pertama"
              >
                <i className="fas fa-angles-left text-[10px]"></i>
              </button>

              {/* Previous */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2.5 py-1.5 border border-slate-200/80 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent font-medium transition-colors"
                title="Halaman sebelumnya"
              >
                <i className="fas fa-chevron-left text-[10px]"></i>
              </button>

              {/* Page numbers */}
              {pageNumbers[0] > 1 && (
                <span className="px-1.5 text-slate-400">...</span>
              )}
              {pageNumbers.map((p) => (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`px-3 py-1.5 border rounded-lg font-semibold transition-colors ${
                    p === currentPage
                      ? 'bg-teal-500 text-white border-teal-500 shadow-2xs'
                      : 'border-slate-200/80 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {p}
                </button>
              ))}
              {pageNumbers[pageNumbers.length - 1] < totalPages && (
                <span className="px-1.5 text-slate-400">...</span>
              )}

              {/* Next */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2.5 py-1.5 border border-slate-200/80 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent font-medium transition-colors"
                title="Halaman berikutnya"
              >
                <i className="fas fa-chevron-right text-[10px]"></i>
              </button>

              {/* Last */}
              <button
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-2.5 py-1.5 border border-slate-200/80 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent font-medium transition-colors"
                title="Halaman terakhir"
              >
                <i className="fas fa-angles-right text-[10px]"></i>
              </button>

              {/* Refresh (server mode only) */}
              {isServerMode && (
                <button
                  onClick={() => onPageChange((currentPage - 1) * limit, limit)}
                  className="px-2.5 py-1.5 border border-slate-200/80 rounded-lg hover:bg-slate-50 font-medium transition-colors ml-1"
                  title="Muat ulang data"
                >
                  <i className="fas fa-refresh text-[10px]"></i>
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
