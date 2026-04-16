/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.GITHUB_ACTIONS ? 'export' : undefined,
  // comment it for local/vercel development ^^^
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
