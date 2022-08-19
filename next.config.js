module.exports = {
    trailingSlash: true,
    // distDir: 'out',
    // reactStrictMode: false,
    eslint: {
      ignoreDuringBuilds: true,
      
    },
    publicPath: "/public/",
    async headers() {
      return [
        {
          source: '/login',
          headers: [
            {
              key: 'content-type',
              value: 'application/javascript',
            }
          ]
          }
        ]
      }
};