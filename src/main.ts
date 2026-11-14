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
import {
  gameState,
  resetGameProgress,
  resetGameState,
} from "./game/game-state";
import { loadScreen } from "./ui/screen-loader";
import type * as SelectionNamespace from "./ui/selection";
import type * as ScreensNamespace from "./ui/screens";
import type * as BoardNamespace from "./game/board";
import type * as GameHeaderNamespace from "./ui/game-header";
import type * as ThemeNamespace from "./ui/theme";
import type * as TimersNamespace from "./game/timers";

type SelectionModule = typeof SelectionNamespace;
type ScreensModule = typeof ScreensNamespace;
type BoardModule = typeof BoardNamespace;
type GameHeaderModule = typeof GameHeaderNamespace;
type ThemeModule = typeof ThemeNamespace;
type TimersModule = typeof TimersNamespace;

let selectionModule: SelectionModule | null = null;
let screensModule: ScreensModule | null = null;
let boardModule: BoardModule | null = null;
let gameHeaderModule: GameHeaderModule | null = null;
let themeModule: ThemeModule | null = null;
let timersModule: TimersModule | null = null;

/** Loads the settings-screen UI module on demand. */
async function getSelectionModule(): Promise<SelectionModule> {
  selectionModule ??= await import("./ui/selection");
  return selectionModule;
}

/** Loads the end-screen UI module on demand. */
async function getScreensModule(): Promise<ScreensModule> {
  screensModule ??= await import("./ui/screens");
  return screensModule;
}

/** Loads the game-board rendering module on demand. */
async function getBoardModule(): Promise<BoardModule> {
  boardModule ??= await import("./game/board");
  return boardModule;
}

/** Loads the game-header UI module on demand. */
async function getGameHeaderModule(): Promise<GameHeaderModule> {
  gameHeaderModule ??= await import("./ui/game-header");
  return gameHeaderModule;
}

/** Loads the theme-color UI module on demand. */
async function getThemeModule(): Promise<ThemeModule> {
  themeModule ??= await import("./ui/theme");
  return themeModule;
}

/** Loads the game-timer module on demand. */
async function getTimersModule(): Promise<TimersModule> {
  timersModule ??= await import("./game/timers");
  return timersModule;
}

/** Clears end-screen timers if the timers module has already been loaded. */
function clearEndScreenTimersIfLoaded(): void {
  timersModule?.clearEndScreenTimers();
}

/** Resets end-screen state if the screens module has already been loaded. */
function resetEndScreensIfLoaded(): void {
  screensModule?.resetEndScreens();
}

/**
 * Toggles screen visibility, loading the screens module only if needed.
 *
 * @param screenToShow - Screen element that should become visible.
 * @param screenToHide - Screen element that should become hidden.
 */
async function showScreenLazy(
  screenToShow: HTMLElement | null,
  screenToHide: HTMLElement | null,
): Promise<void> {
  const { showScreen } = await getScreensModule();
  showScreen(screenToShow, screenToHide);
}

/* One-time initialization flags for lazy-loaded screens. */
let settingsInitialized = false;
let gameInitialized = false;
let winnerCallbackRegistered = false;

