import { BasePage } from "../base/BasePage";
import { BaseComponent } from "../base/BaseComponent";

export class BattlePage extends BasePage {
  render(): HTMLElement {
    this.clear();

    this.append(new BaseComponent("h1", [], "Battle"));

    return this.node;
  }
}
