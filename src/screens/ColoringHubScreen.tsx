import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, Image, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import ViewShot from 'react-native-view-shot';
import { curatedPages } from '../data/curatedPages';
import { getMandalaPage, getPatternPage } from '../data/patternGenerator';
import { ColoringPage } from '../data/shapeTypes';
import PageThumb from '../components/PageThumb';
import WatermarkedArtwork from '../components/WatermarkedArtwork';
import { colors, radii } from '../theme/tokens';
import {
  getIsPremium, getSavedArtworks, SavedArtwork, getImportedWorksheets, ImportedWorksheet,
  saveImportedWorksheet, deleteSavedArtwork, deleteImportedWorksheet,
  clearAllSavedArtworks, clearAllImportedWorksheets,
} from '../utils/storage';
import { preparePhotoForCanvas } from '../utils/photoImport';
import { shareArtworkFile } from '../utils/exportImage';

type Tab = 'scenes' | 'dinosaurs' | 'mammals' | 'animals' | 'people' | 'things' | 'plants' | 'mandalas' | 'patterns' | 'saved' | 'custom';

// Small, fixed libraries — no infinite scroll. Keeps the memory/GPU cost of
// the generated-thumbnail tabs bounded (these tabs were a crash source).
const MANDALA_COUNT = 12;
const PATTERN_COUNT = 6;

