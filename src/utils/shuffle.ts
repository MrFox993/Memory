import { SHUFFLE_RANDOM_OFFSET } from "../constants/game-config";

/**
 * Returns a shuffled copy of the provided items.
 *
 * @param items - Items that should be shuffled.
 * @returns New array with the same items in randomized order.
 */
export function shuffleCards<T>(items: T[]): T[] {
  return [...items].sort((): number => Math.random() - SHUFFLE_RANDOM_OFFSET);
}
