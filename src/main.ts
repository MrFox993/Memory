import "./styles/main.scss";

type Player = "blue" | "orange";

type GameSettings = {
  themeId: string;
  player: Player;
  boardSize: number;
};

type CardData = {
  id: number;
  pairId: number;
  frontImageSrc: string;
  deckImageSrc: string;
  imageAlt: string;
};

type ThemeAssetConfig = {
  directory: string;
  filePrefix: string;
  imageCount: number;
};

type ThemeColorConfig = {
  accentColor: string;
  accentTextColor: string;
};

const selectionGroups = [
  { name: "game-themes", outputId: "selectedTheme" },
  { name: "player-selection", outputId: "selectedPlayer" },
  { name: "board-size-selection", outputId: "selectedBoardSize" },
] as const;

const themePreviewMap: Record<string, string> = {
  codeVibesTheme: "assets/code_vibes_theme_preview.png",
  gamingTheme: "assets/gaming_theme_preview.png",
  DAProjectTheme: "assets/da_projects_theme_preview.png",
  foodsTheme: "assets/foods_theme_preview.png",
};

const themeAssetMap: Record<string, ThemeAssetConfig> = {
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

const themeColorMap: Record<string, ThemeColorConfig> = {
  codeVibesTheme: {
    accentColor: "#4DD5BC",
    accentTextColor: "#286F62",
  },
  gamingTheme: {
    accentColor: "#ED1B76",
    accentTextColor: "#ED1B76",
  },
  DAProjectTheme: {
    accentColor: "#1E7594",
    accentTextColor: "#1E7594",
  },
  foodsTheme: {
    accentColor: "#F3832D",
    accentTextColor: "#FFAB3E",
  },
};

const boardSizeMap: Record<string, number> = {
  sizeS: 16,
  sizeM: 24,
  sizeL: 32,
};

const playerMap: Record<string, Player> = {
  bluePlayer: "blue",
  orangePlayer: "orange",
};

const showSettingsButton = document.querySelector<HTMLButtonElement>(
  "#showSettingsButton",
);
const startButton =
  document.querySelector<HTMLButtonElement>("#startGameButton");
const exitGameButton =
  document.querySelector<HTMLButtonElement>("#exitGameButton");
const startScreen = document.querySelector<HTMLElement>("#startScreen");
const settingsScreen = document.querySelector<HTMLElement>("#settingsScreen");
const gameScreen = document.querySelector<HTMLElement>("#gameScreen");
const gameBoard = document.querySelector<HTMLDivElement>("#gameBoard");
const cardTemplate = document.querySelector<HTMLTemplateElement>(
  "#memoryCardTemplate",
);
const activePlayerDisplay = document.querySelector<HTMLElement>(
  "#activePlayerDisplay",
);
const activePlayerPawn =
  document.querySelector<HTMLImageElement>("#activePlayerPawn");
const blueScoreElement = document.querySelector<HTMLElement>("#blueScore");
const orangeScoreElement = document.querySelector<HTMLElement>("#orangeScore");
const blueScoreCard = document.querySelector<HTMLElement>("#blueScoreCard");
const orangeScoreCard = document.querySelector<HTMLElement>("#orangeScoreCard");
const quitGameDialog = document.querySelector<HTMLElement>("#quitGameDialog");
const backToGameButton =
  document.querySelector<HTMLButtonElement>("#backToGameButton");
const confirmQuitGameButton = document.querySelector<HTMLButtonElement>(
  "#confirmQuitGameButton",
);
const gameOverScreen = document.querySelector<HTMLElement>("#gameOverScreen");
const gameOverPanel = document.querySelector<HTMLElement>("#gameOverPanel");
const winnerScreen = document.querySelector<HTMLElement>("#winnerScreen");
const finalBlueScoreElement =
  document.querySelector<HTMLElement>("#finalBlueScore");
const finalOrangeScoreElement =
  document.querySelector<HTMLElement>("#finalOrangeScore");
const winnerStatusElement =
  document.querySelector<HTMLElement>("#winnerStatus");
const winnerImageElement =
  document.querySelector<HTMLImageElement>("#winnerImage");
const winnerConfettiElement =
  document.querySelector<HTMLImageElement>("#winnerConfetti");
const backToStartButton =
  document.querySelector<HTMLButtonElement>("#backToStartButton");

let activePlayer: Player = "blue";
let scores: Record<Player, number> = { blue: 0, orange: 0 };
let flippedCards: HTMLButtonElement[] = [];
let isBoardLocked = false;
let currentSettings: GameSettings | null = null;
let matchedPairs = 0;
let resetTurnTimeoutId: number | undefined;
let finishGameTimeoutId: number | undefined;
let gameOverExitTimeoutId: number | undefined;
let winnerScreenTimeoutId: number | undefined;

function updateSelectionOverview() {
  const allGroupsSelected = selectionGroups.every(({ name, outputId }) => {
    const selected = document.querySelector<HTMLInputElement>(
      `input[name="${name}"]:checked`,
    );
    const output = document.querySelector<HTMLOutputElement>(`#${outputId}`);

    if (!output) return false;

    output.value = selected?.nextElementSibling?.textContent?.trim() ?? "";
    output.textContent = output.value || output.dataset.placeholder || "";
    output.classList.toggle(
      "selection-overview__item--selected",
      Boolean(selected),
    );
    return Boolean(selected);
  });

  if (startButton) startButton.disabled = !allGroupsSelected;
}

function updateThemeOptionSelection() {
  document
    .querySelectorAll<HTMLInputElement>('input[name="game-themes"]')
    .forEach((input) => {
      const parent = input.parentElement;
      if (!parent) return;
      parent.classList.toggle("theme-option--selected", input.checked);
    });
}

function updateThemePreview() {
  const selected = document.querySelector<HTMLInputElement>(
    'input[name="game-themes"]:checked',
  );
  const previewImg = document.getElementById(
    "themePreview",
  ) as HTMLImageElement;
  if (!previewImg) return;

  const src = selected
    ? themePreviewMap[selected.id]
    : themePreviewMap.codeVibesTheme;
  previewImg.src = src;
  previewImg.alt = selected
    ? `${selected.nextElementSibling?.textContent?.trim() ?? "Theme"} preview image`
    : "theme preview image";
}

function getSelectedGameSettings(): GameSettings | null {
  const selectedTheme = document.querySelector<HTMLInputElement>(
    'input[name="game-themes"]:checked',
  );
  const selectedPlayer = document.querySelector<HTMLInputElement>(
    'input[name="player-selection"]:checked',
  );
  const selectedBoardSize = document.querySelector<HTMLInputElement>(
    'input[name="board-size-selection"]:checked',
  );

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

function getPublicAssetSrc(path: string) {
  return `${import.meta.env.BASE_URL}${path}`;
}

function getThemeImageSrc(theme: ThemeAssetConfig, imageName: string) {
  return getPublicAssetSrc(
    `assets/${theme.directory}/${theme.filePrefix}_${imageName}.png`,
  );
}

function createCards(settings: GameSettings): CardData[] {
  const pairCount = settings.boardSize / 2;
  const theme = themeAssetMap[settings.themeId];
  const deckImageSrc = getThemeImageSrc(theme, "deck");
  const selectedImageNumbers = shuffleCards(
    Array.from({ length: theme.imageCount }, (_, index) => index + 1),
  ).slice(0, pairCount);

  const cards = selectedImageNumbers.flatMap((imageNumber, pairId) => {
    const frontImageSrc = getThemeImageSrc(theme, String(imageNumber));
    const imageAlt = `Memory card image ${imageNumber}`;

    return [
      { id: pairId * 2, pairId, frontImageSrc, deckImageSrc, imageAlt },
      { id: pairId * 2 + 1, pairId, frontImageSrc, deckImageSrc, imageAlt },
    ];
  });

  return shuffleCards(cards);
}

function getPlayerPawnSrc(player: Player) {
  return getPublicAssetSrc(`icons/${player}_player_pawn.png`);
}

function getPlayerLabel(player: Player) {
  return player === "blue" ? "Blue" : "Orange";
}

function getWinner(): Player | "draw" {
  if (scores.blue === scores.orange) return "draw";
  return scores.blue > scores.orange ? "blue" : "orange";
}

function applyThemeColors(themeId: string) {
  const themeColors = themeColorMap[themeId] ?? themeColorMap.codeVibesTheme;

  document.documentElement.style.setProperty(
    "--game-theme-accent-color",
    themeColors.accentColor,
  );
  document.documentElement.style.setProperty(
    "--game-theme-accent-text-color",
    themeColors.accentTextColor,
  );
  gameScreen?.setAttribute("data-theme", themeId);
  gameOverScreen?.setAttribute("data-theme", themeId);
  winnerScreen?.setAttribute("data-theme", themeId);
}

function clearEndScreenTimers() {
  [
    resetTurnTimeoutId,
    finishGameTimeoutId,
    gameOverExitTimeoutId,
    winnerScreenTimeoutId,
  ].forEach((timeoutId) => {
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
  });

  resetTurnTimeoutId = undefined;
  finishGameTimeoutId = undefined;
  gameOverExitTimeoutId = undefined;
  winnerScreenTimeoutId = undefined;
}

function resetEndScreens() {
  gameOverScreen?.classList.add("hide");
  winnerScreen?.classList.add("hide");
  winnerConfettiElement?.classList.add("hide");
  gameOverPanel?.classList.remove("end-screen__panel--exit-up");
}

function updateGameHeader() {
  if (blueScoreElement) blueScoreElement.textContent = String(scores.blue);
  if (orangeScoreElement)
    orangeScoreElement.textContent = String(scores.orange);
  if (activePlayerDisplay)
    activePlayerDisplay.setAttribute(
      "aria-label",
      `Current player: ${activePlayer}`,
    );
  if (activePlayerPawn) {
    activePlayerPawn.src = getPlayerPawnSrc(activePlayer);
    activePlayerPawn.alt = `${getPlayerLabel(activePlayer)} player`;
  }

  blueScoreCard?.classList.toggle(
    "game-score__player--active",
    activePlayer === "blue",
  );
  orangeScoreCard?.classList.toggle(
    "game-score__player--active",
    activePlayer === "orange",
  );
}

function switchPlayer() {
  activePlayer = activePlayer === "blue" ? "orange" : "blue";
  updateGameHeader();
}

function resetTurn() {
  flippedCards.forEach((card) => card.classList.remove("memory-card--flipped"));
  flippedCards = [];
  isBoardLocked = false;
  switchPlayer();
}

function updateFinalScoreScreen() {
  if (finalBlueScoreElement)
    finalBlueScoreElement.textContent = String(scores.blue);
  if (finalOrangeScoreElement)
    finalOrangeScoreElement.textContent = String(scores.orange);
}

function updateWinnerScreen() {
  const winner = getWinner();

  if (winner === "draw") {
    winnerConfettiElement?.classList.add("hide");
    if (winnerStatusElement) winnerStatusElement.textContent = "It's a DRAW";
    if (winnerImageElement) {
      winnerImageElement.src = getPublicAssetSrc("icons/Scale_Icon.png");
      winnerImageElement.alt = "Draw scale icon";
    }
    return;
  }

  winnerConfettiElement?.classList.remove("hide");
  const winnerLabel = getPlayerLabel(winner);
  if (winnerStatusElement)
    winnerStatusElement.textContent = `The Winner is ${winnerLabel}`;
  if (winnerImageElement) {
    winnerImageElement.src = getPlayerPawnSrc(winner);
    winnerImageElement.alt = `${winnerLabel} player`;
  }
}

function showWinnerScreen() {
  gameOverScreen?.classList.add("hide");
  gameOverPanel?.classList.remove("end-screen__panel--exit-up");
  updateWinnerScreen();
  winnerScreen?.classList.remove("hide");
  backToStartButton?.focus();
}

function showGameOverScreen() {
  updateFinalScoreScreen();
  gameScreen?.classList.add("hide");
  gameOverScreen?.classList.remove("hide");

  gameOverExitTimeoutId = window.setTimeout(() => {
    gameOverPanel?.classList.add("end-screen__panel--exit-up");

    winnerScreenTimeoutId = window.setTimeout(showWinnerScreen, 500);
  }, 1200);
}

function finishGame() {
  isBoardLocked = true;
  showGameOverScreen();
}

function finishMatch() {
  scores[activePlayer] += 1;
  matchedPairs += 1;
  flippedCards.forEach((card) => {
    card.classList.add("memory-card--matched");
    card.disabled = true;
  });
  flippedCards = [];
  updateGameHeader();

  if (currentSettings && matchedPairs === currentSettings.boardSize / 2) {
    isBoardLocked = true;
    finishGameTimeoutId = window.setTimeout(finishGame, 500);
    return;
  }

  isBoardLocked = false;
}

function handleCardClick(card: HTMLButtonElement) {
  if (
    isBoardLocked ||
    card.classList.contains("memory-card--flipped") ||
    card.classList.contains("memory-card--matched")
  )
    return;

  card.classList.add("memory-card--flipped");
  flippedCards.push(card);

  if (flippedCards.length !== 2) return;

  const [firstCard, secondCard] = flippedCards;
  const isMatch = firstCard.dataset.pairId === secondCard.dataset.pairId;

  if (isMatch) {
    finishMatch();
    return;
  }

  isBoardLocked = true;
  resetTurnTimeoutId = window.setTimeout(resetTurn, 900);
}

function renderGameBoard(settings: GameSettings) {
  if (!gameBoard || !cardTemplate) return;

  gameBoard.innerHTML = "";
  gameBoard.className = `game-board game-board--${settings.boardSize}`;
  gameBoard.dataset.theme = settings.themeId;

  createCards(settings).forEach((cardData) => {
    const fragment = cardTemplate.content.cloneNode(true) as DocumentFragment;
    const card = fragment.querySelector<HTMLButtonElement>(".memory-card");
    const backImage = fragment.querySelector<HTMLImageElement>(
      ".memory-card__image--back",
    );
    const frontImage = fragment.querySelector<HTMLImageElement>(
      ".memory-card__image--front",
    );

    if (!card || !backImage || !frontImage) return;

    card.dataset.pairId = String(cardData.pairId);
    card.setAttribute("aria-label", `Hidden memory card ${cardData.id + 1}`);
    backImage.src = cardData.deckImageSrc;
    frontImage.src = cardData.frontImageSrc;
    frontImage.alt = cardData.imageAlt;
    gameBoard.appendChild(fragment);

    card.addEventListener("click", () => handleCardClick(card));
  });
}

function showScreen(
  screenToShow: HTMLElement | null,
  screenToHide: HTMLElement | null,
) {
  screenToHide?.classList.add("hide");
  screenToShow?.classList.remove("hide");
}

function startGame() {
  const settings = getSelectedGameSettings();
  if (!settings) return;

  clearEndScreenTimers();
  resetEndScreens();
  currentSettings = settings;
  activePlayer = settings.player;
  scores = { blue: 0, orange: 0 };
  flippedCards = [];
  matchedPairs = 0;
  isBoardLocked = false;

  applyThemeColors(settings.themeId);
  renderGameBoard(settings);
  updateGameHeader();
  showScreen(gameScreen, settingsScreen);
}

function openQuitGameDialog() {
  quitGameDialog?.classList.remove("hide");
  backToGameButton?.focus();
}

function closeQuitGameDialog() {
  quitGameDialog?.classList.add("hide");
  exitGameButton?.focus();
}

function exitGame() {
  clearEndScreenTimers();
  resetEndScreens();
  closeQuitGameDialog();
  showScreen(settingsScreen, gameScreen);
}

function backToStart() {
  clearEndScreenTimers();
  resetEndScreens();
  currentSettings = null;
  flippedCards = [];
  matchedPairs = 0;
  isBoardLocked = false;
  showScreen(settingsScreen, winnerScreen);
}

function showSettingsScreen() {
  currentSettings = null;
  flippedCards = [];
  matchedPairs = 0;
  isBoardLocked = false;
  showScreen(settingsScreen, startScreen);
}

document
  .querySelectorAll<HTMLInputElement>('input[type="radio"]')
  .forEach((input) => {
    input.addEventListener("change", () => {
      updateSelectionOverview();
      updateThemeOptionSelection();
      updateThemePreview();
    });
  });

showSettingsButton?.addEventListener("click", showSettingsScreen);
startButton?.addEventListener("click", startGame);
exitGameButton?.addEventListener("click", openQuitGameDialog);
backToGameButton?.addEventListener("click", closeQuitGameDialog);
confirmQuitGameButton?.addEventListener("click", exitGame);
backToStartButton?.addEventListener("click", backToStart);
quitGameDialog?.addEventListener("click", (event) => {
  if (event.target === quitGameDialog) closeQuitGameDialog();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !quitGameDialog?.classList.contains("hide"))
    closeQuitGameDialog();
});

updateSelectionOverview();
updateThemeOptionSelection();
updateThemePreview();
