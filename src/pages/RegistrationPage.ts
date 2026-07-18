import { BaseComponent } from "../base/BaseComponent";
import { BasePage } from "../base/BasePage";

export class RegistrationPage extends BasePage {
  private readonly onStart: (name: string) => void;

  private readonly title = new BaseComponent(
    "h1",
    ["page__title"],
    "Not Fight Club",
  );

  private readonly input = new BaseComponent("input", ["page__input"]);

  private readonly button = new BaseComponent(
    "button",
    ["page__button"],
    "Start",
  );

  constructor(onStart: (name: string) => void) {
    super();

    this.onStart = onStart;

    this.input.node.placeholder = "Enter your name";

    this.button.node.addEventListener("click", () => {
      const name = this.input.node.value.trim();

      if (!name) {
        return;
      }

      this.onStart(name);
    });
  }

  render(): HTMLElement {
    this.clear();

    this.append(this.title, this.input, this.button);

    return this.node;
  }
}
