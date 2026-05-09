import { LitElement, html } from 'lit';
import { pageFooter } from '../../components/layout/page-footer.js';

const MOODS = ['😎', '😭', '🤗', '🤩', '😍', '🤔', '😅', '👾', '🌈', '🦄', '💻', '✨', '🔥', '👀', '🎉'];

const DEFAULT_BG = '#1a1a1a';
const DEFAULT_TEXT = '#00ff21';

const dots = () => html`
  <div class="c-console__dots">
    <span class="c-console__dot c-console__dot--red"></span>
    <span class="c-console__dot c-console__dot--yellow"></span>
    <span class="c-console__dot c-console__dot--green"></span>
  </div>
`;

const ENTRIES = [
  { n: 67, date: 'apr 18, 2026', msg: 'hello', mood: '😎', alias: 'jus', link: '', bg: '#1a3470', fg: '#f5e8c7' },
  { n: 66, date: 'apr 17, 2026', msg: 'hi love your website', mood: '😭', alias: 'no', link: '', bg: '#a85555', fg: '#44ff44' },
  { n: 65, date: 'apr 17, 2026', msg: 'loved your portfolio website and your work, from India', mood: '🤗', alias: 'vikash sharma', link: 'https://vikashh.in', bg: '#c030a0', fg: '#1a1a1a' },
  { n: 64, date: 'apr 17, 2026', msg: 'I really loved your portfolio and now I understand, it is not just about logic building or writing code that make things work, creativity can also be blended into work and that will make it a true masterpiece.', mood: '😎', alias: 'harsh-dhiman', link: 'https://harshdhiman.xyz/', bg: '#1a1a1a', fg: '#44ff44' },
  { n: 63, date: 'apr 17, 2026', msg: 'holy swag website brochacho', mood: '😎', alias: 'candy&carmel', link: '', bg: '#1a1a1a', fg: '#00ff21' },
];

class GuestbookPage extends LitElement {
  static properties = {
    _moodIdx: { state: true },
    _bgColor: { state: true },
    _textColor: { state: true },
  };

  constructor() {
    super();
    this._moodIdx = 0;
    this._bgColor = DEFAULT_BG;
    this._textColor = DEFAULT_TEXT;
  }

  createRenderRoot() {
    return this;
  }

  resetColors() {
    this._bgColor = DEFAULT_BG;
    this._textColor = DEFAULT_TEXT;
  }

  handleSubmit(event) {
    event.preventDefault();
    window.location.hash = '#/guestbook/success';
  }

  render() {
    const currentMood = MOODS[this._moodIdx];
    const consoleStyle = `--c_console_bg:${this._bgColor}; --c_console_text:${this._textColor}`;

    return html`
      <main class="m-wrapper">
        <article class="c-page">
          <header class="c-page__header">
            <h1 class="c-page__subtitle">guestbook</h1>
            <span class="c-page__title" aria-hidden="true">guestbook</span>
          </header>

          <div class="c-page__cnt">
            <h2 class="c-page__heading">Leave a note</h2>
            <div class="c-page__cnt__wrapper">
              <p>Feel free to sign my guestbook. 🌻 🧋 🧋 🧋 🌈</p>

              <form @submit=${(event) => this.handleSubmit(event)} style="margin-top:2rem">
                <div class="c-console" style="${consoleStyle}">
                  <div class="c-console__header">
                    ${dots()}
                    <span class="c-console__title">~/log data</span>
                  </div>
                  <div class="c-console__body">
                    <div class="c-form__line">
                      <span class="c-form__prompt">&gt;_</span>
                      <textarea class="c-form__textarea" rows="2"
                                placeholder="say something" required></textarea>
                    </div>

                    <div class="c-form__mood">
                      <span class="c-form__mood-emoji">${currentMood}</span>
                      <input class="c-form__mood-slider"
                             type="range"
                             min="0" max=${MOODS.length - 1} step="1"
                             .value=${String(this._moodIdx)}
                             @input=${(e) => { this._moodIdx = Number(e.target.value); }}
                             aria-label="mood" />
                    </div>

                    <div class="c-form__line">
                      <span class="c-form__prompt">&gt;_</span>
                      <input class="c-form__input" type="text"
                             autocomplete="off"
                             placeholder="[nickname]" required />
                    </div>

                    <div class="c-form__line">
                      <span class="c-form__prompt">&gt;_</span>
                      <input class="c-form__input" type="url"
                             autocomplete="off"
                             placeholder="https://site.url" />
                    </div>
                  </div>
                </div>

                <fieldset class="c-console-pimp" style="margin-top:2rem">
                  <legend class="c-console-pimp__title">Pimp your console</legend>
                  <div class="c-console-pimp__controls">
                    <div class="c-console-pimp__group">
                      <label class="c-console-pimp__label">background</label>
                      <input class="c-form__color" type="color"
                             .value=${this._bgColor}
                             @input=${(e) => { this._bgColor = e.target.value; }} />
                    </div>
                    <div class="c-console-pimp__group">
                      <label class="c-console-pimp__label">text</label>
                      <input class="c-form__color" type="color"
                             .value=${this._textColor}
                             @input=${(e) => { this._textColor = e.target.value; }} />
                    </div>
                    <button type="button" class="c-form__reset"
                            @click=${() => this.resetColors()}>reset colors</button>
                  </div>
                </fieldset>

                <button class="c-form__submit" type="submit">
                  &gt;_ Send Message
                </button>
              </form>
            </div>

            <h2 class="c-page__heading">Entries</h2>
            <div class="c-page__cnt__wrapper">
              <div class="c-guestbook-entries">
                ${ENTRIES.map((entry) => html`
                  <div class="c-guestbook-entry"
                       style="--entry-bg:${entry.bg}; --entry-fg:${entry.fg}">
                    <div class="c-guestbook-entry__header">
                      ${dots()}
                      <span>~/entry #${entry.n} - ${entry.date}</span>
                    </div>
                    <div class="c-guestbook-entry__body">
                      <div class="c-guestbook-entry__msg">${entry.msg}</div>
                      <span class="c-guestbook-entry__mood">${entry.mood}</span>
                      <span class="c-guestbook-entry__alias">[${entry.alias}]</span>
                      ${entry.link ? html`
                        <a class="c-guestbook-entry__link"
                           href="${entry.link}" target="_blank" rel="noopener">
                          ${entry.link}
                        </a>` : ''}
                    </div>
                  </div>
                `)}
              </div>
            </div>
          </div>
        </article>

        ${pageFooter()}
      </main>
    `;
  }
}

customElements.define('osami-guestbook', GuestbookPage);

