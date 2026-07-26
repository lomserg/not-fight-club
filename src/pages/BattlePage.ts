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

  private readonly playerHpText = new BaseComponent("p", ["battle__hp"]);
  private readonly enemyHpText = new BaseComponent("p", ["battle__hp"]);
  private readonly playerHpBar = new BaseComponent("div", ["hp-bar"]);

  private readonly enemyHpBar = new BaseComponent("div", ["hp-bar"]);

  private readonly playerHpFill = new BaseComponent("div", ["hp-fill"]);

  private readonly enemyHpFill = new BaseComponent("div", ["hp-fill"]);
  private readonly attackButton = new Button("Attack");
  private readonly logs: string[] = [];
  private readonly battleLog = new BaseComponent("div", ["battle__log"]);

  private readonly attackContainer = new BaseComponent("div", [
    "battle__zones",
  ]);
  private readonly defenseContainer = new BaseComponent("div", [
    "battle__zones",
  ]);

  private readonly fighters = new BaseComponent("div", ["battle__fighters"]);

  private readonly controls = new BaseComponent("div", ["battle__controls"]);

  private readonly playerCard = new BaseComponent("div", ["battle__card"]);

  private readonly enemyCard = new BaseComponent("div", ["battle__card"]);

  private readonly bottom = new BaseComponent("div", ["battle__bottom"]);

  private readonly logWrapper = new BaseComponent("div", [
    "battle__log-wrapper",
  ]);

  private readonly logTitle = new BaseComponent(
    "h3",
    ["battle__log-title"],
    "Battle Log",
  );
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
    this.playerHpBar.append(this.playerHpFill);
    this.enemyHpBar.append(this.enemyHpFill);
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

    const playerTarget = this.selectedAttack;
    const enemyTarget = enemyAttack[0];

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

    this.playerHpFill.node.style.width = `${this.playerHp}%`;
    this.enemyHpFill.node.style.width = `${this.enemyHp}%`;
    this.updateBattleLog(
      `🗡️ You attacked ${this.enemy.name}'s ${playerTarget} for ${playerDamage} HP`,
    );

    this.updateBattleLog(
      `⚔️ ${this.enemy.name} attacked your ${enemyTarget} for ${enemyDamage} HP`,
    );
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
    if (this.enemyHp <= 0) {
      this.player.wins++;

      LocalStorageService.savePlayer(this.player);

      alert("You win!");

      this.onBack();
      return;
    }

    if (this.playerHp <= 0) {
      this.player.losses++;

      LocalStorageService.savePlayer(this.player);

      alert("You lose!");

      this.onBack();
      return;
    }
  }
  private updateBattleLog(message: string): void {
    this.logs.unshift(message);

    this.battleLog.node.innerHTML = this.logs
      .map((log) => `<div>${log}</div>`)
      .join("");
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

    this.playerCard.clear();
    this.enemyCard.clear();
    this.fighters.clear();
    this.controls.clear();

    this.playerCard.append(
      this.playerImage,
      this.playerHpBar,
      this.playerHpText,
    );

    this.enemyCard.append(this.enemyImage, this.enemyHpBar, this.enemyHpText);

    this.fighters.append(this.playerCard, this.enemyCard);

    this.controls.append(
      this.attackTitle,
      this.attackContainer,
      this.defenseTitle,
      this.defenseContainer,
      this.attackButton,
    );

    this.bottom.clear();
    this.logWrapper.clear();

    this.logWrapper.append(this.logTitle, this.battleLog);

    this.bottom.append(this.controls, this.logWrapper);

    this.append(this.title, this.fighters, this.bottom, this.backButton);

    return this.node;
  }
}
