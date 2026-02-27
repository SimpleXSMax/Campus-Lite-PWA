const STATIC_CACHE = "campus-static-v4";
const DATA_CACHE = "campus-data-v4";
const MEDIA_CACHE = "campus-media-v4";

const PRECACHE_ASSETS = [
  "./",
  "./index.html",
  "./offline.html",
  "./css/styles.css",
  "./js/app.js",
  "./js/db.js",
  "./js/storage.js",
  "./data/news.json",
  "./data/campus-services.json",
  "./manifest.webmanifest",
  "./icons/icon-192.svg",
  "./icons/icon-512.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => ![STATIC_CACHE, DATA_CACHE, MEDIA_CACHE].includes(key))
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }
  const response = await fetch(request);
  const cache = await caches.open(cacheName);
  cache.put(request, response.clone());
  return response;
}

async function networkFirst(request, cacheName, fallbackUrl) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    if (fallbackUrl) {
      const fallback = await caches.match(fallbackUrl);
      if (fallback) {
        return fallback;
      }
    }
    throw error;
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      cache.put(request, networkResponse.clone());
      return networkResponse;
    })
    .catch(() => cached);

  return cached || fetchPromise;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, STATIC_CACHE, "./offline.html"));
    return;
  }

  if (url.origin !== self.location.origin) {
    return;
  }

  if (/\/data\/.+\.json$/.test(url.pathname)) {
    event.respondWith(networkFirst(request, DATA_CACHE));
    return;
  }

  if (/\.(?:css|js|html|webmanifest|svg)$/.test(url.pathname)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  if (/\.(?:png|jpg|jpeg|gif|webp|avif)$/.test(url.pathname) || url.pathname.includes("map")) {
    event.respondWith(staleWhileRevalidate(request, MEDIA_CACHE));
    return;
  }

  event.respondWith(networkFirst(request, DATA_CACHE));
});
