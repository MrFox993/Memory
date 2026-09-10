/** Represents one of the two playable memory game players. */
export type Player = "blue" | "orange";

/** Stores the user-selected settings for one memory game round. */
export type GameSettings = {
  /** Identifier of the selected visual theme. */
  themeId: string;
  /** Player who starts the round. */
  player: Player;
  /** Total number of cards rendered on the board. */
  boardSize: number;
};

/** Describes one generated memory card and its visual assets. */
export type CardData = {
  /** Unique card identifier inside the generated deck. */
  id: number;
  /** Identifier shared by both cards of the same pair. */
  pairId: number;
  /** Image source shown on the card front. */
  frontImageSrc: string;
  /** Image source shown on the card back. */
  deckImageSrc: string;
  /** Accessible alternative text for the front image. */
  imageAlt: string;
};

/** Defines where theme card images are stored and how they are named. */
export type ThemeAssetConfig = {
  /** Asset subdirectory for the theme. */
  directory: string;
  /** File name prefix used by all card images of the theme. */
  filePrefix: string;
  /** Number of available unique front images for the theme. */
  imageCount: number;
};

/** Defines all CSS custom property values for one game theme. */
export type ThemeColorConfig = {
  /** Primary accent color used by the active theme. */
  accentColor: string;
  /** Text color displayed on accent backgrounds. */
  accentTextColor: string;
  /** Fill color used for accent icons or shapes. */
  accentFillColor: string;
  /** Accent color used for hover states. */
  accentHoveredColor: string;
  /** Text color used for hover states. */
  accentHoveredTextColor: string;
  /** Fill color used for hover states. */
  accentHoveredFillColor: string;
};

/** Connects a radio button group with its selection overview output. */
export type SelectionGroup = {
  /** Name attribute of the radio button group. */
  name: string;
  /** Id of the output element that displays the selected value. */
  outputId: string;
};

/** Collects the DOM elements required to render one memory card. */
export type MemoryCardElements = {
  /** Clickable memory card button. */
  card: HTMLButtonElement;
  /** Image element used for the card back. */
  backImage: HTMLImageElement;
  /** Image element used for the card front. */
  frontImage: HTMLImageElement;
};
