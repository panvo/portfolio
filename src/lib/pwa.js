// Progressive Web App wiring.
// Registers the service worker in production only (never in dev — avoids stale
// caches while iterating). When a new version is deployed, it activates on the
// next navigation; network-first HTML means users still get fresh content
// immediately, so there's no jarring auto-reload.
export function registerSW() {
  if (!('serviceWorker' in navigator)) return
  if (!import.meta.env.PROD) return

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((reg) => {
        // Check for updates when the tab regains focus.
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') reg.update()
        })
      })
      .catch(() => {
        /* offline-capable is an enhancement — never block the app on it */
      })
  })
}
