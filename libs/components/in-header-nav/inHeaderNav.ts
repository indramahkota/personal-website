import { html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { repeat } from "lit/directives/repeat.js";
import { InNavigationModel } from "../../data/model/models";
import CommonElement from "../base/commonElement";
import "../in-header-nav-item/inHeaderNavItem";
import InHeaderNavItem from "../in-header-nav-item/inHeaderNavItem";
import "./inHeaderNav.scss";

@customElement("in-header-nav")
export default class InHeaderNav extends CommonElement {
  @property({ type: Array })
  navData: InNavigationModel[] = [];

  @property({ type: Boolean })
  isDrawerOpen = false;

  connectedCallback(): void {
    super.connectedCallback();
    if (window.location.hash !== "")
      this.dataShouldUpdate(window.location.hash);
    this.addEventListener(
      InHeaderNavItem.CLICK,
      this.onNavItemClickHandler,
      false
    );
  }

  disconnectedCallback(): void {
    this.removeEventListener(
      InHeaderNavItem.CLICK,
      this.onNavItemClickHandler,
      false
    );
    super.disconnectedCallback();
  }

  dataShouldUpdate(hash: string): void {
    this.navData = this.navData.map((nav) => {
      nav.isActive = nav.url === hash || false;
      return nav;
    });
    this.querySelectorAll("in-header-nav-item").forEach((elm) =>
      elm.requestUpdate()
    );
  }

  onNavItemClickHandler(event: Event): void {
    const details = (event as CustomEvent).detail;
    if (!details.data.url) return;
    this.dataShouldUpdate(details.data.url);
  }

  render(): TemplateResult {
    const open = { open: this.isDrawerOpen };
    return html`
      <div class="in-header-nav">
        <nav class="${classMap(open)}">
          <ul class="p-0">
            ${repeat(
              this.navData,
              (nav) => html`<li>
                <in-header-nav-item .navItem=${nav}></in-header-nav-item>
              </li>`
            )}
          </ul>
        </nav>
      </div>
    `;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
  interface HTMLElementTagNameMap {
    "in-header-nav": InHeaderNav;
  }
}