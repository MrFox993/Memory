import type { GameSettings, Player } from "../types/game";

export type GameState = {
  activePlayer: Player;
  scores: Record<Player, number>;
  flippedCards: HTMLButtonElement[];
  isBoardLocked: boolean;
  currentSettings: GameSettings | null;
  matchedPairs: number;
};

export const gameState: GameState = {
  activePlayer: "blue",
  scores: { blue: 0, orange: 0 },
  flippedCards: [],
  isBoardLocked: false,
  currentSettings: null,
  matchedPairs: 0,
};

export function resetGameProgress(): void {
  gameState.flippedCards = [];
  gameState.matchedPairs = 0;
  gameState.isBoardLocked = false;
}

export function resetScores(): void {
  gameState.scores = { blue: 0, orange: 0 };
}

export function resetGameState(settings: GameSettings): void {
  gameState.currentSettings = settings;
  gameState.activePlayer = settings.player;
  resetScores();
  resetGameProgress();
}
