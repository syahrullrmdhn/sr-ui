import React, { useState, useMemo, useCallback, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'

/**
 * DataTable - Enhanced data table component (ported from Imat.DataTable)
 *
 * NEW features (matching Imat.DataTable):
 * - Inline cell editors: textbox, combobox, checkbox, progress
 * - Cell change tracking: getChanged(), table-changed styling
 * - Tab/Arrow navigation between editors
 * - Column data mapping (key→label)
 * - Row lock/disable per-cell
 * - showError() row error marking
 * - addRow() / clear() imperative methods via ref
 * - customHeader support
 * - column dataSource for ajax-loaded combo data
 *
 * Original features kept:
 * - Sortable columns, advanced pagination, page size selector
 * - Search, row click/dblclick, server-side mode
 * - Bordered/striped/wrap/fixedHeader options
 */

const InlineEditor = ({ type, value, options, onChange, onBlur, autoFocus, align }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (autoFocus && ref.current) {
      ref.current.focus()
      if (ref.current.select) ref.current.select()
    }
  }, [autoFocus])

  if (type === 'checkbox') {
    return (
      <input
        ref={ref}
        type="checkbox"
        defaultChecked={value === true || value === '1' || value === 1}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-slate-300 accent-[#a86e2f] cursor-pointer"
      />
    )
  }

  if (type === 'combobox' && options) {
    return (
      <select
        ref={ref}
        defaultValue={value || ''}
        onChange={(e) => { onChange(e.target.value); if (onBlur) onBlur(e.target.value) }}
        className="w-full px-2 py-1 text-xs bg-white border border-[#a86e2f] rounded-lg outline-none focus:ring-2 focus:ring-[#a86e2f]/20"
        style={{ textAlign: align || 'left' }}
      >
        <option value="">-</option>
        {options.map((opt, i) => (
          <option key={i} value={opt.key || opt.value}>{opt.value || opt.label || opt.key}</option>
        ))}
      </select>
    )
  }

  if (type === 'progress') {
    return (
      <div className="flex items-center gap-2 w-full">
        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              value < 25 ? 'bg-rose-500' : value <= 75 ? 'bg-[#d97e2f]' : 'bg-[#4a9c6e]'
            }`}
            style={{ width: (value || 0) + '%' }}
          />
        </div>
        <span className="text-[10px] font-bold text-slate-600 w-8 text-right">{value || 0}%</span>
      </div>
    )
  }

  // Default: textbox
  return (
    <input
      ref={ref}
      type="text"
      defaultValue={value || ''}
      onBlur={(e) => { if (onBlur) onBlur(e.target.value) }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') { e.target.blur() }
        if (e.key === 'Escape') { e.target.value = value || ''; e.target.blur() }
      }}
      className="w-full px-2 py-1 text-xs bg-white border border-[#a86e2f] rounded-lg outline-none focus:ring-2 focus:ring-[#a86e2f]/20"
      style={{ textAlign: align || 'left' }}
    />
  )
}

const DataTable = forwardRef(function DataTable({
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
  onChange,
  customHeader,
}, ref) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(defaultPageSize)
  const [orderBy, setOrderBy] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [internalSelected, setInternalSelected] = useState(null)
  const [editingCell, setEditingCell] = useState(null) // { rowIndex, colIndex }
  const [errorRows, setErrorRows] = useState(new Set())
  const [changedCells, setChangedCells] = useState({}) // { "rowIdx-colIdx": value }
  const [localData, setLocalData] = useState(data)
  const tableRef = useRef(null)

  // Sync localData with data prop
  useEffect(() => { setLocalData(data) }, [data])

  const selectedRow = controlledSelectedRow !== undefined ? controlledSelectedRow : internalSelected

  // -- Imperative API via ref --
  useImperativeHandle(ref, () => ({
    addRow(rowData, focusCol = 0) {
      setLocalData(prev => {
        const next = [...prev, rowData]
        return next
      })
      setTimeout(() => {
        const newIdx = localData.length
        setEditingCell({ rowIndex: newIdx, colIndex: focusCol })
      }, 50)
    },
    clear() {
      setLocalData([])
      setChangedCells({})
      setErrorRows(new Set())
    },
    getChanged() {
      return Object.entries(changedCells).map(([key, val]) => {
        const [r, c] = key.split('-').map(Number)
        return { rowIndex: r, colIndex: c, value: val, row: localData[r] }
      })
    },
    showError(rows) {
      setErrorRows(new Set(rows.map(String)))
    },
    getData() { return localData },
  }), [localData, changedCells])

  // -- Column data mapping helper --
  const getDisplayValue = useCallback((col, rawValue) => {
    if (rawValue == null) return ''
    // column.data = [{ key: 'L', value: 'Laki-laki' }, ...]
    if (col.data) {
      const found = col.data.find(d => String(d.key) === String(rawValue))
      return found ? found.value : rawValue
    }
    // column.editor.data (combobox options)
    if (col.editor && col.editor.data) {
      const found = col.editor.data.find(d => String(d.key) === String(rawValue))
      return found ? found.value : rawValue
    }
    return rawValue
  }, [])

  // -- Sorting --
  const sortedData = useMemo(() => {
    if (sortMode !== 'local' || !orderBy || !sortBy) return localData
    return [...localData].sort((a, b) => {
      let valA = a[orderBy]; let valB = b[orderBy]
      if (valA == null) valA = ''
      if (valB == null) valB = ''
      const numA = parseFloat(valA); const numB = parseFloat(valB)
      if (!isNaN(numA) && !isNaN(numB)) return sortBy === 'ASC' ? numA - numB : numB - numA
      const dateA = new Date(valA); const dateB = new Date(valB)
      if (!isNaN(dateA) && !isNaN(dateB) && valA && valB) return sortBy === 'ASC' ? dateA - dateB : dateB - dateA
      const strA = String(valA).toLowerCase(); const strB = String(valB).toLowerCase()
      if (sortBy === 'ASC') return strA > strB ? 1 : strA < strB ? -1 : 0
      return strB > strA ? 1 : strB < strA ? -1 : 0
    })
  }, [localData, orderBy, sortBy, sortMode])

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
    if (isServerMode) return filtered
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
    if (orderBy === accessor && sortBy === 'ASC') newSortBy = 'DESC'
    setOrderBy(accessor); setSortBy(newSortBy); setPage(1)
    if (sortMode === 'server' && onSort) onSort(accessor, newSortBy)
  }, [orderBy, sortBy, sortMode, onSort])

  const goToPage = useCallback((p) => {
    const newPage = Math.max(1, Math.min(p, totalPages))
    setPage(newPage)
    if (isServerMode && onPageChange) onPageChange((newPage - 1) * limit, limit)
  }, [totalPages, isServerMode, onPageChange, limit])

  const handleLimitChange = useCallback((newLimit) => {
    setLimit(newLimit); setPage(1)
    if (isServerMode && onPageChange) onPageChange(0, newLimit)
  }, [isServerMode, onPageChange])

  const handleRowSelect = useCallback((row, index) => {
    setInternalSelected(index)
    if (onRowClick) onRowClick(row, index)
  }, [onRowClick])

  const handleCellChange = useCallback((rowIndex, colIndex, accessor, newValue) => {
    const cellKey = rowIndex + '-' + colIndex
    setChangedCells(prev => ({ ...prev, [cellKey]: newValue }))
    setLocalData(prev => {
      const next = [...prev]
      if (next[rowIndex]) {
        next[rowIndex] = { ...next[rowIndex], [accessor]: newValue }
      }
      return next
    })
    setEditingCell(null)
    if (onChange) onChange({ rowIndex, colIndex, accessor, value: newValue, row: localData[rowIndex] })
  }, [localData, onChange])

  // Tab navigation between editors
  const handleEditorKeyDown = useCallback((e, rowIndex, colIndex) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const dir = e.shiftKey ? -1 : 1
      let nextCol = colIndex + dir
      // Find next editable column
      while (nextCol >= 0 && nextCol < columns.length) {
        if (columns[nextCol].editor) {
          setEditingCell({ rowIndex, colIndex: nextCol })
          return
        }
        nextCol += dir
      }
      // Wrap to next/prev row
      const nextRow = rowIndex + dir
      if (nextRow >= 0 && nextRow < paged.length) {
        const startCol = dir > 0 ? 0 : columns.length - 1
        let c = startCol
        while (c >= 0 && c < columns.length) {
          if (columns[c].editor) {
            setEditingCell({ rowIndex: nextRow, colIndex: c })
            return
          }
          c += dir
        }
      }
      setEditingCell(null)
    }
    if (e.key === 'Escape') {
      setEditingCell(null)
    }
    // Arrow navigation
    if (e.key === 'ArrowUp' && rowIndex > 0) {
      setEditingCell({ rowIndex: rowIndex - 1, colIndex })
    }
    if (e.key === 'ArrowDown' && rowIndex < paged.length - 1) {
      setEditingCell({ rowIndex: rowIndex + 1, colIndex })
    }
  }, [columns, paged.length])

  // -- Page numbers --
  const pageNumbers = useMemo(() => {
    const maxButtons = 5
    if (totalPages <= maxButtons) return Array.from({ length: totalPages }, (_, i) => i + 1)
    let start = Math.max(1, currentPage - 2)
    let end = start + maxButtons - 1
    if (end > totalPages) { end = totalPages; start = end - maxButtons + 1 }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }, [totalPages, currentPage])

  // -- Render cell content --
  const renderCell = (col, row, rowIndex, colIndex) => {
    const actualIndex = isServerMode ? rowIndex : (currentPage - 1) * limit + rowIndex
    const isEditing = editingCell && editingCell.rowIndex === actualIndex && editingCell.colIndex === colIndex
    const cellKey = actualIndex + '-' + colIndex
    const isChanged = changedCells[cellKey] !== undefined
    const isLocked = row.locked === true
    const isCellDisabled = row.disabled && row.disabled[col.accessor]

    // If column has editor and cell is being edited
    if (col.editor && isEditing && !isLocked && !isCellDisabled) {
      const editor = col.editor
      const rawValue = row[col.accessor]
      const editorType = editor.xtype || 'textbox'

      return (
        <div onKeyDown={(e) => handleEditorKeyDown(e, actualIndex, colIndex)}>
          <InlineEditor
            type={editorType}
            value={rawValue}
            options={editor.data || editor.options}
            align={col.align}
            autoFocus
            onChange={(val) => {
              if (editorType === 'checkbox') {
                handleCellChange(actualIndex, colIndex, col.accessor, val)
              }
            }}
            onBlur={(val) => {
              if (editorType !== 'checkbox') {
                handleCellChange(actualIndex, colIndex, col.accessor, val)
              }
            }}
          />
        </div>
      )
    }

    // If column has a progress editor, always show the progress bar
    if (col.editor && col.editor.xtype === 'progress') {
      const val = row[col.accessor]
      return <InlineEditor type="progress" value={val} />
    }

    // If column has a checkbox editor that's always visible
    if (col.editor && col.editor.xtype === 'checkbox' && col.editor.always) {
      return (
        <input
          type="checkbox"
          checked={!!row[col.accessor]}
          onChange={(e) => handleCellChange(actualIndex, colIndex, col.accessor, e.target.checked)}
          disabled={isLocked || isCellDisabled}
          className="w-4 h-4 rounded border-slate-300 accent-[#a86e2f] cursor-pointer"
        />
      )
    }

    // Normal display
    const rawValue = row[col.accessor]
    const displayValue = getDisplayValue(col, rawValue)

    if (col.render) return col.render(row, actualIndex)
    return displayValue ?? ''
  }

  return (
    <div className={'space-y-3 ' + className}>
      {/* Top bar */}
      {searchable && (
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div className="relative w-full max-w-xs">
            <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
            <input
              type="text"
              className="w-full pl-9 pr-4 py-2 text-xs md:text-sm bg-slate-50/60 border border-slate-200/80 rounded-xl focus:bg-white focus:border-[#a86e2f] focus:ring-2 focus:ring-[#a86e2f]/20 transition-all outline-none text-slate-700 placeholder:text-slate-400"
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
                  className="px-2 py-1.5 text-xs bg-white border border-slate-200/80 rounded-lg focus:border-[#a86e2f] outline-none font-semibold text-slate-700 cursor-pointer"
                >
                  {pageSizeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
            )}
            <span className="text-slate-400">|</span>
            <span>Total: <span className="text-slate-800 font-semibold">{totalRows}</span> data</span>
          </div>
        </div>
      )}

      {/* Table */}
      <div ref={tableRef} className={(fixedHeader ? 'max-h-[600px] overflow-y-auto' : 'overflow-x-auto') + ' rounded-xl ' + (bordered ? 'border border-slate-200/60' : '') + ' shadow-2xs'}>
        <table className={'w-full text-sm ' + (wrap ? '' : 'whitespace-nowrap')}>
          <thead className={fixedHeader ? 'sticky top-0 z-10' : ''}>
            {customHeader ? (
              <tr dangerouslySetInnerHTML={{ __html: customHeader }} />
            ) : (
              <tr className="bg-slate-50/80 border-b border-slate-200/60">
                {columns.map((col, i) => {
                  const isSortable = col.sort !== false && (col.dataIndex || col.accessor) && sortMode !== 'none'
                  return (
                    <th
                      key={i}
                      className={'px-5 py-3.5 font-semibold text-slate-700 text-xs tracking-wide uppercase ' + (col.cls || '') + ' ' + (isSortable ? 'cursor-pointer select-none hover:bg-slate-100/80 transition-colors' : '')}
                      style={{ width: col.width || undefined, textAlign: col.align || headerAlign }}
                      onClick={isSortable ? () => handleSort(col) : undefined}
                    >
                      <div className="flex items-center gap-1.5" style={{ justifyContent: headerAlign === 'right' ? 'flex-end' : headerAlign === 'center' ? 'center' : 'flex-start' }}>
                        <span>{col.header}</span>
                        {isSortable && orderBy === (col.dataIndex || col.accessor) && (
                          <i className={'fas ' + (sortBy === 'ASC' ? 'fa-caret-up' : 'fa-caret-down') + ' text-[#a86e2f] text-xs'}></i>
                        )}
                      </div>
                    </th>
                  )
                })}
                {actions && <th className="px-5 py-3.5 text-right font-semibold text-slate-700 text-xs tracking-wide uppercase">Aksi</th>}
              </tr>
            )}
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {paged.map((row, ri) => {
              const actualIndex = isServerMode ? ri : (currentPage - 1) * limit + ri
              const isSelected = selectedRow === actualIndex
              const isError = errorRows.has(String(actualIndex))
              const highlightClass = row.highlight || ''

              return (
                <tr
                  key={row.id || ri}
                  className={
                    (onRowClick || onRowDblClick ? 'cursor-pointer ' : '') +
                    (isSelected ? 'bg-[#a86e2f]/5 ring-1 ring-[#a86e2f]/20 ' : isError ? 'bg-rose-50 ' : 'hover:bg-slate-50/80 ') +
                    highlightClass + ' transition-colors'
                  }
                  onClick={() => handleRowSelect(row, actualIndex)}
                  onDoubleClick={() => onRowDblClick && onRowDblClick(row, actualIndex)}
                >
                  {columns.map((col, ci) => {
                    const cellKey = actualIndex + '-' + ci
                    const isChanged = changedCells[cellKey] !== undefined
                    const isEditable = col.editor && !row.locked

                    return (
                      <td
                        key={ci}
                        className={'px-5 py-3.5 text-slate-600 ' + (wrap ? '' : 'whitespace-nowrap') + ' ' + (isChanged ? 'bg-yellow-50/60 ' : '') + (col.cellCls || '')}
                        style={{ width: col.width || undefined, textAlign: col.align || 'left', verticalAlign: col.valign || 'middle' }}
                        onClick={isEditable ? (e) => { e.stopPropagation(); setEditingCell({ rowIndex: actualIndex, colIndex: ci }) } : undefined}
                      >
                        {renderCell(col, row, ri, ci)}
                      </td>
                    )
                  })}
                  {actions && <td className="px-5 py-3.5 text-right">{actions(row, actualIndex)}</td>}
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
          <span className="font-medium">
            Menampilkan data{' '}
            <span className="text-slate-800 font-semibold">{rangeStart}</span> -{' '}
            <span className="text-slate-800 font-semibold">{rangeEnd}</span> dari{' '}
            <span className="text-slate-800 font-semibold">{totalRows}</span>
          </span>
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button onClick={() => goToPage(1)} disabled={currentPage === 1} className="px-2.5 py-1.5 border border-slate-200/80 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent font-medium transition-colors" title="Halaman pertama">
                <i className="fas fa-angles-left text-[10px]"></i>
              </button>
              <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-2.5 py-1.5 border border-slate-200/80 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent font-medium transition-colors" title="Halaman sebelumnya">
                <i className="fas fa-chevron-left text-[10px]"></i>
              </button>
              {pageNumbers[0] > 1 && <span className="px-1.5 text-slate-400">...</span>}
              {pageNumbers.map((p) => (
                <button key={p} onClick={() => goToPage(p)} className={'px-3 py-1.5 border rounded-lg font-semibold transition-colors ' + (p === currentPage ? 'bg-[#a86e2f] text-white border-[#a86e2f] shadow-2xs' : 'border-slate-200/80 hover:bg-slate-50 text-slate-700')}>
                  {p}
                </button>
              ))}
              {pageNumbers[pageNumbers.length - 1] < totalPages && <span className="px-1.5 text-slate-400">...</span>}
              <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-2.5 py-1.5 border border-slate-200/80 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent font-medium transition-colors" title="Halaman berikutnya">
                <i className="fas fa-chevron-right text-[10px]"></i>
              </button>
              <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages} className="px-2.5 py-1.5 border border-slate-200/80 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent font-medium transition-colors" title="Halaman terakhir">
                <i className="fas fa-angles-right text-[10px]"></i>
              </button>
              {isServerMode && (
                <button onClick={() => onPageChange((currentPage - 1) * limit, limit)} className="px-2.5 py-1.5 border border-slate-200/80 rounded-lg hover:bg-slate-50 font-medium transition-colors ml-1" title="Muat ulang data">
                  <i className="fas fa-refresh text-[10px]"></i>
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
})

export default DataTable
