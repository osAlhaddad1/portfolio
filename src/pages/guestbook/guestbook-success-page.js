import { LitElement, html } from 'lit';
import { pageFooter } from '../../components/layout/page-footer.js';

class GuestbookSuccessPage extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <main class="m-wrapper">
        <article class="c-page">
          <header class="c-page__header">
            <h1 class="c-page__subtitle">success</h1>
            <span class="c-page__title" aria-hidden="true">success</span>
          </header>

          <div class="c-page__cnt">
            <h2 class="c-page__heading">Thanks for signing</h2>

            <div class="c-page__cnt__wrapper">
              <p>Welcome to my visitor log!</p>
              <p>It's 1994 all over again. Your entry will be reviewed and if approved,
                 it'll be added to the guestbook. 🙂🌈✌🏽</p>
              <p style="margin-top:2rem">
                <a href="#/guestbook" class="c-back-link">← back to guestbook</a>
              </p>
            </div>
          </div>
        </article>

        ${pageFooter()}
      </main>
    `;
  }
}

customElements.define('osami-guestbook-success', GuestbookSuccessPage);

