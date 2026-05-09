import { LitElement, html } from 'lit';
import { SCENE_CONFIG } from '../utils/config/scene-config.js';
import { getActiveNavPage, hashToRouteKey, isInnerRoute } from '../services/router/hash-router.js';
import { applySceneCssVariables } from '../services/theme/css-vars-service.js';
import { restoreTheme } from '../services/theme/theme-service.js';

import '../components/navigation/app-nav.js';
import '../pages/home-page.js';
import '../pages/about-page.js';
import '../pages/work-page.js';
import '../pages/project-page.js';
import '../pages/writing-page.js';
import '../pages/guestbook/guestbook-page.js';
import '../pages/guestbook/guestbook-success-page.js';

applySceneCssVariables(SCENE_CONFIG);
restoreTheme();

class AppShell extends LitElement {
  static properties = { _route: { state: true } };

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this._onHashChange = () => {
      this._route = hashToRouteKey();
    };
    window.addEventListener('hashchange', this._onHashChange);
    this._route = hashToRouteKey();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('hashchange', this._onHashChange);
  }

  updated() {
    const inner = isInnerRoute(this._route);
    document.body.classList.toggle('is-inner', inner);
    document.body.classList.toggle('is-home', !inner);
  }

  renderPage(routeKey) {
    if (routeKey.startsWith('work/')) {
      const slug = routeKey.slice(5);
      return html`<osami-project slug=${slug}></osami-project>`;
    }

    switch (routeKey) {
      case 'about':
        return html`<osami-about></osami-about>`;
      case 'work':
        return html`<osami-work></osami-work>`;
      case 'writing':
        return html`<osami-writing></osami-writing>`;
      case 'guestbook':
        return html`<osami-guestbook></osami-guestbook>`;
      case 'guestbook/success':
        return html`<osami-guestbook-success></osami-guestbook-success>`;
      default:
        return html`<osami-home></osami-home>`;
    }
  }

  render() {
    const routeKey = this._route ?? '';
    const activePage = getActiveNavPage(routeKey);

    return html`
      <osami-nav activePage=${activePage}></osami-nav>
      ${this.renderPage(routeKey)}
    `;
  }
}

customElements.define('osami-app', AppShell);

