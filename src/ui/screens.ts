import {
  backToStartButton,
  finalBlueScoreElement,
  finalOrangeScoreElement,
  gameOverPanel,
  gameOverScreen,
  gameScreen,
  winnerConfettiElement,
  winnerImageElement,
  winnerScreen,
  winnerStatusElement,
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
  gameOverScreen()?.classList.add("hide");
  winnerScreen()?.classList.add("hide");
  winnerConfettiElement()?.classList.add("hide");
  gameOverPanel()?.classList.remove("end-screen__panel--exit-up");
}

/**
 * Determines the winner from the current score state.
 *
 * @returns Winning player or draw when both scores are equal.
 */
function getWinner(): Player | "draw" {
  if (gameState.scores.blue === gameState.scores.orange) {
    return "draw";
  }
  return gameState.scores.blue > gameState.scores.orange ? "blue" : "orange";
}

/** Copies the current score values into the game-over screen. */
function updateFinalScoreScreen(): void {
  const blue = finalBlueScoreElement();
  const orange = finalOrangeScoreElement();
  if (blue) {
    blue.textContent = String(gameState.scores.blue);
  }
  if (orange) {
    orange.textContent = String(gameState.scores.orange);
  }
}

/** Displays the draw state on the winner screen. */
function showDrawResult(): void {
  winnerConfettiElement()?.classList.add("hide");
  const status = winnerStatusElement();
  if (status) {
    status.textContent = "It's a DRAW";
  }
  const image = winnerImageElement();
  if (!image) {
    return;
  }

  image.src = getPublicAssetSrc("icons/Scale_Icon.png");
  image.alt = "Draw scale icon";
}

/**
 * Displays the winning player state on the winner screen.
 *
 * @param winner - Player who won the current round.
 */
function showPlayerWinnerResult(winner: Player): void {
  const winnerLabel = getPlayerLabel(winner);

  winnerConfettiElement()?.classList.remove("hide");
  const status = winnerStatusElement();
  if (status) {
    status.textContent = `The Winner is ${winnerLabel}`;
  }
  const image = winnerImageElement();
  if (!image) {
    return;
  }

  image.src = getPlayerPawnSrc(winner);
  image.alt = `${winnerLabel} player`;
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
  gameOverScreen()?.classList.add("hide");
  gameOverPanel()?.classList.remove("end-screen__panel--exit-up");
  updateWinnerScreen();
  winnerScreen()?.classList.remove("hide");
  backToStartButton()?.focus();
}

/** Shows the intermediate game-over screen with the final score. */
export function showGameOverScreen(): void {
  updateFinalScoreScreen();
  gameScreen()?.classList.add("hide");
  gameOverScreen()?.classList.remove("hide");
}
