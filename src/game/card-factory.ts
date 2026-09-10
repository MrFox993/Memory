import {
  CARDS_PER_PAIR,
  FIRST_IMAGE_NUMBER,
  NEXT_CARD_ID_OFFSET,
  THEME_ASSET_MAP,
} from "../constants/game-config";
import type { CardData, GameSettings, ThemeAssetConfig } from "../types/game";
import { getThemeImageSrc } from "../utils/assets";
import { shuffleCards } from "../utils/shuffle";

function createThemeImageNumbers(theme: ThemeAssetConfig): number[] {
  return Array.from(
    { length: theme.imageCount },
    (_, index): number => index + FIRST_IMAGE_NUMBER,
  );
}

function createRepeatedImageNumbers(
  pairCount: number,
  theme: ThemeAssetConfig,
): number[] {
  return Array.from(
    { length: Math.ceil(pairCount / theme.imageCount) },
    (): number[] => createThemeImageNumbers(theme),
  ).flat();
}

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
