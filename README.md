# Coachella Draft Game

A browser-based festival headliner drafting game.

## Current card model

The game uses **era-specific cards on one global rating scale**:

- Rarity controls pull frequency only; it does not set stat strength.
- The same artist can appear in multiple decades and genres when their career supports it.
- Each decade is a different card with different stats. Peak-era cards can be substantially stronger than later cards when an artist's real career relevance or output declined.
- Long careers span many pools. Taylor Swift can appear in Country and Pop; Eminem has separate 1990s, 2000s, 2010s and 2020s cards; the same approach now applies broadly to long-running artists.
- The roster has been expanded with major omissions including **Sting, KISS, Journey, Rush, Genesis, Phil Collins, Peter Gabriel, Santana, Cher, Kylie Minogue, Rakim, Luther Vandross, Judas Priest, Oscar Peterson, Joan Baez, King Sunny Adé, BoA** and many more.
- Cards keep the smoother **70 overall floor**, but explicit and generic career curves now make non-peak decades meaningfully weaker when warranted.
- Genre × decade combinations use historical scene-depth weighting. Relevance affects which cards surface in a spin, not their displayed rating.

## Balanced lineup scoring

The lineup is graded separately in six categories:

- Live
- Hits
- Influence
- Buzz
- Critic
- Catalog

The **Balanced Score is the lowest of the six lineup category averages**. The overall grade comes from that weakest category, so one huge strength cannot completely hide a weak area.

Grade thresholds:

- F: below 58
- D: 58+
- C: 67+
- B: 78+
- A: 87+
- S: 93+

To earn **S**, all six category averages must reach 93. The postgame report shows a grade for every category plus the overall grade.

## Pool Settings

Before a run, players can choose which genres and decades are eligible. This supports themed drafts, era-only games, genre-only games, and custom combinations.

## GitHub Pages

This repository is static and requires no build step. Publish `main` from `/ (root)` in **Settings → Pages**.

Main files:

- `index.html` — base app markup
- `styles.css` and supporting CSS files — festival visual design
- `game.js` — ordered script loader
- `data-1.js` … `data-4.js` — original artist pools
- `data-init.js` — base rarity and artist data
- `era-data.js` — existing long-career / cross-genre appearances
- `artist-expansion-v2.js` — expanded artist roster and additional long-career cards
- `era-model.js`, `balance-model.js`, `rating-v2.js` — global era-card rating and decline model
- `gameplay.js`, `gameplay-v2.js` — draft modes, Pool Settings, balanced scoring and refreshed UI
- `era-catalog.js` — rankings catalogue with separate decade cards
- `.nojekyll` — serves static files directly
