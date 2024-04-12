/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: 'midlibraryassets.b-cdn.net',
          },
        ],
      },
};

export default nextConfig;
