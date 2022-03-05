import { html, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import ScrollElement from "../base/scrollElement";
import "./inToTop.scss";

@customElement("in-to-top")
export default class InToTop extends ScrollElement {
  onScrollHandler(): void {
    if (this.currScrollPosition < (3 / 4) * window.screen.height) {
      document.getElementById("top-button")?.classList.remove("show");
      return;
    }
    const hideTopButton = this.currScrollPosition - this.lastScrollPosition;
    if (hideTopButton > 0) {
      document.getElementById("top-button")?.classList.remove("show");
    } else if (hideTopButton < -10) {
      document.getElementById("top-button")?.classList.add("show");
    }
  }

  onButtonClickHandler(): void {
    document.body.scrollTo({ top: 0, behavior: "smooth" });
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  }

  render(): TemplateResult {
    return html`
      <button
        id="top-button"
        class="goTopButton"
        aria-label="Go to top Button"
        title="Go to top"
        @click="${this.onButtonClickHandler}"
      >
        <i class="fas fa-hand-point-up"></i>
      </button>
    `;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
  interface HTMLElementTagNameMap {
    "in-to-top": InToTop;
  }
}
