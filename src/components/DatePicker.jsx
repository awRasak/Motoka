import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

export default function DatePicker({ value, onChange, placeholder = 'Select date', label, required }) {
  const [open, setOpen] = useState(false)
  const [viewDate, setViewDate] = useState(value || new Date())
  const ref = useRef(null)

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const daysInPrevMonth = getDaysInMonth(year, month - 1)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function selectDay(day) {
    const selected = new Date(year, month, day)
    onChange?.(selected)
    setOpen(false)
  }

  function changeMonth(m) {
    setViewDate(new Date(year, m, 1))
  }

  function changeYear(y) {
    setViewDate(new Date(y, month, 1))
  }

  function prevMonth() {
    if (month === 0) {
      setViewDate(new Date(year - 1, 11, 1))
    } else {
      setViewDate(new Date(year, month - 1, 1))
    }
  }

  function nextMonth() {
    if (month === 11) {
      setViewDate(new Date(year + 1, 0, 1))
    } else {
      setViewDate(new Date(year, month + 1, 1))
    }
  }

  function formatDisplay(d) {
    if (!d) return ''
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const cells = []
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, current: false })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true })
  }
  const remaining = 42 - cells.length
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, current: false })
  }

  const isToday = (day) => {
    const now = new Date()
    return day === now.getDate() && month === now.getMonth() && year === now.getFullYear()
  }
  const isSelected = (day) => {
    if (!value) return false
    return day === value.getDate() && month === value.getMonth() && year === value.getFullYear()
  }

  const selectStyle = (selected) => ({
    appearance: 'none',
    WebkitAppearance: 'none',
    borderRadius: 10,
    border: '1px solid #e2e8f0',
    padding: '6px 28px 6px 10px',
    fontSize: 14,
    fontWeight: 600,
    color: '#05243f',
    background: selected ? '#2389e3' : '#f8fafc',
    backgroundImage: selected
      ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`
      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
    cursor: 'pointer',
    outline: 'none',
    fontFamily: 'inherit',
  })

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {label && (
        <label style={{ display: 'block', fontWeight: 600, fontSize: 14, color: '#05243f', marginBottom: 8 }}>
          {label}{required && <span style={{ color: '#ef4444', marginLeft: 2 }}>*</span>}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '12px 16px',
          borderRadius: 12,
          border: '1px solid #e2e8f0',
          background: value ? '#fff' : '#f8fafc',
          color: value ? '#05243f' : '#94a3b8',
          fontSize: 15,
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        {value ? formatDisplay(value) : placeholder}
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            zIndex: 50,
            width: 304,
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 4px 24px rgba(5,36,63,0.12)',
            padding: 16,
            fontFamily: 'inherit',
          }}
        >
          <div style={{
            position: 'absolute',
            top: -6,
            left: 32,
            width: 12,
            height: 12,
            background: '#fff',
            transform: 'rotate(45deg)',
            boxShadow: '-2px -2px 4px rgba(5,36,63,0.04)',
          }} />

          {/* Month & Year dropdowns */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 8 }}>
            <button type="button" onClick={prevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 4, flexShrink: 0 }}>
              <ChevronLeft size={18} />
            </button>

            <select
              value={month}
              onChange={(e) => changeMonth(Number(e.target.value))}
              style={selectStyle(false)}
            >
              {MONTHS.map((m, i) => (
                <option key={i} value={i}>{m}</option>
              ))}
            </select>

            <select
              value={year}
              onChange={(e) => changeYear(Number(e.target.value))}
              style={selectStyle(false)}
            >
              {Array.from({ length: 21 }, (_, i) => year - 10 + i).map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            <button type="button" onClick={nextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 4, flexShrink: 0 }}>
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Day labels */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 8 }}>
            {DAYS.map((d) => (
              <div key={d} style={{ textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#94a3b8', padding: '4px 0' }}>{d}</div>
            ))}
          </div>

          {/* Days grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {cells.map((cell, i) => {
              const sel = isSelected(cell.day) && cell.current
              const today = isToday(cell.day) && cell.current
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => cell.current && selectDay(cell.day)}
                  disabled={!cell.current}
                  style={{
                    width: 36,
                    height: 36,
                    margin: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    border: 'none',
                    cursor: cell.current ? 'pointer' : 'default',
                    fontSize: 14,
                    fontWeight: sel || today ? 600 : 400,
                    color: cell.current ? (sel ? '#fff' : '#05243f') : '#cbd5e1',
                    background: sel ? '#2389e3' : today ? '#ebf5ff' : 'transparent',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    if (cell.current && !sel) e.target.style.background = '#f1f5f9'
                  }}
                  onMouseLeave={(e) => {
                    if (cell.current && !sel && !today) e.target.style.background = 'transparent'
                  }}
                >
                  {cell.day}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
