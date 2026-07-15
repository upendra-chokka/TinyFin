# TinyFin — Preschool Play & Learn

A React Native / Expo app with four games: **Coloring** (real marker/crayon/
brush drawing with sound + haptics), **Tracing**, **Numbering**, and
**Learning** (flashcards with speech).

## What's actually in here

- **Coloring engine** (`src/components/BrushCanvas.tsx`): built on
  `@shopify/react-native-skia`, a real GPU-accelerated canvas — not a
  tap-to-flood-fill toy. Marker / crayon / brush / eraser each have distinct
  width, opacity, and blend behavior. A looping scribble sound plays while
  the finger is down (`src/utils/sound.ts`), and every stroke fires a light
  haptic tick.
- **Content that scales to "hundreds of pages"** without hand-drawing each
  one: `src/data/curatedPages.ts` has 20 hand-composed scenes, and
  `src/data/patternGenerator.ts` procedurally generates unlimited, seeded
  Mandala and Pattern pages (`Mandala #47` always looks the same, but every
  seed is genuinely different). The Coloring hub lazy-loads these in
  batches of 30 as the user scrolls.
- **Sound effects** (`assets/sounds/*.wav`) were synthesized from scratch —
  brush scribble, pop, correct/wrong chimes, page-complete fanfare. They're
  functional placeholders; swap in higher-fidelity recorded audio before you
  ship if you want a more polished feel.
- **Premium gating stub**: pages past the first 20 curated scenes / 20
  mandalas / 20 patterns are marked `premium: true`. `ColoringCanvasScreen`
  shows a lock screen with an "Unlock" button that currently just flips a
  local flag (`src/utils/storage.ts`) — see **Monetization** below for
  wiring it to real payments.

## Run it locally

```bash
cd tinyfin-app
npm install
npx expo install   # aligns native dependency versions to your Expo SDK
npx expo start
```

**Important:** because this app uses `@shopify/react-native-skia` (a native
module), it will **not** run inside the plain Expo Go app. You need a
**development build**:

```bash
npx expo install expo-dev-client
eas build --profile development --platform ios      # or android
```

Install that build on your phone/simulator, then `npx expo start` and open
it from there. This is standard for any Expo app using native modules —
one-time setup, not a red flag.

## Publishing to the stores

I can't do this last step for you — it requires accounts only you can
create — but here's the exact path:

1. **Create accounts**: [Apple Developer Program](https://developer.apple.com/programs/) ($99/yr), [Google Play Console](https://play.google.com/console/) ($25 one-time).
2. **Install EAS CLI**: `npm install -g eas-cli` then `eas login`.
3. **Configure**: `eas build:configure` (creates/links an EAS project — replace the placeholder `projectId` in `app.json` with the real one it gives you).
4. **Set real bundle IDs**: `app.json` currently has `com.tinyfin.app` for both iOS and Android — change if that's taken, or keep it.
5. **Replace placeholder art**: `assets/images/icon.png`, `splash.png`, `adaptive-icon.png` are simple generated placeholders (mango-orange rounded square with a fish mark). Swap in real artwork — 1024×1024 icon, no transparency for iOS.
6. **Build**: `eas build --platform all --profile production`
7. **Submit**: `eas submit --platform ios` and `eas submit --platform android` (walks you through App Store Connect / Play Console metadata, screenshots, age rating — for a kids' app you'll want to fill out Apple's "Kids Category" / Google's "Designed for Families" questionnaires carefully).
8. **Review time**: Apple typically 1–3 days, Google a few hours to a couple of days for updates, longer for a brand-new app.

## Monetization — not wired up yet, by design

You said "decide later," so the app is structured to make that decision
easy to slot in without a rebuild:

- **Ads**: install `react-native-google-mobile-ads`, add a banner to
  `HomeScreen` and/or a rewarded ad that calls `setIsPremium(true)` — good
  fit if you want the app free with light monetization.
- **One-time unlock**: `expo-in-app-purchases` (or the newer
  `react-native-iap`) — call `setIsPremium(true)` in the purchase success
  callback in `ColoringCanvasScreen.tsx` where the `TODO` comment is.
- **Subscription**: [RevenueCat](https://www.revenuecat.com/) is the least
  painful way to do iOS + Android subscriptions from one SDK — same
  integration point.
- Given this is a **kids' app**, note Apple/Google both restrict ad
  networks and require COPPA-compliant, non-behavioral ads if you go the
  ads route — check current policy before integrating a network.

## Adding more content

- **New curated scene**: add an object to `curatedPages.ts` — it's just a
  list of `Shape` primitives (circle/ellipse/rect/line/triangle/path). Reuse
  the `starPath()` helper pattern for anything with more complex curves.
- **More mandalas/patterns "for free"**: nothing to do — they're generated
  from a seed on demand. If you want a different visual style, tweak
  `generateMandala` / `generatePattern` in `patternGenerator.ts`.
- **New tracing items**: edit `traceItems.ts`.
- **New flashcard set**: add an entry to `learnSets.ts`.

## Known scaffold limitations to fix before shipping

- `BrushCanvas` re-renders via React state on every touch move (see PERF
  NOTE in the file) — fine for testing, worth moving to a Reanimated/Skia
  shared value for the smoothest possible drawing on low-end Android.
- No analytics/crash reporting wired in — add Sentry or similar before
  launch so you can see real-world crashes.
- Sound assets are synthesized placeholders, not studio-recorded.
- No unit/e2e tests yet.
