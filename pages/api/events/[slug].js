const { events } = require('./data.json')

export default function handler(req, res) {
  if (req.method === 'GET') {
    const event = events.filter((event) => req.query.slug === event.slug)

    if (!event) {
      return res.status(404).json({ message: 'No event found' })
    }
    res.status(200).json({ data: event })
  } else {
    res
      .status(405)
      .json({ message: `Method ${req.method} method is not allowed.` })
  }
}
