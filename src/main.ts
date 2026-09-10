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

function openQuitGameDialog(): void {
  QUIT_GAME_DIALOG?.classList.remove("hide");
  BACK_TO_GAME_BUTTON?.focus();
}

function closeQuitGameDialog(): void {
  QUIT_GAME_DIALOG?.classList.add("hide");
  EXIT_GAME_BUTTON?.focus();
}

function exitGame(): void {
  clearEndScreenTimers();
  resetEndScreens();
  closeQuitGameDialog();
  showScreen(SETTINGS_SCREEN, GAME_SCREEN);
}

function backToStart(): void {
  clearEndScreenTimers();
  resetEndScreens();
  gameState.currentSettings = null;
  resetGameProgress();
  showScreen(SETTINGS_SCREEN, WINNER_SCREEN);
}

function showSettingsScreen(): void {
  gameState.currentSettings = null;
  resetGameProgress();
  showScreen(SETTINGS_SCREEN, START_SCREEN);
}

document
  .querySelectorAll<HTMLInputElement>('input[type="radio"]')
  .forEach((input): void => {
    input.addEventListener("change", (): void => {
      updateSelectionOverview();
      updateThemeOptionSelection();
      updateThemePreview();
    });
  });

SHOW_SETTINGS_BUTTON?.addEventListener("click", showSettingsScreen);
START_BUTTON?.addEventListener("click", startGame);
EXIT_GAME_BUTTON?.addEventListener("click", openQuitGameDialog);
BACK_TO_GAME_BUTTON?.addEventListener("click", closeQuitGameDialog);
CONFIRM_QUIT_GAME_BUTTON?.addEventListener("click", exitGame);
BACK_TO_START_BUTTON?.addEventListener("click", backToStart);
QUIT_GAME_DIALOG?.addEventListener("click", (event): void => {
  if (event.target === QUIT_GAME_DIALOG) closeQuitGameDialog();
});
document.addEventListener("keydown", (event): void => {
  if (event.key === "Escape" && !QUIT_GAME_DIALOG?.classList.contains("hide"))
    closeQuitGameDialog();
});

updateSelectionOverview();
updateThemeOptionSelection();
updateThemePreview();
