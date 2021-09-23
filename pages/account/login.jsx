import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthContext from '@/context/AuthContext'
import Layout from '@/components/Layout'
import styles from '@/styles/AuthForm.module.css'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, error } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()

    login({ email, password })
  }

  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log In
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input type="submit" value="Submit" className="btn" />
        </form>
        <p>
          Don't have an account?{' '}
          <Link href="/account/register">
            <a>Register</a>
          </Link>{' '}
        </p>
      </div>
    </Layout>
  )
}

export default LoginPage
