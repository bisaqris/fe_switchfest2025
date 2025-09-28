import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    });

    return config;
  },
  images: {
      dangerouslyAllowSVG: true,
      contentDispositionType: 'attachment',
      remotePatterns: [
          {
            protocol: 'https',
            hostname: 'placehold.co',
          },
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
          },
        ],
    },
};

export default nextConfig;
