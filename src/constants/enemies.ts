import spider from "../assets/enemies/spider.png";
import troll from "../assets/enemies/troll.png";

import type { Enemy } from "../types/Enemy";

export const enemies: Enemy[] = [
  {
    id: 1,
    name: "Spider",
    avatar: spider,
    hp: 100,
    damage: 10,
    attackCount: 2,
    defendCount: 1,
  },
  {
    id: 2,
    name: "Troll",
    avatar: troll,
    hp: 120,
    damage: 12,
    attackCount: 1,
    defendCount: 3,
  },
];
