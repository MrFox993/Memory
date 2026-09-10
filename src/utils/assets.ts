import type { Player, ThemeAssetConfig } from "../types/game";

export function getPublicAssetSrc(path: string): string {
  return `${import.meta.env.BASE_URL}${path}`;
}

export function getThemeImageSrc(
  theme: ThemeAssetConfig,
  imageName: string,
): string {
  return getPublicAssetSrc(
    `assets/${theme.directory}/${theme.filePrefix}_${imageName}.png`,
  );
}

export function getPlayerPawnSrc(player: Player): string {
  return getPublicAssetSrc(`icons/${player}_player_pawn.png`);
}
