export const ROUTES = {
  '': 'ilithya-home',
  about: 'ilithya-about',
  work: 'ilithya-work',
  writing: 'ilithya-writing',
  guestbook: 'ilithya-guestbook',
  'guestbook/success': 'ilithya-guestbook-success',
};

export function hashToRouteKey(hash = window.location.hash) {
  return hash.startsWith('#/') ? hash.slice(2) : '';
}

export function isInnerRoute(routeKey) {
  return routeKey !== '';
}

export function getActiveNavPage(routeKey) {
  if (routeKey.startsWith('work/')) return 'work';
  if (routeKey.startsWith('guestbook/')) return 'guestbook';
  return ROUTES[routeKey] ? routeKey : '';
}

