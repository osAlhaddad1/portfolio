export const ROUTES = {
  '': 'osami-home',
  about: 'osami-about',
  work: 'osami-work',
  writing: 'osami-writing',
  guestbook: 'osami-guestbook',
  'guestbook/success': 'osami-guestbook-success',
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

