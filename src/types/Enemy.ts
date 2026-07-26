export interface Enemy {
  id: number;
  name: string;
  avatar: string;

  hp: number;
  damage: number;

  attackCount: number;
  defendCount: number;
}
