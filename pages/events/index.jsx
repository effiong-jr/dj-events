import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL, PER_PAGE } from '@/config/index'
import Pagination from '@/components/Pagination'

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>Events</h1>

      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}

      <Pagination total={total} page={page} />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { page = 1 } = context.query

  //Get total event count
  const totalRes = await fetch(`${API_URL}/events/count`)
  const total = await totalRes.json()

  //Calculate start page
  const start = +page <= 1 ? 0 : (+page - 1) * PER_PAGE

  //Fetech events
  const eventRes = await fetch(
    `${API_URL}/events?_start=${start}&_limit=${PER_PAGE}&_sort=date:ASC`
  )
  const events = await eventRes.json()

  return {
    props: { events, page: +page, total },
  }
}
