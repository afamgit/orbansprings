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
    //   typescript: {
    //     ignoreBuildErrors: true,
    //  },
};

module.exports = nextConfig;
