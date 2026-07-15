import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Svg, { Text as SvgText } from 'react-native-svg';
import * as Speech from 'expo-speech';
import BrushCanvas from '../components/BrushCanvas';
import { traceItems } from '../data/traceItems';
import { colors } from '../theme/tokens';
import { sounds } from '../utils/sound';

/**
 * The tracing guide is just a big, solid, light-colored letter/number for
 * the child to trace over freehand. Both the stroke-order ARROWS and the
 * DOTTED outline were removed per request — the arrows never aligned
 * reliably across attempts, and a plain solid glyph is the simplest thing
 * that actually works for a preschooler.
 */
function GuideGlyph({ char, canvasSize }: { char: string; canvasSize: number }) {
  return (
    <Svg width={canvasSize} height={canvasSize} style={StyleSheet.absoluteFill}>
      <SvgText
        x={canvasSize / 2}
        y={canvasSize * 0.52}
        dy="0.32em"
        fontSize={canvasSize * 0.62}
        fontWeight="800"
        fill="#E4DAC4"
        textAnchor="middle"
      >
        {char}
      </SvgText>
    </Svg>
  );
}

export default function TracingScreen() {
  const [current, setCurrent] = useState('1');
  const [resetSignal, setResetSignal] = useState(0);
  const [canvasSize, setCanvasSize] = useState(0);

  const speakItem = (item: string) => {
    const label = isNaN(Number(item)) ? `Letter ${item}` : `Number ${item}`;
    Speech.stop();
    Speech.speak(label, { rate: 0.85, pitch: 1.15 });
  };

  const select = (item: string) => {
    setCurrent(item);
    setResetSignal((n) => n + 1);
    speakItem(item);
  };

  const onFinish = async () => {
    await sounds.play('pageComplete');
    Speech.speak('Great job!', { rate: 0.9, pitch: 1.2 });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.header}>Tracing</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs} contentContainerStyle={{ gap: 8 }}>
        {traceItems.map((item) => (
          <TouchableOpacity key={item} onPress={() => select(item)} style={[styles.tab, current === item && styles.tabOn]}>
            <Text style={[styles.tabText, current === item && styles.tabTextOn]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.canvasWrap} onLayout={(e) => setCanvasSize(Math.round(e.nativeEvent.layout.width))}>
        {canvasSize > 0 && <GuideGlyph char={current} canvasSize={canvasSize} />}
        <BrushCanvas viewBox={400} color="#FF6B9D" tool="marker" brushSize={16} resetSignal={resetSignal} onStrokeEnd={onFinish} transparentBg />
      </View>

      <TouchableOpacity style={styles.retryBtn} onPress={() => setResetSignal((n) => n + 1)}>
        <Text style={styles.retryText}>🔄 Try again</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream, padding: 16 },
  header: { fontSize: 22, fontWeight: '800', color: colors.ink, marginBottom: 10 },
  tabs: { maxHeight: 46, marginBottom: 12 },
  tab: { minWidth: 42, height: 42, borderRadius: 12, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 },
  tabOn: { backgroundColor: colors.leaf },
  tabText: { fontWeight: '800', fontSize: 16, color: colors.inkSoft },
  tabTextOn: { color: '#fff' },
  canvasWrap: { width: '100%', aspectRatio: 1, position: 'relative' },
  retryBtn: { alignSelf: 'center', marginTop: 14, backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 14 },
  retryText: { fontWeight: '800', color: colors.ink, fontSize: 13 },
});
