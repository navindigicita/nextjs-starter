const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  trailingSlash: true,
  // distDir: 'out',
  // reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,

  },
  publicPath: "/public/"
});