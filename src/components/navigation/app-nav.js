import { LitElement, html, nothing } from 'lit';
import { applyThemeByKey, getActiveThemeKey } from '../../services/theme/theme-service.js';

const NAV_PAGES = [
  { href: '#/about', label: 'About', key: 'about' },
  { href: '#/work', label: 'Work', key: 'work' },
  { href: '#/writing', label: 'My Story', key: 'writing' },
  { href: '#/guestbook', label: 'Guestbook', key: 'guestbook' },
];

const THEMES = [
  { key: 'blue', cls: 'c-picker__btn--01', label: 'Blue theme' },
  { key: 'purple', cls: 'c-picker__btn--02', label: 'Purple theme' },
  { key: 'hotpink', cls: 'c-picker__btn--03', label: 'Hotpink theme' },
  { key: 'black', cls: 'c-picker__btn--04', label: 'Black theme' },
];

class AppNav extends LitElement {
  static properties = {
    activePage: { type: String },
    _activeTheme: { state: true },
  };

  constructor() {
    super();
    this.activePage = '';
    this._activeTheme = getActiveThemeKey();
  }

  createRenderRoot() {
    return this;
  }

  pickTheme(themeKey) {
    this._activeTheme = applyThemeByKey(themeKey);
  }

  render() {
    return html`
      <header class="c-header">
        <a href="#" class="c-header__logo"
           aria-label="Osami Alhaddad — home">osami</a>
        <nav class="c-nav" aria-label="Primary">
          <ul>
            ${NAV_PAGES.map((page) => html`
              <li class="c-nav__item">
                <a href=${page.href}
                   target=${page.external ? '_blank' : nothing}
                   rel=${page.external ? 'noopener noreferrer' : nothing}
                   aria-current=${page.key === this.activePage ? 'page' : nothing}>
                  <strong>${page.label}</strong>
                </a>
              </li>
            `)}
          </ul>
        </nav>
      </header>

      <div class="c-picker">
        ${THEMES.map((theme) => html`
          <div class="c-picker__btn ${theme.cls} ${this._activeTheme === theme.key ? 'is-active' : ''}"
               @click=${() => this.pickTheme(theme.key)}
               title=${theme.label}></div>
        `)}
      </div>
    `;
  }
}

customElements.define('osami-nav', AppNav);

