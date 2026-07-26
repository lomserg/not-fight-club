export const Page = {
  Registration: "registration",
  Home: "home",
  Character: "character",
  Settings: "settings",
  Battle: "battle",
} as const;

export type Page = (typeof Page)[keyof typeof Page];
