/**
 * Lazy getters for DOM elements of the individual screens.
 *
 * Screens are injected into the DOM at runtime, so element references must
 * not be cached at module load time. Each getter runs `document.querySelector`
 * freshly on every call.
 */

/* Start screen -------------------------------------------------- */

/**
 * Returns the button that opens the settings screen from the start screen.
 *
 * @returns Settings-navigation button or null when not in the DOM.
 */
export function showSettingsButton(): HTMLButtonElement | null {
  return document.querySelector<HTMLButtonElement>("#showSettingsButton");
}

/**
 * Returns the initial landing screen of the application.
 *
 * @returns Start-screen element or null when not in the DOM.
 */
export function startScreen(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#startScreen");
}

/* Settings screen ----------------------------------------------- */

/**
 * Returns the button that starts a new game with the selected settings.
 *
 * @returns Start-game button or null when not in the DOM.
 */
export function startButton(): HTMLButtonElement | null {
  return document.querySelector<HTMLButtonElement>("#startGameButton");
}

/**
 * Returns the screen that contains all game setting controls.
 *
 * @returns Settings-screen element or null when not in the DOM.
 */
export function settingsScreen(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#settingsScreen");
}

/* Game screen --------------------------------------------------- */

/**
 * Returns the button that opens the quit confirmation dialog during a game.
 *
 * @returns Exit-game button or null when not in the DOM.
 */
export function exitGameButton(): HTMLButtonElement | null {
  return document.querySelector<HTMLButtonElement>("#exitGameButton");
}

/**
 * Returns the screen that contains the active memory game board.
 *
 * @returns Game-screen element or null when not in the DOM.
 */
export function gameScreen(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#gameScreen");
}

/**
 * Returns the container element into which memory cards are rendered.
 *
 * @returns Game-board element or null when not in the DOM.
 */
export function gameBoard(): HTMLDivElement | null {
  return document.querySelector<HTMLDivElement>("#gameBoard");
}

/**
 * Returns the template used to create individual memory card elements.
 *
 * @returns Memory-card template element or null when not in the DOM.
 */
export function cardTemplate(): HTMLTemplateElement | null {
  return document.querySelector<HTMLTemplateElement>("#memoryCardTemplate");
}

/**
 * Returns the accessible live region that announces the current player.
 *
 * @returns Active-player display element or null when not in the DOM.
 */
export function activePlayerDisplay(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#activePlayerDisplay");
}

/**
 * Returns the pawn image that visualizes the currently active player.
 *
 * @returns Active-player pawn image or null when not in the DOM.
 */
export function activePlayerPawn(): HTMLImageElement | null {
  return document.querySelector<HTMLImageElement>("#activePlayerPawn");
}

/**
 * Returns the score value element for the blue player.
 *
 * @returns Blue-score element or null when not in the DOM.
 */
export function blueScoreElement(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#blueScore");
}

/**
 * Returns the score value element for the orange player.
 *
 * @returns Orange-score element or null when not in the DOM.
 */
export function orangeScoreElement(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#orangeScore");
}

/**
 * Returns the score card container for the blue player.
 *
 * @returns Blue-score card element or null when not in the DOM.
 */
export function blueScoreCard(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#blueScoreCard");
}

/**
 * Returns the score card container for the orange player.
 *
 * @returns Orange-score card element or null when not in the DOM.
 */
export function orangeScoreCard(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#orangeScoreCard");
}

/**
 * Returns the dialog overlay used to confirm leaving the current game.
 *
 * @returns Quit-game dialog element or null when not in the DOM.
 */
export function quitGameDialog(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#quitGameDialog");
}

/**
 * Returns the button that closes the quit confirmation dialog.
 *
 * @returns Back-to-game button or null when not in the DOM.
 */
export function backToGameButton(): HTMLButtonElement | null {
  return document.querySelector<HTMLButtonElement>("#backToGameButton");
}

/**
 * Returns the button that confirms leaving the current game.
 *
 * @returns Confirm-quit-game button or null when not in the DOM.
 */
export function confirmQuitGameButton(): HTMLButtonElement | null {
  return document.querySelector<HTMLButtonElement>("#confirmQuitGameButton");
}

/* Game-over screen ---------------------------------------------- */

/**
 * Returns the intermediate end screen that displays the final score.
 *
 * @returns Game-over screen element or null when not in the DOM.
 */
export function gameOverScreen(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#gameOverScreen");
}

/**
 * Returns the animated panel inside the game-over screen.
 *
 * @returns Game-over panel element or null when not in the DOM.
 */
export function gameOverPanel(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#gameOverPanel");
}

/**
 * Returns the final blue score value on the game-over screen.
 *
 * @returns Final blue-score element or null when not in the DOM.
 */
export function finalBlueScoreElement(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#finalBlueScore");
}

/**
 * Returns the final orange score value on the game-over screen.
 *
 * @returns Final orange-score element or null when not in the DOM.
 */
export function finalOrangeScoreElement(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#finalOrangeScore");
}

/* Winner screen ------------------------------------------------- */

/**
 * Returns the final screen that displays the winner or draw result.
 *
 * @returns Winner-screen element or null when not in the DOM.
 */
export function winnerScreen(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#winnerScreen");
}

/**
 * Returns the text element that displays the winner status.
 *
 * @returns Winner-status element or null when not in the DOM.
 */
export function winnerStatusElement(): HTMLElement | null {
  return document.querySelector<HTMLElement>("#winnerStatus");
}

/**
 * Returns the image element that displays the winning player or draw icon.
 *
 * @returns Winner image element or null when not in the DOM.
 */
export function winnerImageElement(): HTMLImageElement | null {
  return document.querySelector<HTMLImageElement>("#winnerImage");
}

/**
 * Returns the decorative confetti image on the winner screen.
 *
 * @returns Winner-confetti image or null when not in the DOM.
 */
export function winnerConfettiElement(): HTMLImageElement | null {
  return document.querySelector<HTMLImageElement>("#winnerConfetti");
}

/**
 * Returns the button that returns from the winner screen to the settings screen.
 *
 * @returns Back-to-start button or null when not in the DOM.
 */
export function backToStartButton(): HTMLButtonElement | null {
  return document.querySelector<HTMLButtonElement>("#backToStartButton");
}
