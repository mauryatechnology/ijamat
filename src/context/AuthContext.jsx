import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('ijamaat_user')
    return saved ? JSON.parse(saved) : null
  })

  const login = useCallback((userId, password) => {
    if (userId === 'admin' && password === 'hamid@123') {
      const userData = {
        id: 'admin',
        name: 'Administrator',
        role: 'Admin',
        lastLogin: new Date().toLocaleString('en-GB', {
          day: 'numeric', month: 'long', year: 'numeric',
          hour: '2-digit', minute: '2-digit', hour12: true
        })
      }
      setUser(userData)
      sessionStorage.setItem('ijamaat_user', JSON.stringify(userData))
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    sessionStorage.removeItem('ijamaat_user')
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
