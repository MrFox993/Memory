# Memory

DA project - Module 14 - Introducing TypeScript & SCSS/SASS

A browser-based memory game built with **TypeScript**, **Vite** and modular **SCSS/SASS**. Players choose a card theme, starting player and board size before playing a two-player memory match.

## Features

- Settings screen with live selection overview
- Four selectable card themes:
  - Code vibes theme
  - Gaming theme
  - DA project theme
  - Foods theme
- Theme preview that updates when the selected theme changes
- Two selectable starting players: Blue and Orange
- Three board sizes: 16 (4x4), 24 (4x6) or 36 (6x6) cards 
- Randomized card pairs for every new game
- Flip-card memory gameplay with match detection
- Score tracking for both players
- Active-player display and automatic turn switching after a mismatch
- Quit-game dialog with confirmation
- Game-over screen with final score
- Winner screen with draw handling and a back-to-settings action
- Responsive SCSS styling with component-based partials

## Tech Stack

- TypeScript
- Vite
- SCSS/SASS
- ESLint
- Prettier
- Dev Container with Node.js 22

## Projektstruktur

```text
.
├── index.html                  # App markup and templates
├── public/                     # Static assets, icons and fonts
├── src/
│   ├── main.ts                 # Game logic and DOM interactions
│   └── styles/
│       ├── abstracts/          # SCSS variables and mixins
│       ├── base/               # Global styles, typography and resets
│       ├── components/         # Screen and component styles
│       └── main.scss           # Main SCSS entry point
├── package.json                # Scripts and development dependencies
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite configuration
```

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

```bash
npm run dev
```

Startet den Vite-Entwicklungsserver.

```bash
npm run build
```

Prüft TypeScript mit `tsc --noEmit` und erstellt anschließend den Produktions-Build mit Vite.

```bash
npm run preview
```

Startet eine lokale Vorschau des Produktions-Builds.

```bash
npm run lint
```

Prüft die TypeScript-Dateien im `src`-Ordner mit ESLint.

```bash
npm run format
```

Formatiert das Projekt mit Prettier.

```bash
npm run format:check
```

Prüft, ob das Projekt bereits nach Prettier formatiert ist.

## Build und Deployment

Der Produktions-Build wird mit folgendem Befehl erstellt:

```bash
npm run build
```

Die generierten Dateien liegen anschließend im Ordner `dist/`. In `vite.config.ts` ist für Produktions-Builds die Base-URL `/Memory/` konfiguriert, damit die App z. B. auf GitHub Pages unter einem Repository-Pfad ausgeliefert werden kann.
