/**
 * Photo preparation for the Custom coloring tab.
 *
 * History: earlier versions tried to auto-convert photos into coloring-book
 * outlines using Skia color matrices, then a Sobel edge-detection shader.
 * Neither produced reliable results on-device (blank/blackish output), so
 * this now does the one thing that's actually reliable: resize the photo to
 * a sane size so it doesn't bloat storage/memory, and nothing more. Kids
 * draw with the marker/crayon/brush tools directly over the real photo.
 */

import * as ImageManipulator from 'expo-image-manipulator';

const MAX_DIMENSION = 1000;

export interface ProcessedPhoto {
  uri: string;
  width: number;
  height: number;
}

/**
 * Resize a photo so its longest side is at most MAX_DIMENSION, preserving
 * aspect ratio. IMPORTANT: only pass ONE of width/height to
 * expo-image-manipulator's resize — passing both stretches the image to
 * that exact box, distorting anything not already square.
 */
export async function preparePhotoForCanvas(sourceUri: string): Promise<ProcessedPhoto> {
  const result = await ImageManipulator.manipulateAsync(
    sourceUri,
    [{ resize: { width: MAX_DIMENSION } }],
    { compress: 0.85, format: ImageManipulator.SaveFormat.JPEG },
  );

  return { uri: result.uri, width: result.width, height: result.height };
}
