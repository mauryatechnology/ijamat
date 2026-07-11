import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Lock, User, LogIn } from 'lucide-react'

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e2a3a] via-[#263544] to-[#1a2332] px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white text-3xl font-bold mb-4 shadow-lg shadow-amber-500/30">
            iJ
          </div>
          <h1 className="text-3xl font-bold text-white tracking-wide">iJamaat</h1>
          <p className="text-blue-300/60 text-sm mt-1">Community Management System</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl font-semibold text-white text-center mb-6">Sign In</h2>

          {error && (
            <div className="mb-4 px-4 py-2.5 bg-red-500/20 border border-red-400/30 rounded-lg text-red-300 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-blue-200/80 mb-1.5 font-medium">User ID</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  value={userId}
                  onChange={e => setUserId(e.target.value)}
                  placeholder="Enter your User ID"
                  className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/30 outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-blue-200/80 mb-1.5 font-medium">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                  className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/30 outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/30 disabled:opacity-60"
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

        <p className="text-center text-white/30 text-xs mt-6">
          © Developed by Wonderful Developer
        </p>
      </div>
    </div>
  )
}
