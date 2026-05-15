const CACHE = 'autolock-pro-v1';

const PRECACHE = [
  '/Autolock-pro/',
  '/Autolock-pro/index.html',
  '/Autolock-pro/remotes-data.js',
  '/Autolock-pro/obd-locations.js',
  '/Autolock-pro/proc-data.js',
  '/Autolock-pro/prog-methods.js',
  '/Autolock-pro/manifest.json',
  '/Autolock-pro/icon.png',
  '/Autolock-pro/icon512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Google Fonts → stale-while-revalidate (mise à jour en arrière-plan)
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(swr(e.request));
    return;
  }

  // Gros fichiers JS de données → cache first (rarement changés, très lourds)
  if (url.pathname.match(/\/(remotes-data|obd-locations|proc-data|prog-methods)\.js$/)) {
    e.respondWith(cacheFirst(e.request));
    return;
  }

  // Icônes et manifest → cache first
  if (url.pathname.match(/\.(png|json)$/) && url.hostname === self.location.hostname) {
    e.respondWith(cacheFirst(e.request));
    return;
  }

  // HTML et tout le reste → network first avec fallback cache
  e.respondWith(networkFirst(e.request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Ressource indisponible hors-ligne.', { status: 503 });
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('Hors-ligne — données non disponibles.', { status: 503 });
  }
}

async function swr(request) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request);
  fetch(request).then(r => { if (r.ok) cache.put(request, r.clone()); }).catch(() => {});
  return cached || fetch(request);
}
