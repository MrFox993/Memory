import type { Player } from "../types/game";

/**
 * Converts a player id into a human-readable label.
 *
 * @param player - Player value that should be displayed.
 * @returns Capitalized player label.
 */
export function getPlayerLabel(player: Player): string {
  return player === "blue" ? "Blue" : "Orange";
}