/** Binds the game screen listeners (exit button and quit dialog). */
function bindGameListeners(): void {
  exitGameButton()?.addEventListener("click", openQuitGameDialog);
  backToGameButton()?.addEventListener("click", closeQuitGameDialog);
  confirmQuitGameButton()?.addEventListener("click", (): void => {
    void exitGame();
  });
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
  const { getSelectedGameSettings } = await getSelectionModule();
  const settings = getSelectedGameSettings();
  if (!settings) {
    return;
  }

  const [, boardMod, headerMod, themeMod, timersMod, screensMod] =
    await Promise.all([
      ensureGameScreenReady(),
      getBoardModule(),
      getGameHeaderModule(),
      getThemeModule(),
      getTimersModule(),
      getScreensModule(),
    ]);

  if (!winnerCallbackRegistered) {
    screensMod.registerWinnerInitCallback(bindWinnerListeners);
    winnerCallbackRegistered = true;
  }

  timersMod.clearEndScreenTimers();
  screensMod.resetEndScreens();
  resetGameState(settings);
  themeMod.applyThemeColors(settings.themeId);
  boardMod.renderGameBoard(settings);
  headerMod.updateGameHeader();
  screensMod.showScreen(gameScreen(), settingsScreen());
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
async function exitGame(): Promise<void> {
  clearEndScreenTimersIfLoaded();
  resetEndScreensIfLoaded();
  closeQuitGameDialog();
  await showScreenLazy(settingsScreen(), gameScreen());
}

/** Resets the finished game and shows the settings screen again. */
async function backToStart(): Promise<void> {
  clearEndScreenTimersIfLoaded();
  resetEndScreensIfLoaded();
  gameState.currentSettings = null;
  resetGameProgress();
  await showScreenLazy(settingsScreen(), winnerScreen());
}

/** Binds the settings screen listeners (radios + start button). */
async function bindSettingsListeners(): Promise<void> {
  const { updateThemePreview } = await getSelectionModule();
  document
    .querySelectorAll<HTMLInputElement>('input[type="radio"]')
    .forEach((input): void => {
      input.addEventListener("change", (): void => {
        void handleSettingsSelectionChange();
      });
    });
  const themeOptions = document.querySelector(".game-themes-options");
  themeOptions
    ?.querySelectorAll<HTMLInputElement>('input[name="game-themes"]')
    .forEach((input): void => {
      input.parentElement?.addEventListener("pointerenter", (): void => {
        updateThemePreview(input);
      });
    });
  themeOptions?.addEventListener("pointerleave", (): void => {
    updateThemePreview();
  });
  startButton()?.addEventListener("click", (): void => {
    void startGame();
  });
}

/** Lazy-loads the settings screen and binds its listeners on first use. */
async function ensureSettingsScreenReady(): Promise<void> {
  await Promise.all([loadScreen("settings"), getSelectionModule()]);
  if (settingsInitialized) {
    return;
  }
  await bindSettingsListeners();
  await initializeSettingsView();
  settingsInitialized = true;
}

/** Moves from the start screen to the settings screen. */
async function showSettingsScreen(): Promise<void> {
  gameState.currentSettings = null;
  resetGameProgress();
  await ensureSettingsScreenReady();
  await showScreenLazy(settingsScreen(), startScreen());
}

/** Updates all settings-related UI elements after a radio selection changes. */
async function handleSettingsSelectionChange(): Promise<void> {
  const {
    updateSelectionOverview,
    updateThemeOptionSelection,
    updatePlayerOptionSelection,
    updateBoardSizeOptionSelection,
    updateThemePreview,
  } = await getSelectionModule();
  updateSelectionOverview();
  updateThemeOptionSelection();
  updatePlayerOptionSelection();
  updateBoardSizeOptionSelection();
  updateThemePreview();
}

/**
 * Closes the quit dialog when the dialog backdrop is clicked.
 *
 * @param event - Mouse event dispatched by the dialog overlay.
 */
function handleQuitDialogBackdropClick(event: MouseEvent): void {
  if (event.target === quitGameDialog()) {
    closeQuitGameDialog();
  }
}

/**
 * Closes the quit dialog when Escape is pressed while the dialog is visible.
 *
 * @param event - Keyboard event dispatched on the document.
 */
function handleEscapeKey(event: KeyboardEvent): void {
  const dialog = quitGameDialog();
  if (event.key === "Escape" && dialog && !dialog.classList.contains("hide")) {
    closeQuitGameDialog();
  }
}

/** Binds the winner screen listeners after it has been loaded. */
function bindWinnerListeners(): void {
  backToStartButton()?.addEventListener("click", (): void => {
    void backToStart();
  });
}

/** Registers the global listeners that must exist from app start. */
function registerGlobalListeners(): void {
  showSettingsButton()?.addEventListener("click", (): void => {
    void showSettingsScreen();
  });
  document.addEventListener("keydown", handleEscapeKey);
}

/** Initializes the settings UI with its default form state. */
async function initializeSettingsView(): Promise<void> {
  await handleSettingsSelectionChange();
}

registerGlobalListeners();
