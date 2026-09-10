import {
  BACK_TO_START_BUTTON,
  FINAL_BLUE_SCORE_ELEMENT,
  FINAL_ORANGE_SCORE_ELEMENT,
  GAME_OVER_PANEL,
  GAME_OVER_SCREEN,
  GAME_SCREEN,
  WINNER_CONFETTI_ELEMENT,
  WINNER_IMAGE_ELEMENT,
  WINNER_SCREEN,
  WINNER_STATUS_ELEMENT,
} from "../dom/dom-elements";
import { gameState } from "../game/game-state";
import type { Player } from "../types/game";
import { getPlayerPawnSrc, getPublicAssetSrc } from "../utils/assets";
import { getPlayerLabel } from "../utils/players";

/**
 * Shows one screen and hides another by toggling the hide utility class.
 *
 * @param screenToShow - Screen element that should become visible.
 * @param screenToHide - Screen element that should become hidden.
 */
export function showScreen(
  screenToShow: HTMLElement | null,
  screenToHide: HTMLElement | null,
): void {
  screenToHide?.classList.add("hide");
  screenToShow?.classList.remove("hide");
}

/** Resets all end-screen elements to their initial hidden state. */
export function resetEndScreens(): void {
  GAME_OVER_SCREEN?.classList.add("hide");
  WINNER_SCREEN?.classList.add("hide");
  WINNER_CONFETTI_ELEMENT?.classList.add("hide");
  GAME_OVER_PANEL?.classList.remove("end-screen__panel--exit-up");
}

/**
 * Determines the winner from the current score state.
 *
 * @returns Winning player or draw when both scores are equal.
 */
function getWinner(): Player | "draw" {
  if (gameState.scores.blue === gameState.scores.orange) return "draw";
  return gameState.scores.blue > gameState.scores.orange ? "blue" : "orange";
}

/** Copies the current score values into the game-over screen. */
function updateFinalScoreScreen(): void {
  if (FINAL_BLUE_SCORE_ELEMENT)
    FINAL_BLUE_SCORE_ELEMENT.textContent = String(gameState.scores.blue);
  if (FINAL_ORANGE_SCORE_ELEMENT)
    FINAL_ORANGE_SCORE_ELEMENT.textContent = String(gameState.scores.orange);
}

/** Displays the draw state on the winner screen. */
function showDrawResult(): void {
  WINNER_CONFETTI_ELEMENT?.classList.add("hide");
  if (WINNER_STATUS_ELEMENT) WINNER_STATUS_ELEMENT.textContent = "It's a DRAW";
  if (!WINNER_IMAGE_ELEMENT) return;

  WINNER_IMAGE_ELEMENT.src = getPublicAssetSrc("icons/Scale_Icon.png");
  WINNER_IMAGE_ELEMENT.alt = "Draw scale icon";
}

/**
 * Displays the winning player state on the winner screen.
 *
 * @param winner - Player who won the current round.
 */
function showPlayerWinnerResult(winner: Player): void {
  const winnerLabel = getPlayerLabel(winner);

  WINNER_CONFETTI_ELEMENT?.classList.remove("hide");
  if (WINNER_STATUS_ELEMENT)
    WINNER_STATUS_ELEMENT.textContent = `The Winner is ${winnerLabel}`;
  if (!WINNER_IMAGE_ELEMENT) return;

  WINNER_IMAGE_ELEMENT.src = getPlayerPawnSrc(winner);
  WINNER_IMAGE_ELEMENT.alt = `${winnerLabel} player`;
}

/** Updates winner-screen content based on the current final score. */
function updateWinnerScreen(): void {
  const winner = getWinner();

  if (winner === "draw") {
    showDrawResult();
    return;
  }

  showPlayerWinnerResult(winner);
}

/** Shows the final winner screen and moves focus to its action button. */
export function showWinnerScreen(): void {
  GAME_OVER_SCREEN?.classList.add("hide");
  GAME_OVER_PANEL?.classList.remove("end-screen__panel--exit-up");
  updateWinnerScreen();
  WINNER_SCREEN?.classList.remove("hide");
  BACK_TO_START_BUTTON?.focus();
}

/** Shows the intermediate game-over screen with the final score. */
export function showGameOverScreen(): void {
  updateFinalScoreScreen();
  GAME_SCREEN?.classList.add("hide");
  GAME_OVER_SCREEN?.classList.remove("hide");
}
