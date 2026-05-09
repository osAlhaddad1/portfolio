import { LitElement, html } from 'lit';
import { PROJECTS } from '../services/content/projects-service.js';
import { pageFooter } from '../components/layout/page-footer.js';

function tile(project, height) {
  return html`
    <a href="#/work/${project.slug}" class="c-fig-tiles">
      <div class="c-tile-bg"
           style="height:${height}px; background:${project.thumb}"></div>
      <figcaption class="c-fig-desc">
        <span class="c-fig-caption">${project.title}</span>
        <span class="c-fig-type">${project.type} · ${project.category}</span>
      </figcaption>
    </a>
  `;
}

class WorkPage extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    const [p1, p2, p3, p4] = PROJECTS;
    const big = 460;
    const small = Math.round((big - 25) / 2);

    return html`
      <main class="m-wrapper">
        <article class="c-page">
          <header class="c-page__header">
            <h1 class="c-page__subtitle">work</h1>
            <span class="c-page__title" aria-hidden="true">work</span>
          </header>

          <div class="c-page__cnt">
            <h2 class="c-page__heading">Selected projects</h2>

            <div class="u-flex-row">
              <div class="c-work-big">${tile(p1, big)}</div>
              <div class="c-work-col u-flex-col">
                ${tile(p2, small)}
                ${tile(p3, small)}
              </div>
            </div>

            <div class="u-flex-row">
              <div class="c-work-big" style="flex-basis:100%">
                ${tile(p4, big)}
              </div>
            </div>
          </div>
        </article>

        ${pageFooter()}
      </main>
    `;
  }
}

customElements.define('osami-work', WorkPage);

