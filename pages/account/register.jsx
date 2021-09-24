import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthContext from '@/context/AuthContext'
import Layout from '@/components/Layout'
import styles from '@/styles/AuthForm.module.css'

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const { register, error } = useContext(AuthContext)

  useEffect(() => error && toast.error(error), [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const isEmpty = [username, email, password].some((field) => field === '')

    if (isEmpty) {
      return toast.error('All Fields are required!', {})
    }

    if (password !== passwordConfirm) {
      return toast.error('Password fields do not match.')
    }

    register({ username, email, password })
  }

  return (
    <Layout title="User Registration">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

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

          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          <input type="submit" value="Register" className="btn" />
        </form>
        <p>
          Already have an account?{' '}
          <Link href="/account/login">
            <a>Login</a>
          </Link>{' '}
        </p>
      </div>
      <ToastContainer />
    </Layout>
  )
}

export default RegisterPage
