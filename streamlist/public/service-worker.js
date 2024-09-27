const CACHE_NAME = "streamlist-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/App.css",
  "/index.css",
  "/App.js",
  "/Navbar.js",
  "/Movies.js",
  "/Cart.js",
  "/About.js",
  "/StreamList.js",
  "/images/icon-192x192.png",
  "/images/icon-512x512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
