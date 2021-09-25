import cookie from 'cookie'

const user = async (req, res) => {
  const API_URL = process.env.API_URL

  if (req.method === 'GET') {
    if (!req.headers.cookie) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    const { token } = cookie.parse(req.headers.cookie)

    const strapiRes = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const user = await strapiRes.json()

    if (strapiRes.ok) {
      res.status(200).json({ user })
    } else {
      res.status(strapiRes.statusCode).json({ message: strapiRes.message })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method '${res.method}' not allowed` })
  }
}

export default user
