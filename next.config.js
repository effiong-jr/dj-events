module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },

  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337',
    PER_PAGE: 5,
    NEXT_URL: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
  },
}
