export type Shape =
  | { type: 'circle'; cx: number; cy: number; r: number }
  | { type: 'ellipse'; cx: number; cy: number; rx: number; ry: number }
  | { type: 'rect'; x: number; y: number; w: number; h: number; rx?: number }
  | { type: 'line'; x1: number; y1: number; x2: number; y2: number }
  | { type: 'triangle'; x1: number; y1: number; x2: number; y2: number; x3: number; y3: number }
  | { type: 'path'; d: string } // raw SVG path data, rendered via Skia.Path.MakeFromSVGString
  | { type: 'polyline'; points: [number, number][] };

export interface ColoringPage {
  id: string;
  title: string;
  category: 'scenes' | 'mandalas' | 'patterns' | 'dinosaurs' | 'mammals' | 'animals' | 'people' | 'things' | 'plants';
  premium: boolean;
  viewBox: number; // square canvas, e.g. 400 -> 400x400
  shapes: Shape[];
}
