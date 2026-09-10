import { DISPLAY_NUMBER_OFFSET } from "../constants/game-config";
import { CARD_TEMPLATE, GAME_BOARD } from "../dom/dom-elements";
import type { CardData, GameSettings, MemoryCardElements } from "../types/game";
import { createCards } from "./card-factory";
import { handleCardClick } from "./game-logic";

function resetGameBoardElement(settings: GameSettings): void {
  if (!GAME_BOARD) return;

  GAME_BOARD.innerHTML = "";
  GAME_BOARD.className = `game-board game-board--${settings.boardSize}`;
  GAME_BOARD.dataset.theme = settings.themeId;
}

function getMemoryCardElements(
  fragment: DocumentFragment,
): MemoryCardElements | null {
  const card = fragment.querySelector<HTMLButtonElement>(".memory-card");
  const backImage = fragment.querySelector<HTMLImageElement>(
    ".memory-card__image--back",
  );
  const frontImage = fragment.querySelector<HTMLImageElement>(
    ".memory-card__image--front",
  );

  if (!card || !backImage || !frontImage) return null;
  return { card, backImage, frontImage };
}

function configureMemoryCard(
  elements: MemoryCardElements,
  cardData: CardData,
): void {
  elements.card.dataset.pairId = String(cardData.pairId);
  elements.card.setAttribute(
    "aria-label",
    `Hidden memory card ${cardData.id + DISPLAY_NUMBER_OFFSET}`,
  );
  elements.backImage.src = cardData.deckImageSrc;
  elements.frontImage.src = cardData.frontImageSrc;
  elements.frontImage.alt = cardData.imageAlt;
}

function appendMemoryCard(cardData: CardData): void {
  if (!GAME_BOARD || !CARD_TEMPLATE) return;

  const fragment = CARD_TEMPLATE.content.cloneNode(true) as DocumentFragment;
  const elements = getMemoryCardElements(fragment);
  if (!elements) return;

  configureMemoryCard(elements, cardData);
  elements.card.addEventListener("click", (): void => {
    handleCardClick(elements.card);
  });
  GAME_BOARD.appendChild(fragment);
}

export function renderGameBoard(settings: GameSettings): void {
  if (!GAME_BOARD || !CARD_TEMPLATE) return;

  resetGameBoardElement(settings);
  createCards(settings).forEach(appendMemoryCard);
}
