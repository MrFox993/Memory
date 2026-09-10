import { SHUFFLE_RANDOM_OFFSET } from "../constants/game-config";

export function shuffleCards<T>(items: T[]): T[] {
  return [...items].sort((): number => Math.random() - SHUFFLE_RANDOM_OFFSET);
}