export default function ColoringHubScreen({ navigation }: any) {
  const [tab, setTab] = useState<Tab>('scenes');
  const [premium, setPremium] = useState(false);
  const [savedArtworks, setSavedArtworks] = useState<SavedArtwork[]>([]);
  const [importedSheets, setImportedSheets] = useState<ImportedWorksheet[]>([]);
  const [processing, setProcessing] = useState(false);

  // Off-screen watermark capture plumbing for Export.
  const [exportUri, setExportUri] = useState<string | null>(null);
  const shotRef = useRef<ViewShot>(null);

  useFocusEffect(
    useCallback(() => {
      getIsPremium().then(setPremium);
      getSavedArtworks().then(setSavedArtworks);
      getImportedWorksheets().then(setImportedSheets);
    }, [])
  );

  const pages: ColoringPage[] = useMemo(() => {
    if (tab === 'mandalas') return Array.from({ length: MANDALA_COUNT }, (_, i) => getMandalaPage(i + 1));
    if (tab === 'patterns') return Array.from({ length: PATTERN_COUNT }, (_, i) => getPatternPage(i + 1));
    if (tab === 'scenes') return curatedPages.filter((p) => p.category === 'scenes');
    if (tab === 'dinosaurs') return curatedPages.filter((p) => p.category === 'dinosaurs');
    if (tab === 'mammals') return curatedPages.filter((p) => p.category === 'mammals');
    if (tab === 'animals') return curatedPages.filter((p) => p.category === 'animals');
    if (tab === 'people') return curatedPages.filter((p) => p.category === 'people');
    if (tab === 'things') return curatedPages.filter((p) => p.category === 'things');
    if (tab === 'plants') return curatedPages.filter((p) => p.category === 'plants');
    return [];
  }, [tab]);

  const addWorksheetFromAsset = async (uri: string, title: string) => {
    setProcessing(true);
    try {
      const processed = await preparePhotoForCanvas(uri);
      const ws: ImportedWorksheet = { id: `import_${Date.now()}`, title, imageUri: processed.uri, savedAt: Date.now() };
      await saveImportedWorksheet(ws);
      setImportedSheets((prev) => [ws, ...prev]);
      navigation.navigate('ImportCanvas', { worksheet: ws });
    } catch (e) {
      Alert.alert('Error', 'Could not add that photo. Please try another one.');
    } finally {
      setProcessing(false);
    }
  };

  const handleAddPhoto = () => {
    Alert.alert('Add a photo', 'How would you like to add it?', [
      {
        text: '📷 Take a photo',
        onPress: async () => {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== 'granted') { Alert.alert('Permission needed', 'Please allow camera access.'); return; }
          const r = await ImagePicker.launchCameraAsync({ quality: 0.8 });
          if (!r.canceled && r.assets[0]) await addWorksheetFromAsset(r.assets[0].uri, `Scanned ${importedSheets.length + 1}`);
        },
      },
      {
        text: '🖼️ Choose from gallery',
        onPress: async () => {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') { Alert.alert('Permission needed', 'Please allow photo access.'); return; }
          const r = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.8 });
          if (!r.canceled && r.assets[0]) await addWorksheetFromAsset(r.assets[0].uri, `Worksheet ${importedSheets.length + 1}`);
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  // Export: mount the watermark component off-screen with this image,
  // capture it after a tick, then hand the captured file to the share sheet.
  const handleExport = (imageUri: string) => {
    setExportUri(imageUri);
    setTimeout(async () => {
      try {
        const captured = await shotRef.current?.capture?.();
        if (captured) await shareArtworkFile(captured);
      } catch (e) {
        Alert.alert('Could not export', 'Something went wrong preparing the image.');
      } finally {
        setExportUri(null);
      }
    }, 350);
  };

  const confirmClearAll = (which: 'saved' | 'custom') => {
    const label = which === 'saved' ? 'saved artworks' : 'custom worksheets';
    Alert.alert(`Delete all ${label}?`, 'This permanently removes them from this device and cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete all', style: 'destructive', onPress: async () => {
          if (which === 'saved') { await clearAllSavedArtworks(); setSavedArtworks([]); }
          else { await clearAllImportedWorksheets(); setImportedSheets([]); }
        },
      },
    ]);
  };

  const handleDeleteSaved = (item: SavedArtwork) => {
    Alert.alert(item.title, 'Choose an action', [
      { text: '📤 Export / Share', onPress: () => handleExport(item.imageUri) },
      {
        text: '🗑️ Delete', style: 'destructive', onPress: async () => {
          await deleteSavedArtwork(item.id);
          setSavedArtworks((prev) => prev.filter((a) => a.id !== item.id));
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleDeleteImported = (id: string) => {
    Alert.alert('Delete worksheet?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive', onPress: async () => {
          await deleteImportedWorksheet(id);
          setImportedSheets((prev) => prev.filter((w) => w.id !== id));
        },
      },
    ]);
  };

  const renderSavedTab = () => {
    if (savedArtworks.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🎨</Text>
          <Text style={styles.emptyTitle}>No saved artworks yet</Text>
          <Text style={styles.emptySub}>Color a page and tap "I'm done!" to save it here.</Text>
        </View>
      );
    }
    return (
      <FlatList
        data={savedArtworks}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={
          <TouchableOpacity onPress={() => confirmClearAll('saved')} style={styles.clearAllBtn}>
            <Text style={styles.clearAllText}>🗑️ Clear all saved</Text>
          </TouchableOpacity>
        }
        contentContainerStyle={{ paddingBottom: 40 }}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={5}
        removeClippedSubviews
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.savedCard} onPress={() => handleDeleteSaved(item)}>
            <Image source={{ uri: item.imageUri }} style={styles.savedImage} resizeMode="cover" />
            <Text style={styles.savedTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.savedDate}>{new Date(item.savedAt).toLocaleDateString()}</Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  const renderCustomTab = () => (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.addPhotoBar} onPress={handleAddPhoto} disabled={processing}>
        <Text style={styles.addPhotoEmoji}>➕</Text>
        <Text style={styles.addPhotoText}>Add a Photo to Color</Text>
      </TouchableOpacity>

      {processing && (
        <View style={styles.processingRow}>
          <ActivityIndicator color={colors.berry} />
          <Text style={styles.processingText}>Adding your photo...</Text>
        </View>
      )}

      {importedSheets.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>📷</Text>
          <Text style={styles.emptyTitle}>No custom worksheets yet</Text>
          <Text style={styles.emptySub}>Tap "Add a Photo" to bring in your own picture to color.</Text>
        </View>
      ) : (
        <FlatList
          data={importedSheets}
          keyExtractor={(item) => item.id}
          numColumns={3}
          ListHeaderComponent={
            <TouchableOpacity onPress={() => confirmClearAll('custom')} style={styles.clearAllBtn}>
              <Text style={styles.clearAllText}>🗑️ Clear all custom</Text>
            </TouchableOpacity>
          }
          contentContainerStyle={{ paddingBottom: 40 }}
          columnWrapperStyle={{ justifyContent: 'flex-start' }}
          initialNumToRender={9}
          maxToRenderPerBatch={9}
          windowSize={5}
          removeClippedSubviews
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.customThumbWrap}
              onPress={() => navigation.navigate('ImportCanvas', { worksheet: item })}
              onLongPress={() => handleDeleteImported(item.id)}
            >
              <Image source={{ uri: item.imageUri }} style={styles.customThumbImage} resizeMode="cover" />
              <Text numberOfLines={1} style={styles.customThumbTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );

  const renderPagesTab = () => (
    <FlatList
      data={pages}
      keyExtractor={(p) => p.id}
      numColumns={3}
      contentContainerStyle={{ paddingBottom: 40 }}
      columnWrapperStyle={{ justifyContent: 'flex-start' }}
      initialNumToRender={9}
      maxToRenderPerBatch={9}
      windowSize={5}
      removeClippedSubviews
      renderItem={({ item }) => (
        <PageThumb
          page={item}
          locked={item.premium && !premium}
          onPress={() => navigation.navigate('ColoringCanvas', { page: item, locked: item.premium && !premium })}
        />
      )}
    />
  );

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.header}>Coloring</Text>
      <View style={styles.tabs}>
        {([
          { key: 'scenes' as Tab, label: '🖼 Scenes' },
          { key: 'dinosaurs' as Tab, label: '🦕 Dinos' },
          { key: 'mammals' as Tab, label: '🦁 Mammals' },
          { key: 'animals' as Tab, label: '🐸 Animals' },
          { key: 'people' as Tab, label: '👮 People' },
          { key: 'things' as Tab, label: '🚂 Things' },
          { key: 'plants' as Tab, label: '🌻 Plants' },
          { key: 'saved' as Tab, label: '💾 Saved' },
          { key: 'custom' as Tab, label: '📥 Custom' },
        ]).map((t) => (
          <TouchableOpacity key={t.key} onPress={() => setTab(t.key)} style={[styles.tab, tab === t.key && styles.tabOn]}>
            <Text style={[styles.tabText, tab === t.key && styles.tabTextOn]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab === 'saved' ? renderSavedTab() : tab === 'custom' ? renderCustomTab() : renderPagesTab()}

      {/* Off-screen watermark capture surface for Export. Only mounted while
          an export is in flight; positioned far off-screen so it's never seen. */}
      {exportUri && (
        <View style={styles.offscreen} pointerEvents="none">
          <WatermarkedArtwork ref={shotRef} imageUri={exportUri} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream, padding: 16 },
  header: { fontSize: 22, fontWeight: '800', color: colors.ink, marginBottom: 10 },
  tabs: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 },
  tab: { backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 14 },
  tabOn: { backgroundColor: colors.sun },
  tabText: { fontWeight: '700', fontSize: 12, color: colors.inkSoft },
  tabTextOn: { color: colors.ink },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: colors.ink },
  emptySub: { fontSize: 14, color: colors.inkSoft, marginTop: 6, textAlign: 'center', paddingHorizontal: 20 },
  clearAllBtn: { alignSelf: 'flex-end', paddingHorizontal: 12, paddingVertical: 6, marginBottom: 8 },
  clearAllText: { fontSize: 12, fontWeight: '700', color: colors.berry },
  savedCard: { flex: 1, margin: 6, backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', maxWidth: '48%' },
  savedImage: { width: '100%', aspectRatio: 1, backgroundColor: '#f0f0f0' },
  savedTitle: { fontWeight: '700', fontSize: 12, color: colors.ink, paddingHorizontal: 8, paddingTop: 6 },
  savedDate: { fontSize: 10, color: colors.inkSoft, paddingHorizontal: 8, paddingBottom: 8 },
  addPhotoBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.berry, borderRadius: radii.lg, paddingVertical: 14, marginBottom: 14 },
  addPhotoEmoji: { fontSize: 18 },
  addPhotoText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  processingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 10 },
  processingText: { fontSize: 13, fontWeight: '700', color: colors.ink },
  customThumbWrap: { width: 100, marginRight: 12, marginBottom: 14 },
  customThumbImage: { width: 100, height: 100, borderRadius: radii.md, backgroundColor: '#f0f0f0' },
  customThumbTitle: { fontFamily: 'System', fontWeight: '700', fontSize: 12, marginTop: 4, textAlign: 'center', color: colors.ink },
  offscreen: { position: 'absolute', left: -2000, top: -2000 },
});
