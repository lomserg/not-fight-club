import { BaseComponent } from "../base/BaseComponent";
import { BasePage } from "../base/BasePage";
import { Button } from "../components/Button";
import { BattleEngine } from "../game/BattleEngine";
import type { Player } from "../types/Player";
import type { Enemy } from "../types/Enemy";
import { enemies } from "../constants/enemies";
import type { Zone } from "../types/Zone";
import { avatars } from "../constants/avatars";
import { LocalStorageService } from "../storage/LocalStorage";
export class BattlePage extends BasePage {
  private readonly player: Player;
  private readonly onBack: () => void;
  private readonly zones: Zone[] = ["head", "body", "legs"];
  private readonly title = new BaseComponent("h1", [], "Battle");
  private readonly backButton = new Button("Back");
  private readonly attackTitle = new BaseComponent("h2", [], "Attack");
  private readonly defenseTitle = new BaseComponent("h2", [], "Defense");
  private readonly enemy: Enemy;

  private playerHp = 100;
  private enemyHp = 100;

  private selectedAttack: Zone | null = null;

  private selectedDefense: Zone[] = [];

  private readonly playerImage = new BaseComponent("img");

  private readonly enemyImage = new BaseComponent("img");

  private readonly playerHpText = new BaseComponent("p");

  private readonly enemyHpText = new BaseComponent("p");

  private readonly attackButton = new Button("Attack");

  private readonly battleLog = new BaseComponent("div");

  private readonly attackContainer = new BaseComponent("div");
  private readonly defenseContainer = new BaseComponent("div");
  constructor(player: Player, onBack: () => void) {
    super();

    this.player = player;
    this.onBack = onBack;
    this.enemy = enemies[Math.floor(Math.random() * enemies.length)];
    this.playerImage.node.src = avatars[player.avatar];

    this.enemyImage.node.src = this.enemy.avatar;

    this.enemyImage.node.alt = this.enemy.name;
    this.backButton.addEventListener("click", () => {
      this.onBack();
    });
    this.attackButton.node.disabled = true;
    this.attackButton.addEventListener("click", () => {
      this.attack();
    });
    this.zones.forEach((zone) => {
      this.attackContainer.append(this.createAttackRadio(zone));

      this.defenseContainer.append(this.createDefenseCheckbox(zone));
    });
  }
  private createAttackRadio(zone: Zone): BaseComponent<"label"> {
    const label = new BaseComponent("label");

    const input = new BaseComponent("input");
    input.node.type = "radio";
    input.node.name = "attack";
    input.node.value = zone;

    input.addEventListener("change", () => {
      this.selectedAttack = zone;
      this.updateAttackButton();
    });

    label.append(input);
    label.node.append(` ${zone}`);

    return label;
  }
  private attack(): void {
    if (!this.selectedAttack) {
      return;
    }

    const enemyAttack = BattleEngine.randomZones(1);
    const enemyDefense = BattleEngine.randomZones(2);

    const playerDamage = BattleEngine.calculateDamage(
      [this.selectedAttack],
      enemyDefense,
      20,
    );

    const enemyDamage = BattleEngine.calculateDamage(
      enemyAttack,
      this.selectedDefense,
      20,
    );

    this.enemyHp = Math.max(0, this.enemyHp - playerDamage);
    this.playerHp = Math.max(0, this.playerHp - enemyDamage);

    this.playerHpText.setText(`HP: ${this.playerHp}`);
    this.enemyHpText.setText(`HP: ${this.enemyHp}`);

    this.selectedAttack = null;
    this.selectedDefense = [];

    this.attackButton.node.disabled = true;

    this.attackContainer.node
      .querySelectorAll<HTMLInputElement>('input[type="radio"]')
      .forEach((input) => {
        input.checked = false;
      });

    this.defenseContainer.node
      .querySelectorAll<HTMLInputElement>('input[type="checkbox"]')
      .forEach((input) => {
        input.checked = false;
      });

    this.selectedAttack = null;
    this.selectedDefense = [];

    this.attackButton.node.disabled = true;
    this.battleLog.setText(
      `You dealt ${playerDamage}. Enemy dealt ${enemyDamage}.`,
    );
    if (this.enemyHp === 0) {
      this.player.wins++;

      LocalStorageService.savePlayer(this.player);

      alert("You win!");

      this.onBack();
    }

    if (this.playerHp === 0) {
      this.player.losses++;

      LocalStorageService.savePlayer(this.player);

      alert("You lose!");

      this.onBack();
    }
  }

  private createDefenseCheckbox(zone: Zone): BaseComponent<"label"> {
    const label = new BaseComponent("label");

    const input = new BaseComponent("input");
    input.node.type = "checkbox";
    input.node.value = zone;

    input.addEventListener("change", () => {
      if (input.node.checked) {
        if (this.selectedDefense.length < 2) {
          this.selectedDefense.push(zone);
        } else {
          input.node.checked = false;
        }
      } else {
        this.selectedDefense = this.selectedDefense.filter(
          (item) => item !== zone,
        );
      }

      this.updateAttackButton();
    });

    label.append(input);
    label.node.append(` ${zone}`);

    return label;
  }
  private updateAttackButton(): void {
    this.attackButton.node.disabled = !(
      this.selectedAttack && this.selectedDefense.length === 2
    );
  }
  render(): HTMLElement {
    this.clear();

    this.playerHpText.setText(`HP: ${this.playerHp}`);
    this.enemyHpText.setText(`HP: ${this.enemyHp}`);

    this.append(
      this.title,

      this.playerImage,
      this.enemyImage,

      this.playerHpText,
      this.enemyHpText,

      this.attackTitle,
      this.attackContainer,

      this.defenseTitle,
      this.defenseContainer,

      this.attackButton,
      this.battleLog,
      this.backButton,
    );

    return this.node;
  }
}
