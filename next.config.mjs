/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      // Required so Next.js doesn't try to bundle @xenova/transformers through webpack
      // (the package loads ONNX models from disk at runtime)
      serverComponentsExternalPackages: ["@xenova/transformers", "onnxruntime-node"],
    },
    images: {
        remotePatterns: [
          {
            hostname: 'midlibraryassets.b-cdn.net',
          },
          {
            hostname: 'storage.googleapis.com',
          },
        ],
      },
};

export default nextConfig;
