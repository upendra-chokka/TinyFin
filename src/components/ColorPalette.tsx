import React from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { brushColors, colors } from '../theme/tokens';

export default function ColorPalette({ value, onChange }: { value: string; onChange: (c: string) => void }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {brushColors.map((c) => (
        <TouchableOpacity
          key={c}
          onPress={() => onChange(c)}
          style={[
            styles.swatch,
            { backgroundColor: c, borderColor: c === value ? colors.ink : '#fff' },
            c === '#FFFFFF' && styles.whiteBorder,
          ]}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: 8, paddingVertical: 6, paddingHorizontal: 2 },
  swatch: { width: 38, height: 38, borderRadius: 19, borderWidth: 3 },
  whiteBorder: { borderColor: '#ddd' },
});
