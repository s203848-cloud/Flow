// Blockwelt – speichert die App, damit sie auch ohne Internet startet.
var V='blockwelt-v37';
var CORE=['./','./index.html','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png'];
var CDN='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(V).then(function(c){
    return Promise.all(CORE.map(function(u){return c.add(u).catch(function(){})}).concat([c.add(new Request(CDN,{mode:'cors'})).catch(function(){})]))}));
  self.skipWaiting()});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==V}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  // Die Seite selbst: erst Internet (für Updates), sonst gespeicherte Version
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request).then(function(r){var cp=r.clone();caches.open(V).then(function(c){c.put('./index.html',cp)});return r}).catch(function(){return caches.match('./index.html')}));return}
  // Alles andere (Grafik-Bibliothek, Schrift, Icons): erst Speicher, sonst Internet
  e.respondWith(caches.match(e.request).then(function(m){return m||fetch(e.request).then(function(r){if(r&&(r.ok||r.type==='opaque')){var cp=r.clone();caches.open(V).then(function(c){c.put(e.request,cp)})}return r})}))});