import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  outputFileTracingRoot: __dirname,
  experimental: {
    // Browsers re-check pages after 30s instead of 5 min, so newly approved
    // reviews show up quickly even during in-site navigation.
    staleTimes: { dynamic: 0, static: 30 },
  },
};

export default nextConfig;
