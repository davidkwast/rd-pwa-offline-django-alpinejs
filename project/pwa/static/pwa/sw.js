// (A) CREATE/INSTALL CACHE
self.addEventListener("install", evt => {
    self.skipWaiting();
    evt.waitUntil(
        caches.open("PWA-Demo")
            .then(cache => cache.addAll([
                "/",
                "/workouts/pwa/html/",
                "/static/pwa/manifest.json",
                "/static/pwa/sw.js",
                "/static/pwa/alpine_core.js",
                "/static/pwa/alpine_persist.js",
                "/static/pwa/icon192.png"
            ]))
            .catch(err => console.error(err))
    );
});

// (B) CLAIM CONTROL INSTANTLY
//self.addEventListener("activate", evt => self.clients.claim());
self.addEventListener('activate', (event) => {
    console.log('Service worker activate event!');
});


/*
// (C) LOAD FROM CACHE FIRST, FALLBACK TO NETWORK IF NOT FOUND
self.addEventListener("fetch", evt => evt.respondWith(
    caches.match(evt.request).then(res => res || fetch(evt.request))
));
*/

/*
// (C) LOAD WITH NETWORK FIRST, FALLBACK TO CACHE IF OFFLINE
self.addEventListener("fetch", evt => evt.respondWith(
    fetch(evt.request).catch(() => caches.match(evt.request))
));
*/

// https://developers.google.com/codelabs/pwa-training/pwa03--going-offline#3
self.addEventListener('fetch', (event) => {
    console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        }),
    );
});
