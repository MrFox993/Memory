import type { GameSettings, Player } from "../types/game";

/** Stores the mutable runtime state of the current memory game. */
export type GameState = {
  /** Player whose turn is currently active. */
  activePlayer: Player;
  /** Current score for each player. */
  scores: Record<Player, number>;
  /** Cards currently flipped during the active turn. */
  flippedCards: HTMLButtonElement[];
  /** Prevents card interaction while animations or checks are running. */
  isBoardLocked: boolean;
  /** Settings of the current game or null before a game starts. */
  currentSettings: GameSettings | null;
  /** Number of pairs that have already been matched. */
  matchedPairs: number;
};

/** Shared mutable state used by the game modules. */
export const gameState: GameState = {
  activePlayer: "blue",
  scores: { blue: 0, orange: 0 },
  flippedCards: [],
  isBoardLocked: false,
  currentSettings: null,
  matchedPairs: 0,
};

/** Resets turn progress, matched pairs and board lock state. */
export function resetGameProgress(): void {
  gameState.flippedCards = [];
  gameState.matchedPairs = 0;
  gameState.isBoardLocked = false;
}

/** Resets both player scores to zero. */
export function resetScores(): void {
  gameState.scores = { blue: 0, orange: 0 };
}

/**
 * Applies new game settings and resets all score and progress values.
 *
 * @param settings - Settings selected for the next game round.
 */
export function resetGameState(settings: GameSettings): void {
  gameState.currentSettings = settings;
  gameState.activePlayer = settings.player;
  resetScores();
  resetGameProgress();
}
