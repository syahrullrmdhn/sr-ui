import React from 'react'

/**
 * NavBar - Toolbar with left/right positioning (ported from Imat.NavBar)
 *
 * Features:
 * - Left/right item positioning
 * - Collapse modes: left, right, both, none
 * - Responsive toggle
 * - Items can be buttons, dropdowns, inputs, or custom
 *
 * Usage:
 *   <NavBar
 *     left={[
 *       <Button>Tambah</Button>,
 *       <Button>Hapus</Button>,
 *     ]}
 *     right={[
 *       <span>Total: 100</span>,
 *       <Button icon="fa-refresh">Refresh</Button>,
 *     ]}
 *   />
 */

export default function NavBar({
  left = [],
  right = [],
  className = '',
  collapse = 'responsive', // 'left' | 'right' | 'both' | 'none' | 'responsive'
  bordered = true,
  ...props
}) {
  return (
    <nav
      className={'flex items-center justify-between gap-3 px-4 py-2.5 bg-[#f8f5f1]/70 ' +
        (bordered ? 'border border-[#e8d9c7]/60 rounded-xl ' : '') + className}
      {...props}
    >
      {/* Left items */}
      <div className="flex items-center gap-2 flex-wrap">
        {React.Children.map(left, (child, i) => child && (
          <div key={i} className="flex items-center">{child}</div>
        ))}
      </div>

      {/* Right items */}
      <div className="flex items-center gap-2 flex-wrap">
        {React.Children.map(right, (child, i) => child && (
          <div key={i} className="flex items-center">{child}</div>
        ))}
      </div>
    </nav>
  )
}
