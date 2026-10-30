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
import { loadScreen } from "./screen-loader";

/** One-shot callback invoked after the winner screen has been loaded. */
let winnerInitCallback: (() => void) | null = null;

/** Flag that ensures the winner init callback is invoked at most once. */
let winnerInitialized = false;

/**
 * Registers a callback that is invoked exactly once after the winner
 * screen fragment has been injected into the DOM. Used by `main.ts`
 * to bind listeners (e.g. the back-to-start button) lazily.
 *
 * @param callback - Function to invoke after the first winner load.
 */
export function registerWinnerInitCallback(callback: () => void): void {
  winnerInitCallback = callback;
}

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

/** Lazy-loads the winner screen fragment and runs the init callback once. */
async function ensureWinnerScreenReady(): Promise<void> {
  await loadScreen("winner");
  if (winnerInitialized) {
    return;
  }
  winnerInitCallback?.();
  winnerInitialized = true;
}

/** Shows the final winner screen and moves focus to its action button. */
export async function showWinnerScreen(): Promise<void> {
  await ensureWinnerScreenReady();
  gameOverScreen()?.classList.add("hide");
  gameOverPanel()?.classList.remove("end-screen__panel--exit-up");
  updateWinnerScreen();
  winnerScreen()?.classList.remove("hide");
  backToStartButton()?.focus();
}

/** Shows the intermediate game-over screen with the final score. */
export async function showGameOverScreen(): Promise<void> {
  await loadScreen("gameOver");
  updateFinalScoreScreen();
  gameScreen()?.classList.add("hide");
  gameOverScreen()?.classList.remove("hide");
}
