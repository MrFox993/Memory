import './styles/main.scss';

const selectionGroups = [
  { name: 'game-themes', outputId: 'selectedTheme' },
  { name: 'player-selection', outputId: 'selectedPlayer' },
  { name: 'board-size-selection', outputId: 'selectedBoardSize' },
] as const;

const startButton = document.querySelector<HTMLButtonElement>('#startGameButton');

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

const themePreviewMap: Record<string, string> = {
  codeVibesTheme: 'assets/code_vibes_theme_preview.png',
  gamingTheme: 'assets/gaming_theme_preview.png',
  DAProjectTheme: 'assets/da_projects_theme_preview.png',
  foodsTheme: 'assets/foods_theme_preview.png',
};

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

document.querySelectorAll<HTMLInputElement>('input[type="radio"]').forEach((input) => {
  input.addEventListener('change', () => {
    updateSelectionOverview();
    updateThemeOptionSelection();
    updateThemePreview();
  });
});

updateSelectionOverview();
updateThemeOptionSelection();
updateThemePreview();
