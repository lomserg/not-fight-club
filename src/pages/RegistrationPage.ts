import { BaseComponent } from "../base/BaseComponent";
import { BasePage } from "../base/BasePage";

export class RegistrationPage extends BasePage {
  render(): HTMLElement {
    const title = new BaseComponent("h1", ["page__title"], "Not Fight Club");

    const input = new BaseComponent("input", ["page__input"]);
    input.node.setAttribute("placeholder", "Enter your name");

    const button = new BaseComponent("button", ["page__button"], "Start");

    this.append(title, input, button);

    return this.node;
  }
}
