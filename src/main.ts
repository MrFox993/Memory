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

document.querySelectorAll<HTMLInputElement>('input[type="radio"]').forEach((input) => {
  input.addEventListener('change', updateSelectionOverview);
});

updateSelectionOverview();
