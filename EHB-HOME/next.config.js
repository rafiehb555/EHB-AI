/** @type {import('next').NextConfig} */
const nextConfig = {
  port: 5005,
  reactStrictMode: true,
  experimental: {
    externalDir: true,
  },
  async rewrites() {
    return [
      // Add any necessary rewrites here
    ];
  },
};

module.exports = nextConfig;
