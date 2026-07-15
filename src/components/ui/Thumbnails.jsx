import { useState, useMemo } from 'react'

/**
 * Thumbnails - Image grid/gallery component (ported from Imat.Thumbnails)
 *
 * Features:
 * - Grid layout with image + caption
 * - Click / double-click selection
 * - Pagination support
 * - Customizable image dimensions
 * - Empty state
 *
 * Usage:
 *   <Thumbnails
 *     images={[
 *       { src: '/img/1.jpg', caption: 'Foto 1' },
 *       { src: '/img/2.jpg', caption: 'Foto 2' },
 *     ]}
 *     onSelect={(item, i) => console.log(item)}
 *   />
 */

export default function Thumbnails({
  images = [],
  fieldName = 'src',
  caption = 'caption',
  imageWidth = 150,
  imageHeight = 150,
  pageSize = 15,
  className = '',
  onSelect,
  onDblSelect,
  emptyText = 'Tidak ada gambar',
}) {
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(null)

  const totalPages = Math.max(1, Math.ceil(images.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const paged = images.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const rangeStart = images.length > 0 ? (currentPage - 1) * pageSize + 1 : 0
  const rangeEnd = Math.min(currentPage * pageSize, images.length)

  const handleClick = (item, index) => {
    const actualIndex = (currentPage - 1) * pageSize + index
    setSelected(actualIndex)
    if (onSelect) onSelect(item, actualIndex)
  }

  const handleDblClick = (item, index) => {
    const actualIndex = (currentPage - 1) * pageSize + index
    if (onDblSelect) onDblSelect(item, actualIndex)
  }

  if (images.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-16 text-[#6b5e52]/50 ${className}`}>
        <div className="w-16 h-16 bg-[#f8f5f1] rounded-full flex items-center justify-center mb-3 border border-[#e8d9c7]">
          <i className="fas fa-images text-xl text-[#e8d9c7]"></i>
        </div>
        <p className="text-sm font-medium">{emptyText}</p>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Grid */}
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 list-none p-0 m-0">
        {paged.map((item, i) => {
          const actualIndex = (currentPage - 1) * pageSize + i
          const isSelected = selected === actualIndex
          const src = typeof item === 'string' ? item : item[fieldName]
          const cap = typeof item === 'string' ? '' : item[caption]

          return (
            <li
              key={actualIndex}
              className={`
                group cursor-pointer rounded-xl overflow-hidden border transition-all duration-200
                ${isSelected
                  ? 'border-[#a86e2f] ring-2 ring-[#a86e2f]/20 shadow-lg'
                  : 'border-[#e8d9c7] hover:border-[#a86e2f]/50 hover:shadow-md'
                }
              `}
              style={{ width: imageWidth, height: imageHeight + 40 }}
              onClick={() => handleClick(item, i)}
              onDoubleClick={() => handleDblClick(item, i)}
            >
              <div className="overflow-hidden" style={{ height: imageHeight }}>
                <img
                  src={src}
                  alt={cap}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = ''
                    e.target.className = 'w-full h-full flex items-center justify-center bg-[#f8f5f1]'
                  }}
                />
              </div>
              {cap && (
                <div className="px-2 py-1.5 text-[11px] text-[#2c2c2c] font-medium text-center truncate bg-white">
                  {cap}
                </div>
              )}
            </li>
          )
        })}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-[#6b5e52]">
          <span className="font-medium">
            Menampilkan data <span className="text-[#2c2c2c] font-semibold">{rangeStart}</span> - <span className="text-[#2c2c2c] font-semibold">{rangeEnd}</span> dari <span className="text-[#2c2c2c] font-semibold">{images.length}</span>
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1.5 border border-[#e8d9c7] rounded-lg hover:bg-[#f8f5f1] disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
            >
              <i className="fas fa-chevron-left text-[10px]"></i>
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let p = i + 1
              if (totalPages > 5 && currentPage > 3) {
                p = currentPage - 2 + i
                if (p > totalPages) p = totalPages - 4 + i
              }
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1.5 border rounded-lg font-semibold transition-colors cursor-pointer ${
                    p === currentPage
                      ? 'bg-[#a86e2f] text-white border-[#a86e2f] shadow-2xs'
                      : 'border-[#e8d9c7] hover:bg-[#f8f5f1] text-[#2c2c2c]'
                  }`}
                >
                  {p}
                </button>
              )
            })}
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1.5 border border-[#e8d9c7] rounded-lg hover:bg-[#f8f5f1] disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
            >
              <i className="fas fa-chevron-right text-[10px]"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
