/** Button that opens the settings screen from the start screen. */
export const SHOW_SETTINGS_BUTTON = document.querySelector<HTMLButtonElement>(
  "#showSettingsButton",
);

/** Button that starts a new game with the selected settings. */
export const START_BUTTON =
  document.querySelector<HTMLButtonElement>("#startGameButton");

/** Button that opens the quit confirmation dialog during a game. */
export const EXIT_GAME_BUTTON =
  document.querySelector<HTMLButtonElement>("#exitGameButton");

/** Initial landing screen of the application. */
export const START_SCREEN = document.querySelector<HTMLElement>("#startScreen");

/** Screen that contains all game setting controls. */
export const SETTINGS_SCREEN =
  document.querySelector<HTMLElement>("#settingsScreen");

/** Screen that contains the active memory game board. */
export const GAME_SCREEN = document.querySelector<HTMLElement>("#gameScreen");

/** Container element into which memory cards are rendered. */
export const GAME_BOARD = document.querySelector<HTMLDivElement>("#gameBoard");

/** Template used to create individual memory card elements. */
export const CARD_TEMPLATE = document.querySelector<HTMLTemplateElement>(
  "#memoryCardTemplate",
);

/** Accessible live region that announces the current player. */
export const ACTIVE_PLAYER_DISPLAY = document.querySelector<HTMLElement>(
  "#activePlayerDisplay",
);

/** Pawn image that visualizes the currently active player. */
export const ACTIVE_PLAYER_PAWN =
  document.querySelector<HTMLImageElement>("#activePlayerPawn");

/** Score value element for the blue player. */
export const BLUE_SCORE_ELEMENT =
  document.querySelector<HTMLElement>("#blueScore");

/** Score value element for the orange player. */
export const ORANGE_SCORE_ELEMENT =
  document.querySelector<HTMLElement>("#orangeScore");

/** Score card container for the blue player. */
export const BLUE_SCORE_CARD =
  document.querySelector<HTMLElement>("#blueScoreCard");

/** Score card container for the orange player. */
export const ORANGE_SCORE_CARD =
  document.querySelector<HTMLElement>("#orangeScoreCard");

/** Dialog overlay used to confirm leaving the current game. */
export const QUIT_GAME_DIALOG =
  document.querySelector<HTMLElement>("#quitGameDialog");

/** Button that closes the quit confirmation dialog. */
export const BACK_TO_GAME_BUTTON =
  document.querySelector<HTMLButtonElement>("#backToGameButton");

/** Button that confirms leaving the current game. */
export const CONFIRM_QUIT_GAME_BUTTON =
  document.querySelector<HTMLButtonElement>("#confirmQuitGameButton");

/** Intermediate end screen that displays the final score. */
export const GAME_OVER_SCREEN =
  document.querySelector<HTMLElement>("#gameOverScreen");

/** Animated panel inside the game-over screen. */
export const GAME_OVER_PANEL =
  document.querySelector<HTMLElement>("#gameOverPanel");

/** Final screen that displays the winner or draw result. */
export const WINNER_SCREEN =
  document.querySelector<HTMLElement>("#winnerScreen");

/** Final blue score value on the game-over screen. */
export const FINAL_BLUE_SCORE_ELEMENT =
  document.querySelector<HTMLElement>("#finalBlueScore");

/** Final orange score value on the game-over screen. */
export const FINAL_ORANGE_SCORE_ELEMENT =
  document.querySelector<HTMLElement>("#finalOrangeScore");

/** Text element that displays the winner status. */
export const WINNER_STATUS_ELEMENT =
  document.querySelector<HTMLElement>("#winnerStatus");

/** Image element that displays the winning player or draw icon. */
export const WINNER_IMAGE_ELEMENT =
  document.querySelector<HTMLImageElement>("#winnerImage");

/** Decorative confetti image on the winner screen. */
export const WINNER_CONFETTI_ELEMENT =
  document.querySelector<HTMLImageElement>("#winnerConfetti");

/** Button that returns from the winner screen to the settings screen. */
export const BACK_TO_START_BUTTON =
  document.querySelector<HTMLButtonElement>("#backToStartButton");
