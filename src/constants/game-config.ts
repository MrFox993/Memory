import type {
  Player,
  SelectionGroup,
  ThemeAssetConfig,
  ThemeColorConfig,
} from "../types/game";

/** Number of cards that form one matching pair. */
export const CARDS_PER_PAIR = 2;

/** Offset used when converting zero-based values to visible display numbers. */
export const DISPLAY_NUMBER_OFFSET = 1;

/** First available image number in the theme asset folders. */
export const FIRST_IMAGE_NUMBER = 1;

/** Delay before the game-over transition starts after the final match. */
export const FINISH_GAME_DELAY_MS = 500;

/** Delay before the game-over panel exits and the winner screen appears. */
export const GAME_OVER_EXIT_DELAY_MS = 1200;

/** Offset used to generate the second card id of a pair. */
export const NEXT_CARD_ID_OFFSET = 1;

/** Delay before non-matching cards are flipped back. */
export const RESET_TURN_DELAY_MS = 900;

/** Random offset used by the simple shuffle comparator. */
export const SHUFFLE_RANDOM_OFFSET = 0.5;

/** Delay between the game-over panel exit and winner screen display. */
export const WINNER_SCREEN_DELAY_MS = 500;

/** Radio groups that must be selected before the game can start. */
export const SELECTION_GROUPS: readonly SelectionGroup[] = [
  { name: "game-themes", outputId: "selectedTheme" },
  { name: "player-selection", outputId: "selectedPlayer" },
  { name: "board-size-selection", outputId: "selectedBoardSize" },
];

/** Preview image paths keyed by theme input id. */
export const THEME_PREVIEW_MAP: Record<string, string> = {
  codeVibesTheme: "assets/code_vibes_theme_preview.png",
  gamingTheme: "assets/gaming_theme_preview.png",
  DAProjectTheme: "assets/da_projects_theme_preview.png",
  foodsTheme: "assets/foods_theme_preview.png",
};

/** Card asset configuration keyed by theme input id. */
export const THEME_ASSET_MAP: Record<string, ThemeAssetConfig> = {
  codeVibesTheme: {
    directory: "code_vibes_theme",
    filePrefix: "code_vibes_theme",
    imageCount: 18,
  },
  gamingTheme: {
    directory: "games_theme",
    filePrefix: "games_theme",
    imageCount: 18,
  },
  DAProjectTheme: {
    directory: "da_projects_theme",
    filePrefix: "da_projects_theme",
    imageCount: 18,
  },
  foodsTheme: {
    directory: "foods_theme",
    filePrefix: "foods_theme",
    imageCount: 18,
  },
};

/** CSS theme color configuration keyed by theme input id. */
export const THEME_COLOR_MAP: Record<string, ThemeColorConfig> = {
  codeVibesTheme: {
    accentColor: "#4DD5BC",
    accentTextColor: "#ffffff",
    accentFillColor: "#303131",
    accentHoveredColor: "#3ABCA4",
    accentHoveredTextColor: "#ffffff",
    accentHoveredFillColor: "#66CFBCB2",
  },
  gamingTheme: {
    accentColor: "#ED1B76",
    accentTextColor: "#ffffff",
    accentFillColor: "#294F60",
    accentHoveredColor: "#E71C4F",
    accentHoveredTextColor: "#ED1B76",
    accentHoveredFillColor: "#ffffff",
  },
  DAProjectTheme: {
    accentColor: "#BFE5F2",
    accentTextColor: "#1E7594",
    accentFillColor: "#BFE5F2",
    accentHoveredColor: "#1E7594",
    accentHoveredTextColor: "#ffffff",
    accentHoveredFillColor: "#1E7594",
  },
  foodsTheme: {
    accentColor: "#F3832D",
    accentTextColor: "#FFFFFF",
    accentFillColor: "#FFAB3E",
    accentHoveredColor: "#F3832D",
    accentHoveredTextColor: "#ffffff",
    accentHoveredFillColor: "#F3832D",
  },
};

/** Board card counts keyed by board-size input id. */
export const BOARD_SIZE_MAP: Record<string, number> = {
  sizeS: 16,
  sizeM: 24,
  sizeL: 36,
};

/** Player values keyed by player-selection input id. */
export const PLAYER_MAP: Record<string, Player> = {
  bluePlayer: "blue",
  orangePlayer: "orange",
};
