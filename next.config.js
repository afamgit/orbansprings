/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'orbansprings.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '3000',
            pathname: '/**',
          },
        ],
      },
      reactStrictMode: false
    //   typescript: {
    //     ignoreBuildErrors: true,
    //  },
};

module.exports = nextConfig;
