this.addEventListener('install', function(event) {
   event.waitUntil(
     caches.open('version1').then(function(cache) {
       return cache.addAll([
         '/sw/',
         '/sw/index.html',
         '/sw/app.js',
         '/sw/picture.jpeg',
         '/sw/logo.png',
       ]);
     })
   );
 });

 this.addEventListener('fetch', function(event) {
   event.respondWith(
     caches.match(event.request)
   );
   console.log('this is service worker');
 });