import { DISPLAY_NUMBER_OFFSET } from "../constants/game-config";
import { CARD_TEMPLATE, GAME_BOARD } from "../dom/dom-elements";
import type { CardData, GameSettings, MemoryCardElements } from "../types/game";
import { createCards } from "./card-factory";
import { handleCardClick } from "./game-logic";

/**
 * Clears the game board and applies board-size and theme metadata.
 *
 * @param settings - Settings of the current game round.
 */
function resetGameBoardElement(settings: GameSettings): void {
  if (!GAME_BOARD) return;

  GAME_BOARD.innerHTML = "";
  GAME_BOARD.className = `game-board game-board--${settings.boardSize}`;
  GAME_BOARD.dataset.theme = settings.themeId;
}

/**
 * Reads the required card elements from a cloned template fragment.
 *
 * @param fragment - Cloned memory card template content.
 * @returns Card elements or null if the template is incomplete.
 */
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

/**
 * Applies card data to the DOM elements of one memory card.
 *
 * @param elements - DOM elements of the card template clone.
 * @param cardData - Generated data for the memory card.
 */
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

/**
 * Creates, configures and appends one memory card to the board.
 *
 * @param cardData - Generated data for the memory card.
 */
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

/**
 * Renders a new memory board for the current game settings.
 *
 * @param settings - Settings that define the board size and theme.
 */
export function renderGameBoard(settings: GameSettings): void {
  if (!GAME_BOARD || !CARD_TEMPLATE) return;

  resetGameBoardElement(settings);
  createCards(settings).forEach(appendMemoryCard);
}
