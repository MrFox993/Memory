/// <reference types="vite/client" />

declare module "*.scss" {
  const content: string;
  export default content;
}

// Zusatz zum lernen==================================================
// vite-env.d.ts — Was macht diese Datei?

// Eine .d.ts-Datei ist eine TypeScript Declaration-Datei.
// Sie enthält keinen ausführbaren Code, sondern erklärt dem TypeScript-Compiler,
// welche Typen bestimmte Dinge haben. Sie läuft nie im Browser — sie existiert
// nur für den Compiler.

// /// <reference types="vite/client" />
// Lädt die eingebauten Vite-Typen. Damit kennt TypeScript z.B. import.meta.env und andere
// Vite-spezifische Features.
//
// declare module '*.scss'  → Sagt TypeScript: "Jede Datei die auf .scss endet ist ein gültiges Modul." Ohne diese Zeile würde TS bei import './styles/style.scss' einen Fehler werfen, weil es .scss nicht kennt.
//   const content: string;
//   export default content;
// }
// Definiert was das Modul exportiert — in diesem Fall einen String.
// Vite liefert den tatsächlichen Inhalt zur Laufzeit, TS braucht nur den Typ.

// Merksatz: Diese Datei beruhigt TypeScript — Vite erledigt die eigentliche Arbeit.
