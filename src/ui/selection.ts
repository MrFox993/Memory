import {
  BOARD_SIZE_MAP,
  PLAYER_MAP,
  SELECTION_GROUPS,
  THEME_PREVIEW_MAP,
} from "../constants/game-config";
import { startButton } from "../dom/dom-elements";
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
 * Keeps the configured placeholder visible until the group has a selection.
 *
 * @param output - Output element that displays the selected value.
 * @param selected - Selected radio input or null when the group is incomplete.
 */
function updateSelectionOutput(
  output: HTMLOutputElement,
  selected: HTMLInputElement | null,
): void {
  const selectedText = selected?.nextElementSibling?.textContent?.trim() ?? "";

  output.value = selectedText;
  output.textContent = (selectedText || output.dataset.placeholder) ?? "";
  output.classList.toggle(
    "selection-overview__item--selected",
    Boolean(selected),
  );
}

/**
 * Updates one selection overview group and reports whether it is complete.
 *
 * @param group - Selection group with the radio name and overview output id.
 * @returns True when the radio group has a selected option.
 */
function updateSelectionGroup({ name, outputId }: SelectionGroup): boolean {
  const selected = getSelectedRadioInput(name);
  const output = document.querySelector<HTMLOutputElement>(`#${outputId}`);

  if (!output) {
    return false;
  }

  updateSelectionOutput(output, selected);
  return Boolean(selected);
}

/**
 * Updates every setting label independently and enables the start button when complete.
 */
export function updateSelectionOverview(): void {
  const groupCompletionStates = SELECTION_GROUPS.map(updateSelectionGroup);
  const allGroupsSelected = groupCompletionStates.every(Boolean);

  const button = startButton();
  if (button) {
    button.disabled = !allGroupsSelected;
  }
}

/**
 * Updates the selected visual state of all radio options in a group.
 *
 * @param groupName - Radio group name to iterate over.
 * @param selectedClass - CSS class applied to the parent of the checked input.
 */
function updateOptionSelection(groupName: string, selectedClass: string): void {
  document
    .querySelectorAll<HTMLInputElement>(`input[name="${groupName}"]`)
    .forEach((input): void => {
      const parent = input.parentElement;
      if (!parent) {
        return;
      }
      parent.classList.toggle(selectedClass, input.checked);
    });
}

/** Updates the selected visual state of all theme radio options. */
export function updateThemeOptionSelection(): void {
  updateOptionSelection("game-themes", "theme-option--selected");
}

/** Updates the selected visual state of all player radio options. */
export function updatePlayerOptionSelection(): void {
  updateOptionSelection("player-selection", "player-option--selected");
}

/** Updates the selected visual state of all board-size radio options. */
export function updateBoardSizeOptionSelection(): void {
  updateOptionSelection("board-size-selection", "board-size-option--selected");
}

/** Updates the theme preview image and its alternative text. */
export function updateThemePreview(
  previewTheme: HTMLInputElement | null = null,
): void {
  const selected = document.querySelector<HTMLInputElement>(
    'input[name="game-themes"]:checked',
  );
  const theme = previewTheme ?? selected;
  const previewImg = document.getElementById(
    "themePreview",
  ) as HTMLImageElement;
  if (!previewImg) {
    return;
  }

  const src = theme
    ? THEME_PREVIEW_MAP[theme.id]
    : THEME_PREVIEW_MAP.codeVibesTheme;
  previewImg.src = src;
  previewImg.alt = theme
    ? `${theme.nextElementSibling?.textContent?.trim() ?? "Theme"} preview image`
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

  if (!selectedTheme || !selectedPlayer || !selectedBoardSize) {
    return null;
  }

  return {
    themeId: selectedTheme.id,
    player: PLAYER_MAP[selectedPlayer.id],
    boardSize: BOARD_SIZE_MAP[selectedBoardSize.id],
  };
}
