export type Player = "blue" | "orange";

export type GameSettings = {
  themeId: string;
  player: Player;
  boardSize: number;
};

export type CardData = {
  id: number;
  pairId: number;
  frontImageSrc: string;
  deckImageSrc: string;
  imageAlt: string;
};

export type ThemeAssetConfig = {
  directory: string;
  filePrefix: string;
  imageCount: number;
};

export type ThemeColorConfig = {
  accentColor: string;
  accentTextColor: string;
  accentFillColor: string;
  accentHoveredColor: string;
  accentHoveredTextColor: string;
  accentHoveredFillColor: string;
};

export type SelectionGroup = {
  name: string;
  outputId: string;
};

export type MemoryCardElements = {
  card: HTMLButtonElement;
  backImage: HTMLImageElement;
  frontImage: HTMLImageElement;
};
