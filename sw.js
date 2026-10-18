const CACHE='puremusic-v7-0-20261018';
const ASSETS=['./index.html','./manifest.webmanifest','./icon.svg','./v4.js?v=6.3','./v6.js?v=6.4','./v6.css?v=6.4','./library-v7.js?v=7.0.0','./library-v7.css?v=7.0.0'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>{if(e.request.method==='GET'&&new URL(e.request.url).origin===self.location.origin)e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)))});
