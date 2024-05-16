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
            protocol: 'https',
            hostname: 'orbansprings.vercel.app',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '3000',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'aretywrh7vrc3oul.public.blob.vercel-storage.com',
            port: '',
            pathname: '/**',
          }
        ],
      },
      reactStrictMode: false
    //   typescript: {
    //     ignoreBuildErrors: true,
    //  },
};

module.exports = nextConfig;
