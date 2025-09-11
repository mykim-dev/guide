import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/guide',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
