import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

const colors = {
  success: 'bg-emerald-500',
  error: 'bg-red-500',
  warning: 'bg-amber-500',
  info: 'bg-blue-500',
}

let toastId = 0
let addToast = () => {}

export function showToast(message, type = 'success', duration = 3000) {
  addToast({ id: ++toastId, message, type, duration })
}

export function ToastContainer() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    addToast = (toast) => {
      setToasts(prev => [...prev, toast])
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toast.id))
      }, toast.duration)
    }
  }, [])

  return createPortal(
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
      {toasts.map(toast => {
        const Icon = icons[toast.type] || icons.info
        return (
          <div
            key={toast.id}
            className={`toast ${colors[toast.type] || colors.info} flex items-center gap-2`}
            style={{ animation: 'slideIn 0.3s ease' }}
          >
            <Icon size={18} />
            <span>{toast.message}</span>
            <button
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
              className="ml-2 opacity-70 hover:opacity-100"
            >
              <X size={14} />
            </button>
          </div>
        )
      })}
    </div>,
    document.body
  )
}
