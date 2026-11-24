# Droobna Framer Reference Audit

**Reference:** https://navigate-potential-356153.framer.app/  
**Audited:** 2026-11-16  
**Viewports sampled:** ~1440 desktop (primary), plus structure checks for mobile breakpoints via Framer CSS media hashes (`min-width: 1200px` and below).

## Design tokens (from Framer CSS)

| Token | Value |
|-------|-------|
| Forest | `#223219` |
| Studio | `#16231b` |
| App green | `#4b6d37` |
| Mid green | `#364f28` |
| Lime | `#87c55d` |
| Cream | `#edf6e8` |
| Soft cream accent | `#c3e2b1` |

## Typography

- **Arabic UI / headings:** IBM Plex Sans Arabic (400/500/600/700)
- **Latin UI (English, store badges):** Sora
- Hero H1 desktop: ~104px / weight 700 / white / centered

## Cursor (verified)

- `body` has class `framer-cursor-none` → `cursor: none !important` on all descendants
- Custom follower: fixed 48×48 SVG arrow
  - Fill `#87C55D`, stroke `#FFFFFF` 2px, drop shadow
  - Transform: rotate(-45°) tip orientation
  - Opacity 0 until pointer moves; `pointer-events: none`; z-index 13
- **Touch / coarse pointer:** should not replace system cursor (Framer hides on non-pointer devices — treat as required)

## Homepage sections (order)

1. Header (transparent → white pill when scrolled)
2. Hero (`#home`) — studio shell radius **40px**, radial lime glow bottom-center, parallax photo
3. App (`#app`) — bg `#4b6d37`, rounded top transition, 3 captions + 3 phones
4. Services (`#services`) — cream, 2×2 mosaic cards
5. Classes (`#classes`) — lime, heading row + **3D stacked deck** (**click-to-flip** `rotateX` ±180 with static cascade slots `y/scale`; transforms do **not** scrub with scroll — re-verified 2026-11-16; Plus default pressed)
6. Features (`#features`) — `#364f28` bento + payment strip
7. Download (`#download`) — night scene + store badges
8. Footer

## Navigation

- Anchors: `#home`, `#app`, `#services`, `#classes`, `#features`
- Pages: `/`, `/en`, `/faq`, `/privacy`, `/terms`, `/contact`
- Store URLs: App Store `https://apps.apple.com/sa/`, Play `…id=com.droob.customer`

## Secondary pages (structure)

### FAQ (`02 / 04`)
Editorial hero, category chips, two-column **Accordion + Aside** (help card, privacy/terms links), grouped Q&A with +/- toggles.

### Contact (`01 / 04`)
Editorial hero, direct contact cards, form (name/phone/email/inquiry/trip/message/privacy), FAQ teaser.

### Privacy (`03 / 04`) / Terms (`04 / 04`)
Editorial hero (updated + read time), summary “باختصار”, numbered sections, sticky TOC.

## Assets

Downloaded from `framerusercontent.com` into `public/assets/home/` (hero, phones, services, classes ×4, seat, payments, night).

## Unverified / partial

- Exact Framer spring constants for cursor lag
- Full Classes deck scroll-scrub rotateX timeline (interaction partially click-based in Next)
- Mobile breakpoint pixel values below 768 (structure observed; not every px measured)
- Cookie settings link present on Framer EN footer only
