/**
 * Screen loader: fetches HTML fragments of individual screens on demand
 * and injects them into the main mount point (#app). Each screen is
 * loaded at most once and served from the internal cache afterwards.
 */

/** Identifier of a lazy-loadable screen. */
export type ScreenName =
  | "settings"
  | "game"
  | "gameOver"
  | "winner";

/** Loader function that asynchronously resolves to the raw HTML of a screen. */
type ScreenHtmlLoader = () => Promise<{ default: string }>;

/** Mapping from screen name to the dynamic import of its HTML fragment. */
const SCREEN_HTML_LOADERS: Record<ScreenName, ScreenHtmlLoader> = {
  settings: () => import("../screens/settings-screen.html?raw"),
  game: () => import("../screens/game-screen.html?raw"),
  gameOver: () => import("../screens/game-over-screen.html?raw"),
  winner: () => import("../screens/winner-screen.html?raw"),
};

/** Id of the DOM mount point that screens are injected into. */
const APP_MOUNT_ID = "app";

/** Set of already loaded screens, prevents duplicate injection. */
const loadedScreens = new Set<ScreenName>();

/**
 * Resolves the application mount point from the DOM.
 *
 * @returns The `#app` element.
 * @throws When the mount point does not exist.
 */
function getAppMount(): HTMLElement {
  const mount = document.getElementById(APP_MOUNT_ID);
  if (!mount) {
    throw new Error(`App mount point #${APP_MOUNT_ID} not found.`);
  }
  return mount;
}

/**
 * Appends the given HTML fragment to the end of the mount point.
 *
 * @param html - Raw HTML of the screen fragment.
 */
function injectScreenHtml(html: string): void {
  const mount = getAppMount();
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  mount.append(template.content);
}

/**
 * Loads the HTML fragment of a screen and injects it into the DOM.
 * Subsequent calls for the same screen are no-ops.
 *
 * @param name - Logical name of the screen.
 */
export async function loadScreen(name: ScreenName): Promise<void> {
  if (loadedScreens.has(name)) {
    return;
  }

  const loader = SCREEN_HTML_LOADERS[name];
  const module = await loader();
  injectScreenHtml(module.default);
  loadedScreens.add(name);
}

/**
 * Checks whether a screen has already been injected into the DOM.
 *
 * @param name - Logical name of the screen.
 * @returns True when the screen is already loaded.
 */
export function isScreenLoaded(name: ScreenName): boolean {
  return loadedScreens.has(name);
}
