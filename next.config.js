module.exports = {
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    async headers() {
      return [
        {
          source: '/rss.xml',
          headers: [
            {
              key: 'Content-Type',
              value: 'application/rss+xml'
            }
          ]
        }
      ]
    }
  }
