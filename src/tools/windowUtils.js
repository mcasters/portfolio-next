const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export function canUseDom() {
  return canUseDOM;
}

export function getWindowWidth() {
  return canUseDOM ? window.innerWidth : 540; // Default size for server-side rendering
}

export function getWindowHeight() {
  return canUseDOM ? window.innerHeight : 800; // Default size for server-side rendering
}
