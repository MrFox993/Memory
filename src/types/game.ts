/** One of the two playable memory game players. */
export type Player = "blue" | "orange";

/** User-selected settings for one memory game round. */
export type GameSettings = {
  themeId: string;
  player: Player;
  boardSize: number;
};

/** Generated memory card and its visual assets. */
export type CardData = {
  id: number;
  pairId: number;
  frontImageSrc: string;
  deckImageSrc: string;
  imageAlt: string;
};

/** Location and naming convention of theme card images. */
export type ThemeAssetConfig = {
  directory: string;
  filePrefix: string;
  imageCount: number;
};

/** CSS custom property values for one game theme. */
export type ThemeColorConfig = {
  accentColor: string;
  accentTextColor: string;
  accentFillColor: string;
  accentHoveredColor: string;
  accentHoveredTextColor: string;
  accentHoveredFillColor: string;
};

/** Radio button group paired with its selection overview output. */
export type SelectionGroup = {
  name: string;
  outputId: string;
};

/** DOM elements required to render one memory card. */
export type MemoryCardElements = {
  card: HTMLButtonElement;
  backImage: HTMLImageElement;
  frontImage: HTMLImageElement;
};