/** @type {import('next').NextConfig} */


const nextConfig = {
    experimental: {
      // serverActions: true,
    },
    images: {
      domains: ["images.unsplash.com", "lh3.googleusercontent.com","platform-lookaside.fbsbx.com"],
    },
  };


module.exports = nextConfig

