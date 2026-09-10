import type { Player, ThemeAssetConfig } from "../types/game";

/**
 * Builds an asset URL relative to the configured Vite base path.
 *
 * @param path - Public asset path without a leading slash.
 * @returns Asset URL for the current deployment base.
 */
export function getPublicAssetSrc(path: string): string {
  return `${import.meta.env.BASE_URL}${path}`;
}

/**
 * Builds the image URL for a theme-specific card asset.
 *
 * @param theme - Asset configuration of the selected theme.
 * @param imageName - Name suffix of the requested image file.
 * @returns Theme image URL for the current deployment base.
 */
export function getThemeImageSrc(
  theme: ThemeAssetConfig,
  imageName: string,
): string {
  return getPublicAssetSrc(
    `assets/${theme.directory}/${theme.filePrefix}_${imageName}.png`,
  );
}

/**
 * Builds the image URL for a player's pawn icon.
 *
 * @param player - Player whose pawn icon should be loaded.
 * @returns Pawn icon URL for the current deployment base.
 */
export function getPlayerPawnSrc(player: Player): string {
  return getPublicAssetSrc(`icons/${player}_player_pawn.png`);
}
