import React, { forwardRef } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { colors } from '../theme/tokens';

/**
 * Renders an artwork image with a small "TinyFin" watermark in the corner,
 * wrapped in a ViewShot so it can be captured to a PNG for export. Kept
 * off-screen (parent positions it absolutely) and only mounted when the
 * user actually taps Export, so it never affects the gallery's render cost.
 */
const WatermarkedArtwork = forwardRef<ViewShot, { imageUri: string; size?: number }>(
  ({ imageUri, size = 720 }, ref) => {
    return (
      <ViewShot ref={ref} options={{ format: 'png', quality: 1, width: size, height: size }}>
        <View style={[styles.wrap, { width: size, height: size }]}>
          <Image source={{ uri: imageUri }} style={StyleSheet.absoluteFill} resizeMode="cover" />
          <View style={styles.badge}>
            <Text style={styles.badgeFish}>🐠</Text>
            <Text style={styles.badgeText}>TinyFin</Text>
          </View>
        </View>
      </ViewShot>
    );
  }
);

export default WatermarkedArtwork;

const styles = StyleSheet.create({
  wrap: { backgroundColor: '#fff' },
  badge: {
    position: 'absolute', right: 14, bottom: 14,
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(255,255,255,0.82)',
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999,
  },
  badgeFish: { fontSize: 13 },
  badgeText: { fontSize: 13, fontWeight: '800', color: colors.mango, letterSpacing: 0.3 },
});
