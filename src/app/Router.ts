import { BasePage } from "../base/BasePage";

export class Router {
  private readonly root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  public navigate(page: BasePage): void {
    this.root.replaceChildren(page.render());
  }
}
