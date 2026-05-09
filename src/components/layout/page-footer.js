import { html } from 'lit';

export const pageFooter = () => html`
  <footer class="c-footer">
    <button class="c-back-top"
            @click=${() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      top ▲
    </button>
    <nav class="c-footer__nav" aria-label="Secondary">
      <span class="c-footer__nav__item"><a href="#">Imprint</a></span>
      <span class="c-footer__nav__item"><a href="#">RSS</a></span>
    </nav>
    <p>All rights reserved. By ilithya © 2026.<br>Made with ♥ Lit.</p>
  </footer>
`;

