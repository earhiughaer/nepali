const cacheName = "nepali-pwa-v41";
const runtimeCacheName = "nepali-pwa-runtime-v33";
const assets = [
  ".",
  "index.html",
  "styles.css?v=41",
  "content.js?v=41",
  "app.js?v=41",
  "bling.mp3",
  "fanfaren.mp3",
  "manifest.webmanifest",
  "icons/icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(assets)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== cacheName).map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (event.request.url.includes("/audio/") || event.request.url.includes("/alphabet/")) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(runtimeCacheName).then((cache) => cache.put(event.request, copy));
          }
          return response;
        });
      })
    );
    return;
  }
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(cacheName).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
