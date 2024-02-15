//Import all needed libraries
const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

//Initialize the service wroker
precacheAndRoute(self.__WB_MANIFEST);

//Create a variable to cache the page
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    //Sets a requirement so only successfully loaded pages are cached
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    //Sets a time until the cache is updated
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

//Enables warm strategy - allowing to load URLs during the install phase
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

//Register callback requests
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

//Create a route that will check the cache first then query the server if needed
registerRoute(
  ({ request }) => {
    console.log(request);
    return (
      // CSS requests
      request.destination === 'style' ||
      // JavaScript requests
      request.destination === 'script'
    );
  },
  //Reponds to requests with cached data if available
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);