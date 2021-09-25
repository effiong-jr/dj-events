import { parseCookie } from '@/helpers/index'
import Layout from '@/components/Layout'
import DashboardEvent from '@/components/DashboardEvent'
import styles from '@/styles/Dashboard.module.css'

const DashboardPage = ({ events }) => {
  const deleteEvent = (id) => {
    console.log(id)
  }
  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events.map((event) => (
          <DashboardEvent
            key={event.id}
            event={event}
            handleDelete={deleteEvent}
          />
        ))}
      </div>
    </Layout>
  )
}

export default DashboardPage

export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req)
  const API_URL = process.env.API_URL

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const events = await res.json()

  return {
    props: { events },
  }
}
