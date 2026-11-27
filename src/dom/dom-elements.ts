/**
 * Lazy getters for DOM elements of the individual screens.
 * Maps logical element keys to their CSS selector strings.
 *
 * Screens are injected into the DOM at runtime, so element references must
 * not be cached at module load time. Each getter runs `document.querySelector`
 * freshly on every call.
 * Grouped by screen:
 * - Start screen
 * - Settings screen
 * - Game screen (board, score cards, quit dialog)
 * - Game-over screen
 * - Winner screen
 */

const domSelectors = {
  // Start screen
  showSettingsButton: "#showSettingsButton",
  startScreen: "#startScreen",

  // Settings screen
  startButton: "#startGameButton",
  settingsScreen: "#settingsScreen",

  // Game screen
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

  // Game-over screen
  gameOverScreen: "#gameOverScreen",
  gameOverPanel: "#gameOverPanel",
  finalBlueScoreElement: "#finalBlueScore",
  finalOrangeScoreElement: "#finalOrangeScore",

  // Winner screen
  winnerScreen: "#winnerScreen",
  winnerStatusElement: "#winnerStatus",
  winnerImageElement: "#winnerImage",
  winnerConfettiElement: "#winnerConfetti",
  backToStartButton: "#backToStartButton",
} as const;

/**
 * Maps every logical element key to its concrete `HTMLElement` subtype.
 *
 * This type is the single source of truth for the element types returned by
 * {@link domElement}. Add a new entry here whenever a new selector is
 * registered in `domSelectors`.
 */
type DomElementMap = {
  // Start screen
  showSettingsButton: HTMLButtonElement;
  startScreen: HTMLElement;

  // Settings screen
  startButton: HTMLButtonElement;
  settingsScreen: HTMLElement;

  // Game screen
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

  // Game-over screen
  gameOverScreen: HTMLElement;
  gameOverPanel: HTMLElement;
  finalBlueScoreElement: HTMLElement;
  finalOrangeScoreElement: HTMLElement;

  // Winner screen
  winnerScreen: HTMLElement;
  winnerStatusElement: HTMLElement;
  winnerImageElement: HTMLImageElement;
  winnerConfettiElement: HTMLImageElement;
  backToStartButton: HTMLButtonElement;
};

/** Union of all valid keys that can be passed to {@link domElement}. */
export type DomElementKey = keyof DomElementMap;

/**
 * Returns the DOM element identified by `key`, or `null` when the element is
 * not yet present in the document.
 *
 * The lookup is performed via `document.querySelector` on every invocation so
 * that callers always receive a fresh reference even after dynamic screen
 * transitions.
 *
 * @param key - The logical identifier of the element as defined in
 *   {@link DomElementMap}.
 * @returns The strongly-typed element for the given `key`, or `null` if no
 *   matching element exists in the current document.
 */
export function domElement<K extends DomElementKey>(
  key: K,
): DomElementMap[K] | null {
  return document.querySelector<DomElementMap[K]>(domSelectors[key]);
}
