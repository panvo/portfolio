/* Jhon Rey Bañaga — portfolio service worker
   Strategy:
   - navigations  -> network-first (fresh HTML), fall back to cached shell offline
   - static assets -> stale-while-revalidate (instant, updates in background)
   - google fonts  -> cache-first (works fully offline once seen)
   - supabase / other cross-origin APIs -> never cached (always network)
   Bump SW_VERSION to invalidate old caches on the next visit. */
const SW_VERSION = 'v1.0.0'
const SHELL_CACHE = `shell-${SW_VERSION}`
const ASSET_CACHE = `assets-${SW_VERSION}`
const FONT_CACHE = `fonts-${SW_VERSION}`

// Stable files worth pre-caching (hashed bundles are runtime-cached instead).
const SHELL = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/maskable-512.png',
  '/icons/apple-touch-icon.png',
  '/portrait.jpg',
  '/404.html',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => ![SHELL_CACHE, ASSET_CACHE, FONT_CACHE].includes(k))
          .map((k) => caches.delete(k))
      ).then(() => self.clients.claim())
    )
  )
})

// Let the page trigger an immediate update (used by the "new version" prompt).
self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting()
})

const isFont = (url) =>
  url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com'

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)

  // Google Fonts: cache-first (rarely changes; enables offline typography).
  if (isFont(url)) {
    event.respondWith(
      caches.open(FONT_CACHE).then(async (cache) => {
        const hit = await cache.match(request)
        if (hit) return hit
        const res = await fetch(request)
        if (res.ok || res.type === 'opaque') cache.put(request, res.clone())
        return res
      })
    )
    return
  }

  // Only handle our own origin beyond this point (skip Supabase/APIs/analytics).
  if (url.origin !== self.location.origin) return

  // Navigations: network-first so HTML is always fresh; fall back to shell offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone()
          caches.open(SHELL_CACHE).then((c) => c.put('/index.html', copy))
          return res
        })
        .catch(async () => (await caches.match(request)) || (await caches.match('/index.html')))
    )
    return
  }

  // Static assets: stale-while-revalidate.
  event.respondWith(
    caches.open(ASSET_CACHE).then(async (cache) => {
      const hit = await cache.match(request)
      const network = fetch(request)
        .then((res) => {
          if (res.ok) cache.put(request, res.clone())
          return res
        })
        .catch(() => hit)
      return hit || network
    })
  )
})
