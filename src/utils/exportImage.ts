import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

/**
 * Shares an already-saved artwork file via the OS share sheet. The
 * watermark is baked in at capture time by the WatermarkedArtwork
 * component (see components/WatermarkedArtwork.tsx) so there's nothing to
 * composite here — we just hand the file to the share sheet, from which the
 * user can save to Photos, send to WhatsApp, etc.
 */
export async function shareArtworkFile(fileUri: string): Promise<void> {
  const canShare = await Sharing.isAvailableAsync();
  if (!canShare) {
    throw new Error('Sharing is not available on this device.');
  }
  // Ensure the file exists before attempting to share.
  const info = await FileSystem.getInfoAsync(fileUri);
  if (!info.exists) {
    throw new Error('That image is no longer available.');
  }
  await Sharing.shareAsync(fileUri, {
    mimeType: 'image/png',
    dialogTitle: 'Share your TinyFin artwork',
  });
}
