const CACHE='puremusic-v7-3-20261018';
const ASSETS=['./index.html','./manifest.webmanifest','./icon.svg','./v4.js?v=6.3','./v6.js?v=7.2','./v6.css?v=7.2','./library-v7.js?v=7.2','./library-v7.css?v=7.2','./controls-v7-3.css?v=7.3','./controls-v7-3.js?v=7.3'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>{if(e.request.method==='GET'&&new URL(e.request.url).origin===self.location.origin)e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)))});
