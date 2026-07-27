# Memory
DA project - Module 14 - Introducing Typescript &amp; SCSS/SASS

## Entwicklung mit Dev Container

Voraussetzung ist Docker Desktop sowie VS Code mit der Erweiterung **Dev Containers**.

1. Repository in VS Code öffnen.
2. Über die Benachrichtigung oder die Befehlspalette `Dev Containers: Reopen in Container` auswählen.
3. Nach dem automatischen Setup den Entwicklungsserver starten:

   ```bash
   npm run dev
   ```

Der Container verwendet Node.js 22 und installiert die im `package-lock.json`
festgelegten TypeScript-, Vite- und Sass-Versionen mit `npm ci`. Vite ist über
Port 5173 erreichbar und wird von VS Code automatisch weitergeleitet.
