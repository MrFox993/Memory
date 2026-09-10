/** Names of timeout handles used during game and end-screen flow. */
export type TimerName =
  "resetTurn" | "finishGame" | "gameOverExit" | "winnerScreen";

/** Stores active timeout ids by their timer purpose. */
type TimerState = Record<TimerName, number | undefined>;

/** Active timeout ids that can be cleared when leaving or resetting a game. */
const timers: TimerState = {
  resetTurn: undefined,
  finishGame: undefined,
  gameOverExit: undefined,
  winnerScreen: undefined,
};

/**
 * Stores a timeout id so it can be cleared during game cleanup.
 *
 * @param name - Logical timer name.
 * @param timeoutId - Browser timeout id returned by window.setTimeout.
 */
export function setGameTimer(name: TimerName, timeoutId: number): void {
  timers[name] = timeoutId;
}

/** Clears all registered game and end-screen timers. */
export function clearEndScreenTimers(): void {
  Object.values(timers).forEach((timeoutId): void => {
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
  });

  timers.resetTurn = undefined;
  timers.finishGame = undefined;
  timers.gameOverExit = undefined;
  timers.winnerScreen = undefined;
}
