/**
 * Ad management for TinyFin Kids.
 * Uses react-native-google-mobile-ads.
 * 
 * TEST IDs are used below — these show "Test Ad" banners/interstitials
 * and are safe for development. Replace with your real AdMob IDs before
 * publishing to Play Store.
 * 
 * To get real IDs:
 * 1. Go to https://admob.google.com
 * 2. Create app "TinyFin Kids" (Android)
 * 3. Create a Banner ad unit and an Interstitial ad unit
 * 4. Replace the IDs below
 */

// Google's official test ad unit IDs (safe to use during development)
export const AD_CONFIG = {
  // Replace with your real AdMob App ID in app.json → plugins
  BANNER_ID: 'ca-app-pub-3940256099942544/6300978111', // Test banner
  INTERSTITIAL_ID: 'ca-app-pub-3940256099942544/1033173712', // Test interstitial
};

// Track how many activities completed — show interstitial every 3rd completion
let completionCount = 0;

export function incrementCompletion(): boolean {
  completionCount++;
  // Show interstitial every 3rd coloring/puzzle completion
  return completionCount % 3 === 0;
}

export function resetCompletionCount() {
  completionCount = 0;
}
