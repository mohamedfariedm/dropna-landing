# Droobna Framer → Next.js Fidelity Report

**Date:** 2026-11-16 (recovery pass)  
**Reference:** https://navigate-potential-356153.framer.app/  
**Local:** http://localhost:3000 (`/ar`, `/en`)  
**Evidence:** `docs/visual-regression/`, `docs/fidelity-evidence/2026-11-16/`

This report uses browser-observed evidence only. Statuses are **FIXED** / **PARTIALLY FIXED** / **BLOCKED** / **UNVERIFIED**.

---

## 1. Critical correction: Ride Classes motion model

| Claim (prior report) | Re-audit finding | Status |
|----------------------|------------------|--------|
| Framer uses scroll-linked `rotateX` / scale cascade | **False.** Sampling transforms across scroll left cascade values unchanged. Interaction is **click-to-flip** with static `top` + `scale` slots | **FIXED** (model corrected) |

**Implemented (matching observed Framer):**

- Slot stack: `y = 0 / 98 / 196 / 294`, `scale = 0.8875 → 1`
- Active card: `rotateX(-180)` back face (vehicle + copy); inactive: `rotateX(0)` front peek
- Timing: `0.45s` / `cubic-bezier(0.22, 1, 0.36, 1)`
- Perspective `1600px`
- Separate peek hit targets (inactive height `98px`) so peeks remain clickable
- Scale + rotate on one 3D node (avoids parent-transform flattening that hid the active face)

**Verified:** Playwright functional flip Lite ↔ Plus; browser click Lite shows hatchback asset; default Plus shows white Mercedes card.

---

## 2. Mismatch ledger (this pass)

| Area | Finding | Status |
|------|---------|--------|
| Classes 3D click-flip cascade | Parent scale flattened flip; peeks unclickable; active face invisible | **FIXED** |
| Classes “scroll-scrub” requirement | Not present on reference | **FIXED** (documented; not invented) |
| Fonts IBM Plex Sans Arabic + Sora | Matched | **FIXED** |
| Custom lime cursor SVG + `cursor: none` | Shape/size matched; spring approx | **PARTIALLY FIXED** |
| Cursor morph / magnetic | No morph rules found on Framer CSS | **UNVERIFIED** (not added) |
| Hero desktop composition | Close; scrubber glyph still simplified | **PARTIALLY FIXED** |
| Hero / header mobile | Download CTA wrongly shown; hero too tall; feature captions hidden | **FIXED** (CTA hidden `<lg`; hero compacted; captions visible; scrubber shown) |
| FAQ editorial layout | Accordion + chips + aside CTA | **PARTIALLY FIXED** |
| Privacy / Terms editorial + TOC | Editorial hero + summary + numbered sections + sticky TOC | **PARTIALLY FIXED** |
| Contact editorial + form | Structure matched; micro-spacing may differ | **PARTIALLY FIXED** |
| Safety icons | Inline SVG approximations (Framer symbol exports not extractable) | **PARTIALLY FIXED** |
| Scrubber car glyph | Generic path vs Framer asset | **PARTIALLY FIXED** |
| EN footer “Cookie settings” | Absent locally | **UNVERIFIED** / not implemented |
| Framer feature SVG symbol IDs | CDN extraction blocked / unstable | **BLOCKED** |

---

## 3. Visual regression metrics (pixelmatch)

Suite: `tests/visual-regression.spec.ts` · Chrome channel · fonts settled · Next/Framer chrome hidden via CSS.

Artifacts: `docs/visual-regression/<viewport>/<page>/{ref,local,diff}-viewport.png` + `metrics.json`.

### Full suite ratios (pixelmatch, measured)

Soft gates: desktop `< 0.45`, tablet `≤768` `< 0.50`, mobile `≤390` `< 0.58`.

| Page | 1440×900 | 1366×768 | 768×1024 | 390×844 |
|------|----------|----------|----------|---------|
| home-ar | 0.1199 | 0.1017 | 0.2308 | 0.2400 |
| home-en | 0.2012 | 0.1386 | 0.2226 | 0.2171 |
| faq-ar | 0.1438 | 0.1439 | 0.1283 | 0.1288 |
| contact-ar | 0.0971 | 0.1085 | 0.1360 | 0.1062 |
| privacy-ar | 0.2474 | 0.2005 | 0.3026 | 0.2294 |
| terms-ar | 0.2477 | 0.1982 | 0.3219 | 0.2499 |

**Before → after mobile/tablet header+hero fixes:** home-ar@390 `0.522 → 0.240`; home-ar@768 `0.464 → 0.231`.

Suite result: **25/25 visual passed** · **4/4 functional passed**.

---

