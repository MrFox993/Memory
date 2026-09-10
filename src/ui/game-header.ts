import {
  ACTIVE_PLAYER_DISPLAY,
  ACTIVE_PLAYER_PAWN,
  BLUE_SCORE_CARD,
  BLUE_SCORE_ELEMENT,
  ORANGE_SCORE_CARD,
  ORANGE_SCORE_ELEMENT,
} from "../dom/dom-elements";
import { gameState } from "../game/game-state";
import { getPlayerPawnSrc } from "../utils/assets";
import { getPlayerLabel } from "../utils/players";

/** Updates the visible score values for both players. */
function updateScoreDisplay(): void {
  if (BLUE_SCORE_ELEMENT)
    BLUE_SCORE_ELEMENT.textContent = String(gameState.scores.blue);
  if (ORANGE_SCORE_ELEMENT)
    ORANGE_SCORE_ELEMENT.textContent = String(gameState.scores.orange);
}

/** Updates the accessible label for the current player display. */
function updateActivePlayerDisplay(): void {
  ACTIVE_PLAYER_DISPLAY?.setAttribute(
    "aria-label",
    `Current player: ${gameState.activePlayer}`,
  );
}

/** Updates the pawn image that represents the active player. */
function updateActivePlayerPawn(): void {
  if (!ACTIVE_PLAYER_PAWN) return;

  ACTIVE_PLAYER_PAWN.src = getPlayerPawnSrc(gameState.activePlayer);
  ACTIVE_PLAYER_PAWN.alt = `${getPlayerLabel(gameState.activePlayer)} player`;
}

/** Applies the active-player visual state to the score cards. */
function updateActiveScoreCards(): void {
  BLUE_SCORE_CARD?.classList.toggle(
    "game-score__player--active",
    gameState.activePlayer === "blue",
  );
  ORANGE_SCORE_CARD?.classList.toggle(
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
