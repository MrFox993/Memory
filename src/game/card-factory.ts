import {
  CARDS_PER_PAIR,
  FIRST_IMAGE_NUMBER,
  NEXT_CARD_ID_OFFSET,
  THEME_ASSET_MAP,
} from "../constants/game-config";
import type { CardData, GameSettings, ThemeAssetConfig } from "../types/game";
import { getThemeImageSrc } from "../utils/assets";
import { shuffleCards } from "../utils/shuffle";

/**
 * Creates all available image numbers for the provided theme.
 *
 * @param theme - Asset configuration of the selected theme.
 * @returns Consecutive image numbers available for card fronts.
 */
function createThemeImageNumbers(theme: ThemeAssetConfig): number[] {
  return Array.from(
    { length: theme.imageCount },
    (_, index): number => index + FIRST_IMAGE_NUMBER,
  );
}

/**
 * Repeats theme image numbers until there are enough for all pairs.
 *
 * @param pairCount - Number of card pairs needed for the board.
 * @param theme - Asset configuration of the selected theme.
 * @returns Image numbers with enough entries for the requested pairs.
 */
function createRepeatedImageNumbers(
  pairCount: number,
  theme: ThemeAssetConfig,
): number[] {
  return Array.from(
    { length: Math.ceil(pairCount / theme.imageCount) },
    (): number[] => createThemeImageNumbers(theme),
  ).flat();
}

/**
 * Creates the two matching card data objects for one image.
 *
 * @param imageNumber - Theme image number used for both cards.
 * @param pairId - Shared pair identifier for both generated cards.
 * @param theme - Asset configuration of the selected theme.
 * @param deckImageSrc - Image source used for the card back.
 * @returns Two card data objects with the same pair id.
 */
function createCardPair(
  imageNumber: number,
  pairId: number,
  theme: ThemeAssetConfig,
  deckImageSrc: string,
): CardData[] {
  const frontImageSrc = getThemeImageSrc(theme, String(imageNumber));
  const imageAlt = `Memory card image ${imageNumber}`;

  return [
    {
      id: pairId * CARDS_PER_PAIR,
      pairId,
      frontImageSrc,
      deckImageSrc,
      imageAlt,
    },
    {
      id: pairId * CARDS_PER_PAIR + NEXT_CARD_ID_OFFSET,
      pairId,
      frontImageSrc,
      deckImageSrc,
      imageAlt,
    },
  ];
}

/**
 * Creates a shuffled set of memory cards for the selected settings.
 *
 * @param settings - Settings that define theme and board size.
 * @returns Shuffled card data for rendering the game board.
 */
export function createCards(settings: GameSettings): CardData[] {
  const pairCount = settings.boardSize / CARDS_PER_PAIR;
  const theme = THEME_ASSET_MAP[settings.themeId];
  const deckImageSrc = getThemeImageSrc(theme, "deck");
  const imageNumbers = createRepeatedImageNumbers(pairCount, theme);
  const selectedNumbers = shuffleCards(imageNumbers).slice(0, pairCount);
  const cards = selectedNumbers.flatMap((imageNumber, pairId): CardData[] =>
    createCardPair(imageNumber, pairId, theme, deckImageSrc),
  );

  return shuffleCards(cards);
}
