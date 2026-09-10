export type TimerName =
  "resetTurn" | "finishGame" | "gameOverExit" | "winnerScreen";

type TimerState = Record<TimerName, number | undefined>;

const timers: TimerState = {
  resetTurn: undefined,
  finishGame: undefined,
  gameOverExit: undefined,
  winnerScreen: undefined,
};

export function setGameTimer(name: TimerName, timeoutId: number): void {
  timers[name] = timeoutId;
}

export function clearEndScreenTimers(): void {
  Object.values(timers).forEach((timeoutId): void => {
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
  });

  timers.resetTurn = undefined;
  timers.finishGame = undefined;
  timers.gameOverExit = undefined;
  timers.winnerScreen = undefined;
}
