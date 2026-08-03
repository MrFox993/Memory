import './styles/main.scss';

type Player = 'blue' | 'orange';

type GameSettings = {
  themeId: string;
  player: Player;
  boardSize: number;
};

type CardData = {
  id: number;
  pairId: number;
  content: string;
};

const selectionGroups = [
  { name: 'game-themes', outputId: 'selectedTheme' },
  { name: 'player-selection', outputId: 'selectedPlayer' },
  { name: 'board-size-selection', outputId: 'selectedBoardSize' },
] as const;

const themePreviewMap: Record<string, string> = {
  codeVibesTheme: 'assets/code_vibes_theme_preview.png',
  gamingTheme: 'assets/gaming_theme_preview.png',
  DAProjectTheme: 'assets/da_projects_theme_preview.png',
  foodsTheme: 'assets/foods_theme_preview.png',
};

const themeCardContentMap: Record<string, string[]> = {
  codeVibesTheme: ['</>', '{}', 'TS', 'JS', 'CSS', 'HTML', 'Git', 'API', 'UX', 'DB', 'CLI', 'Bug', 'DOM', 'JSON', 'Sass', 'Vite'],
  gamingTheme: ['🎮', '🕹️', '👾', '🏆', '⭐', '💎', '🚀', '🛡️', '⚔️', '🧩', '🎲', '🎯', '👑', '🪄', '🔥', '⚡'],
  DAProjectTheme: ['Kanban', 'Scrum', 'Figma', 'GitHub', 'Review', 'Deploy', 'Sprint', 'Wire', 'Brief', 'Team', 'Demo', 'Retro', 'QA', 'Docs', 'MVP', 'Done'],
  foodsTheme: ['🍕', '🍔', '🍟', '🌮', '🍣', '🍩', '🍪', '🍓', '🍉', '🥑', '🥨', '🧁', '🍜', '🥐', '🍎', '🧀'],
};

const boardSizeMap: Record<string, number> = {
  sizeS: 16,
  sizeM: 24,
  sizeL: 32,
};

const playerMap: Record<string, Player> = {
  bluePlayer: 'blue',
  orangePlayer: 'orange',
};

const startButton = document.querySelector<HTMLButtonElement>('#startGameButton');
const exitGameButton = document.querySelector<HTMLButtonElement>('#exitGameButton');
const settingsScreen = document.querySelector<HTMLElement>('#settingsScreen');
const gameScreen = document.querySelector<HTMLElement>('#gameScreen');
const gameBoard = document.querySelector<HTMLDivElement>('#gameBoard');
const cardTemplate = document.querySelector<HTMLTemplateElement>('#memoryCardTemplate');
const activePlayerDisplay = document.querySelector<HTMLElement>('#activePlayerDisplay');
const blueScoreElement = document.querySelector<HTMLElement>('#blueScore');
const orangeScoreElement = document.querySelector<HTMLElement>('#orangeScore');
const blueScoreCard = document.querySelector<HTMLElement>('#blueScoreCard');
const orangeScoreCard = document.querySelector<HTMLElement>('#orangeScoreCard');

let activePlayer: Player = 'blue';
let scores: Record<Player, number> = { blue: 0, orange: 0 };
let flippedCards: HTMLButtonElement[] = [];
let isBoardLocked = false;

function updateSelectionOverview() {
  const allGroupsSelected = selectionGroups.every(({ name, outputId }) => {
    const selected = document.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`);
    const output = document.querySelector<HTMLOutputElement>(`#${outputId}`);

    if (!output) return false;

    output.value = selected?.nextElementSibling?.textContent?.trim() ?? '';
    output.textContent = output.value || output.dataset.placeholder || '';
    output.classList.toggle('selection-overview__item--selected', Boolean(selected));
    return Boolean(selected);
  });

  if (startButton) startButton.disabled = !allGroupsSelected;
}

function updateThemeOptionSelection() {
  document.querySelectorAll<HTMLInputElement>('input[name="game-themes"]').forEach((input) => {
    const parent = input.parentElement;
    if (!parent) return;
    parent.classList.toggle('theme-option--selected', input.checked);
  });
}

function updateThemePreview() {
  const selected = document.querySelector<HTMLInputElement>('input[name="game-themes"]:checked');
  const previewImg = document.getElementById('themePreview') as HTMLImageElement;
  if (!previewImg) return;

  const src = selected ? themePreviewMap[selected.id] : themePreviewMap.codeVibesTheme;
  previewImg.src = src;
  previewImg.alt = selected ? `${selected.nextElementSibling?.textContent?.trim() ?? 'Theme'} preview image` : 'theme preview image';
}

