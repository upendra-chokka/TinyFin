/**
 * Stroke-order arrow guides for tracing letters and numbers.
 * Each entry has an array of strokes. Each stroke is an array of {x, y} points
 * representing the path (as percentages of the canvas, 0-100).
 * The first point is the start (shown with a dot), arrows along the path show direction.
 */

export interface TracePoint { x: number; y: number; }
export interface TraceStroke { points: TracePoint[]; label?: string; }
export interface TraceGuide { char: string; strokes: TraceStroke[]; }

export const traceGuides: Record<string, TraceGuide> = {
  // Numbers
  '1': {
    char: '1',
    strokes: [
      { points: [{ x: 45, y: 20 }, { x: 50, y: 20 }, { x: 50, y: 80 }], label: '1' },
    ],
  },
  '2': {
    char: '2',
    strokes: [
      { points: [{ x: 30, y: 30 }, { x: 50, y: 20 }, { x: 70, y: 30 }, { x: 70, y: 45 }, { x: 30, y: 80 }, { x: 70, y: 80 }], label: '1' },
    ],
  },
  '3': {
    char: '3',
    strokes: [
      { points: [{ x: 30, y: 25 }, { x: 60, y: 20 }, { x: 70, y: 35 }, { x: 50, y: 50 }], label: '1' },
      { points: [{ x: 50, y: 50 }, { x: 70, y: 65 }, { x: 60, y: 80 }, { x: 30, y: 78 }], label: '2' },
    ],
  },
  '4': {
    char: '4',
    strokes: [
      { points: [{ x: 60, y: 20 }, { x: 30, y: 60 }, { x: 72, y: 60 }], label: '1' },
      { points: [{ x: 60, y: 20 }, { x: 60, y: 80 }], label: '2' },
    ],
  },
  '5': {
    char: '5',
    strokes: [
      { points: [{ x: 65, y: 20 }, { x: 35, y: 20 }, { x: 35, y: 48 }], label: '1' },
      { points: [{ x: 35, y: 48 }, { x: 60, y: 44 }, { x: 72, y: 58 }, { x: 60, y: 78 }, { x: 35, y: 75 }], label: '2' },
    ],
  },
  '6': {
    char: '6',
    strokes: [
      { points: [{ x: 60, y: 22 }, { x: 40, y: 30 }, { x: 30, y: 55 }, { x: 35, y: 75 }, { x: 55, y: 80 }, { x: 68, y: 68 }, { x: 65, y: 55 }, { x: 45, y: 50 }, { x: 32, y: 58 }], label: '1' },
    ],
  },
  '7': {
    char: '7',
    strokes: [
      { points: [{ x: 30, y: 20 }, { x: 70, y: 20 }, { x: 45, y: 80 }], label: '1' },
    ],
  },
  '8': {
    char: '8',
    strokes: [
      { points: [{ x: 50, y: 50 }, { x: 35, y: 35 }, { x: 50, y: 20 }, { x: 65, y: 35 }, { x: 50, y: 50 }], label: '1' },
      { points: [{ x: 50, y: 50 }, { x: 30, y: 65 }, { x: 50, y: 80 }, { x: 70, y: 65 }, { x: 50, y: 50 }], label: '2' },
    ],
  },
  '9': {
    char: '9',
    strokes: [
      { points: [{ x: 65, y: 42 }, { x: 55, y: 22 }, { x: 38, y: 28 }, { x: 35, y: 42 }, { x: 50, y: 50 }, { x: 65, y: 42 }], label: '1' },
      { points: [{ x: 65, y: 42 }, { x: 60, y: 65 }, { x: 45, y: 80 }], label: '2' },
    ],
  },
  '10': {
    char: '10',
    strokes: [
      { points: [{ x: 25, y: 20 }, { x: 25, y: 80 }], label: '1' },
      { points: [{ x: 55, y: 20 }, { x: 45, y: 30 }, { x: 40, y: 50 }, { x: 45, y: 70 }, { x: 55, y: 80 }, { x: 65, y: 70 }, { x: 70, y: 50 }, { x: 65, y: 30 }, { x: 55, y: 20 }], label: '2' },
    ],
  },
  // Letters
  'A': {
    char: 'A',
    strokes: [
      { points: [{ x: 30, y: 80 }, { x: 50, y: 20 }, { x: 70, y: 80 }], label: '1' },
      { points: [{ x: 38, y: 55 }, { x: 62, y: 55 }], label: '2' },
    ],
  },
  'B': {
    char: 'B',
    strokes: [
      { points: [{ x: 35, y: 20 }, { x: 35, y: 80 }], label: '1' },
      { points: [{ x: 35, y: 20 }, { x: 60, y: 20 }, { x: 68, y: 35 }, { x: 55, y: 50 }, { x: 35, y: 50 }], label: '2' },
      { points: [{ x: 35, y: 50 }, { x: 60, y: 50 }, { x: 70, y: 65 }, { x: 55, y: 80 }, { x: 35, y: 80 }], label: '3' },
    ],
  },
  'C': {
    char: 'C',
    strokes: [
      { points: [{ x: 68, y: 28 }, { x: 50, y: 20 }, { x: 35, y: 35 }, { x: 30, y: 50 }, { x: 35, y: 65 }, { x: 50, y: 80 }, { x: 68, y: 72 }], label: '1' },
    ],
  },
  'D': {
    char: 'D',
    strokes: [
      { points: [{ x: 35, y: 20 }, { x: 35, y: 80 }], label: '1' },
      { points: [{ x: 35, y: 20 }, { x: 55, y: 22 }, { x: 70, y: 40 }, { x: 70, y: 60 }, { x: 55, y: 78 }, { x: 35, y: 80 }], label: '2' },
    ],
  },
  'E': {
    char: 'E',
    strokes: [
      { points: [{ x: 65, y: 20 }, { x: 35, y: 20 }, { x: 35, y: 80 }, { x: 65, y: 80 }], label: '1' },
      { points: [{ x: 35, y: 50 }, { x: 58, y: 50 }], label: '2' },
    ],
  },
  'F': {
    char: 'F',
    strokes: [
      { points: [{ x: 65, y: 20 }, { x: 35, y: 20 }, { x: 35, y: 80 }], label: '1' },
      { points: [{ x: 35, y: 50 }, { x: 58, y: 50 }], label: '2' },
    ],
  },
  'G': {
    char: 'G',
    strokes: [
      { points: [{ x: 68, y: 28 }, { x: 50, y: 20 }, { x: 35, y: 35 }, { x: 30, y: 50 }, { x: 35, y: 65 }, { x: 50, y: 80 }, { x: 68, y: 72 }, { x: 68, y: 50 }, { x: 52, y: 50 }], label: '1' },
    ],
  },
  'H': {
    char: 'H',
    strokes: [
      { points: [{ x: 35, y: 20 }, { x: 35, y: 80 }], label: '1' },
      { points: [{ x: 65, y: 20 }, { x: 65, y: 80 }], label: '2' },
      { points: [{ x: 35, y: 50 }, { x: 65, y: 50 }], label: '3' },
    ],
  },
  'I': {
    char: 'I',
    strokes: [
      { points: [{ x: 50, y: 20 }, { x: 50, y: 80 }], label: '1' },
      { points: [{ x: 40, y: 20 }, { x: 60, y: 20 }], label: '2' },
      { points: [{ x: 40, y: 80 }, { x: 60, y: 80 }], label: '3' },
    ],
  },
  'J': {
    char: 'J',
    strokes: [
      { points: [{ x: 60, y: 20 }, { x: 60, y: 68 }, { x: 50, y: 80 }, { x: 38, y: 72 }], label: '1' },
    ],
  },
  'K': {
    char: 'K',
    strokes: [
      { points: [{ x: 35, y: 20 }, { x: 35, y: 80 }], label: '1' },
      { points: [{ x: 65, y: 20 }, { x: 35, y: 50 }, { x: 65, y: 80 }], label: '2' },
    ],
  },
  'L': {
    char: 'L',
    strokes: [
      { points: [{ x: 35, y: 20 }, { x: 35, y: 80 }, { x: 65, y: 80 }], label: '1' },
    ],
  },
  'M': {
    char: 'M',
    strokes: [
      { points: [{ x: 28, y: 80 }, { x: 28, y: 20 }, { x: 50, y: 55 }, { x: 72, y: 20 }, { x: 72, y: 80 }], label: '1' },
    ],
  },
  'N': {
    char: 'N',
    strokes: [
      { points: [{ x: 35, y: 80 }, { x: 35, y: 20 }, { x: 65, y: 80 }, { x: 65, y: 20 }], label: '1' },
    ],
  },
  'O': {
    char: 'O',
    strokes: [
      { points: [{ x: 50, y: 20 }, { x: 35, y: 30 }, { x: 30, y: 50 }, { x: 35, y: 70 }, { x: 50, y: 80 }, { x: 65, y: 70 }, { x: 70, y: 50 }, { x: 65, y: 30 }, { x: 50, y: 20 }], label: '1' },
    ],
  },
  'P': {
    char: 'P',
    strokes: [
      { points: [{ x: 35, y: 20 }, { x: 35, y: 80 }], label: '1' },
      { points: [{ x: 35, y: 20 }, { x: 60, y: 20 }, { x: 70, y: 35 }, { x: 60, y: 50 }, { x: 35, y: 50 }], label: '2' },
    ],
  },
  'Q': {
    char: 'Q',
    strokes: [
      { points: [{ x: 50, y: 20 }, { x: 35, y: 30 }, { x: 30, y: 50 }, { x: 35, y: 70 }, { x: 50, y: 80 }, { x: 65, y: 70 }, { x: 70, y: 50 }, { x: 65, y: 30 }, { x: 50, y: 20 }], label: '1' },
      { points: [{ x: 58, y: 65 }, { x: 72, y: 82 }], label: '2' },
    ],
  },
  'R': {
    char: 'R',
    strokes: [
      { points: [{ x: 35, y: 20 }, { x: 35, y: 80 }], label: '1' },
      { points: [{ x: 35, y: 20 }, { x: 60, y: 20 }, { x: 70, y: 35 }, { x: 60, y: 50 }, { x: 35, y: 50 }], label: '2' },
      { points: [{ x: 52, y: 50 }, { x: 68, y: 80 }], label: '3' },
    ],
  },
  'S': {
    char: 'S',
    strokes: [
      { points: [{ x: 65, y: 28 }, { x: 50, y: 20 }, { x: 35, y: 30 }, { x: 38, y: 42 }, { x: 50, y: 50 }, { x: 62, y: 58 }, { x: 65, y: 70 }, { x: 50, y: 80 }, { x: 35, y: 72 }], label: '1' },
    ],
  },
  'T': {
    char: 'T',
    strokes: [
      { points: [{ x: 30, y: 20 }, { x: 70, y: 20 }], label: '1' },
      { points: [{ x: 50, y: 20 }, { x: 50, y: 80 }], label: '2' },
    ],
  },
  'U': {
    char: 'U',
    strokes: [
      { points: [{ x: 35, y: 20 }, { x: 35, y: 65 }, { x: 50, y: 80 }, { x: 65, y: 65 }, { x: 65, y: 20 }], label: '1' },
    ],
  },
  'V': {
    char: 'V',
    strokes: [
      { points: [{ x: 30, y: 20 }, { x: 50, y: 80 }, { x: 70, y: 20 }], label: '1' },
    ],
  },
  'W': {
    char: 'W',
    strokes: [
      { points: [{ x: 22, y: 20 }, { x: 35, y: 80 }, { x: 50, y: 45 }, { x: 65, y: 80 }, { x: 78, y: 20 }], label: '1' },
    ],
  },
  'X': {
    char: 'X',
    strokes: [
      { points: [{ x: 30, y: 20 }, { x: 70, y: 80 }], label: '1' },
      { points: [{ x: 70, y: 20 }, { x: 30, y: 80 }], label: '2' },
    ],
  },
  'Y': {
    char: 'Y',
    strokes: [
      { points: [{ x: 30, y: 20 }, { x: 50, y: 50 }], label: '1' },
      { points: [{ x: 70, y: 20 }, { x: 50, y: 50 }, { x: 50, y: 80 }], label: '2' },
    ],
  },
  'Z': {
    char: 'Z',
    strokes: [
      { points: [{ x: 30, y: 20 }, { x: 70, y: 20 }, { x: 30, y: 80 }, { x: 70, y: 80 }], label: '1' },
    ],
  },
};
