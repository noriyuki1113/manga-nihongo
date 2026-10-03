/* Manga Nihongo — basic service worker.
 * - Navigations: network first, fall back to the cached page, then to "/".
 * - Static assets (/_next/static, icons): cache first.
 * Everything else (RSC fetches, APIs) goes straight to the network. */
const VERSION = "v1"
const PAGES = `mn-pages-${VERSION}`
const ASSETS = `mn-assets-${VERSION}`

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PAGES)
      .then((cache) => cache.addAll(["/", "/stories", "/review", "/me"]))
      .catch(() => undefined)
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k.startsWith("mn-") && k !== PAGES && k !== ASSETS)
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  )
})

self.addEventListener("fetch", (event) => {
  const { request } = event
  if (request.method !== "GET") return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone()
          caches.open(PAGES).then((cache) => cache.put(request, copy))
          return response
        })
        .catch(() =>
          caches.match(request).then((hit) => hit || caches.match("/")),
        ),
    )
    return
  }

  const isStatic =
    url.pathname.startsWith("/_next/static/") ||
    /\.(png|svg|ico|webp|woff2?)$/.test(url.pathname)
  if (isStatic) {
    event.respondWith(
      caches.match(request).then(
        (hit) =>
          hit ||
          fetch(request).then((response) => {
            const copy = response.clone()
            caches.open(ASSETS).then((cache) => cache.put(request, copy))
            return response
          }),
      ),
    )
  }
})
