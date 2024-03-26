if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js', { scope: "/" })
            .then(function(registration) {
                console.log('Service worker registration successful with scope: ', registration.scope);
                // Additional logic here if needed
            })
            .catch(function(err) {
                console.log('Service worker registration failed: ', err);
            });
    });
}


var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/',
    'index.html',
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened Cache');
            return cache.addAll(urlsToCache);
        }).catch(function(err) {
            console.error('Cache open failed: ', err);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        }).catch(function(err) {
            console.error('Fetch failed: ', err);
        })
    );
});
