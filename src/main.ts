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
  accentFillColor: string;
  accentHoveredColor: string;
  accentHoveredTextColor: string;
  accentHoveredFillColor: string;
};

const SELECTION_GROUPS = [
  { name: "game-themes", outputId: "selectedTheme" },
  { name: "player-selection", outputId: "selectedPlayer" },
  { name: "board-size-selection", outputId: "selectedBoardSize" },
] as const;

const THEME_PREVIEW_MAP: Record<string, string> = {
  codeVibesTheme: "assets/code_vibes_theme_preview.png",
  gamingTheme: "assets/gaming_theme_preview.png",
  DAProjectTheme: "assets/da_projects_theme_preview.png",
  foodsTheme: "assets/foods_theme_preview.png",
};

const THEME_ASSET_MAP: Record<string, ThemeAssetConfig> = {
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

const THEME_COLOR_MAP: Record<string, ThemeColorConfig> = {
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

const BOARD_SIZE_MAP: Record<string, number> = {
  sizeS: 16,
  sizeM: 24,
  sizeL: 36,
};

const PLAYER_MAP: Record<string, Player> = {
  bluePlayer: "blue",
  orangePlayer: "orange",
};

const SHOW_SETTINGS_BUTTON = document.querySelector<HTMLButtonElement>(
  "#showSettingsButton",
);
const START_BUTTON =
  document.querySelector<HTMLButtonElement>("#startGameButton");
const EXIT_GAME_BUTTON =
  document.querySelector<HTMLButtonElement>("#exitGameButton");
const START_SCREEN = document.querySelector<HTMLElement>("#startScreen");
const SETTINGS_SCREEN = document.querySelector<HTMLElement>("#settingsScreen");
const GAME_SCREEN = document.querySelector<HTMLElement>("#gameScreen");
const GAME_BOARD = document.querySelector<HTMLDivElement>("#gameBoard");
const CARD_TEMPLATE = document.querySelector<HTMLTemplateElement>(
  "#memoryCardTemplate",
);
const ACTIVE_PLAYER_DISPLAY = document.querySelector<HTMLElement>(
  "#activePlayerDisplay",
);
const ACTIVE_PLAYER_PAWN =
  document.querySelector<HTMLImageElement>("#activePlayerPawn");
const BLUE_SCORE_ELEMENT = document.querySelector<HTMLElement>("#blueScore");
const ORANGE_SCORE_ELEMENT =
  document.querySelector<HTMLElement>("#orangeScore");
const BLUE_SCORE_CARD = document.querySelector<HTMLElement>("#blueScoreCard");
const ORANGE_SCORE_CARD =
  document.querySelector<HTMLElement>("#orangeScoreCard");
const QUIT_GAME_DIALOG = document.querySelector<HTMLElement>("#quitGameDialog");
const BACK_TO_GAME_BUTTON =
  document.querySelector<HTMLButtonElement>("#backToGameButton");
const CONFIRM_QUIT_GAME_BUTTON = document.querySelector<HTMLButtonElement>(
  "#confirmQuitGameButton",
);
const GAME_OVER_SCREEN = document.querySelector<HTMLElement>("#gameOverScreen");
const GAME_OVER_PANEL = document.querySelector<HTMLElement>("#gameOverPanel");
const WINNER_SCREEN = document.querySelector<HTMLElement>("#winnerScreen");
const FINAL_BLUE_SCORE_ELEMENT =
  document.querySelector<HTMLElement>("#finalBlueScore");
const FINAL_ORANGE_SCORE_ELEMENT =
  document.querySelector<HTMLElement>("#finalOrangeScore");
const WINNER_STATUS_ELEMENT =
  document.querySelector<HTMLElement>("#winnerStatus");
const WINNER_IMAGE_ELEMENT =
  document.querySelector<HTMLImageElement>("#winnerImage");
const WINNER_CONFETTI_ELEMENT =
  document.querySelector<HTMLImageElement>("#winnerConfetti");
const BACK_TO_START_BUTTON =
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

function updateSelectionOverview(): void {
  const allGroupsSelected = SELECTION_GROUPS.every(
    ({ name, outputId }): boolean => {
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
    },
  );

  if (START_BUTTON) START_BUTTON.disabled = !allGroupsSelected;
}

function updateThemeOptionSelection(): void {
  document
    .querySelectorAll<HTMLInputElement>('input[name="game-themes"]')
    .forEach((input): void => {
      const parent = input.parentElement;
      if (!parent) return;
      parent.classList.toggle("theme-option--selected", input.checked);
    });
}

function updateThemePreview(): void {
  const selected = document.querySelector<HTMLInputElement>(
    'input[name="game-themes"]:checked',
  );
  const previewImg = document.getElementById(
    "themePreview",
  ) as HTMLImageElement;
  if (!previewImg) return;

  const src = selected
    ? THEME_PREVIEW_MAP[selected.id]
    : THEME_PREVIEW_MAP.codeVibesTheme;
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
    player: PLAYER_MAP[selectedPlayer.id],
    boardSize: BOARD_SIZE_MAP[selectedBoardSize.id],
  };
}

function shuffleCards<T>(items: T[]): T[] {
  return [...items].sort((): number => Math.random() - 0.5);
}

function getPublicAssetSrc(path: string): string {
  return `${import.meta.env.BASE_URL}${path}`;
}

function getThemeImageSrc(theme: ThemeAssetConfig, imageName: string): string {
  return getPublicAssetSrc(
    `assets/${theme.directory}/${theme.filePrefix}_${imageName}.png`,
  );
}

function createCards(settings: GameSettings): CardData[] {
  const pairCount = settings.boardSize / 2;
  const theme = THEME_ASSET_MAP[settings.themeId];
  const deckImageSrc = getThemeImageSrc(theme, "deck");
  const repeatedImageNumbers = Array.from(
    { length: Math.ceil(pairCount / theme.imageCount) },
    (): number[] =>
      Array.from({ length: theme.imageCount }, (_, index): number => index + 1),
  ).flat();
  const selectedImageNumbers = shuffleCards(repeatedImageNumbers).slice(
    0,
    pairCount,
  );

  const cards = selectedImageNumbers.flatMap(
    (imageNumber, pairId): CardData[] => {
      const frontImageSrc = getThemeImageSrc(theme, String(imageNumber));
      const imageAlt = `Memory card image ${imageNumber}`;

      return [
        { id: pairId * 2, pairId, frontImageSrc, deckImageSrc, imageAlt },
        { id: pairId * 2 + 1, pairId, frontImageSrc, deckImageSrc, imageAlt },
      ];
    },
  );

  return shuffleCards(cards);
}

function getPlayerPawnSrc(player: Player): string {
  return getPublicAssetSrc(`icons/${player}_player_pawn.png`);
}

function getPlayerLabel(player: Player): string {
  return player === "blue" ? "Blue" : "Orange";
}

function getWinner(): Player | "draw" {
  if (scores.blue === scores.orange) return "draw";
  return scores.blue > scores.orange ? "blue" : "orange";
}

function applyThemeColors(themeId: string): void {
  const themeColors =
    THEME_COLOR_MAP[themeId] ?? THEME_COLOR_MAP.codeVibesTheme;

  document.documentElement.style.setProperty(
    "--game-theme-accent-color",
    themeColors.accentColor,
  );
  document.documentElement.style.setProperty(
    "--game-theme-accent-text-color",
    themeColors.accentTextColor,
  );
  document.documentElement.style.setProperty(
    "--game-theme-accent-fill-color",
    themeColors.accentFillColor,
  );
  document.documentElement.style.setProperty(
    "--game-theme-accent-hovered-color",
    themeColors.accentHoveredColor,
  );
  document.documentElement.style.setProperty(
    "--game-theme-accent-hovered-text-color",
    themeColors.accentHoveredTextColor,
  );
  document.documentElement.style.setProperty(
    "--game-theme-accent-hovered-fill-color",
    themeColors.accentHoveredFillColor,
  );
  GAME_SCREEN?.setAttribute("data-theme", themeId);
  GAME_OVER_SCREEN?.setAttribute("data-theme", themeId);
  WINNER_SCREEN?.setAttribute("data-theme", themeId);
}

function clearEndScreenTimers(): void {
  [
    resetTurnTimeoutId,
    finishGameTimeoutId,
    gameOverExitTimeoutId,
    winnerScreenTimeoutId,
  ].forEach((timeoutId): void => {
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
  });

  resetTurnTimeoutId = undefined;
  finishGameTimeoutId = undefined;
  gameOverExitTimeoutId = undefined;
  winnerScreenTimeoutId = undefined;
}

function resetEndScreens(): void {
  GAME_OVER_SCREEN?.classList.add("hide");
  WINNER_SCREEN?.classList.add("hide");
  WINNER_CONFETTI_ELEMENT?.classList.add("hide");
  GAME_OVER_PANEL?.classList.remove("end-screen__panel--exit-up");
}

function updateGameHeader(): void {
  if (BLUE_SCORE_ELEMENT) BLUE_SCORE_ELEMENT.textContent = String(scores.blue);
  if (ORANGE_SCORE_ELEMENT)
    ORANGE_SCORE_ELEMENT.textContent = String(scores.orange);
  if (ACTIVE_PLAYER_DISPLAY)
    ACTIVE_PLAYER_DISPLAY.setAttribute(
      "aria-label",
      `Current player: ${activePlayer}`,
    );
  if (ACTIVE_PLAYER_PAWN) {
    ACTIVE_PLAYER_PAWN.src = getPlayerPawnSrc(activePlayer);
    ACTIVE_PLAYER_PAWN.alt = `${getPlayerLabel(activePlayer)} player`;
  }

  BLUE_SCORE_CARD?.classList.toggle(
    "game-score__player--active",
    activePlayer === "blue",
  );
  ORANGE_SCORE_CARD?.classList.toggle(
    "game-score__player--active",
    activePlayer === "orange",
  );
}

function switchPlayer(): void {
  activePlayer = activePlayer === "blue" ? "orange" : "blue";
  updateGameHeader();
}

function resetTurn(): void {
  flippedCards.forEach((card): void => {
    card.classList.remove("memory-card--flipped");
  });
  flippedCards = [];
  isBoardLocked = false;
  switchPlayer();
}

function updateFinalScoreScreen(): void {
  if (FINAL_BLUE_SCORE_ELEMENT)
    FINAL_BLUE_SCORE_ELEMENT.textContent = String(scores.blue);
  if (FINAL_ORANGE_SCORE_ELEMENT)
    FINAL_ORANGE_SCORE_ELEMENT.textContent = String(scores.orange);
}

function updateWinnerScreen(): void {
  const winner = getWinner();

  if (winner === "draw") {
    WINNER_CONFETTI_ELEMENT?.classList.add("hide");
    if (WINNER_STATUS_ELEMENT)
      WINNER_STATUS_ELEMENT.textContent = "It's a DRAW";
    if (WINNER_IMAGE_ELEMENT) {
      WINNER_IMAGE_ELEMENT.src = getPublicAssetSrc("icons/Scale_Icon.png");
      WINNER_IMAGE_ELEMENT.alt = "Draw scale icon";
    }
    return;
  }

  WINNER_CONFETTI_ELEMENT?.classList.remove("hide");
  const winnerLabel = getPlayerLabel(winner);
  if (WINNER_STATUS_ELEMENT)
    WINNER_STATUS_ELEMENT.textContent = `The Winner is ${winnerLabel}`;
  if (WINNER_IMAGE_ELEMENT) {
    WINNER_IMAGE_ELEMENT.src = getPlayerPawnSrc(winner);
    WINNER_IMAGE_ELEMENT.alt = `${winnerLabel} player`;
  }
}

function showWinnerScreen(): void {
  GAME_OVER_SCREEN?.classList.add("hide");
  GAME_OVER_PANEL?.classList.remove("end-screen__panel--exit-up");
  updateWinnerScreen();
  WINNER_SCREEN?.classList.remove("hide");
  BACK_TO_START_BUTTON?.focus();
}

function showGameOverScreen(): void {
  updateFinalScoreScreen();
  GAME_SCREEN?.classList.add("hide");
  GAME_OVER_SCREEN?.classList.remove("hide");

  gameOverExitTimeoutId = window.setTimeout((): void => {
    GAME_OVER_PANEL?.classList.add("end-screen__panel--exit-up");

    winnerScreenTimeoutId = window.setTimeout(showWinnerScreen, 500);
  }, 1200);
}

function finishGame(): void {
  isBoardLocked = true;
  showGameOverScreen();
}

function finishMatch(): void {
  scores[activePlayer] += 1;
  matchedPairs += 1;
  flippedCards.forEach((card): void => {
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

function handleCardClick(card: HTMLButtonElement): void {
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

function renderGameBoard(settings: GameSettings): void {
  if (!GAME_BOARD || !CARD_TEMPLATE) return;

  GAME_BOARD.innerHTML = "";
  GAME_BOARD.className = `game-board game-board--${settings.boardSize}`;
  GAME_BOARD.dataset.theme = settings.themeId;

  createCards(settings).forEach((cardData): void => {
    const fragment = CARD_TEMPLATE.content.cloneNode(true) as DocumentFragment;
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
    GAME_BOARD.appendChild(fragment);

    card.addEventListener("click", (): void => {
      handleCardClick(card);
    });
  });
}

function showScreen(
  screenToShow: HTMLElement | null,
  screenToHide: HTMLElement | null,
): void {
  screenToHide?.classList.add("hide");
  screenToShow?.classList.remove("hide");
}

function startGame(): void {
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
  showScreen(GAME_SCREEN, SETTINGS_SCREEN);
}

function openQuitGameDialog(): void {
  QUIT_GAME_DIALOG?.classList.remove("hide");
  BACK_TO_GAME_BUTTON?.focus();
}

function closeQuitGameDialog(): void {
  QUIT_GAME_DIALOG?.classList.add("hide");
  EXIT_GAME_BUTTON?.focus();
}

function exitGame(): void {
  clearEndScreenTimers();
  resetEndScreens();
  closeQuitGameDialog();
  showScreen(SETTINGS_SCREEN, GAME_SCREEN);
}

function backToStart(): void {
  clearEndScreenTimers();
  resetEndScreens();
  currentSettings = null;
  flippedCards = [];
  matchedPairs = 0;
  isBoardLocked = false;
  showScreen(SETTINGS_SCREEN, WINNER_SCREEN);
}

function showSettingsScreen(): void {
  currentSettings = null;
  flippedCards = [];
  matchedPairs = 0;
  isBoardLocked = false;
  showScreen(SETTINGS_SCREEN, START_SCREEN);
}

document
  .querySelectorAll<HTMLInputElement>('input[type="radio"]')
  .forEach((input): void => {
    input.addEventListener("change", (): void => {
      updateSelectionOverview();
      updateThemeOptionSelection();
      updateThemePreview();
    });
  });

SHOW_SETTINGS_BUTTON?.addEventListener("click", showSettingsScreen);
START_BUTTON?.addEventListener("click", startGame);
EXIT_GAME_BUTTON?.addEventListener("click", openQuitGameDialog);
BACK_TO_GAME_BUTTON?.addEventListener("click", closeQuitGameDialog);
CONFIRM_QUIT_GAME_BUTTON?.addEventListener("click", exitGame);
BACK_TO_START_BUTTON?.addEventListener("click", backToStart);
QUIT_GAME_DIALOG?.addEventListener("click", (event): void => {
  if (event.target === QUIT_GAME_DIALOG) closeQuitGameDialog();
});
document.addEventListener("keydown", (event): void => {
  if (event.key === "Escape" && !QUIT_GAME_DIALOG?.classList.contains("hide"))
    closeQuitGameDialog();
});

updateSelectionOverview();
updateThemeOptionSelection();
updateThemePreview();
