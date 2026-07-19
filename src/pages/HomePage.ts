import { BaseComponent } from "../base/BaseComponent";
import { BasePage } from "../base/BasePage";
import type { Player } from "../types/Player";

export class HomePage extends BasePage {
  private readonly battleButton = new BaseComponent(
    "button",
    ["page__button"],
    "New Battle",
  );

  private readonly characterButton = new BaseComponent(
    "button",
    ["page__button"],
    "Character",
  );

  private readonly settingsButton = new BaseComponent(
    "button",
    ["page__button"],
    "Settings",
  );
  private readonly player: Player;

  private readonly onBattle: () => void;
  private readonly onCharacter: () => void;
  private readonly onSettings: () => void;

  constructor(
    player: Player,
    onBattle: () => void,
    onCharacter: () => void,
    onSettings: () => void,
  ) {
    super();

    this.player = player;
    this.onBattle = onBattle;
    this.onCharacter = onCharacter;
    this.onSettings = onSettings;

    this.battleButton.addEventListener("click", () => {
      this.onBattle();
    });

    this.characterButton.addEventListener("click", () => {
      this.onCharacter();
    });

    this.settingsButton.addEventListener("click", () => {
      this.onSettings();
    });
  }

  render(): HTMLElement {
    this.clear();

    const title = new BaseComponent("h1", [], `Welcome, ${this.player.name}`);

    this.append(
      title,
      this.battleButton,
      this.characterButton,
      this.settingsButton,
    );

    return this.node;
  }
}
