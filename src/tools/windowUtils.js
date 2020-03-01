const canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);

export function translate(str, replaceStrings = null) {
  if (!str) {
    return '';
  }

  let translated = str;
  if (replaceStrings) {
    Object.keys(replaceStrings).forEach(placeholder => {
      translated = translated.replace(placeholder, replaceStrings[placeholder]);
    });
  }

  return translated;
}

export function canUseDom() {
  return canUseDOM;
}

export function getWindowWidth() {
  return canUseDOM ? window.innerWidth : 370; // 1366; // Default size for server-side rendering
}

export function getWindowHeight() {
  return canUseDOM ? window.innerHeight : 640; // Default size for server-side rendering
}

export function getScrollY() {
  return canUseDOM ? window.scrollY || window.pageYOffset : 0;
}

export function getClientHeight(node) {
  return node !== null && canUseDOM ? node.getBoundingClientRect().height : 100;
}

// Get the highest window context that isn't cross-origin
// (When in an iframe)
export function getHighestSafeWindowContext(self = window.self) {
  // If we reached the top level, return self
  if (self === window.top) {
    return self;
  }

  const getOrigin = href => href.match(/(.*\/\/.*?)(\/|$)/)[1];

  // If parent is the same origin, we can move up one context
  // Reference: https://stackoverflow.com/a/21965342/1601953
  if (getOrigin(self.location.href) === getOrigin(self.document.referrer)) {
    return getHighestSafeWindowContext(self.parent);
  }

  // If a different origin, we consider the current level
  // as the top reachable one
  return self;
}
