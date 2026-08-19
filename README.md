# Coachella Draft Game

A browser-based festival headliner drafting game.

## Current card model

The game uses **era-specific cards on one global rating scale**:

- Rarity controls pull frequency only; it does not set stat strength.
- The same artist can appear in multiple decades and genres when their career supports it.
- Each decade is a different card with different stats. For example, 2000s Eminem is intentionally much stronger than 2020s Eminem.
- Long careers can span many pools. Taylor Swift appears in both Country and Pop and has separate 2000s, 2010s, and 2020s cards.
- Cards are balanced onto a smoother usable range, with a **70 overall floor** so weak cards are still viable festival picks rather than dead pulls.
- Individual stats can still have pronounced weaknesses, preserving archetypes even when overall scores are reasonable.
- Genre × decade combinations have a **historical relevance / scene-depth weighting**. A culturally important combination tends to surface a deeper set of strong choices, but relevance does not secretly change a card's displayed rating.
- No genre or decade is hard-coded to be the strongest. The weighting is contextual across the full matrix: e.g. Disco is deeper in the 1970s, Hip-Hop in the 1990s–2020s, Metal in the 1980s–2000s, Jazz in the 1960s–1970s, K-Pop in the 2010s–2020s, etc.

## GitHub Pages

This repository is structured for GitHub Pages and requires no build step.

Main files:

- `index.html` — app markup
- `styles.css` and supporting CSS files — festival visual design
- `game.js` — ordered script loader
- `data-1.js` … `data-4.js` — base artist pools
- `data-init.js` — base rarity and artist data
- `era-data.js` — long-career / cross-genre appearances and era rarity
- `profiles.js` — original card utilities and archetypes
- `era-model.js` — global era-specific stat model
- `balance-model.js` — 70-floor smoothing plus genre × decade relevance/depth weighting
- `gameplay.js` — drafting, rerolls, scoring, hard mode, head-to-head
- `era-catalog.js` — rankings catalogue with separate decade cards
- `.nojekyll` — serves static files directly

To publish:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Select `main` and `/ (root)`.
4. Save.
