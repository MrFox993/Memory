/**
 * Lazy getters for DOM elements of the individual screens.
 *
 * Screens are injected into the DOM at runtime, so element references must
 * not be cached at module load time. Each getter runs `document.querySelector`
 * freshly on every call.
 */

/**
 * Lazy getters for DOM elements of the individual screens.
 *
 * Screens are injected into the DOM at runtime, so element references must
 * not be cached at module load time. Each getter runs `document.querySelector`
 * freshly on every call.
 */

const domSelectors = {
  showSettingsButton: "#showSettingsButton",
  startScreen: "#startScreen",

  startButton: "#startGameButton",
  settingsScreen: "#settingsScreen",

  exitGameButton: "#exitGameButton",
  gameScreen: "#gameScreen",
  gameBoard: "#gameBoard",
  cardTemplate: "#memoryCardTemplate",
  activePlayerDisplay: "#activePlayerDisplay",
  activePlayerPawn: "#activePlayerPawn",
  blueScoreElement: "#blueScore",
  orangeScoreElement: "#orangeScore",
  blueScoreCard: "#blueScoreCard",
  orangeScoreCard: "#orangeScoreCard",
  quitGameDialog: "#quitGameDialog",
  backToGameButton: "#backToGameButton",
  confirmQuitGameButton: "#confirmQuitGameButton",

  gameOverScreen: "#gameOverScreen",
  gameOverPanel: "#gameOverPanel",
  finalBlueScoreElement: "#finalBlueScore",
  finalOrangeScoreElement: "#finalOrangeScore",

  winnerScreen: "#winnerScreen",
  winnerStatusElement: "#winnerStatus",
  winnerImageElement: "#winnerImage",
  winnerConfettiElement: "#winnerConfetti",
  backToStartButton: "#backToStartButton",
} as const;

type DomElementMap = {
  showSettingsButton: HTMLButtonElement;
  startScreen: HTMLElement;

  startButton: HTMLButtonElement;
  settingsScreen: HTMLElement;

  exitGameButton: HTMLButtonElement;
  gameScreen: HTMLElement;
  gameBoard: HTMLDivElement;
  cardTemplate: HTMLTemplateElement;
  activePlayerDisplay: HTMLElement;
  activePlayerPawn: HTMLImageElement;
  blueScoreElement: HTMLElement;
  orangeScoreElement: HTMLElement;
  blueScoreCard: HTMLElement;
  orangeScoreCard: HTMLElement;
  quitGameDialog: HTMLElement;
  backToGameButton: HTMLButtonElement;
  confirmQuitGameButton: HTMLButtonElement;

  gameOverScreen: HTMLElement;
  gameOverPanel: HTMLElement;
  finalBlueScoreElement: HTMLElement;
  finalOrangeScoreElement: HTMLElement;

  winnerScreen: HTMLElement;
  winnerStatusElement: HTMLElement;
  winnerImageElement: HTMLImageElement;
  winnerConfettiElement: HTMLImageElement;
  backToStartButton: HTMLButtonElement;
};

export type DomElementKey = keyof DomElementMap;

export function domElement<K extends DomElementKey>(
  key: K,
): DomElementMap[K] | null {
  return document.querySelector<DomElementMap[K]>(domSelectors[key]);
}

/* Game screen --------------------------------------------------- */


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
