import { BaseComponent } from "../base/BaseComponent";

export class Button extends BaseComponent<"button"> {
  constructor(text: string) {
    super("button", ["page__button"], text);
  }
}
