import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native';
import BrushCanvas, { BrushTool, BrushCanvasRef } from '../components/BrushCanvas';
import ColorPalette from '../components/ColorPalette';
import { colors } from '../theme/tokens';
import { sounds } from '../utils/sound';
import { saveArtwork, saveSnapshotToFile, ImportedWorksheet } from '../utils/storage';

const TOOLS: { key: BrushTool; label: string; emoji: string }[] = [
  { key: 'marker', label: 'Marker', emoji: '🖊️' },
  { key: 'crayon', label: 'Crayon', emoji: '🖍️' },
  { key: 'brush', label: 'Brush', emoji: '🖌️' },
  { key: 'eraser', label: 'Eraser', emoji: '🧽' },
];

/**
 * Draw over a custom photo. Earlier versions tried to auto-convert the
 * photo into a coloring-book outline using a Skia edge-detection shader.
 * That kept producing unreliable results on-device (blank/blackish output),
 * so per a direct decision: this now just shows the photo as-is and lets
 * the child draw freely on top of it with the same marker/crayon/brush/
 * eraser tools as everywhere else — simple and reliable beats fragile and
 * fancy here.
 */
export default function ImportCanvasScreen({ route, navigation }: any) {
  const { worksheet } = route.params as { worksheet: ImportedWorksheet };
  const [color, setColor] = useState('#FF6B9D');
  const [tool, setTool] = useState<BrushTool>('marker');
  const [brushSize, setBrushSize] = useState(16);
  const [resetSignal, setResetSignal] = useState(0);
  const [undoSignal, setUndoSignal] = useState(0);
  const canvasRef = useRef<BrushCanvasRef>(null);

  const promptSave = () => {
    Alert.alert(
      'Save this?',
      `Save your coloring on "${worksheet.title}" to your Saved gallery?`,
      [
        {
          text: 'Save',
          onPress: async () => {
            await sounds.play('pageComplete');
            const base64 = canvasRef.current?.makeSnapshot();
            if (base64) {
              const id = `${worksheet.id}_done_${Date.now()}`;
              const imageUri = await saveSnapshotToFile(base64, id);
              await saveArtwork({ id, title: worksheet.title, imageUri, savedAt: Date.now() });
            }
            navigation.goBack();
          },
        },
        { text: "Don't save", onPress: () => navigation.goBack() },
        { text: 'Keep coloring', style: 'cancel' },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={{ fontSize: 18 }}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>{worksheet.title}</Text>
        <TouchableOpacity onPress={() => setUndoSignal((n) => n + 1)} style={styles.backBtn}>
          <Text style={{ fontSize: 16 }}>↩️</Text>
        </TouchableOpacity>
      </View>

      <ColorPalette value={color} onChange={setColor} />

      <View style={styles.canvasContainer}>
        <Image source={{ uri: worksheet.imageUri }} style={StyleSheet.absoluteFill} resizeMode="cover" />
        <BrushCanvas
          ref={canvasRef}
          viewBox={400}
          outlineShapes={[]}
          color={color}
          tool={tool}
          brushSize={brushSize}
          resetSignal={resetSignal}
          undoSignal={undoSignal}
          transparentBg
        />
      </View>

      <View style={styles.toolRow}>
        {TOOLS.map((t) => (
          <TouchableOpacity key={t.key} onPress={() => setTool(t.key)} style={[styles.toolBtn, tool === t.key && styles.toolBtnOn]}>
            <Text style={{ fontSize: 18 }}>{t.emoji}</Text>
            <Text style={styles.toolLabel}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sizeRow}>
        {[8, 16, 26].map((s) => (
          <TouchableOpacity key={s} onPress={() => setBrushSize(s)} style={styles.sizeBtn}>
            <View style={{ width: s, height: s, borderRadius: s / 2, backgroundColor: brushSize === s ? colors.ink : '#ccc' }} />
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#fff' }]} onPress={() => setResetSignal((n) => n + 1)}>
          <Text style={styles.actionText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.leaf }]} onPress={promptSave}>
          <Text style={[styles.actionText, { color: '#fff' }]}>I'm done! 🎉</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream, padding: 14 },
  topbar: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  title: { flex: 1, textAlign: 'center', fontWeight: '800', fontSize: 17, color: colors.ink },
  canvasContainer: { width: '100%', aspectRatio: 1, borderRadius: 22, overflow: 'hidden', backgroundColor: '#fff', position: 'relative' },
  toolRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  toolBtn: { flex: 1, alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 3, paddingVertical: 8, borderRadius: 14 },
  toolBtnOn: { backgroundColor: colors.sun },
  toolLabel: { fontSize: 10, fontWeight: '700', marginTop: 2, color: colors.inkSoft },
  sizeRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12 },
  sizeBtn: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 10 },
  actionBtn: { flex: 1, paddingVertical: 10, borderRadius: 14, alignItems: 'center' },
  actionText: { fontWeight: '800', color: colors.ink },
});
