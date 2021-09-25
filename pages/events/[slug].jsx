import 'react-toastify/dist/ReactToastify.css'

import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout'
import EventMap from '@/components/EventMap'
import styles from '@/styles/Event.module.css'

const API_URL = process.env.API_URL

const EventPage = ({ event }) => {
  return (
    <Layout title="Event Details">
      <div className={styles.event}>
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

        <EventMap event={event} />

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
