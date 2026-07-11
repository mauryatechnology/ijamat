import { useState, useMemo } from 'react'
import { ChevronUp, ChevronDown, Download, Columns3 } from 'lucide-react'
import { DEFAULT_ROWS_PER_PAGE, ROWS_PER_PAGE_OPTIONS } from '../../utils/constants'

export default function DataTable({
  columns,
  data,
  title,
  showFilters = true,
  showExport = true,
  showPagination = true,
  showSearch = true,
  showColumnToggle = false,
  onRowClick,
  emptyMessage = 'No data available in table'
}) {
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [filters, setFilters] = useState({})
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(DEFAULT_ROWS_PER_PAGE)
  const [hiddenCols, setHiddenCols] = useState(new Set())
  const [showColMenu, setShowColMenu] = useState(false)

  const visibleColumns = columns.filter(c => !hiddenCols.has(c.key))

  const filteredData = useMemo(() => {
    let result = [...data]

    // Global search
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(row =>
        columns.some(col => {
          const val = row[col.key]
          return val != null && String(val).toLowerCase().includes(q)
        })
      )
    }

    // Column filters
    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return
      const col = columns.find(c => c.key === key)
      if (col?.filterType === 'checkbox' && Array.isArray(value) && value.length > 0) {
        result = result.filter(row => value.includes(String(row[key])))
      } else if (value) {
        const q = value.toLowerCase()
        result = result.filter(row => {
          const val = row[key]
          return val != null && String(val).toLowerCase().includes(q)
        })
      }
    })

    // Sort
    if (sortKey) {
      result.sort((a, b) => {
        const va = a[sortKey] ?? ''
        const vb = b[sortKey] ?? ''
        if (typeof va === 'number' && typeof vb === 'number') {
          return sortDir === 'asc' ? va - vb : vb - va
        }
        const sa = String(va).toLowerCase()
        const sb = String(vb).toLowerCase()
        return sortDir === 'asc' ? sa.localeCompare(sb) : sb.localeCompare(sa)
      })
    }

    return result
  }, [data, search, filters, sortKey, sortDir, columns])

  const totalPages = Math.ceil(filteredData.length / perPage)
  const pagedData = showPagination
    ? filteredData.slice((page - 1) * perPage, page * perPage)
    : filteredData

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setPage(1)
  }

  const handleExport = () => {
    const headers = visibleColumns.map(c => c.label).join(',')
    const rows = filteredData.map(row =>
      visibleColumns.map(c => {
        const val = row[c.key] ?? ''
        return `"${String(val).replace(/"/g, '""')}"`
      }).join(',')
    )
    const csv = [headers, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title || 'export'}_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const toggleCol = (key) => {
    setHiddenCols(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <div className="card p-0 overflow-hidden">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          {showExport && (
            <button onClick={handleExport} className="btn btn-warning text-sm">
              <Download size={14} /> Export to Excel (CSV)
            </button>
          )}
          <span className="text-sm text-emerald-600 font-medium">
            Records: {filteredData.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {showColumnToggle && (
            <div className="relative">
              <button
                onClick={() => setShowColMenu(prev => !prev)}
                className="btn text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                <Columns3 size={14} /> Columns ▼
              </button>
              {showColMenu && (
                <div className="absolute right-0 top-full mt-1 bg-white border rounded-lg shadow-lg z-20 py-2 min-w-[180px] max-h-[300px] overflow-y-auto">
                  {columns.map(col => (
                    <label key={col.key} className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        checked={!hiddenCols.has(col.key)}
                        onChange={() => toggleCol(col.key)}
                        className="accent-blue-500"
                      />
                      {col.label}
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}

          {showSearch && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Search:</span>
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1) }}
                className="form-input text-sm py-1 w-40"
              />
            </div>
          )}
        </div>
      </div>

      {/* Rows per page + pagination info */}
      {showPagination && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 text-sm">
          <div className="flex items-center gap-2">
            <select
              value={perPage}
              onChange={e => { setPerPage(Number(e.target.value)); setPage(1) }}
              className="form-select text-sm py-1"
            >
              {ROWS_PER_PAGE_OPTIONS.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <span className="text-gray-500">records per page</span>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            {/* Header Row */}
            <tr>
              {visibleColumns.map(col => (
                <th
                  key={col.key}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                  className={col.sortable !== false ? 'cursor-pointer' : 'cursor-default'}
                  style={col.width ? { width: col.width, minWidth: col.width } : {}}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {sortKey === col.key && (
                      sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                    )}
                  </div>
                </th>
              ))}
            </tr>

            {/* Filter Row */}
            {showFilters && (
              <tr className="filter-row">
                {visibleColumns.map(col => (
                  <th key={col.key}>
                    {col.filterable !== false && (
                      col.filterType === 'checkbox' && col.filterOptions ? (
                        <div className="flex flex-col gap-0.5">
                          <label className="flex items-center gap-1 text-xs font-normal cursor-pointer">
                            <input
                              type="checkbox"
                              onChange={() => handleFilterChange(col.key, [])}
                              checked={!filters[col.key] || filters[col.key].length === 0}
                              className="accent-blue-500"
                            /> Clear
                          </label>
                          {col.filterOptions.map(opt => (
                            <label key={opt} className="flex items-center gap-1 text-xs font-normal cursor-pointer">
                              <input
                                type="checkbox"
                                checked={filters[col.key]?.includes(opt) || false}
                                onChange={() => {
                                  const current = filters[col.key] || []
                                  const next = current.includes(opt)
                                    ? current.filter(v => v !== opt)
                                    : [...current, opt]
                                  handleFilterChange(col.key, next)
                                }}
                                className="accent-blue-500"
                              /> {opt}
                            </label>
                          ))}
                        </div>
                      ) : (
                        <input
                          type="text"
                          placeholder=""
                          value={filters[col.key] || ''}
                          onChange={e => handleFilterChange(col.key, e.target.value)}
                        />
                      )
                    )}
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {pagedData.length === 0 ? (
              <tr>
                <td colSpan={visibleColumns.length} className="text-center py-8 text-gray-400 italic">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              pagedData.map((row, idx) => (
                <tr
                  key={row.id || idx}
                  onClick={() => onRowClick?.(row)}
                  className={onRowClick ? 'cursor-pointer' : ''}
                >
                  {visibleColumns.map(col => (
                    <td key={col.key}>
                      {col.render ? col.render(row[col.key], row, idx) : (row[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 0 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 text-sm">
          <span className="text-gray-500">
            Showing {((page - 1) * perPage) + 1} to {Math.min(page * perPage, filteredData.length)} of {filteredData.length} entries
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="px-2 py-1 rounded border text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >«</button>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-2 py-1 rounded border text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >‹</button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) pageNum = i + 1
              else if (page <= 3) pageNum = i + 1
              else if (page >= totalPages - 2) pageNum = totalPages - 4 + i
              else pageNum = page - 2 + i
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-3 py-1 rounded border ${
                    page === pageNum
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >{pageNum}</button>
              )
            })}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-2 py-1 rounded border text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >›</button>
            <button
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className="px-2 py-1 rounded border text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >»</button>
          </div>
        </div>
      )}
    </div>
  )
}
