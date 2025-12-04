const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://api:3000/:path*',
      },
    ];
  },
  webpack: (config) => {
    config.resolve.alias['@pp/types'] = path.resolve(__dirname, '../../packages/types/src');
    return config;
  },
};

module.exports = nextConfig;
