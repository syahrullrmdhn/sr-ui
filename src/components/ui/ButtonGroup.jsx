import React from 'react'

/**
 * ButtonGroup - Grouped buttons with vertical divider (ported from Imat.ButtonGroup)
 *
 * Usage:
 *   <ButtonGroup>
 *     <Button variant="primary" icon="fa-save">Simpan</Button>
 *     <Button variant="ghost">Batal</Button>
 *   </ButtonGroup>
 */

export default function ButtonGroup({
  children,
  className = '',
  vertical = false,
  ...props
}) {
  return (
    <div
      className={`inline-flex ${vertical ? 'flex-col' : 'flex-row'} ${className}`}
      role="group"
      {...props}
    >
      {React.Children.map(children, (child, i) => {
        if (!child) return null
        const isFirst = i === 0
        const isLast = i === React.Children.count(children) - 1

        return (
          <div
            className={`
              [&>button]:rounded-none
              [&>button]:shadow-none
              ${!vertical && !isFirst ? '[&>button]:-ml-px' : ''}
              ${!vertical && isFirst ? '[&>button]:rounded-l-xl' : ''}
              ${!vertical && isLast ? '[&>button]:rounded-r-xl' : ''}
              ${vertical && isFirst ? '[&>button]:rounded-t-xl' : ''}
              ${vertical && isLast ? '[&>button]:rounded-b-xl' : ''}
            `}
          >
            {child}
          </div>
        )
      })}
    </div>
  )
}
