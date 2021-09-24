import cookie from 'cookie'

const register = async (req, res) => {
  const API_URL = process.env.API_URL

  if (req.method === 'POST') {
    const { username, email, password } = req.body

    const strapiReq = await fetch(`${API_URL}/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })

    const data = await strapiReq.json()

    if (strapiReq.ok) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', String(data.jwt), {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: '/',
          sameSite: 'strict',
          secure: true,
        })
      )

      res.status(201).json({ user: data.user })
    } else {
      res
        .status(data.statusCode)
        .json({ message: data.message[0].messages[0].message })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}

export default register
