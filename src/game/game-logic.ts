import {
  CARDS_PER_PAIR,
  DISPLAY_NUMBER_OFFSET,
  FINISH_GAME_DELAY_MS,
  GAME_OVER_EXIT_DELAY_MS,
  RESET_TURN_DELAY_MS,
  WINNER_SCREEN_DELAY_MS,
} from "../constants/game-config";
import { GAME_OVER_PANEL } from "../dom/dom-elements";
import { showGameOverScreen, showWinnerScreen } from "../ui/screens";
import { updateGameHeader } from "../ui/game-header";
import { gameState } from "./game-state";
import { setGameTimer } from "./timers";

/** Switches the active player and refreshes the game header. */
function switchPlayer(): void {
  gameState.activePlayer =
    gameState.activePlayer === "blue" ? "orange" : "blue";
  updateGameHeader();
}

/** Flips non-matching cards back and passes the turn to the next player. */
function resetTurn(): void {
  gameState.flippedCards.forEach((card): void => {
    card.classList.remove("memory-card--flipped");
  });
  gameState.flippedCards = [];
  gameState.isBoardLocked = false;
  switchPlayer();
}

/** Locks the board and starts the transition from game to winner screens. */
function finishGame(): void {
  gameState.isBoardLocked = true;
  showGameOverScreen();

  const gameOverExitTimeoutId = window.setTimeout((): void => {
    GAME_OVER_PANEL?.classList.add("end-screen__panel--exit-up");
    setGameTimer(
      "winnerScreen",
      window.setTimeout(showWinnerScreen, WINNER_SCREEN_DELAY_MS),
    );
  }, GAME_OVER_EXIT_DELAY_MS);

  setGameTimer("gameOverExit", gameOverExitTimeoutId);
}

/**
 * Checks whether all pairs on the current board have been matched.
 *
 * @returns True when the current game has no unmatched pairs left.
 */
function isGameComplete(): boolean {
  return Boolean(
    gameState.currentSettings &&
    gameState.matchedPairs ===
      gameState.currentSettings.boardSize / CARDS_PER_PAIR,
  );
}

/** Marks the currently flipped cards as permanently matched. */
function markMatchedCards(): void {
  gameState.flippedCards.forEach((card): void => {
    card.classList.add("memory-card--matched");
    card.disabled = true;
  });
}

/** Awards the active player and either unlocks or finishes the game. */
function finishMatch(): void {
  gameState.scores[gameState.activePlayer] += DISPLAY_NUMBER_OFFSET;
  gameState.matchedPairs += DISPLAY_NUMBER_OFFSET;
  markMatchedCards();
  gameState.flippedCards = [];
  updateGameHeader();

  if (!isGameComplete()) {
    gameState.isBoardLocked = false;
    return;
  }

  gameState.isBoardLocked = true;
  setGameTimer(
    "finishGame",
    window.setTimeout(finishGame, FINISH_GAME_DELAY_MS),
  );
}

/**
 * Checks whether a card may not be selected right now.
 *
 * @param card - Card button that the player tried to select.
 * @returns True when the board is locked or the card is already unavailable.
 */
function isCardUnavailable(card: HTMLButtonElement): boolean {
  return (
    gameState.isBoardLocked ||
    card.classList.contains("memory-card--flipped") ||
    card.classList.contains("memory-card--matched")
  );
}

/** Locks the board and schedules non-matching cards to flip back. */
function handleNonMatchingCards(): void {
  gameState.isBoardLocked = true;
  setGameTimer("resetTurn", window.setTimeout(resetTurn, RESET_TURN_DELAY_MS));
}

/**
 * Handles selection, match checking and turn flow for a clicked memory card.
 *
 * @param card - Card button selected by the player.
 */
export function handleCardClick(card: HTMLButtonElement): void {
  if (isCardUnavailable(card)) return;

  card.classList.add("memory-card--flipped");
  gameState.flippedCards.push(card);

  if (gameState.flippedCards.length !== CARDS_PER_PAIR) return;

  const [firstCard, secondCard] = gameState.flippedCards;
  const isMatch = firstCard.dataset.pairId === secondCard.dataset.pairId;

  if (isMatch) finishMatch();
  else handleNonMatchingCards();
}
