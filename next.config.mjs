/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: ['aws-s3-glimpse.s3.ap-northeast-2.amazonaws.com'],
  },
};

export default nextConfig;
