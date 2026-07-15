import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import * as Speech from 'expo-speech';
import { learnSets } from '../data/learnSets';
import { colors, radii } from '../theme/tokens';

export default function LearningScreen() {
  const [setKey, setSetKey] = useState(learnSets[0].key);
  const activeSet = learnSets.find((s) => s.key === setKey)!;

  const speak = (label: string) => {
    Speech.stop();
    Speech.speak(label, { rate: 0.85, pitch: 1.1 });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.header}>Learning</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs} contentContainerStyle={{ gap: 8 }}>
        {learnSets.map((s) => (
          <TouchableOpacity key={s.key} onPress={() => setSetKey(s.key)} style={[styles.tab, setKey === s.key && styles.tabOn]}>
            <Text style={[styles.tabText, setKey === s.key && styles.tabTextOn]}>{s.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView contentContainerStyle={styles.grid}>
        {activeSet.items.map((item, i) => (
          <TouchableOpacity key={i} style={styles.flash} onPress={() => speak(item.lab)} activeOpacity={0.8}>
            <Text style={styles.big}>{item.big}</Text>
            <Text style={styles.lab}>{item.lab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream, padding: 16 },
  header: { fontSize: 22, fontWeight: '800', color: colors.ink, marginBottom: 10 },
  tabs: { maxHeight: 46, marginBottom: 12 },
  tab: { backgroundColor: '#fff', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 14 },
  tabOn: { backgroundColor: colors.berry },
  tabText: { fontWeight: '700', fontSize: 13, color: colors.inkSoft },
  tabTextOn: { color: '#fff' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingBottom: 30 },
  flash: { width: '31%', backgroundColor: '#fff', borderRadius: radii.md, paddingVertical: 14, alignItems: 'center', marginBottom: 10 },
  big: { fontSize: 30 },
  lab: { fontFamily: 'System', fontWeight: '700', fontSize: 12, marginTop: 4, color: colors.inkSoft },
});
