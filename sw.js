/**
 * Service Worker minimo - WAT Macros
 *
 * Estrategia:
 *  - Cache-first para assets locais (index.html, taco-foods.js, manifest.json)
 *  - Network-only para chamadas da Claude API (sempre online)
 *  - Fallback ao cache se offline
 */
const CACHE_NAME = "wat-macros-v5";
const ASSETS = [
  "./index.html",
  "./taco-foods.js",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // Nunca cacheia chamadas da Claude API
  if (url.hostname.includes("anthropic.com")) {
    return; // deixa o browser lidar normalmente (sempre rede)
  }

  // Cache-first para assets locais
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Cacheia respostas validas pra proxima vez
        if (response && response.status === 200 && response.type === "basic") {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => cached); // fallback offline se nao tem na rede
    })
  );
});
