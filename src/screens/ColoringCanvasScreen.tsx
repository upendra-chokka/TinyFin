import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
import BrushCanvas, { BrushTool, BrushCanvasRef } from '../components/BrushCanvas';
import ColorPalette from '../components/ColorPalette';
import { colors, radii } from '../theme/tokens';
import { sounds } from '../utils/sound';
import { markPageComplete, saveArtwork, setIsPremium, saveSnapshotToFile } from '../utils/storage';
import { usePremium } from '../utils/premium';
import { AD_CONFIG, incrementCompletion } from '../utils/ads';

const TOOLS: { key: BrushTool; label: string; emoji: string }[] = [
  { key: 'marker', label: 'Marker', emoji: '🖊️' },
  { key: 'crayon', label: 'Crayon', emoji: '🖍️' },
  { key: 'brush', label: 'Brush', emoji: '🖌️' },
  { key: 'eraser', label: 'Eraser', emoji: '🧽' },
];

export default function ColoringCanvasScreen({ route, navigation }: any) {
  const { page, locked } = route.params;
  const [color, setColor] = useState('#FF6B9D');
  const [tool, setTool] = useState<BrushTool>('marker');
  const [brushSize, setBrushSize] = useState(16);
  const [resetSignal, setResetSignal] = useState(0);
  const [undoSignal, setUndoSignal] = useState(0);
  const [unlocked, setUnlocked] = useState(!locked);
  const canvasRef = useRef<BrushCanvasRef>(null);
  const { isPremium } = usePremium();

  // Show interstitial ad every 3rd completion (only if not premium)
  const showInterstitialIfNeeded = () => {
    if (isPremium) return;
    const shouldShow = incrementCompletion();
    if (shouldShow) {
      try {
        const interstitial = InterstitialAd.createForAdRequest(AD_CONFIG.INTERSTITIAL_ID, {
          requestNonPersonalizedAdsOnly: true,
        });
        interstitial.addAdEventListener(AdEventType.LOADED, () => {
          interstitial.show();
        });
        interstitial.load();
      } catch (e) {
        // Fail silently — never crash for an ad
      }
    }
  };

  if (!unlocked) {
    return (
      <SafeAreaView style={styles.lockedSafe}>
        <Text style={styles.lockEmoji}>🔒</Text>
        <Text style={styles.lockTitle}>{page.title} is a Premium page</Text>
        <Text style={styles.lockSub}>Unlock the full TinyFin library to color every scene, mandala, and pattern.</Text>
        <TouchableOpacity
          style={styles.unlockBtn}
          onPress={async () => {
            await setIsPremium(true);
            setUnlocked(true);
          }}
        >
          <Text style={styles.unlockText}>Unlock TinyFin Premium</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 16 }}>
          <Text style={styles.backLink}>← Back to pages</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleDone = () => {
    Alert.alert(
      'Save this?',
      `Save your coloring of "${page.title}" to your Saved gallery?`,
      [
        {
          text: 'Save',
          onPress: async () => {
            await sounds.play('pageComplete');
            await markPageComplete(page.id);
            const base64 = canvasRef.current?.makeSnapshot();
            if (base64) {
              const id = `${page.id}_${Date.now()}`;
              const imageUri = await saveSnapshotToFile(base64, id);
              await saveArtwork({ id, title: page.title, imageUri, savedAt: Date.now() });
            }
            showInterstitialIfNeeded();
            navigation.goBack();
          },
        },
        {
          text: "Don't save",
          onPress: () => {
            showInterstitialIfNeeded();
            navigation.goBack();
          },
        },
        { text: 'Keep coloring', style: 'cancel' },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Text style={{ fontSize: 18 }}>←</Text></TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>{page.title}</Text>
        <TouchableOpacity onPress={() => setUndoSignal((n) => n + 1)} style={styles.backBtn}><Text style={{ fontSize: 16 }}>↩️</Text></TouchableOpacity>
      </View>

      <ColorPalette value={color} onChange={setColor} />

      <BrushCanvas
        ref={canvasRef}
        viewBox={page.viewBox}
        outlineShapes={page.shapes}
        color={color}
        tool={tool}
        brushSize={brushSize}
        resetSignal={resetSignal}
        undoSignal={undoSignal}
      />

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
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.leaf }]} onPress={handleDone}>
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
  toolRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  toolBtn: { flex: 1, alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 3, paddingVertical: 8, borderRadius: 14 },
  toolBtnOn: { backgroundColor: colors.sun },
  toolLabel: { fontSize: 10, fontWeight: '700', marginTop: 2, color: colors.inkSoft },
  sizeRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12 },
  sizeBtn: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 10 },
  actionBtn: { flex: 1, paddingVertical: 10, borderRadius: 14, alignItems: 'center' },
  actionText: { fontWeight: '800', color: colors.ink },
  lockedSafe: { flex: 1, backgroundColor: colors.cream, alignItems: 'center', justifyContent: 'center', padding: 30 },
  lockEmoji: { fontSize: 48, marginBottom: 10 },
  lockTitle: { fontSize: 20, fontWeight: '800', textAlign: 'center', color: colors.ink },
  lockSub: { fontSize: 14, textAlign: 'center', color: colors.inkSoft, marginTop: 8, marginBottom: 20 },
  unlockBtn: { backgroundColor: colors.berry, paddingHorizontal: 24, paddingVertical: 14, borderRadius: radii.pill },
  unlockText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  backLink: { color: colors.inkSoft, fontWeight: '700' },
});
