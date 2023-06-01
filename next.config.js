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
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: '1mb',
    },
    onError: (err, req, res) => {
      // Handle error and send appropriate response
    },
    timeout: 30000, // 30 seconds
  },
  serverless: {
    functionTimeout: 30,
  },
};

module.exports = nextConfig;
