import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout'
import styles from '@/styles/Event.module.css'

const API_URL = process.env.API_URL

const EventPage = ({ event }) => {
  const router = useRouter()

  const deleteEvent = async (id) => {
    if (confirm('Are you sure?')) {
      if (!id) {
        return toast.error('Could not find event')
      }
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = res.json()

      if (!res.ok) {
        return toast.error(data.message)
      } else {
        toast.success('Event deleted successfully!')
        router.push('/events')
      }
    }
  }
  return (
    <Layout title="Event Details">
      <ToastContainer />
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${event.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>

          <a
            href="#"
            className={styles.delete}
            onClick={(id) => deleteEvent(event.id)}
          >
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {new Date(event.date).toLocaleDateString('en-GB')} at {event.time}
        </span>
        <h1>{event.name}</h1>

        {event.image && (
          <div className={styles.image}>
            <Image
              src={event.image.formats.medium.url}
              width={960}
              height={600}
              alt=""
            />
          </div>
        )}

        <h3>Performers</h3>
        <p>{event.performers}</p>

        <h3>Description</h3>
        <p>{event.description}</p>

        <h3>{event.venue}</h3>
        <p>{event.address}</p>

        <Link href="/events">
          <a className={styles.back}>{'<'} Go back</a>
        </Link>
      </div>
    </Layout>
  )
}

export default EventPage

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`)
  const events = await res.json()

  const paths = events.map((event) => ({ params: { slug: event.slug } }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${API_URL}/events?slug=${params.slug}`)

  const event = await res.json()
  return {
    props: { event: event[0] },
    revalidate: 1,
  }
}

// export async function getServerSideProps(context) {
//   const { slug } = context.query

//   const res = await fetch(`${API_URL}/api/events/${slug}`)
//   const event = await res.json()

//   return {
//     props: { event: event[0] },
//   }
// }
