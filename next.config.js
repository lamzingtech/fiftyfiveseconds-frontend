/** @type {import('next').NextConfig} */

const isProd = 'production';
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     unoptimized: true, // Disable default image optimization
//   },
//   assetPrefix: isProd ? '/your-repository-name/' : '',
//   basePath: isProd ? '/your-repository-name' : '',
//   output: 'export'
// };

// export default nextConfig;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
  //assetPrefix: './',
  assetPrefix: isProd ? '/fiftyfiveseconds-frontend/' : '',
  //basePath: isProd ? '/lamzingtech.github.io/fiftyfiveseconds-frontend' : '',
  output: 'export'

};


module.exports = nextConfig;
