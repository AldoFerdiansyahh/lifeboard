const CACHE = 'lifeboard-v1.2.2';
const ASSETS = [
  './', './index.html', './manifest.json',
  './css/reset.css', './css/variables.css', './css/base.css', './css/layout.css', './css/components.css',
  './css/responsive.css', './css/utilities.css', './css/interactions.css', './css/brand.css',
  './assets/fonts/PlusJakartaSans-Variable.ttf', './assets/image/logo.png', './assets/image/aldo.png',
  './assets/icons/icon-safe-v2-192.png', './assets/icons/icon-safe-v2-512.png',
  './js/i18n.js', './js/profile.js', './js/app.js', './js/router.js', './js/db.js', './js/state.js',
  './js/utils.js', './js/settings.js', './js/backup.js', './js/notifications.js',
  './js/modules/dashboard.js', './js/modules/tasks.js', './js/modules/schedule.js',
  './js/modules/finance.js', './js/modules/notes.js', './js/modules/statistics.js',
  './js/components/icons.js', './js/components/modal.js', './js/components/toast.js',
  './js/components/sidebar.js', './js/components/global-search.js', './js/components/task-card.js',
  './js/components/transaction-card.js', './js/components/empty-state.js'
];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request).then(response => {
    if (response.ok && new URL(event.request.url).origin === location.origin) {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(event.request, copy));
    }
    return response;
  }).catch(() => caches.match(event.request).then(response => response || caches.match('./index.html'))));
});
