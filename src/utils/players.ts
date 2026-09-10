import type { Player } from "../types/game";

export function getPlayerLabel(player: Player): string {
  return player === "blue" ? "Blue" : "Orange";
}
