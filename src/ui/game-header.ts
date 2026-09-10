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

function updateScoreDisplay(): void {
  if (BLUE_SCORE_ELEMENT)
    BLUE_SCORE_ELEMENT.textContent = String(gameState.scores.blue);
  if (ORANGE_SCORE_ELEMENT)
    ORANGE_SCORE_ELEMENT.textContent = String(gameState.scores.orange);
}

function updateActivePlayerDisplay(): void {
  ACTIVE_PLAYER_DISPLAY?.setAttribute(
    "aria-label",
    `Current player: ${gameState.activePlayer}`,
  );
}

function updateActivePlayerPawn(): void {
  if (!ACTIVE_PLAYER_PAWN) return;

  ACTIVE_PLAYER_PAWN.src = getPlayerPawnSrc(gameState.activePlayer);
  ACTIVE_PLAYER_PAWN.alt = `${getPlayerLabel(gameState.activePlayer)} player`;
}

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

export function updateGameHeader(): void {
  updateScoreDisplay();
  updateActivePlayerDisplay();
  updateActivePlayerPawn();
  updateActiveScoreCards();
}
