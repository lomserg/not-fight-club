import type { Zone } from "../types/Zone";

export class BattleEngine {
  static calculateDamage(
    attackZones: Zone[],
    defendZones: Zone[],
    damage: number,
  ): number {
    let totalDamage = 0;

    for (const zone of attackZones) {
      if (!defendZones.includes(zone)) {
        totalDamage += damage;
      }
    }

    return totalDamage;
  }

  static randomZones(count: number): Zone[] {
    const zones: Zone[] = ["head", "body", "legs"];
    const result: Zone[] = [];

    while (result.length < count) {
      const zone = zones[Math.floor(Math.random() * zones.length)];

      if (!result.includes(zone)) {
        result.push(zone);
      }
    }

    return result;
  }
}
