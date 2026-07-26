import { BaseComponent } from "../base/BaseComponent";
import { BasePage } from "../base/BasePage";
import { Button } from "../components/Button";
import type { Player } from "../types/Player";

export class SettingsPage extends BasePage {
  private readonly player: Player;
  private readonly onBack: () => void;
  private readonly onSave: (name: string) => void;
  private readonly input = new BaseComponent("input");

  private readonly title = new BaseComponent("h1", [], "Settings");
  private readonly saveButton = new Button("Save");

  private readonly backButton = new Button("Back");

  constructor(
    player: Player,
    onSave: (name: string) => void,
    onBack: () => void,
  ) {
    super();

    this.player = player;
    this.onSave = onSave;
    this.onBack = onBack;

    this.saveButton.addEventListener("click", () => {
      const name = this.input.node.value.trim();

      if (!name) {
        return;
      }

      this.onSave(name);
    });

    this.backButton.addEventListener("click", () => {
      this.onBack();
    });
  }

  render(): HTMLElement {
    this.clear();

    this.input.node.value = this.player.name;

    this.append(this.title, this.input, this.saveButton, this.backButton);

    return this.node;
  }
}
