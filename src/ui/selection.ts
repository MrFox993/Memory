import {
  BOARD_SIZE_MAP,
  PLAYER_MAP,
  SELECTION_GROUPS,
  THEME_PREVIEW_MAP,
} from "../constants/game-config";
import { START_BUTTON } from "../dom/dom-elements";
import type { GameSettings, SelectionGroup } from "../types/game";

/**
 * Finds the selected radio input for a given group name.
 *
 * @param name - Radio group name to search for.
 * @returns Selected radio input or null when no option is selected.
 */
function getSelectedRadioInput(name: string): HTMLInputElement | null {
  return document.querySelector<HTMLInputElement>(
    `input[name="${name}"]:checked`,
  );
}

/**
 * Updates one selection overview output from a selected radio input.
 *
 * @param output - Output element that displays the selected value.
 * @param selected - Selected radio input or null when the group is incomplete.
 */
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

/**
 * Updates one selection overview group and reports whether it is complete.
 *
 * @returns True when the radio group has a selected option.
 */
function updateSelectionGroup({ name, outputId }: SelectionGroup): boolean {
  const selected = getSelectedRadioInput(name);
  const output = document.querySelector<HTMLOutputElement>(`#${outputId}`);

  if (!output) return false;

  updateSelectionOutput(output, selected);
  return Boolean(selected);
}

/** Updates all selected setting labels and enables the start button if complete. */
export function updateSelectionOverview(): void {
  const allGroupsSelected = SELECTION_GROUPS.every(updateSelectionGroup);

  if (START_BUTTON) START_BUTTON.disabled = !allGroupsSelected;
}

/** Updates the selected visual state of all theme radio options. */
export function updateThemeOptionSelection(): void {
  document
    .querySelectorAll<HTMLInputElement>('input[name="game-themes"]')
    .forEach((input): void => {
      const parent = input.parentElement;
      if (!parent) return;
      parent.classList.toggle("theme-option--selected", input.checked);
    });
}

/** Updates the theme preview image and its alternative text. */
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

/**
 * Reads the currently selected game settings from the form controls.
 *
 * @returns Selected settings or null if a required selection is missing.
 */
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
