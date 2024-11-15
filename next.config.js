/** @type {import('next').NextConfig} */

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
  }
};

/*

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

*/


module.exports = nextConfig;
