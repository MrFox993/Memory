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
