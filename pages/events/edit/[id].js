import moment from 'moment'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { FaImage } from 'react-icons/fa'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import styles from '@/styles/Form.module.css'
import ImageUpload from '@/components/ImageUpload'
import { parseCookie } from '@/helpers/index'

const API_URL = process.env.API_URL

const EditEventPage = ({ event, token }) => {
  const [values, setValues] = useState({
    ...event,
    date: moment(event.date).format('yyyy-MM-DD'),
  })
  const [imagePreview, setImagePreview] = useState(
    event.image ? event.image.formats.thumbnail.url : null
  )

  const [show, setShow] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate all fields
    const hasEmptyFields = Object.values(values).some((field) => field === '')

    if (hasEmptyFields) {
      return toast.error('Please fill in all fields')
    }

    const res = await fetch(`${API_URL}/events/${values.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    })

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        return toast.error('Unauthorized!')
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

  const imageUploaded = async () => {
    const res = await fetch(`${API_URL}/events/${values.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const event = await res.json()
    setImagePreview(event.image.formats.thumbnail.url)

    setShow(false)
  }

  return (
    <Layout title="Edit New Event">
      <Link href="/events">Go back </Link>
      <h1>Edit Event</h1>

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
        <input type="submit" value="Edit Event" className="btn" />
      </form>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} alt="" />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}

      <div>
        <button className="btn-secondary" onClick={() => setShow(true)}>
          <FaImage /> Set Image
        </button>
      </div>

      <Modal show={show} onClose={() => setShow(false)}>
        <div>
          <ImageUpload
            eventId={values.id}
            imageUploaded={imageUploaded}
            token={token}
          />
        </div>
      </Modal>
    </Layout>
  )
}

export default EditEventPage

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookie(req)

  const res = await fetch(`${API_URL}/events/${id}`)

  const event = await res.json()

  return {
    props: { event, token },
  }
}
