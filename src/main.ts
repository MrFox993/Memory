import "./styles/main.scss";

import {
  backToGameButton,
  backToStartButton,
  confirmQuitGameButton,
  exitGameButton,
  gameScreen,
  quitGameDialog,
  settingsScreen,
  showSettingsButton,
  startButton,
  startScreen,
  winnerScreen,
} from "./dom/dom-elements";
import { renderGameBoard } from "./game/board";
import {
  gameState,
  resetGameProgress,
  resetGameState,
} from "./game/game-state";
import { clearEndScreenTimers } from "./game/timers";
import { updateGameHeader } from "./ui/game-header";
import {
  getSelectedGameSettings,
  updateSelectionOverview,
  updateThemeOptionSelection,
  updateThemePreview,
} from "./ui/selection";
import { resetEndScreens, showScreen } from "./ui/screens";
import { loadScreen } from "./ui/screen-loader";
import { applyThemeColors } from "./ui/theme";

/** Flag that ensures settings-screen listeners are bound at most once. */
let settingsInitialized = false;

/** Flag that ensures game-screen listeners are bound at most once. */
let gameInitialized = false;

/** Binds the game screen listeners (exit button and quit dialog). */
function bindGameListeners(): void {
  exitGameButton()?.addEventListener("click", openQuitGameDialog);
  backToGameButton()?.addEventListener("click", closeQuitGameDialog);
  confirmQuitGameButton()?.addEventListener("click", exitGame);
  quitGameDialog()?.addEventListener("click", handleQuitDialogBackdropClick);
}

/** Lazy-loads the game screen and binds its listeners on first use. */
async function ensureGameScreenReady(): Promise<void> {
  await loadScreen("game");
  if (gameInitialized) {
    return;
  }
  bindGameListeners();
  gameInitialized = true;
}

/** Starts a new game with the currently selected settings. */
async function startGame(): Promise<void> {
  const settings = getSelectedGameSettings();
  if (!settings) {
    return;
  }

  await ensureGameScreenReady();
  clearEndScreenTimers();
  resetEndScreens();
  resetGameState(settings);
  applyThemeColors(settings.themeId);
  renderGameBoard(settings);
  updateGameHeader();
  showScreen(gameScreen(), settingsScreen());
}

/** Opens the quit confirmation dialog and moves focus into it. */
function openQuitGameDialog(): void {
  quitGameDialog()?.classList.remove("hide");
  backToGameButton()?.focus();
}

/** Closes the quit confirmation dialog and restores focus to the exit button. */
function closeQuitGameDialog(): void {
  quitGameDialog()?.classList.add("hide");
  exitGameButton()?.focus();
}

/** Leaves the current game and returns to the settings screen. */
function exitGame(): void {
  clearEndScreenTimers();
  resetEndScreens();
  closeQuitGameDialog();
  showScreen(settingsScreen(), gameScreen());
}

/** Resets the finished game and shows the settings screen again. */
function backToStart(): void {
  clearEndScreenTimers();
  resetEndScreens();
  gameState.currentSettings = null;
  resetGameProgress();
  showScreen(settingsScreen(), winnerScreen());
}

/** Binds the settings screen listeners (radios + start button). */
function bindSettingsListeners(): void {
  document
    .querySelectorAll<HTMLInputElement>('input[type="radio"]')
    .forEach((input): void => {
      input.addEventListener("change", handleSettingsSelectionChange);
    });
  startButton()?.addEventListener("click", (): void => {
    void startGame();
  });
}

/** Lazy-loads the settings screen and binds its listeners on first use. */
async function ensureSettingsScreenReady(): Promise<void> {
  await loadScreen("settings");
  if (settingsInitialized) {
    return;
  }
  bindSettingsListeners();
  initializeSettingsView();
  settingsInitialized = true;
}

/** Moves from the start screen to the settings screen. */
async function showSettingsScreen(): Promise<void> {
  gameState.currentSettings = null;
  resetGameProgress();
  await ensureSettingsScreenReady();
  showScreen(settingsScreen(), startScreen());
}

/** Updates all settings-related UI elements after a radio selection changes. */
function handleSettingsSelectionChange(): void {
  updateSelectionOverview();
  updateThemeOptionSelection();
  updateThemePreview();
}

/** Closes the quit dialog when the dialog backdrop is clicked. */
function handleQuitDialogBackdropClick(event: MouseEvent): void {
  if (event.target === quitGameDialog()) {
    closeQuitGameDialog();
  }
}

/** Closes the quit dialog when Escape is pressed while the dialog is visible. */
function handleEscapeKey(event: KeyboardEvent): void {
  const dialog = quitGameDialog();
  if (event.key === "Escape" && dialog && !dialog.classList.contains("hide")) {
    closeQuitGameDialog();
  }
}

/** Registers the global listeners that must exist from app start. */
function registerGlobalListeners(): void {
  showSettingsButton()?.addEventListener("click", (): void => {
    void showSettingsScreen();
  });
  backToStartButton()?.addEventListener("click", backToStart);
  document.addEventListener("keydown", handleEscapeKey);
}

/** Initializes the settings UI with its default form state. */
function initializeSettingsView(): void {
  updateSelectionOverview();
  updateThemeOptionSelection();
  updateThemePreview();
}

registerGlobalListeners();
