import { Router } from "./Router";
import { RegistrationPage } from "../pages/RegistrationPage";
import { HomePage } from "../pages/HomePage";
import { LocalStorageService } from "../storage/LocalStorage";
import type { Player } from "../types/Player";
import { BattlePage } from "../pages/BattlePage";
import { CharacterPage } from "../pages/CharacterPage";
import { SettingsPage } from "../pages/SettingsPage";

export class App {
  private router: Router;

  constructor() {
    const root = document.getElementById("app");

    if (!root) {
      throw new Error("Root element not found");
    }

    this.router = new Router(root);

    this.init();
  }

  private openSettings(player: Player): void {
    this.router.navigate(
      new SettingsPage(
        player,
        (name: string) => {
          player.name = name;

          LocalStorageService.savePlayer(player);

          this.openHome(player);
        },
        () => {
          this.openHome(player);
        },
      ),
    );
  }
  private openBattle(player: Player): void {
    this.router.navigate(
      new BattlePage(player, () => {
        this.openHome(player);
      }),
    );
  }

  private openHome(player: Player): void {
    this.router.navigate(
      new HomePage(
        player,
        () => this.openBattle(player),
        () => this.openCharacter(player),
        () => this.openSettings(player),
      ),
    );
  }
  private openCharacter(player: Player): void {
    this.router.navigate(
      new CharacterPage(player, () => {
        this.openHome(player);
      }),
    );
  }

  private init(): void {
    const player = LocalStorageService.getPlayer();
    if (player) {
      this.openHome(player);
      return;
    }

    this.router.navigate(
      new RegistrationPage((name) => {
        const player: Player = {
          name,
          avatar: "avatar-1",
          wins: 0,
          losses: 0,
        };

        LocalStorageService.savePlayer(player);
        this.openHome(player);
      }),
    );
  }
}
