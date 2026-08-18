const CACHE='osp-pro-v1';
const CORE=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest','./assets/osp-logo.png','./assets/tent.jpg','./assets/mobile-freezer.jpg','./assets/equipment-poster.jpg','./assets/pa-poster.jpg','./assets/osp-logo-alt.jpg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match('./index.html'))));
});
