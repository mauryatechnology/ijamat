import { useState } from 'react'
import { ChevronDown, Filter } from 'lucide-react'

export default function FilterPanel({ fields, onFilter, title = 'Report Criteria', submitLabel = 'Show Report', collapsible = true }) {
  const [values, setValues] = useState(() => {
    const init = {}
    fields.forEach(f => { init[f.key] = f.defaultValue || '' })
    return init
  })
  const [isOpen, setIsOpen] = useState(true)

  const handleChange = (key, value) => {
    setValues(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onFilter(values)
  }

  const handleReset = () => {
    const reset = {}
    fields.forEach(f => { reset[f.key] = f.defaultValue || '' })
    setValues(reset)
    onFilter(reset)
  }

  return (
    <div className="card mb-4">
      {collapsible ? (
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="w-full flex items-center justify-between text-sm font-medium text-gray-700"
        >
          <span className="flex items-center gap-2">
            <Filter size={14} /> {title}
          </span>
          <ChevronDown size={16} className={`transition-transform ${isOpen ? '' : '-rotate-90'}`} />
        </button>
      ) : (
        <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-3">
          <Filter size={14} /> {title}
        </h3>
      )}

      {(isOpen || !collapsible) && (
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {fields.map(field => (
              <div key={field.key} className="form-group">
                <label className="form-label">{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    value={values[field.key]}
                    onChange={e => handleChange(field.key, e.target.value)}
                    className="form-select"
                  >
                    <option value="">{field.placeholder || 'Select...'}</option>
                    {(field.options || []).map(opt => (
                      <option key={opt.value || opt} value={opt.value || opt}>
                        {opt.label || opt}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'date' ? (
                  <input
                    type="date"
                    value={values[field.key]}
                    onChange={e => handleChange(field.key, e.target.value)}
                    className="form-input"
                  />
                ) : field.type === 'number' ? (
                  <input
                    type="number"
                    value={values[field.key]}
                    onChange={e => handleChange(field.key, e.target.value)}
                    className="form-input"
                    placeholder={field.placeholder || ''}
                  />
                ) : field.type === 'checkbox' ? (
                  <label className="flex items-center gap-2 cursor-pointer mt-1">
                    <input
                      type="checkbox"
                      checked={!!values[field.key]}
                      onChange={e => handleChange(field.key, e.target.checked)}
                      className="accent-primary w-4 h-4"
                    />
                    <span className="text-sm text-gray-600">{field.checkLabel || 'Yes'}</span>
                  </label>
                ) : (
                  <input
                    type="text"
                    value={values[field.key]}
                    onChange={e => handleChange(field.key, e.target.value)}
                    className="form-input"
                    placeholder={field.placeholder || ''}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-4">
            <button type="submit" className="btn btn-info">
              <Filter size={14} /> {submitLabel}
            </button>
            <button type="button" onClick={handleReset} className="btn bg-gray-200 text-gray-700 hover:bg-gray-300">
              Reset
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