## 4. Animation verification

| Motion | Reference | Local | Status |
|--------|-----------|-------|--------|
| Classes flip | Click; `rotateX` ±180; cascade slots | Same model | **FIXED** |
| Classes scroll-scrub | **Not observed** | Not implemented | **FIXED** (honest) |
| Hero enter + parallax | Present | Motion scroll transforms | **PARTIALLY FIXED** |
| Section Reveal | Fade/slide | `Reveal` once | **PARTIALLY FIXED** |
| FAQ accordion | Height expand | AnimatePresence height | **PARTIALLY FIXED** |
| Phone mouse parallax | Desktop | Springs in `AppFeatures` | **PARTIALLY FIXED** |

---

## 5. Cursor verification

| Check | Result | Status |
|-------|--------|--------|
| Default SVG geometry (~48×48, `#87C55D`, white stroke) | Matched | **FIXED** |
| `cursor: none` when fine pointer | Matched | **FIXED** |
| Touch / reduced-motion disable | `useSyncExternalStore` + media queries | **FIXED** |
| Spring stiffness/damping vs Framer | Approximated (`1200` / `55`) | **PARTIALLY FIXED** |
| Hover morph / magnetic | Not found on reference | **UNVERIFIED** |

---

## 6. Interaction tests (real browser + Playwright)

| Interaction | Result | Status |
|-------------|--------|--------|
| Language AR ↔ EN | Pass | **FIXED** |
| Classes Lite/Plus flip | Pass (functional + manual) | **FIXED** |
| Download dropdown (desktop) | Pass | **FIXED** |
| FAQ accordion + category chip | Pass | **FIXED** |
| Contact empty submit stays on page | Pass | **FIXED** |
| Privacy TOC hash links | Pass | **FIXED** |
| Mobile nav open/close | Present; not fully automated | **PARTIALLY FIXED** |
| Framer automation click on deck | Overlay intercepts (Framer-side) | **BLOCKED** |

Command: `PW_CHANNEL=chrome npx playwright test tests/functional.spec.ts` → **4/4 passed**.

---

## 7. Responsive

| Viewport | Compared | Status |
|----------|----------|--------|
| 1440×900 | home, faq, privacy, contact, terms | **PARTIALLY FIXED** |
| 1366×768 | suite | **PARTIALLY FIXED** |
| 768×1024 | suite | **PARTIALLY FIXED** |
| 390×844 | home re-audited + fixed header/hero/features | **PARTIALLY FIXED** |
| 1920 / 1024 / 375 | Not every page fully re-diffed this pass | **UNVERIFIED** |

---

## 8. Build / lint / typecheck

| Gate | Result |
|------|--------|
| `tsc --noEmit` | Pass |
| `eslint` | Pass |
| `next build` | Pass (Next 16.4.6 Turbopack) |
| Functional Playwright | **4/4 pass** |
| Visual Playwright | **25/25 pass** (soft-gated; metrics on disk) |

Environment note: bundled Playwright Chromium shell can fail with `spawn UNKNOWN` on this host; suite uses installed Chrome via `channel: chrome` / `PW_CHANNEL`.

---

## 9. Files modified (recovery pass)

- `src/components/home/RideClasses.tsx` — true 3D flip + peek hit targets
- `src/components/home/Hero.tsx` — mobile height compact
- `src/components/home/AppFeatures.tsx` — mobile captions + shorter phone row
- `src/components/home/SectionScrubber.tsx` — visible on mobile
- `src/components/layout/Header.tsx` — hide download CTA below `lg`
- `tests/functional.spec.ts` — Classes peek click
- `tests/visual-regression.spec.ts` — mobile soft ceiling + artifact dirs
- `docs/FIDELITY-REPORT.md` — this document
- Evidence under `docs/visual-regression/**`, `docs/fidelity-evidence/2026-11-16/`

---

## 10. Remaining gaps (do not claim complete)

1. Safety / scrubber icons still approximated (**PARTIALLY FIXED** / asset **BLOCKED**).
2. Legal/contact micro-layout density vs Framer denser grids (**PARTIALLY FIXED**).
3. Exact cursor spring coefficients (**PARTIALLY FIXED**).
4. Full multi-viewport + hover-state visual matrix not exhaustive for every interaction frame (**UNVERIFIED**).
5. Framer “Made in Framer” / editor chrome affects some diffs (**BLOCKED** for pixel identity).

---

## Verdict

The site is **not** declared pixel-perfect. This recovery pass **corrected a false Classes model**, restored clickable 3D flip behavior, tightened mobile header/hero fidelity, and shipped measured visual + functional regression evidence. Remaining differences are listed with statuses above rather than marked “looks good.”
