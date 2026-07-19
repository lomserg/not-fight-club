import { BaseComponent } from "../base/BaseComponent";
import { BasePage } from "../base/BasePage";
import { Button } from "../components/Button";
import { avatars } from "../constants/avatars";

import type { Player } from "../types/Player";

export class CharacterPage extends BasePage {
  private readonly player: Player;
  private readonly onBack: () => void;

  private readonly title = new BaseComponent("h1", [], "Character");
  private readonly avatarImage = new BaseComponent("img");
  private readonly backButton = new Button("Back");
  private readonly nameText = new BaseComponent("p");
  private readonly winsText = new BaseComponent("p");
  private readonly lossesText = new BaseComponent("p");
  constructor(player: Player, onBack: () => void) {
    super();

    this.player = player;
    this.onBack = onBack;

    this.avatarImage.node.src = avatars[this.player.avatar];
    this.avatarImage.node.alt = this.player.name;

    this.backButton.addEventListener("click", () => {
      this.onBack();
    });
  }

  render(): HTMLElement {
    this.clear();

    this.nameText.setText(`Name: ${this.player.name}`);
    this.winsText.setText(`Wins: ${this.player.wins}`);
    this.lossesText.setText(`Losses: ${this.player.losses}`);

    this.append(
      this.title,
      this.avatarImage,
      this.nameText,
      this.winsText,
      this.lossesText,
      this.backButton,
    );

    return this.node;
  }
}
