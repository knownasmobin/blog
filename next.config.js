/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  distDir: 'dist',
  basePath: process.env.NODE_ENV === 'production' ? '/website' : '',
  trailingSlash: true,

};

module.exports = nextConfig;
