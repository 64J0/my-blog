module.exports = {
    async headers() {
      return [
        {
          source: "/rss",
          headers: [
            {
              key: "Content-Type",
              value: "application/rss+xml"
            }
          ]
        }
      ];
    }
  };
