/**
 * Image-to-outline converter.
 * Takes a photo URI (from gallery or camera), resizes it, then uses
 * expo-image-manipulator to convert it to grayscale. The Skia canvas
 * will apply a real-time edge-detection shader to render it as a
 * coloring-book outline on a white background.
 *
 * For the processed (pre-baked) approach we use manipulator to:
 * 1. Resize to a manageable square (800x800)
 * 2. Convert to grayscale via manipulator actions
 *
 * The actual edge/outline effect is rendered in the ImportCanvasScreen
 * via Skia's ColorMatrix and RuntimeShader for a crisp coloring-book look.
 */

import * as ImageManipulator from 'expo-image-manipulator';

const TARGET_SIZE = 800;

export interface ProcessedOutline {
  /** URI of the processed (resized, grayscale) image */
  uri: string;
  /** Width of processed image */
  width: number;
  /** Height of processed image */
  height: number;
}

/**
 * Process a source image into a grayscale, resized version ready for
 * Skia edge-detection rendering.
 */
export async function processImageToOutline(sourceUri: string): Promise<ProcessedOutline> {
  // Step 1: Resize to square and convert to grayscale-friendly format
  const result = await ImageManipulator.manipulateAsync(
    sourceUri,
    [
      { resize: { width: TARGET_SIZE, height: TARGET_SIZE } },
    ],
    { compress: 0.9, format: ImageManipulator.SaveFormat.PNG }
  );

  return {
    uri: result.uri,
    width: result.width,
    height: result.height,
  };
}

/**
 * Skia color matrix that converts an image to grayscale.
 * Applied as a ColorFilter in the Skia canvas, if you want a plain
 * grayscale preview before the edge-detect effect is applied.
 */
export const GRAYSCALE_MATRIX = [
  0.299, 0.587, 0.114, 0, 0,
  0.299, 0.587, 0.114, 0, 0,
  0.299, 0.587, 0.114, 0, 0,
  0, 0, 0, 1, 0,
];

// NOTE: an earlier version of this file also exported COLORING_BOOK_MATRIX /
// HIGH_CONTRAST_BW_MATRIX — a naive per-pixel brightness threshold that
// crushed anything below ~39% brightness straight to black. That's why
// imported photos were turning solid black: most real photos have plenty
// of midtone/shadow content below that cutoff. It's been removed in favor
// of the real Sobel edge-detection shader below, which is now wired
// directly into BrushCanvas.tsx as the background layer.

/**
 * Skia GLSL runtime shader source for Sobel edge detection.
 * This produces clean outlines from any image — the true coloring-book effect.
 * Used with Skia's RuntimeEffect.
 */
export const EDGE_DETECT_SHADER = `
uniform shader image;
uniform float2 resolution;
uniform float threshold;

half4 main(float2 coord) {
  float2 texel = 1.0 / resolution;
  
  // Sample 3x3 neighborhood (grayscale luminance)
  float tl = dot(image.eval(coord + float2(-texel.x, -texel.y)).rgb, half3(0.299, 0.587, 0.114));
  float t  = dot(image.eval(coord + float2(0.0, -texel.y)).rgb, half3(0.299, 0.587, 0.114));
  float tr = dot(image.eval(coord + float2(texel.x, -texel.y)).rgb, half3(0.299, 0.587, 0.114));
  float l  = dot(image.eval(coord + float2(-texel.x, 0.0)).rgb, half3(0.299, 0.587, 0.114));
  float r  = dot(image.eval(coord + float2(texel.x, 0.0)).rgb, half3(0.299, 0.587, 0.114));
  float bl = dot(image.eval(coord + float2(-texel.x, texel.y)).rgb, half3(0.299, 0.587, 0.114));
  float b  = dot(image.eval(coord + float2(0.0, texel.y)).rgb, half3(0.299, 0.587, 0.114));
  float br = dot(image.eval(coord + float2(texel.x, texel.y)).rgb, half3(0.299, 0.587, 0.114));
  
  // Sobel operators
  float gx = -tl - 2.0*l - bl + tr + 2.0*r + br;
  float gy = -tl - 2.0*t - tr + bl + 2.0*b + br;
  float edge = sqrt(gx*gx + gy*gy);
  
  // Threshold to get clean lines
  float line = edge > threshold ? 0.0 : 1.0;
  
  return half4(line, line, line, 1.0);
}
`;
