//@type {import('next').NextConfig}  
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'source.unsplash.com',
      'p2.trrsf.com',
      'images.pexels.com', // ⬅️ adicionado!
    ]
  },
}

module.exports = nextConfig