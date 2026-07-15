import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Canvas, Path } from '@shopify/react-native-skia';
import { ColoringPage } from '../data/shapeTypes';
import { shapeToPath } from './BrushCanvas';
import { colors, radii } from '../theme/tokens';

const THUMB = 100;

function PageThumb({ page, locked, onPress }: { page: ColoringPage; locked: boolean; onPress: () => void }) {
  const scale = THUMB / page.viewBox;
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.thumbWrap}>
        <Canvas style={{ width: THUMB, height: THUMB }}>
          {page.shapes.map((shape, i) => (
            <Path
              key={i}
              path={shapeToPath(shape, scale)}
              color="#2B2118"
              style="stroke"
              strokeWidth={2.2}
              strokeCap="round"
              strokeJoin="round"
            />
          ))}
        </Canvas>
        {locked && (
          <View style={styles.lockBadge}><Text style={styles.lockText}>🔒</Text></View>
        )}
      </View>
      <Text numberOfLines={1} style={styles.title}>{page.title}</Text>
    </TouchableOpacity>
  );
}

export default React.memo(PageThumb, (prev, next) => prev.page.id === next.page.id && prev.locked === next.locked);

const styles = StyleSheet.create({
  card: { width: THUMB, marginRight: 12, marginBottom: 14 },
  thumbWrap: { width: THUMB, height: THUMB, backgroundColor: '#fff', borderRadius: radii.md, overflow: 'hidden', borderWidth: 1, borderColor: '#eee' },
  lockBadge: { position: 'absolute', top: 6, right: 6, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 12, padding: 3 },
  lockText: { fontSize: 14 },
  title: { fontFamily: 'System', fontWeight: '700', fontSize: 12, marginTop: 4, textAlign: 'center', color: colors.ink },
});
