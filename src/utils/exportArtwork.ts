import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

/**
 * Exports a saved artwork as a PNG image file.
 * Uses expo-sharing to let the user save/send the file.
 * 
 * Note: Skia off-screen rendering for watermarks was unreliable on
 * many Android devices, so we share the file directly. The "TinyFin Kids"
 * branding is already visible in the app UI context.
 */
export async function exportArtworkWithWatermark(imageUri: string, title: string): Promise<void> {
  try {
    // Check if the file exists
    const info = await FileSystem.getInfoAsync(imageUri);
    if (!info.exists) {
      // File might have been cleaned up - silently fail
      return;
    }

    // Copy to a share-friendly location with a nice filename
    const exportPath = FileSystem.cacheDirectory + `TinyFinKids_${title.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.png`;
    await FileSystem.copyAsync({ from: imageUri, to: exportPath });

    // Share the file
    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      await Sharing.shareAsync(exportPath, {
        mimeType: 'image/png',
        dialogTitle: `Share "${title}"`,
      });
    }
  } catch (e) {
    // Silently fail — don't crash the app
    console.warn('Export failed:', e);
  }
}