function getSelectedGameSettings(): GameSettings | null {
  const selectedTheme = document.querySelector<HTMLInputElement>('input[name="game-themes"]:checked');
  const selectedPlayer = document.querySelector<HTMLInputElement>('input[name="player-selection"]:checked');
  const selectedBoardSize = document.querySelector<HTMLInputElement>('input[name="board-size-selection"]:checked');

  if (!selectedTheme || !selectedPlayer || !selectedBoardSize) return null;

  return {
    themeId: selectedTheme.id,
    player: playerMap[selectedPlayer.id],
    boardSize: boardSizeMap[selectedBoardSize.id],
  };
}

function shuffleCards<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function createCards(settings: GameSettings): CardData[] {
  const pairCount = settings.boardSize / 2;
  const themeCards = themeCardContentMap[settings.themeId].slice(0, pairCount);
  const cards = themeCards.flatMap((content, pairId) => [
    { id: pairId * 2, pairId, content },
    { id: pairId * 2 + 1, pairId, content },
  ]);

  return shuffleCards(cards);
}

function updateGameHeader() {
  if (blueScoreElement) blueScoreElement.textContent = String(scores.blue);
  if (orangeScoreElement) orangeScoreElement.textContent = String(scores.orange);
  if (activePlayerDisplay) activePlayerDisplay.textContent = `${activePlayer === 'blue' ? 'Blue' : 'Orange'}'s move`;

  blueScoreCard?.classList.toggle('game-score__player--active', activePlayer === 'blue');
  orangeScoreCard?.classList.toggle('game-score__player--active', activePlayer === 'orange');
}

function switchPlayer() {
  activePlayer = activePlayer === 'blue' ? 'orange' : 'blue';
  updateGameHeader();
}

function resetTurn() {
  flippedCards.forEach((card) => card.classList.remove('memory-card--flipped'));
  flippedCards = [];
  isBoardLocked = false;
  switchPlayer();
}

function finishMatch() {
  scores[activePlayer] += 1;
  flippedCards.forEach((card) => {
    card.classList.add('memory-card--matched');
    card.disabled = true;
  });
  flippedCards = [];
  isBoardLocked = false;
  updateGameHeader();
}

function handleCardClick(card: HTMLButtonElement) {
  if (isBoardLocked || card.classList.contains('memory-card--flipped') || card.classList.contains('memory-card--matched')) return;

  card.classList.add('memory-card--flipped');
  flippedCards.push(card);

  if (flippedCards.length !== 2) return;

  const [firstCard, secondCard] = flippedCards;
  const isMatch = firstCard.dataset.pairId === secondCard.dataset.pairId;

  if (isMatch) {
    finishMatch();
    return;
  }

  isBoardLocked = true;
  window.setTimeout(resetTurn, 900);
}

function renderGameBoard(settings: GameSettings) {
  if (!gameBoard || !cardTemplate) return;

  gameBoard.innerHTML = '';
  gameBoard.className = `game-board game-board--${settings.boardSize}`;
  gameBoard.dataset.theme = settings.themeId;

  createCards(settings).forEach((cardData) => {
    const fragment = cardTemplate.content.cloneNode(true) as DocumentFragment;
    const card = fragment.querySelector<HTMLButtonElement>('.memory-card');
    const front = fragment.querySelector<HTMLElement>('.memory-card__face--front');

    if (!card || !front) return;

    card.dataset.pairId = String(cardData.pairId);
    card.setAttribute('aria-label', `Hidden memory card ${cardData.id + 1}`);
    front.textContent = cardData.content;
    gameBoard.appendChild(fragment);

    card.addEventListener('click', () => handleCardClick(card));
  });
}

function showScreen(screenToShow: HTMLElement | null, screenToHide: HTMLElement | null) {
  screenToHide?.classList.add('hide');
  screenToShow?.classList.remove('hide');
}

function startGame() {
  const settings = getSelectedGameSettings();
  if (!settings) return;

  activePlayer = settings.player;
  scores = { blue: 0, orange: 0 };
  flippedCards = [];
  isBoardLocked = false;

  renderGameBoard(settings);
  updateGameHeader();
  showScreen(gameScreen, settingsScreen);
}

function exitGame() {
  showScreen(settingsScreen, gameScreen);
}

document.querySelectorAll<HTMLInputElement>('input[type="radio"]').forEach((input) => {
  input.addEventListener('change', () => {
    updateSelectionOverview();
    updateThemeOptionSelection();
    updateThemePreview();
  });
});

startButton?.addEventListener('click', startGame);
exitGameButton?.addEventListener('click', exitGame);

updateSelectionOverview();
updateThemeOptionSelection();
updateThemePreview();
