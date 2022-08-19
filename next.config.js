module.exports = {

    trailingSlash: true,
    // distDir: 'out',
    // reactStrictMode: false,
    eslint: {
      ignoreDuringBuilds: true,
      
    },
    publicPath: "/public/",
    basePath:"/nextjs-starter",
    assetPrefix: '/nextjs-starter/',
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

  

