import type { Player } from "../types/Player";

export class LocalStorageService {
  private static readonly PLAYER_KEY = "player";

  public static savePlayer(player: Player): void {
    localStorage.setItem(this.PLAYER_KEY, JSON.stringify(player));
  }

  public static getPlayer(): Player | null {
    const data = localStorage.getItem(this.PLAYER_KEY);

    if (!data) {
      return null;
    }

    return JSON.parse(data) as Player;
  }

  public static removePlayer(): void {
    localStorage.removeItem(this.PLAYER_KEY);
  }
}
