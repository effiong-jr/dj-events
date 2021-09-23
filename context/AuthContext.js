import { createContext, useState } from 'react'

const NEXT_URL = process.env.NEXT_URL
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  // Register user
  const register = async (user) => {
    console.log(user)
  }

  // Login user
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, password }),
    })

    const data = await res.json()
    console.log(data)

    if (res.ok) {
      setUser(data.user)
    } else {
      setError(data.message)
      setError(null)
    }
  }

  // Logout user
  const logout = async () => {
    console.log('Logged out')
  }

  // Check logged in user
  const checkLoggedIn = async () => {
    console.log('Checked')
  }

  return (
    <AuthContext.Provider
      value={{ user, error, register, login, logout, checkLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
