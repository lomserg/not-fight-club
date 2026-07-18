import { BaseComponent } from "./BaseComponent";

export abstract class BasePage extends BaseComponent<"main"> {
  constructor() {
    super("main", ["page"]);
  }

  abstract render(): HTMLElement;
}
