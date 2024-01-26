/** @type {import('next').NextConfig} */

const nextConfig = {
  // experimental: {
  //   serverActions: true,
  // },
  // reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
      // {
      //   protocol: 'https',
      //   hostname: 'images\\.unsplash\\.com',
      //   pathname: '.*',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'lh3\\.googleusercontent\\.com',
      //   pathname: '.*',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'platform-lookaside\\.fbsbx\\.com',
      //   pathname: '.*',
      // },
    ],
  },
};

module.exports = nextConfig;
