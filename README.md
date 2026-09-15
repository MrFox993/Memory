# Memory

DA project - Module 14 - Introducing TypeScript & SCSS/SASS

A browser-based memory game built with **TypeScript**, **Vite** and modular **SCSS/SASS**. Players choose a card theme, starting player and board size before playing a two-player memory match.

## Features

- Start screen with navigation to the game settings
- Settings screen with live selection overview and disabled start button until all choices are complete
- Four selectable card themes:
  - Code vibes theme
  - Gaming theme
  - DA project theme
  - Foods theme
- Theme preview that updates when the selected theme changes
- Theme-specific card fronts, card backs and CSS accent colors
- Two selectable starting players: Blue and Orange
- Three board sizes: 16 (4x4), 24 (4x6) or 36 (6x6) cards
- Randomized card pairs for every new game
- Flip-card memory gameplay with match detection
- Score tracking for both players
- Active-player display and automatic turn switching after a mismatch
- Quit-game dialog with confirmation, backdrop click and Escape key handling
- Game-over screen with final score
- Winner screen with draw handling and a back-to-settings action
- Responsive SCSS styling with component-based partials
- GitHub Actions workflows for CI and GitHub Pages deployment

## Tech Stack

- TypeScript 5
- Vite 6
- SCSS/SASS
- ESLint with type-aware TypeScript rules
- Prettier
- GitHub Actions
- Dev Container with Node.js 22

## Project Structure

The original game logic has been extracted from `src/main.ts` into focused modules. `main.ts` now mainly acts as the application entry point: importing styles, initializing the UI and registering event listeners.

```text
.
├── .devcontainer/
│   └── devcontainer.json          # Development container with Node.js 22
├── .github/
│   └── workflows/
│       ├── ci.yml                 # Lint, format check, type check and build
│       └── deploy.yml             # Build and deploy to GitHub Pages
├── public/
│   ├── assets/                    # Theme previews and card images
│   │   ├── code_vibes_theme/
│   │   ├── da_projects_theme/
│   │   ├── foods_theme/
│   │   └── games_theme/
│   ├── fonts/                     # Local web fonts
│   └── icons/                     # UI icons, favicon and player pawns
├── src/
│   ├── constants/
│   │   └── game-config.ts         # Game constants, maps and theme configuration
│   ├── dom/
│   │   └── dom-elements.ts        # Central DOM element queries
│   ├── game/
│   │   ├── board.ts               # Board rendering and card template wiring
│   │   ├── card-factory.ts        # Card-pair creation and card asset selection
│   │   ├── game-logic.ts          # Turn flow, match detection and finish handling
│   │   ├── game-state.ts          # Mutable runtime state and reset helpers
│   │   └── timers.ts              # Timeout registration and cleanup
│   ├── styles/
│   │   ├── abstracts/             # SCSS variables and mixins
│   │   ├── base/                  # Global styles, typography and resets
│   │   ├── components/            # Screen and component styles
│   │   └── main.scss              # Main SCSS entry point
│   ├── types/
│   │   └── game.ts                # Shared TypeScript domain types
│   ├── ui/
│   │   ├── game-header.ts         # Score and active-player display updates
│   │   ├── screens.ts             # Screen changes, final score and winner UI
│   │   ├── selection.ts           # Settings selection and preview updates
│   │   └── theme.ts               # Theme color application via CSS variables
│   ├── utils/
│   │   ├── assets.ts              # Base-path-safe public asset URL helpers
│   │   ├── players.ts             # Player labels
│   │   └── shuffle.ts             # Card shuffling helper
│   ├── main.ts                    # Application bootstrap and event listeners
│   └── vite-env.d.ts              # Vite TypeScript environment types
├── index.html                     # Semantic app markup and memory-card template
├── eslint.config.js               # ESLint flat configuration
├── package-lock.json              # Locked npm dependency versions
├── package.json                   # Scripts and development dependencies
├── tsconfig.json                  # TypeScript configuration
└── vite.config.ts                 # Vite base path and dev server configuration
```

## Architecture Overview

- **`src/main.ts`** starts the application, connects the screens and registers global events.
- **`src/game/`** contains the core game logic: card creation, board rendering, match checking, scoring and timers.
- **`src/ui/`** encapsulates UI updates such as the settings overview, theme preview, header, game-over screen and winner screen.
- **`src/constants/game-config.ts`** centralizes card counts, theme assets, theme colors, player mapping and timing values.
- **`src/utils/assets.ts`** builds asset paths with `import.meta.env.BASE_URL`, so assets load correctly both locally and on GitHub Pages.
- **`src/styles/`** follows an SCSS partial structure with `abstracts`, `base` and `components`.

## Development with Dev Container

Docker Desktop and VS Code with the **Dev Containers** extension are required.

1. Open the repository in VS Code.
2. Select `Dev Containers: Reopen in Container` from the notification or the command palette.
3. After the automatic setup has finished, start the development server:

   ```bash
   npm run dev
   ```

The container uses Node.js 22 and installs the TypeScript, Vite and Sass versions locked in `package-lock.json` via `npm ci`. Vite is available on port 5173 and is forwarded automatically by VS Code.

## Local Development without Dev Container

A current Node.js version is required. Then install the dependencies and start the development server:

```bash
npm ci
npm run dev
```

The app is available by default at `http://localhost:5173`.

## Available Scripts

| Script                 | Description                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| `npm run dev`          | Starts the Vite development server.                                                           |
| `npm run build`        | Runs TypeScript with `tsc --noEmit` and then creates the production build with Vite.          |
| `npm run preview`      | Starts a local preview of the production build.                                                |
| `npm run lint`         | Checks the TypeScript files in the `src` folder with ESLint.                                  |
| `npm run format`       | Formats the project with Prettier.                                                            |
| `npm run format:check` | Checks whether the project is already formatted according to Prettier.                         |

## Quality Assurance

Before committing or submitting the project, at least these commands should run successfully:

```bash
npm run lint
npm run format:check
npm run build
```

The CI pipeline in `.github/workflows/ci.yml` additionally runs linting, a format check, a type check and the build on Node.js 22.

## Build and Deployment

Create the production build with:

```bash
npm run build
```

The generated files are written to the `dist/` folder. In `vite.config.ts`, the production base URL is configured as `/Memory/`, so the app can be served from a repository path, for example on GitHub Pages.

Deployment to GitHub Pages is prepared in `.github/workflows/deploy.yml`. On every push to `main`, dependencies are installed, the project is linted and built, and the contents of `dist/` are published as a Pages artifact.

## Extension Notes

- Add new themes to `public/assets/<theme-folder>/`, then register them in `THEME_ASSET_MAP`, `THEME_PREVIEW_MAP` and `THEME_COLOR_MAP`.
- Add new board sizes via `BOARD_SIZE_MAP`. The card count should be even because the game always creates card pairs.
- Register new UI elements centrally in `src/dom/dom-elements.ts` so other modules do not need duplicate DOM queries.
