import { LitElement, html } from 'lit';
import { pageFooter } from '../components/layout/page-footer.js';

class AboutPage extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <main class="m-wrapper">
        <article class="c-page">
          <header class="c-page__header">
            <h1 class="c-page__subtitle">about</h1>
            <span class="c-page__title" aria-hidden="true">about</span>
          </header>

          <div class="c-page__cnt">
            <h2 class="c-page__heading">About Me</h2>

            <div class="c-placeholder-img"
                 style="height:520px; background:url('/src/assets/pics/Me/me.jpg') center/cover no-repeat"></div>

            <div class="c-page__cnt__wrapper">
              <p>
                I am a Full-Stack Developer and IT student specializing in Java (Spring Boot) and Vue.js. I build high-performance web applications, frequently utilizing Three.js for 3D data visualization. My backend architecture relies on scalable logic and industry practices developed during my Bachelor's studies.
              </p>
              <p>
                My development process is pragmatic. I prioritize efficiency and ensure that technical decisions consistently align with business goals and deadlines. While my focus is on clean, maintainable code, my background in photography informs my front-end work, giving me a practical understanding of visual hierarchy and spatial composition.
              </p>
              <p>
                To work together write me at
                <a href="mailto:hello@example.com">hello@example.com</a>.
              </p>
            </div>

            <h2 class="c-page__heading">Press</h2>
            <div class="c-page__cnt__wrapper">
              <ul>
                <li><a href="#">The ultimate Three.js course by Bruno Simon</a></li>
                <li><a href="#">Tokyo Group Show Feature</a></li>
                <li><a href="#">Instagram Artist Feature</a></li>
                <li><a href="#">Podcast Episode with Chris Coyier</a></li>
                <li><a href="#">Digital Art Interview by Elizabeth Harris</a></li>
              </ul>
            </div>

            <h2 class="c-page__heading">Links</h2>
            <div class="c-page__cnt__wrapper">
              <ul>
                <li><a href="https://www.instagram.com/" target="_blank">Instagram</a></li>
                <li><a href="https://twitter.com/" target="_blank">Twitter</a></li>
                <li><a href="https://bsky.app/" target="_blank">Bluesky</a></li>
                <li><a href="#">CV</a></li>
              </ul>
            </div>
          </div>
        </article>

        ${pageFooter()}
      </main>
    `;
  }
}

customElements.define('osami-about', AboutPage);