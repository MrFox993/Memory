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

## Projektstruktur

Die ursprüngliche Spiellogik wurde aus `src/main.ts` in fokussierte Module ausgelagert. `main.ts` dient jetzt vor allem als Einstiegspunkt: Styles importieren, UI initialisieren und Event Listener registrieren.

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

## Architekturüberblick

- **`src/main.ts`** startet die Anwendung, verbindet die Screens miteinander und registriert globale Events.
- **`src/game/`** enthält die eigentliche Spiellogik: Kartenerzeugung, Board-Rendering, Match-Prüfung, Punktestand und Timer.
- **`src/ui/`** kapselt UI-Aktualisierungen wie Settings-Übersicht, Theme-Vorschau, Header, Game-over- und Winner-Screens.
- **`src/constants/game-config.ts`** bündelt Kartenanzahlen, Theme-Assets, Theme-Farben, Player-Mapping und Timing-Werte.
- **`src/utils/assets.ts`** erzeugt Asset-Pfade über `import.meta.env.BASE_URL`, damit Assets lokal und auf GitHub Pages korrekt geladen werden.
- **`src/styles/`** folgt einer SCSS-Teilstruktur aus `abstracts`, `base` und `components`.

## Entwicklung mit Dev Container

Voraussetzung ist Docker Desktop sowie VS Code mit der Erweiterung **Dev Containers**.

1. Repository in VS Code öffnen.
2. Über die Benachrichtigung oder die Befehlspalette `Dev Containers: Reopen in Container` auswählen.
3. Nach dem automatischen Setup den Entwicklungsserver starten:

   ```bash
   npm run dev
   ```

Der Container verwendet Node.js 22 und installiert die im `package-lock.json` festgelegten TypeScript-, Vite- und Sass-Versionen mit `npm ci`. Vite ist über Port 5173 erreichbar und wird von VS Code automatisch weitergeleitet.

## Lokale Entwicklung ohne Dev Container

Voraussetzung ist eine aktuelle Node.js-Version. Danach können die Abhängigkeiten installiert und der Entwicklungsserver gestartet werden:

```bash
npm ci
npm run dev
```

Die App ist standardmäßig unter `http://localhost:5173` erreichbar.

## Verfügbare Scripts

| Script                 | Beschreibung                                                                                  |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| `npm run dev`          | Startet den Vite-Entwicklungsserver.                                                          |
| `npm run build`        | Prüft TypeScript mit `tsc --noEmit` und erstellt anschließend den Produktions-Build mit Vite. |
| `npm run preview`      | Startet eine lokale Vorschau des Produktions-Builds.                                          |
| `npm run lint`         | Prüft die TypeScript-Dateien im `src`-Ordner mit ESLint.                                      |
| `npm run format`       | Formatiert das Projekt mit Prettier.                                                          |
| `npm run format:check` | Prüft, ob das Projekt bereits nach Prettier formatiert ist.                                   |

## Qualitätssicherung

Vor einem Commit oder einer Abgabe sollten mindestens diese Befehle erfolgreich laufen:

```bash
npm run lint
npm run format:check
npm run build
```

Die CI-Pipeline in `.github/workflows/ci.yml` führt zusätzlich Linting, Format-Check, Type-Check und Build auf Node.js 22 aus.

## Build und Deployment

Der Produktions-Build wird mit folgendem Befehl erstellt:

```bash
npm run build
```

Die generierten Dateien liegen anschließend im Ordner `dist/`. In `vite.config.ts` ist für Produktions-Builds die Base-URL `/Memory/` konfiguriert, damit die App z. B. auf GitHub Pages unter einem Repository-Pfad ausgeliefert werden kann.

Das Deployment nach GitHub Pages ist über `.github/workflows/deploy.yml` vorbereitet. Bei einem Push auf `main` werden Dependencies installiert, das Projekt gelintet, gebaut und der Inhalt von `dist/` als Pages-Artefakt veröffentlicht.

## Hinweise zur Erweiterung

- Neue Themes werden in `public/assets/<theme-folder>/` abgelegt und anschließend in `THEME_ASSET_MAP`, `THEME_PREVIEW_MAP` und `THEME_COLOR_MAP` ergänzt.
- Neue Board-Größen können über `BOARD_SIZE_MAP` ergänzt werden. Die Anzahl sollte gerade sein, da immer Kartenpaare erzeugt werden.
- Neue UI-Elemente sollten zentral in `src/dom/dom-elements.ts` registriert werden, damit andere Module keine doppelten DOM-Queries benötigen.
