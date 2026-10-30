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
} from "./game/game-state";
import { loadScreen } from "./ui/screen-loader";

/* ---------------------------------------------------------------- */
/* Lazy module loaders                                                */
/* ---------------------------------------------------------------- */
/*                                                                    */
/* Screen-specific modules are imported dynamically so that the       */
/* initial bundle stays as small as possible. Each loader caches the  */
/* resolved module to prevent repeated network/parse costs.           */
/* ---------------------------------------------------------------- */

import type * as SelectionNamespace from "./ui/selection";
import type * as ScreensNamespace from "./ui/screens";
import type * as BoardNamespace from "./game/board";
import type * as GameHeaderNamespace from "./ui/game-header";
import type * as ThemeNamespace from "./ui/theme";
import type * as TimersNamespace from "./game/timers";
import type * as GameStateNamespace from "./game/game-state";

type SelectionModule = typeof SelectionNamespace;
type ScreensModule = typeof ScreensNamespace;
type BoardModule = typeof BoardNamespace;
type GameHeaderModule = typeof GameHeaderNamespace;
type ThemeModule = typeof ThemeNamespace;
type TimersModule = typeof TimersNamespace;
type GameStateModule = typeof GameStateNamespace;

let selectionModule: SelectionModule | null = null;
let screensModule: ScreensModule | null = null;
let boardModule: BoardModule | null = null;
let gameHeaderModule: GameHeaderModule | null = null;
let themeModule: ThemeModule | null = null;
let timersModule: TimersModule | null = null;
let gameStateModule: GameStateModule | null = null;

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

/** Loads the game-state module on demand (for mutations only). */
async function getGameStateModule(): Promise<GameStateModule> {
  gameStateModule ??= await import("./game/game-state");
  return gameStateModule;
}

/** Clears end-screen timers if the timers module has already been loaded. */
function clearEndScreenTimersIfLoaded(): void {
  timersModule?.clearEndScreenTimers();
}

/** Resets end-screen state if the screens module has already been loaded. */
function resetEndScreensIfLoaded(): void {
  screensModule?.resetEndScreens();
}

/** Toggles screen visibility, loading the screens module only if needed. */
async function showScreenLazy(
  screenToShow: HTMLElement | null,
  screenToHide: HTMLElement | null,
): Promise<void> {
  const { showScreen } = await getScreensModule();
  showScreen(screenToShow, screenToHide);
}

/** Flag that ensures settings-screen listeners are bound at most once. */
let settingsInitialized = false;

/** Flag that ensures game-screen listeners are bound at most once. */
let gameInitialized = false;

/** Flag that ensures the winner init callback is registered at most once. */
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

  const [, boardMod, headerMod, themeMod, timersMod, stateMod, screensMod] =
    await Promise.all([
      ensureGameScreenReady(),
      getBoardModule(),
      getGameHeaderModule(),
      getThemeModule(),
      getTimersModule(),
      getGameStateModule(),
      getScreensModule(),
    ]);

  if (!winnerCallbackRegistered) {
    screensMod.registerWinnerInitCallback(bindWinnerListeners);
    winnerCallbackRegistered = true;
  }

  timersMod.clearEndScreenTimers();
  screensMod.resetEndScreens();
  stateMod.resetGameState(settings);
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
function bindSettingsListeners(): void {
  document
    .querySelectorAll<HTMLInputElement>('input[type="radio"]')
    .forEach((input): void => {
      input.addEventListener("change", (): void => {
        void handleSettingsSelectionChange();
      });
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
  bindSettingsListeners();
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
    updateThemePreview,
  } = await getSelectionModule();
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
