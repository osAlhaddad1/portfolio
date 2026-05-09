import { LitElement, html } from 'lit';
import { getProject } from '../services/content/projects-service.js';
import { pageFooter } from '../components/layout/page-footer.js';

class ProjectPage extends LitElement {
  static properties = {
    slug: { type: String },
  };

  createRenderRoot() {
    return this;
  }

  render() {
    const project = this.slug ? getProject(this.slug) : null;

    if (!project) {
      return html`
        <main class="m-wrapper">
          <article class="c-page">
            <div class="c-page__cnt" style="padding:3rem 1.5rem">
              <p>Project not found.</p>
              <a href="#/work" class="c-back-link">← back to work</a>
            </div>
          </article>
          ${pageFooter()}
        </main>
      `;
    }

    return html`
      <main class="m-wrapper">
        <article class="c-page">
          <header class="c-page__header">
            <h1 class="c-page__subtitle">${project.category.toLowerCase()}</h1>
            <span class="c-page__title" aria-hidden="true">${project.category.toLowerCase()}</span>
          </header>

          <div class="c-page__cnt">
            <h2 class="c-page__heading">${project.title} - ${project.type}</h2>

            ${project.images.map((img) => html`
              <div class="c-placeholder-img"
                   data-caption=${img.caption ?? ''}
                   style="height:${img.h}px; background:${img.bg}; max-width:100%; margin-right:1.5625rem">
              </div>
            `)}

            <div class="c-page__cnt__wrapper">
              <ul class="c-project-meta">
                ${project.meta.map((item) => html`
                  <li>
                    <span class="c-project-meta__label">${item.label}</span>
                    <span>${item.value}</span>
                  </li>
                `)}
              </ul>
            </div>

            <div class="c-page__cnt__wrapper">
              ${project.description.map((paragraph) =>
                typeof paragraph === 'string'
                  ? html`<p>${paragraph}</p>`
                  : html`<pre class="c-pre-block">${paragraph.content}</pre>`
              )}
            </div>

            <a href="#/work" class="c-back-link">← back to work</a>
          </div>
        </article>

        ${pageFooter()}
      </main>
    `;
  }
}

customElements.define('osami-project', ProjectPage);

