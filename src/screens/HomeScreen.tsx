import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { colors, radii, shadow } from '../theme/tokens';
import { usePremium } from '../utils/premium';
import AdBanner from '../components/AdBanner';

const CARDS = [
  { key: 'ColoringHub', emoji: '🖌️', label: 'Coloring', sub: 'Marker, crayon & brush', bg: colors.berry },
  { key: 'Tracing', emoji: '✏️', label: 'Tracing', sub: 'Letters & numbers', bg: colors.leaf },
  { key: 'Numbering', emoji: '🔢', label: 'Numbering', sub: 'Count & tap', bg: colors.sky },
  { key: 'Learning', emoji: '📚', label: 'Learning', sub: 'ABC, colors, shapes', bg: colors.mango },
  { key: 'Puzzles', emoji: '🧩', label: 'Puzzles', sub: 'Piece it together', bg: '#7C6CF0' },
  { key: 'Rhymes', emoji: '🎵', label: 'Rhymes', sub: 'Sing along', bg: '#B85C9E' },
];

export default function HomeScreen({ navigation }: any) {
  const { isPremium, purchasePremium, restorePurchase } = usePremium();

  const handleUpgrade = () => {
    Alert.alert(
      '⭐ Go Premium',
      'Remove all ads and unlock every coloring page for just $0.99!',
      [
        {
          text: 'Buy $0.99',
          onPress: async () => {
            await purchasePremium();
            Alert.alert('Thank you!', 'Ads removed and everything unlocked!');
          },
        },
        { text: 'Restore Purchase', onPress: restorePurchase },
        { text: 'Not now', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.brand}>
        <Text style={styles.mascot}>🐠</Text>
        <Text style={styles.title}>TinyFin Kids</Text>
        <Text style={styles.subtitle}>PLAY · LEARN · GROW</Text>
      </View>

      <View style={styles.grid}>
        {CARDS.map((c) => (
          <TouchableOpacity
            key={c.key}
            style={[styles.card, { backgroundColor: c.bg }, shadow.card]}
            onPress={() => navigation.navigate(c.key)}
            activeOpacity={0.85}
          >
            <Text style={styles.cardEmoji}>{c.emoji}</Text>
            <Text style={styles.cardLabel}>{c.label}</Text>
            <Text style={styles.cardSub}>{c.sub}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Remove Ads / Premium button */}
      {!isPremium && (
        <TouchableOpacity style={styles.upgradeBtn} onPress={handleUpgrade}>
          <Text style={styles.upgradeText}>⭐ Remove Ads — $0.99</Text>
        </TouchableOpacity>
      )}

      {/* Banner ad at bottom */}
      <AdBanner />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream, padding: 18 },
  brand: { alignItems: 'center', marginVertical: 18 },
  mascot: { fontSize: 52 },
  title: { fontSize: 30, fontWeight: '800', color: colors.mango, marginTop: 4 },
  subtitle: { fontSize: 12, fontWeight: '800', color: colors.inkSoft, letterSpacing: 1.5, marginTop: 2 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 14 },
  card: { width: '47%', borderRadius: radii.lg, padding: 16, marginBottom: 4 },
  cardEmoji: { fontSize: 34, marginBottom: 6 },
  cardLabel: { fontSize: 18, fontWeight: '800', color: '#fff' },
  cardSub: { fontSize: 12, fontWeight: '600', color: 'rgba(255,255,255,0.9)', marginTop: 2 },
  upgradeBtn: {
    backgroundColor: colors.sun,
    borderRadius: radii.pill,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 8,
  },
  upgradeText: { fontWeight: '800', fontSize: 14, color: colors.ink },
});
