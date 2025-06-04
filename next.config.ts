import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com"
      },
      {
        protocol: "https",
        hostname: "tailus.io"
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com"
      }
    ]
  }
  /* config options here */
};

export default nextConfig;
