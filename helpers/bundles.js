module.exports =
[
  {
    service: 'reviews',
    url: `http://localhost:4004/`,
    endpoint: 'reviews',
    fileName: {
      server: 'bundle-server.js',
      client: 'bundle.js',
    },
    props: {
      id: 'RestId',
      data: 'restaurant',
    }
  }
];
