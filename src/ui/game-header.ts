import {
  activePlayerDisplay,
  activePlayerPawn,
  blueScoreCard,
  blueScoreElement,
  orangeScoreCard,
  orangeScoreElement,
} from "../dom/dom-elements";
import { gameState } from "../game/game-state";
import { getPlayerPawnSrc } from "../utils/assets";
import { getPlayerLabel } from "../utils/players";

/** Updates the visible score values for both players. */
function updateScoreDisplay(): void {
  const blue = blueScoreElement();
  const orange = orangeScoreElement();
  if (blue) {
    blue.textContent = String(gameState.scores.blue);
  }
  if (orange) {
    orange.textContent = String(gameState.scores.orange);
  }
}

/** Updates the accessible label for the current player display. */
function updateActivePlayerDisplay(): void {
  activePlayerDisplay()?.setAttribute(
    "aria-label",
    `Current player: ${gameState.activePlayer}`,
  );
}

/** Updates the pawn image that represents the active player. */
function updateActivePlayerPawn(): void {
  const pawn = activePlayerPawn();
  if (!pawn) {
    return;
  }

  pawn.src = getPlayerPawnSrc(gameState.activePlayer);
  pawn.alt = `${getPlayerLabel(gameState.activePlayer)} player`;
}

/** Applies the active-player visual state to the score cards. */
function updateActiveScoreCards(): void {
  blueScoreCard()?.classList.toggle(
    "game-score__player--active",
    gameState.activePlayer === "blue",
  );
  orangeScoreCard()?.classList.toggle(
    "game-score__player--active",
    gameState.activePlayer === "orange",
  );
}

/** Refreshes all game header values for the current state. */
export function updateGameHeader(): void {
  updateScoreDisplay();
  updateActivePlayerDisplay();
  updateActivePlayerPawn();
  updateActiveScoreCards();
}
