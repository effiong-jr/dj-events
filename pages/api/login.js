const API_URL = process.env.API_URL

const login = async (req, res) => {
  const { identifier, password } = req.body

  if (req.method === 'POST') {
    console.log(req.body)
    res.json(200).json({})
  } else {
    res.setHeader('Allow', ['POST'])
    return res
      .status(405)
      .json({ message: `Method ${req.method} method not allowed` })
  }
}

export default login
