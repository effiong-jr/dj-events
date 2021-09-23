import { createContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  // Register user
  const register = async (user) => {
    console.log(user)
  }

  // Login user
  const login = async ({ email: identifier, password }) => {
    console.log({ identifier, password })
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
      value={{ user, register, login, logout, checkLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
