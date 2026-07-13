import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Lock, User, LogIn } from 'lucide-react'
import Logo from '../components/ui/Logo'

export default function Login() {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      if (login(userId, password)) {
        navigate('/dashboard')
      } else {
        setError('Invalid User ID or Password')
      }
      setLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f4f3] px-4 relative overflow-hidden">
      {/* Background glow elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[45%] h-[45%] bg-primary/5 rounded-full blur-3xl opacity-60 animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[45%] h-[45%] bg-primary/5 rounded-full blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full max-w-md">
        {/* Logo and branding */}
        <div className="flex flex-col items-center mb-8">
          <div className="mb-2">
            <Logo size="lg" showTagline={true} />
          </div>
          <h1 className="text-xl font-bold font-heading text-foreground mt-4">
            Community Management System
          </h1>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-md border border-border/50 rounded-2xl p-8 shadow-xl">
          <h2 className="text-xl font-semibold text-foreground text-center mb-6">Sign In</h2>

          {error && (
            <div className="mb-4 px-4 py-2.5 bg-red-500/10 border border-red-500/20 rounded-lg text-red-700 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-group">
              <label className="form-label">User ID</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={userId}
                  onChange={e => setUserId(e.target.value)}
                  placeholder="Enter your User ID"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-lg text-foreground placeholder:text-gray-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-lg text-foreground placeholder:text-gray-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 disabled:opacity-60 text-sm font-heading cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={18} /> Sign In
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-400 text-xs mt-8">
          © Fakhri IT Services
        </p>
      </div>
    </div>
  )
}
