import "./styles/main.scss";

import {
  BACK_TO_GAME_BUTTON,
  BACK_TO_START_BUTTON,
  CONFIRM_QUIT_GAME_BUTTON,
  EXIT_GAME_BUTTON,
  GAME_SCREEN,
  QUIT_GAME_DIALOG,
  SETTINGS_SCREEN,
  SHOW_SETTINGS_BUTTON,
  START_BUTTON,
  START_SCREEN,
  WINNER_SCREEN,
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
import { applyThemeColors } from "./ui/theme";

/** Starts a new game with the currently selected settings. */
function startGame(): void {
  const settings = getSelectedGameSettings();
  if (!settings) return;

  clearEndScreenTimers();
  resetEndScreens();
  resetGameState(settings);
  applyThemeColors(settings.themeId);
  renderGameBoard(settings);
  updateGameHeader();
  showScreen(GAME_SCREEN, SETTINGS_SCREEN);
}

/** Opens the quit confirmation dialog and moves focus into it. */
function openQuitGameDialog(): void {
  QUIT_GAME_DIALOG?.classList.remove("hide");
  BACK_TO_GAME_BUTTON?.focus();
}

/** Closes the quit confirmation dialog and restores focus to the exit button. */
function closeQuitGameDialog(): void {
  QUIT_GAME_DIALOG?.classList.add("hide");
  EXIT_GAME_BUTTON?.focus();
}

/** Leaves the current game and returns to the settings screen. */
function exitGame(): void {
  clearEndScreenTimers();
  resetEndScreens();
  closeQuitGameDialog();
  showScreen(SETTINGS_SCREEN, GAME_SCREEN);
}

/** Resets the finished game and shows the settings screen again. */
function backToStart(): void {
  clearEndScreenTimers();
  resetEndScreens();
  gameState.currentSettings = null;
  resetGameProgress();
  showScreen(SETTINGS_SCREEN, WINNER_SCREEN);
}

/** Moves from the start screen to the settings screen. */
function showSettingsScreen(): void {
  gameState.currentSettings = null;
  resetGameProgress();
  showScreen(SETTINGS_SCREEN, START_SCREEN);
}

/** Updates all settings-related UI elements after a radio selection changes. */
function handleSettingsSelectionChange(): void {
  updateSelectionOverview();
  updateThemeOptionSelection();
  updateThemePreview();
}

/** Closes the quit dialog when the dialog backdrop is clicked. */
function handleQuitDialogBackdropClick(event: MouseEvent): void {
  if (event.target === QUIT_GAME_DIALOG) closeQuitGameDialog();
}

/** Closes the quit dialog when Escape is pressed while the dialog is visible. */
function handleEscapeKey(event: KeyboardEvent): void {
  if (event.key === "Escape" && !QUIT_GAME_DIALOG?.classList.contains("hide"))
    closeQuitGameDialog();
}

/** Registers all DOM event listeners used by the application. */
function registerEventListeners(): void {
  document
    .querySelectorAll<HTMLInputElement>('input[type="radio"]')
    .forEach((input): void => {
      input.addEventListener("change", handleSettingsSelectionChange);
    });

  SHOW_SETTINGS_BUTTON?.addEventListener("click", showSettingsScreen);
  START_BUTTON?.addEventListener("click", startGame);
  EXIT_GAME_BUTTON?.addEventListener("click", openQuitGameDialog);
  BACK_TO_GAME_BUTTON?.addEventListener("click", closeQuitGameDialog);
  CONFIRM_QUIT_GAME_BUTTON?.addEventListener("click", exitGame);
  BACK_TO_START_BUTTON?.addEventListener("click", backToStart);
  QUIT_GAME_DIALOG?.addEventListener("click", handleQuitDialogBackdropClick);
  document.addEventListener("keydown", handleEscapeKey);
}

/** Initializes the settings UI with its default form state. */
function initializeSettingsView(): void {
  updateSelectionOverview();
  updateThemeOptionSelection();
  updateThemePreview();
}

registerEventListeners();
initializeSettingsView();
