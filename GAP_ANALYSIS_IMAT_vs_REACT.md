# Gap Analysis: Imat.DataTable Framework vs sr-ui React Components

**Audit Date:** 2026-07-15
**Source:** `/var/local/website/public/assets/src/framework.js` (4,299 lines)
**Target:** `/root/sr-ui/src/components/ui/*.jsx` (32 components)

---

## Executive Summary

The React port covers **~70% of surface-level features** but misses significant **behavioral depth** — particularly inline editing, data change tracking, imperative APIs (getValue/setValue/show/hide), and the Store event lifecycle. The most critical gaps are in **DataTable** (no inline editors, no change tracking) and **Form** (no showValue/showField/hideField).

---

## 1. DataTable

### Original (Imat.DataTable) Features
- **Store integration** — binds to `Imat.Store` for ajax/array data, pagination via store params
- **Inline cell editors** — columns can have `editor: { xtype: 'textbox'|'combobox'|'checkbox'|'progress' }` that render editors on click
- **Cell change tracking** — `store.getChanged()` tracks dirty cells, marks with `table-changed` class
- **Tab navigation between editors** — Tab/Shift+Tab/Arrow keys move between editable cells
- **Custom header** — `customHeader` option for fully custom `<thead>` HTML
- **Draggable rows** — `dragable: true` setting
- **Row lock/disable** — per-row `locked` and per-cell `disabled[dataIndex]` flags
- **Column data mapping** — `column.data` array to map stored values to display values (e.g., key→label)
- **Column dataSource** — `setColumnDataSource()` / `setComboDataSource()` for ajax-loaded dropdown data
- **addRow()** — imperative method to append a row and focus it
- **clear()** — imperative method to empty table
- **showError(arError)** — mark specific rows as error/danger
- **getChanged()** — returns array of dirty rows
- **loadPage(p)** — direct page navigation method
- **fullSize** — CSS class for full-width/height
- **fixedHeader** — uses clone + scroll sync approach
- **onItemClick / onItemDblClick** events
- **row.highlight** — per-row CSS class
- **Pagination** — advanced (first/prev/page#/next/last + page size ComboBox 10-100), simple, hidden

### React DataTable Features
- Search input, column sorting (local/server), pagination (advanced/simple/hidden)
- Page size selector, row click/dblclick callbacks, row selection
- Bordered/striped/wrap/fixedHeader options, actions column, empty state
- Server-side mode with `onSort`/`onPageChange` callbacks

### ❌ Missing in React
| Gap | Severity |
|-----|----------|
| **Inline cell editors** (textbox/combobox/checkbox/progress) | 🔴 CRITICAL |
| **Cell change tracking** (`getChanged`, `table-changed` styling) | 🔴 CRITICAL |
| **Tab/Arrow navigation** between editable cells | 🟡 HIGH |
| **Custom header** (`customHeader` HTML override) | 🟡 HIGH |
| **Row lock/disable** (per-row `locked`, per-cell `disabled`) | 🟡 HIGH |
| **Column data mapping** (`column.data` for key→label display) | 🟡 HIGH |
| **Column dataSource** (ajax-loaded combo data for columns) | 🟡 HIGH |
| **addRow()** imperative method | 🟡 HIGH |
| **clear()** imperative method | 🟢 MEDIUM |
| **showError()** row error marking | 🟢 MEDIUM |
| **Draggable rows** (`dragable: true`) | 🟢 MEDIUM |
| **row.highlight** per-row CSS class (partially supported via `highlight` field) | 🟢 LOW |
| **fullSize** CSS class | 🟢 LOW |

---

## 2. Button

### Original (Imat.Button)
- `handler` — function OR string (calls `window[handler]()`)
- `iconCls` / `iconPosition` (left/right)
- `badge` — appended badge span
- `label` — appended label span with type
- `onTable` — propagates click to parent `<td>` (for DataTable integration)
- Inherits: disabled, hidden, cls, style, tooltip, popover, width/height/position, show/hide

### React Button
- variant (primary/secondary/accent/success/warning/danger/info/outline/ghost)
- size (xs/sm/md/lg), icon, iconRight, loading, disabled, rounded

### ❌ Missing in React
| Gap | Severity |
|-----|----------|
| `handler` as string (window function name) | 🟢 LOW |
| `badge` prop | 🟢 MEDIUM |
| `label` prop (inline label with type) | 🟢 LOW |
| `onTable` mode (DataTable cell click propagation) | 🟡 HIGH |

---

## 3. ComboBox → Select

### Original (Imat.ComboBox)
- **DataSource** — ajax or array, with `autoLoad`, `emptyText` placeholder
- **select2** integration — searchable dropdown
- **allowBlank** validation — `isValid()` with `has-error` class
- **getParams()** — reads `data-params` from selected option
- **format** — custom format string for option display (`format.format(key, value)`)
- **clear()** — clears all options
- **onLoad / onComplete** events
- **leftAddon / rightAddon** — input group addons
- **line** mode — `has-line` class on select2 container
- **onTable** mode — for DataTable inline use
- **single-item auto-select** — if only 1 item, auto-selects and removes empty option

### React Select
- label, error, icon, options array, value, onChange, standard `<select>`

### ❌ Missing in React
| Gap | Severity |
|-----|----------|
| **DataSource** (ajax autoLoad, array binding) | 🔴 CRITICAL |
| **select2** (searchable dropdown) | 🟡 HIGH |
| **allowBlank validation** (isValid) | 🟡 HIGH |
| **emptyText** placeholder option | 🟡 HIGH |
| **format** custom option display | 🟢 MEDIUM |
| **clear()** method | 🟢 MEDIUM |
| **onLoad / onComplete** events | 🟢 MEDIUM |
| **getParams()** data-params | 🟢 LOW |
| **leftAddon / rightAddon** | 🟢 LOW |
| Single-item auto-select | 🟢 LOW |

---

## 4. TextBox → Input

### Original (Imat.TextBox)
- **Type variants**: `text`, `textarea`, `static`, `file`, `date`, `number`
- **autoGrow** — textarea auto-resizes on input
- **allowBlank** — validation on blur with `has-error`
- **readOnly** — `setReadOnly()` method
- **minlength / maxlength** — validation
- **min / max** — for number type, clamps values
- **Number input** — blocks non-numeric keys, blocks paste
- **Date type** — jQuery UI datepicker integration
- **leftAddon / rightAddon** — input group addons (including file browse button)
- **onSubmit** — Enter key handler
- **align** — text-align on input
- **setValue / getValue / length / setReadOnly / isValid** — imperative methods
- **EventListener** — onBlur, onChange, etc.

### React Input
- label, error, icon, rightAction, type, className, standard `<input>`

### ❌ Missing in React
| Gap | Severity |
|-----|----------|
| **textarea mode** | 🟡 HIGH |
| **static mode** (read-only display) | 🟢 MEDIUM |
| **date type** (datepicker) | 🟡 HIGH |
| **number type** (key filtering, min/max clamping) | 🟡 HIGH |
| **autoGrow** for textarea | 🟢 MEDIUM |
| **allowBlank validation** (isValid) | 🟡 HIGH |
| **readOnly** prop | 🟢 MEDIUM |
| **minlength / maxlength** validation | 🟢 MEDIUM |
| **onSubmit** (Enter key handler) | 🟢 MEDIUM |
| **leftAddon / rightAddon** | 🟢 LOW |
| **align** (text-align) | 🟢 LOW |
| Imperative methods (setValue, getValue, isValid) | 🟡 HIGH |

> Note: FileUpload is a separate React component — covers `type: 'file'` well with drag/drop + preview.

---

## 5. CheckBox

### Original (Imat.CheckBox)
- **DataSource** — renders multiple checkboxes from ajax/array data
- **Type variants**: `checkbox`, `radio`, `static` (check-circle/times-circle icons)
- **inline** mode — `checkbox-inline` class
- **allowBlank** validation
- **setValue(v)** — comma-separated string to check multiple
- **getValue()** — returns checked value
- **setType(t)** — change type and re-render
- **getParams()** — data-params from checked input
- **getItem(v)** — find input by value
- **onLoad / onComplete** events

### React CheckBox
- checkbox/radio/switch types, variant, disabled, description, controlled/uncontrolled

### ❌ Missing in React
| Gap | Severity |
|-----|----------|
| **DataSource** (render multiple options from data array) | 🔴 CRITICAL |
| **type='static'** (read-only check/times icon) | 🟡 HIGH |
| **inline** mode | 🟢 MEDIUM |
| **allowBlank validation** | 🟢 MEDIUM |
| **setValue** with comma-separated values | 🟢 MEDIUM |
| **getParams()** | 🟢 LOW |
| **onLoad / onComplete** events | 🟢 LOW |

---

## 6. Form

### Original (Imat.Form)
- **ContainerComponent** — declarative `items` array with auto-rendering
- **type** — `form-horizontal`, `form-inline`, etc.
- **labelWidth** — CSS class for label column width
- **showValue(data)** — populates all child fields from a data object (maps by ID)
- **isValid()** — iterates all child components' `isValid()` methods
- **showField(id) / hideField(id)** — toggle field visibility
- **setLabel(id, value)** — update field label
- **submit(options)** — ajaxForm submission
- **post(options)** — $.ajax POST with serializeObject
- **serializeObject()** — form data as object

### React Form
- serializeObject, isValid (checks `required` attributes), post (fetch), Form context

### ❌ Missing in React
| Gap | Severity |
|-----|----------|
| **showValue(data)** — populate all fields from object | 🔴 CRITICAL |
| **ContainerComponent** (declarative items array) | 🟡 HIGH |
| **showField(id) / hideField(id)** | 🟡 HIGH |
| **setLabel(id, value)** | 🟢 MEDIUM |
| **type** variants (horizontal, inline) | 🟢 LOW |
| **labelWidth** | 🟢 LOW |
| **submit via ajaxForm** (file upload forms) | 🟢 MEDIUM |

---

## 7. Modal

### Original (Imat.Modal)
- **ContainerComponent** — `items` array auto-renders into body
- **Draggable** — header is drag handle (jQuery UI)
- **Auto-center** — recalculates on window resize
- **afterShow / afterClose** events
- **padding** — `no-padding` class on body
- **Header extras** — iconCls, badge, label on header
- **z-index stacking** — increments for nested modals
- **Auto-show** — shows 200ms after creation

### React Modal
- open/close state, title, icon, size, footer, portal, backdrop click, animations

### ❌ Missing in React
| Gap | Severity |
|-----|----------|
| **Draggable** (drag by header) | 🟢 MEDIUM |
| **Auto-center on resize** | 🟢 LOW |
| **afterShow / afterClose** events | 🟡 HIGH |
| **padding** option | 🟢 LOW |
| **Header badge / label** | 🟢 LOW |
| **z-index stacking** for nested modals | 🟡 HIGH |

---

## 8. ProgressBar

### Original (Imat.ProgressBar)
- `type` — success/warning/danger (CSS class)
- `active` — animated stripes
- `text` — inner HTML text
- `setValue(v)` / `getValue()` — width percentage
- `setText(v)` — update inner text
- `setActive(v)` — toggle animation
- `setType(v)` — change color type

### React Progress
- value, max, variant, size, label, showPercent, **CircularProgress** (bonus)

### ❌ Missing in React
| Gap | Severity |
|-----|----------|
| **setActive()** toggle animation | 🟢 MEDIUM |
| **setText()** method | 🟢 LOW |
| **setType()** dynamic change | 🟢 LOW |
| Imperative methods (setValue/getValue) | 🟢 MEDIUM |

> React adds **CircularProgress** — not in original.

---

## 9. Chat

### Original (Imat.Chat)
- `showMessage(name, time, avatar, message, direction)` — imperative add
- `updateChat()` — ajax polling with state-based incremental updates
- `sendChat()` — ajax POST
- `destroy()` — stops polling
- `onUpdate` event
- **State tracking** — sends `state` ID to server for incremental updates

### React Chat
- Polling, send, auto-scroll, avatar, sound notification, onSend/onUpdate callbacks, empty state

### ❌ Missing in React
| Gap | Severity |
|-----|----------|
| **showMessage()** imperative method | 🟢 MEDIUM |
| **destroy()** method | 🟢 MEDIUM |
| **State-based incremental updates** (sends `state` to server) | 🟡 HIGH |

---

## 10. Thumbnails

### Original (Imat.Thumbnails)
- **Store integration** — binds to Imat.Store for server-side data
- **autoLoad** — loads data on creation
- **fullSize** — CSS class
- **onItemClick / onItemDblClick** events
- **Server-side pagination** — via store params
- **clear()** — empty data
- **selectPage** — ComboBox for page size (10-100 by 5)

### React Thumbnails
- Grid layout, click/dblclick, client-side pagination, empty state

### ❌ Missing in React
| Gap | Severity |
|-----|----------|
| **Store integration** (server-side data) | 🟡 HIGH |
| **autoLoad** | 🟢 MEDIUM |
| **Server-side pagination** | 🟡 HIGH |
| **clear()** method | 🟢 MEDIUM |
| **fullSize** | 🟢 LOW |

---

## 11. Loading

### Original (Imat.Loading)
- `show()` / `hide()` — append/remove from body
- **Global ajax integration** — `$(document).ajaxStart/ajaxStop/ajaxError` auto-show/hide
- **window.onerror** — auto-hide on JS error

### React Loading
- LoadingProvider context, showLoading/hideLoading with message, Spinner component

### ❌ Missing in React
| Gap | Severity |
|-----|----------|
| **Global ajax integration** (auto show/hide on fetch) | 🔴 CRITICAL |
| **window.onerror** auto-hide | 🟢 MEDIUM |

> React has `Spinner` component — not in original. React loading requires manual show/hide; original was automatic.

---

## 12. MessageBox

### Original (Imat.MessageBox)
- Type icons: `success`, `critical`, etc.
- **Custom buttons array** — any number of buttons with handlers
- Creates a `Modal` internally with navbar footer
- Size control via modal size classes

### React MessageBox
- confirm/alert hooks with Promise-based API, variant styles, portal

### ❌ Missing in React
| Gap | Severity |
|-----|----------|
| **Custom buttons array** (arbitrary button count + handlers) | 🟡 HIGH |
| **type='critical'** specific icon | 🟢 LOW |
| **size** control | 🟢 LOW |

> React MessageBox is **better designed** (Promise-based, hook API) but less flexible for multi-button dialogs.

---

## 13. Notify

### Original (Imat.Notify)
- text, color, iconCls, position
- Auto-hide after 2000ms
- Close button

### React Notify
- variant styles, icon, position, custom duration, **stacking**, dismiss, clearAll

### ✅ React is MORE complete
React Notify adds stacking, custom duration, dismiss individual, clearAll. **No gaps.**

---

## 14. Store → useDataStore

### Original (Imat.Store)
- **Events**: beforeLoad, afterLoad, completeLoad, onLoad, onError, onChange
- **searchData(data, key, value)** — find index in array
- **sort(prop, asc)** — client-side sort with money/date/string detection
- **getChanged(index, column, data)** — cell-level change tracking
- **isSaved** flag
- **setData / getData / getParams / getSetting**
- **empty()** — reset to empty state

### React useDataStore
- load (fetch), refresh, clear, setData, setParams, abort controller, loading/error states

### ❌ Missing in React
| Gap | Severity |
|-----|----------|
| **beforeLoad / afterLoad / completeLoad** events | 🟡 HIGH |
| **onChange** event (cell change tracking) | 🔴 CRITICAL |
| **searchData** | 🟢 MEDIUM |
| **sort** (client-side with money/date detection) | 🟢 MEDIUM |
| **getChanged** (dirty cell tracking) | 🔴 CRITICAL |
| **isSaved** flag | 🟢 LOW |

> React adds **AbortController** support — not in original.

---

## 15. Frame

### Original (Imat.Frame)
- **navigate(url, params)** — set iframe src with params + cache busting
- **print()** — print iframe content
- **save()** — navigate with `save=Y` param
- **reload()** — refresh with cache busting

### React Frame
- Loading state, error state with retry, sandbox, allowFullScreen

### ❌ Missing in React
| Gap | Severity |
|-----|----------|
| **navigate(url, params)** method | 🟡 HIGH |
| **print()** method | 🟡 HIGH |
| **save()** method | 🟢 MEDIUM |
| **reload()** method | 🟢 MEDIUM |

---

## 16. Panel → Card

### Original (Imat.Panel)
- **ContainerComponent** — `items` array
- **tools** array — header tool buttons with `getTool(id)`
- header/footer, iconCls, badge, label
- **fullSize**, **padding**, **border**
- **size** CSS class

### React Card
- Card/CardHeader/CardBody/CardFooter composition, action slot

### ❌ Missing in React
| Gap | Severity |
|-----|----------|
| **tools** array (header tool buttons) | 🟡 HIGH |
| **ContainerComponent** (items) | 🟢 MEDIUM |
| **iconCls / badge / label** on header | 🟢 MEDIUM |
| **fullSize / padding / border** options | 🟢 LOW |

---

## 17. NavBar — ❌ NO REACT EQUIVALENT

### Original (Imat.NavBar)
- Left/right item positioning with `collapse` modes (left/right/both/none)
- Hover-scroll animation (scrolls content on hover)
- Responsive collapse toggle
- Items with `position: 'right'` auto-placed to right side
- `onTable` dropdown positioning workaround
- Icon toggle button

### ❌ Completely Missing in React
| Gap | Severity |
|-----|----------|
| **NavBar component** (left/right positioning, collapse, hover-scroll) | 🔴 CRITICAL |

---

## 18. ButtonGroup

### Original (Imat.ButtonGroup)
- **ContainerComponent** — `items` array with `getComponent()`
- **onTable** mode — propagates to child buttons for DataTable integration

### React ButtonGroup
- Children composition, vertical mode, automatic rounding on first/last

### ❌ Missing in React
| Gap | Severity |
|-----|----------|
| **ContainerComponent** (items with xtype) | 🟢 LOW |
| **onTable** mode | 🟡 HIGH |

---

## 19. Label → Badge

### Original (Imat.Label)
- `text`, `iconCls`, `iconPosition`
- `form: true` — adds `control-label` class
- Used as form field labels

### React Badge
- variant, dot, children — decorative badge component

### ❌ Missing in React
| Gap | Severity |
|-----|----------|
| **Icon support** | 🟢 LOW |
| **Form label mode** (control-label) | 🟢 MEDIUM |

> Note: Imat.Label is a form label; React Badge is a decorative badge. Different purposes.

---

## 20. TinyMCE → RichTextEditor

### Original (Imat.TinyMCE)
- **TinyMCE** integration — full WYSIWYG editor
- **simple / full** mode — different toolbar configs
- **File manager** — `responsivefilemanager` plugin
- **onLoad** event (fires after TinyMCE init)
- **destroy()** — removes all TinyMCE editors
- **isValid()** — allowBlank validation
- **getValue()** — gets HTML from TinyMCE body
- **setValue(v)** — sets HTML content
- **Custom plugins** — `exam` plugin in full mode

### React RichTextEditor
- **contentEditable**-based (NOT TinyMCE)
- Visual/Code/Preview mode toggle
- Math formula, table, callout, image insertion templates
- Bold/italic/underline/strike, headings, alignment, lists
- Undo/redo, word/char count, read-only mode

### ❌ Missing in React
| Gap | Severity |
|-----|----------|
| **TinyMCE integration** (uses contentEditable instead) | 🔴 CRITICAL |
| **File manager** (responsivefilemanager) | 🟡 HIGH |
| **simple/full mode** toggle | 🟢 MEDIUM |
| **isValid()** validation | 🟡 HIGH |
| **destroy()** method | 🟢 MEDIUM |
| **Custom plugins** (exam, etc.) | 🟢 MEDIUM |

> React adds: Visual/Code/Preview modes, CBT-specific templates (math, callout, table). **Different approach, not a 1:1 port.**

---

## Imat Components with NO React Equivalent

| Component | Description | Severity |
|-----------|-------------|----------|
| **Imat.Column** | Layout column with items, fieldLabel, labelWidth, cols | 🟡 HIGH |
| **Imat.Layout** | Vertical layout with items, itemHeight | 🟡 HIGH |
| **Imat.HTML** | Raw HTML container with getContent/setContent | 🟢 MEDIUM |
| **Imat.ImageBox** | Image upload with crop (jQuery UI draggable/resizable) | 🟡 HIGH |
| **Imat.Navs** | Tabs/pills with stacked mode, badge/label on tabs | 🟢 MEDIUM |
| **Imat.Metrics** | Dashboard stat box (icon, number, text, link, color) | 🟢 MEDIUM |

---

## React Components with NO Imat Equivalent

| Component | Notes |
|-----------|-------|
| Accordion | New addition |
| Alert | New addition |
| Avatar | New addition |
| Chart | New addition |
| ClassicStatCard | Similar to Imat.Metrics |
| Dropdown | Simpler than Imat.DropDown |
| EmptyState | New addition |
| Page / PageBanner | New layout components |
| Particles | Visual effect |
| StatCard | Similar to Imat.Metrics |
| Tabs | Similar to Imat.Navs |
| Toast | New notification type |

---

## Priority Fix List (Top 10)

1. 🔴 **DataTable inline editors** — textbox/combobox/checkbox editors on cell click
2. 🔴 **DataTable change tracking** — `getChanged()`, `table-changed` class, `showError()`
3. 🔴 **Store change tracking** — `getChanged(index, column, data)`, `onChange` event
4. 🔴 **Form showValue(data)** — populate all fields from a data object
5. 🔴 **Loading auto-integration** — intercept fetch() calls for automatic show/hide
6. 🔴 **ComboBox/Select DataSource** — ajax autoLoad, array binding, emptyText
7. 🟡 **NavBar component** — entirely missing, needed for toolbar layouts
8. 🟡 **CheckBox DataSource** — render multiple checkboxes from data array
9. 🟡 **TextBox validation** — allowBlank, isValid, minlength/maxlength
10. 🟡 **Frame imperative methods** — navigate, print, reload

---

## Architecture Notes

- **Imat** uses imperative OOP: `new Imat.DataTable({ ... })`, then call `.load()`, `.getValue()`, `.show()`
- **React** uses declarative functional: `<DataTable data={...} onSort={...} />`
- The React port correctly adapts the **declarative paradigm** but loses imperative method access
- **Store integration** is the biggest architectural gap — Imat components are tightly coupled to `Imat.Store`; React components accept data as props but lack the auto-binding lifecycle
- Consider using `useImperativeHandle` + `forwardRef` for components that need imperative APIs (DataTable, Form, Frame)
