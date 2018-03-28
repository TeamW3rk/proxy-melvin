module.exports = 
[
  { 
    service: 'info',
    url: `http://localhost:1127/`,
    endpoint: 'about',
    fileName: {
      server: 'bundle-server.js',
      client: 'bundle.js',
    },
    props: {
      id: 'restaurantId',
      data: 'restaurant',
    }
  },
  { 
    service: 'suggested',
    url: `http://localhost:3001/`,
    endpoint: 'suggestions',
    fileName: {
      server: 'bundle-server.js',
      client: 'bundle.js',
      styles: 'styles.css'
    },
    props: {
      id: 'id',
      data: 'restaurants',
    }
  }
];

