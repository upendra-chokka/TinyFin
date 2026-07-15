import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

const KEYS = {
  premium: 'tinyfin.premium',
  completedPages: 'tinyfin.completedPages',
  savedArtworks: 'tinyfin.savedArtworks',
  importedWorksheets: 'tinyfin.importedWorksheets',
};

const SAVES_DIR = FileSystem.documentDirectory + 'tinyfin-saves/';

export interface SavedArtwork {
  id: string;
  title: string;
  /** file:// URI on disk — NOT a base64 string. */
  imageUri: string;
  savedAt: number;
}

export interface ImportedWorksheet {
  id: string;
  title: string;
  imageUri: string;
  savedAt: number;
}

async function ensureSavesDir() {
  const info = await FileSystem.getInfoAsync(SAVES_DIR);
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(SAVES_DIR, { intermediates: true });
  }
}

/**
 * Writes a base64 PNG snapshot to a file and returns its file:// URI.
 *
 * WHY THIS EXISTS (the crash fix): the previous approach stored the raw
 * base64 PNG string directly in AsyncStorage and rendered it as an inline
 * `data:image/png;base64,...` <Image>. A single device-resolution canvas
 * snapshot is several MB as base64. AsyncStorage has a hard ~6MB TOTAL
 * limit on Android, and every saved item stayed fully decoded in JS memory
 * whenever the Saved list mounted. That's why: save one → Saved works once;
 * open Patterns (heavy Skia thumbnails) → memory tips over → crash; and
 * from then on even Saved crashes because memory is already pressured.
 * Storing a small file path instead of the whole image fixes both.
 */
export async function saveSnapshotToFile(base64: string, idHint: string): Promise<string> {
  await ensureSavesDir();
  const path = `${SAVES_DIR}${idHint}.png`;
  await FileSystem.writeAsStringAsync(path, base64, { encoding: FileSystem.EncodingType.Base64 });
  return path;
}

export async function getIsPremium(): Promise<boolean> {
  const v = await AsyncStorage.getItem(KEYS.premium);
  return v === 'true';
}

export async function setIsPremium(value: boolean) {
  await AsyncStorage.setItem(KEYS.premium, value ? 'true' : 'false');
}

export async function markPageComplete(pageId: string) {
  const raw = await AsyncStorage.getItem(KEYS.completedPages);
  const list: string[] = raw ? JSON.parse(raw) : [];
  if (!list.includes(pageId)) {
    list.push(pageId);
    await AsyncStorage.setItem(KEYS.completedPages, JSON.stringify(list));
  }
  return list.length;
}

export async function getCompletedCount(): Promise<number> {
  const raw = await AsyncStorage.getItem(KEYS.completedPages);
  const list: string[] = raw ? JSON.parse(raw) : [];
  return list.length;
}

// --- Saved Artworks (imageUri = file:// path) ---

export async function saveArtwork(artwork: SavedArtwork): Promise<void> {
  const list = await getSavedArtworks();
  list.unshift(artwork);
  await AsyncStorage.setItem(KEYS.savedArtworks, JSON.stringify(list));
}

export async function getSavedArtworks(): Promise<SavedArtwork[]> {
  const raw = await AsyncStorage.getItem(KEYS.savedArtworks);
  const list: SavedArtwork[] = raw ? JSON.parse(raw) : [];
  // Drop entries whose backing file is gone (e.g. app reinstall wiped the
  // sandbox but a stale record somehow remained) so we never try to render
  // a missing image.
  const valid: SavedArtwork[] = [];
  for (const a of list) {
    if (a.imageUri && a.imageUri.startsWith('file')) {
      const info = await FileSystem.getInfoAsync(a.imageUri);
      if (info.exists) valid.push(a);
    }
  }
  if (valid.length !== list.length) {
    await AsyncStorage.setItem(KEYS.savedArtworks, JSON.stringify(valid));
  }
  return valid;
}

export async function deleteSavedArtwork(id: string): Promise<void> {
  const list = await getSavedArtworks();
  const target = list.find((a) => a.id === id);
  if (target) {
    try { await FileSystem.deleteAsync(target.imageUri, { idempotent: true }); } catch (e) {}
  }
  await AsyncStorage.setItem(KEYS.savedArtworks, JSON.stringify(list.filter((a) => a.id !== id)));
}

export async function clearAllSavedArtworks(): Promise<void> {
  const list = await getSavedArtworks();
  for (const a of list) {
    try { await FileSystem.deleteAsync(a.imageUri, { idempotent: true }); } catch (e) {}
  }
  await AsyncStorage.setItem(KEYS.savedArtworks, JSON.stringify([]));
}

// --- Custom (imported) Worksheets ---

export async function saveImportedWorksheet(ws: ImportedWorksheet): Promise<void> {
  const list = await getImportedWorksheets();
  list.unshift(ws);
  await AsyncStorage.setItem(KEYS.importedWorksheets, JSON.stringify(list));
}

export async function getImportedWorksheets(): Promise<ImportedWorksheet[]> {
  const raw = await AsyncStorage.getItem(KEYS.importedWorksheets);
  const list: ImportedWorksheet[] = raw ? JSON.parse(raw) : [];
  const valid: ImportedWorksheet[] = [];
  for (const w of list) {
    if (w.imageUri) {
      const info = await FileSystem.getInfoAsync(w.imageUri);
      if (info.exists) valid.push(w);
    }
  }
  if (valid.length !== list.length) {
    await AsyncStorage.setItem(KEYS.importedWorksheets, JSON.stringify(valid));
  }
  return valid;
}

export async function deleteImportedWorksheet(id: string): Promise<void> {
  const list = await getImportedWorksheets();
  const target = list.find((w) => w.id === id);
  if (target) {
    try { await FileSystem.deleteAsync(target.imageUri, { idempotent: true }); } catch (e) {}
  }
  await AsyncStorage.setItem(KEYS.importedWorksheets, JSON.stringify(list.filter((w) => w.id !== id)));
}

export async function clearAllImportedWorksheets(): Promise<void> {
  const list = await getImportedWorksheets();
  for (const w of list) {
    try { await FileSystem.deleteAsync(w.imageUri, { idempotent: true }); } catch (e) {}
  }
  await AsyncStorage.setItem(KEYS.importedWorksheets, JSON.stringify([]));
}
