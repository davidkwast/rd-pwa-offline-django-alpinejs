// Incrementing OFFLINE_VERSION will kick off the install event and force
// previously cached resources to be updated from the network.
// This variable is intentionally declared and unused.
// Add a comment for your linter if you want:
// eslint-disable-next-line no-unused-vars
const OFFLINE_VERSION = 202403191900;
const CACHE_NAME = "offline";
// Customize this with a different URL if needed.
const OFFLINE_URL = "/";


// (A) CREATE/INSTALL CACHE
self.addEventListener("install", evt => {
    evt.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll([
                "/",
                "/static/pwa/pwa.html",
                "/workouts/pwa/html/",
                "/workouts/pwa/html/pwa.html",
                "/static/pwa/manifest.json",
                "/static/pwa/sw.js",
                "/static/pwa/alpine_core.js",
                "/static/pwa/alpine_persist.js",
                "/static/pwa/icon192.png"
            ]))
            .catch(err => console.error(err))
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            // Enable navigation preload if it's supported.
            // See https://developers.google.com/web/updates/2017/02/navigation-preload
            if ("navigationPreload" in self.registration) {
                await self.registration.navigationPreload.enable();
            }
        })()
    );

    // Tell the active service worker to take control of the page immediately.
    self.clients.claim();
});


self.addEventListener("fetch", (event) => {
    // Only call event.respondWith() if this is a navigation request
    // for an HTML page.
    if (event.request.mode === "navigate") {
        event.respondWith(
            (async () => {
                try {
                    // First, try to use the navigation preload response if it's
                    // supported.
                    const preloadResponse = await event.preloadResponse;
                    if (preloadResponse) {
                        return preloadResponse;
                    }

                    // Always try the network first.
                    const networkResponse = await fetch(event.request);
                    return networkResponse;
                } catch (error) {
                    // catch is only triggered if an exception is thrown, which is
                    // likely due to a network error.
                    // If fetch() returns a valid HTTP response with a response code in
                    // the 4xx or 5xx range, the catch() will NOT be called.
                    console.log("Fetch failed; returning offline page instead.", error);

                    const cache = await caches.open(CACHE_NAME);
                    const cachedResponse = await cache.match(OFFLINE_URL);
                    return cachedResponse;
                }
            })()
        );
    }

    // If our if() condition is false, then this fetch handler won't
    // intercept the request. If there are any other fetch handlers
    // registered, they will get a chance to call event.respondWith().
    // If no fetch handlers call event.respondWith(), the request
    // will be handled by the browser as if there were no service
    // worker involvement.
});
