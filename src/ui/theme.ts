import { THEME_COLOR_MAP } from "../constants/game-config";
import {
  GAME_OVER_SCREEN,
  GAME_SCREEN,
  WINNER_SCREEN,
} from "../dom/dom-elements";

function setGameThemeVariable(name: string, value: string): void {
  document.documentElement.style.setProperty(name, value);
}

function updateThemedScreens(themeId: string): void {
  GAME_SCREEN?.setAttribute("data-theme", themeId);
  GAME_OVER_SCREEN?.setAttribute("data-theme", themeId);
  WINNER_SCREEN?.setAttribute("data-theme", themeId);
}

export function applyThemeColors(themeId: string): void {
  const themeColors =
    THEME_COLOR_MAP[themeId] ?? THEME_COLOR_MAP.codeVibesTheme;

  setGameThemeVariable("--game-theme-accent-color", themeColors.accentColor);
  setGameThemeVariable(
    "--game-theme-accent-text-color",
    themeColors.accentTextColor,
  );
  setGameThemeVariable(
    "--game-theme-accent-fill-color",
    themeColors.accentFillColor,
  );
  setGameThemeVariable(
    "--game-theme-accent-hovered-color",
    themeColors.accentHoveredColor,
  );
  setGameThemeVariable(
    "--game-theme-accent-hovered-text-color",
    themeColors.accentHoveredTextColor,
  );
  setGameThemeVariable(
    "--game-theme-accent-hovered-fill-color",
    themeColors.accentHoveredFillColor,
  );
  updateThemedScreens(themeId);
}
