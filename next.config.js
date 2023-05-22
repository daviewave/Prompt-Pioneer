/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['mongoose'],
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'upload.wikimedia.org',
      'imageio.forbes.com',
      'media.npr.org',
      'i.insider.com',
      'img.thedailybeast.com',
    ],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

module.exports = nextConfig;
