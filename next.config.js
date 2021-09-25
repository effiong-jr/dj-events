module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },

  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337',
    PER_PAGE: 5,
    NEXT_URL: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
    MAPBOX_API_TOKEN:
      'pk.eyJ1IjoiZWZmaW9uZyIsImEiOiJja2E0ZGFudXkwdDllM2RvZzUyaDVtN3FlIn0.6M4tRki33WLp8bAd30m-3A',
    GOOGLE_MAP_API_KEY: 'AIzaSyDUCLpACUVhg_2pq1HbM6QCbrptNpSybys',
    GEOAPIFY_API_KEY: '71d7b64c744e4354a378e4d8c7b48a82',
  },
}
