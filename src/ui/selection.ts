import {
  BOARD_SIZE_MAP,
  PLAYER_MAP,
  SELECTION_GROUPS,
  THEME_PREVIEW_MAP,
} from "../constants/game-config";
import { START_BUTTON } from "../dom/dom-elements";
import type { GameSettings, SelectionGroup } from "../types/game";

function getSelectedRadioInput(name: string): HTMLInputElement | null {
  return document.querySelector<HTMLInputElement>(
    `input[name="${name}"]:checked`,
  );
}

function updateSelectionOutput(
  output: HTMLOutputElement,
  selected: HTMLInputElement | null,
): void {
  output.value = selected?.nextElementSibling?.textContent?.trim() ?? "";
  output.textContent = output.value || output.dataset.placeholder || "";
  output.classList.toggle(
    "selection-overview__item--selected",
    Boolean(selected),
  );
}

function updateSelectionGroup({ name, outputId }: SelectionGroup): boolean {
  const selected = getSelectedRadioInput(name);
  const output = document.querySelector<HTMLOutputElement>(`#${outputId}`);

  if (!output) return false;

  updateSelectionOutput(output, selected);
  return Boolean(selected);
}

export function updateSelectionOverview(): void {
  const allGroupsSelected = SELECTION_GROUPS.every(updateSelectionGroup);

  if (START_BUTTON) START_BUTTON.disabled = !allGroupsSelected;
}

export function updateThemeOptionSelection(): void {
  document
    .querySelectorAll<HTMLInputElement>('input[name="game-themes"]')
    .forEach((input): void => {
      const parent = input.parentElement;
      if (!parent) return;
      parent.classList.toggle("theme-option--selected", input.checked);
    });
}

export function updateThemePreview(): void {
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

export function getSelectedGameSettings(): GameSettings | null {
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
