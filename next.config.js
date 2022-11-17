module.exports = {
  experimental: {
    images: {
      unoptimized: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'thinklymedia.blob.core.windows.net',
          port: '',
          pathname: '/devimages/**',
        }
      ]
    }
  },
  trailingSlash: true,
  // distDir: 'out',
  // reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true
  }
};

// module.exports = {
//   reactStrictMode: true,
//   images: {
//     domains: ['thinklymedia.blob.core.windows.net'],
//   },
//   trailingSlash: true,
//   eslint: {
//         ignoreDuringBuilds: true
//       }
// }