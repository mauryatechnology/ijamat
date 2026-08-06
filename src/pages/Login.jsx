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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4F6F8] px-4 relative overflow-hidden">
      {/* Background glow elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[45%] h-[45%] bg-blue-500/10 rounded-full blur-3xl opacity-60 animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[45%] h-[45%] bg-blue-500/10 rounded-full blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full max-w-md">
        {/* Logo and branding */}
        <div className="flex flex-col items-center mb-6">
          <div className="mb-2">
            <Logo size="lg" showTagline={true} />
          </div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">
            Simplifying Operations
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-xl">
          <h2 className="text-xl font-bold text-slate-900 text-center mb-6">Sign In to Jamaat Cloud</h2>

          {error && (
            <div className="mb-4 px-4 py-2.5 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs font-semibold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-group">
              <label className="text-xs font-semibold text-slate-700 mb-1 block">User ID</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={userId}
                  onChange={e => setUserId(e.target.value)}
                  placeholder="Enter User ID (admin)"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all text-sm"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="form-group">
              <label className="text-xs font-semibold text-slate-700 mb-1 block">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter Password (hamid@123)"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all text-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-600/20 hover:shadow-lg disabled:opacity-60 text-sm cursor-pointer"
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

        <p className="text-center text-slate-400 text-xs mt-8">
          © Jamaat Cloud • Simplifying Operations
        </p>
      </div>
    </div>
  )
}
