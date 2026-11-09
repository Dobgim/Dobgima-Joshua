import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
