import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { usePremium } from '../utils/premium';
import { AD_CONFIG } from '../utils/ads';

/**
 * Shows a banner ad at the bottom of the screen.
 * Hidden entirely when user has purchased premium.
 */
export default function AdBanner() {
  const { isPremium } = usePremium();

  if (isPremium) return null;

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={AD_CONFIG.BANNER_ID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
});
