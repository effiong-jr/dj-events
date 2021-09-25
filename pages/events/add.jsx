import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { parseCookie } from '@/helpers/index'
import Layout from '@/components/Layout'
import styles from '@/styles/Form.module.css'

const AddEventPage = ({ token }) => {
  const [values, setValues] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
  })

  const router = useRouter()
  const API_URL = process.env.API_URL

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate all fields
    const hasEmptyFields = Object.values(values).some((field) => field === '')

    if (hasEmptyFields) {
      return toast.error('Please fill in all fields')
    }

    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    })

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        return toast.error('No token included')
      }
      return toast.error('Something Went Wrong')
    }

    const event = await res.json()
    router.push(`/events/${event.slug}`)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues((prevState) => {
      return { ...prevState, [name]: value }
    })
  }

  return (
    <Layout title="Add New Event">
      <Link href="/events">Go back </Link>
      <h1>Add Event</h1>

      <ToastContainer theme="colored" />

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
          />
        </div>
        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  )
}

export default AddEventPage

export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req)
  return {
    props: { token },
  }
}
