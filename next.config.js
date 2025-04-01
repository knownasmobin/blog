/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  basePath: process.env.NODE_ENV === 'production' ? '/website' : '',
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
