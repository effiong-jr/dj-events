module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },

  env: {
    API_URL: process.env.API_URL || 'http://localhost:1337',
    PER_PAGE: 5,
    NEXT_URL: process.env.NEXT_URL || 'http://localhost:3000',
  },
}
