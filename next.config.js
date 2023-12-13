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
        ],
      },
      reactStrictMode: false
    //   typescript: {
    //     ignoreBuildErrors: true,
    //  },
};

module.exports = nextConfig;
