import cookie from 'cookie'

const logout = async (req, res) => {
  // Check method
  if (req.method === 'POST') {
    //Check if token exist in cookie exist
    const { token } = cookie.parse(req.headers.cookie)

    if (!token) {
      return res.status(401).json({ message: 'You are unauthorized' })
    }

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        secure: process.env.NODE_ENV !== 'development',
        httpOnly: true,
        expires: new Date(0),
        sameSite: 'strict',
        path: '/',
      })
    )

    res.status(200).json({ message: 'success' })
  } else {
    setHeaders('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}

export default logout
