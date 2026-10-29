/**
 * Lazy getters for DOM elements of the individual screens.
 *
 * Screens are injected into the DOM at runtime, so element references must
 * not be cached at module load time. Each getter runs `document.querySelector`
 * freshly on every call.
 */

/* Start screen -------------------------------------------------- */

/** Button that opens the settings screen from the start screen. */
export function showSettingsButton(): HTMLButtonElement | null {
  return document.querySelector<HTMLButtonElement>("#showSettingsButton");
}

/** Initial landing screen of the application. */
export function startScreen(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#startScreen");
}

/* Settings screen ----------------------------------------------- */

/** Button that starts a new game with the selected settings. */
export function startButton(): HTMLButtonElement | null {
  return document.querySelector<HTMLButtonElement>("#startGameButton");
}

/** Screen that contains all game setting controls. */
export function settingsScreen(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#settingsScreen");
}

/* Game screen --------------------------------------------------- */

/** Button that opens the quit confirmation dialog during a game. */
export function exitGameButton(): HTMLButtonElement | null {
  return document.querySelector<HTMLButtonElement>("#exitGameButton");
}

/** Screen that contains the active memory game board. */
export function gameScreen(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#gameScreen");
}

/** Container element into which memory cards are rendered. */
export function gameBoard(): HTMLDivElement | null {
  return document.querySelector<HTMLDivElement>("#gameBoard");
}

/** Template used to create individual memory card elements. */
export function cardTemplate(): HTMLTemplateElement | null {
  return document.querySelector<HTMLTemplateElement>("#memoryCardTemplate");
}

/** Accessible live region that announces the current player. */
export function activePlayerDisplay(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#activePlayerDisplay");
}

/** Pawn image that visualizes the currently active player. */
export function activePlayerPawn(): HTMLImageElement | null {
  return document.querySelector<HTMLImageElement>("#activePlayerPawn");
}

/** Score value element for the blue player. */
export function blueScoreElement(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#blueScore");
}

/** Score value element for the orange player. */
export function orangeScoreElement(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#orangeScore");
}

/** Score card container for the blue player. */
export function blueScoreCard(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#blueScoreCard");
}

/** Score card container for the orange player. */
export function orangeScoreCard(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#orangeScoreCard");
}

/** Dialog overlay used to confirm leaving the current game. */
export function quitGameDialog(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#quitGameDialog");
}

/** Button that closes the quit confirmation dialog. */
export function backToGameButton(): HTMLButtonElement | null {
  return document.querySelector<HTMLButtonElement>("#backToGameButton");
}

/** Button that confirms leaving the current game. */
export function confirmQuitGameButton(): HTMLButtonElement | null {
  return document.querySelector<HTMLButtonElement>("#confirmQuitGameButton");
}

/* Game-over screen ---------------------------------------------- */

/** Intermediate end screen that displays the final score. */
export function gameOverScreen(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#gameOverScreen");
}

/** Animated panel inside the game-over screen. */
export function gameOverPanel(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#gameOverPanel");
}

/** Final blue score value on the game-over screen. */
export function finalBlueScoreElement(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#finalBlueScore");
}

/** Final orange score value on the game-over screen. */
export function finalOrangeScoreElement(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#finalOrangeScore");
}

/* Winner screen ------------------------------------------------- */

/** Final screen that displays the winner or draw result. */
export function winnerScreen(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#winnerScreen");
}

/** Text element that displays the winner status. */
export function winnerStatusElement(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#winnerStatus");
}

/** Image element that displays the winning player or draw icon. */
export function winnerImageElement(): HTMLImageElement | null {
  return document.querySelector<HTMLImageElement>("#winnerImage");
}

/** Decorative confetti image on the winner screen. */
export function winnerConfettiElement(): HTMLImageElement | null {
  return document.querySelector<HTMLImageElement>("#winnerConfetti");
}

/** Button that returns from the winner screen to the settings screen. */
export function backToStartButton(): HTMLButtonElement | null {
  return document.querySelector<HTMLButtonElement>("#backToStartButton");
}
