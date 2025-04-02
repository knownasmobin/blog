/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  distDir: 'out',
  basePath: process.env.NODE_ENV === 'production' ? '/blog' : '',
  trailingSlash: true,

};

module.exports = nextConfig;
