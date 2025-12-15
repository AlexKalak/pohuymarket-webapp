import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      use: ['graphql-tag/loader'],
    });
    return config;
  },
  async rewrites() {

    return [
      {
        source: '/graphql', // Matches any request starting with /api/
        destination: 'http://localhost:3000/graphql', // Proxies to your backend server
      },
      {
        source: '/gamma-polymarket/:path*', // Matches any request starting with /api/
        destination: 'https://gamma-api.polymarket.com/:path*', // Proxies to your backend server
      },
      {
        source: '/kalshi-api/:path*', // Matches any request starting with /api/
        destination: 'https://api.elections.kalshi.com/:path*', // Proxies to your backend server
      },
    ];
  },
};

export default nextConfig;

