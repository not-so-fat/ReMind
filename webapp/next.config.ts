import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Ensure Prisma query engine binaries are included in the build
  output: 'standalone',
};

export default nextConfig;
