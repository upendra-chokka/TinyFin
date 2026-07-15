import { ColoringPage } from './shapeTypes';
import { dinosaurPages, mammalPages, animalPages, peoplePages, thingsPages, plantPages } from './extraPages';

// 20 hand-composed scenes. First 6 are free; rest are marked premium so you
// have a ready-made paywall boundary once you decide on a monetization model.
const scenesPages: ColoringPage[] = [
  {
    id: 'scene-sun', title: 'Sunny Day', category: 'scenes', premium: false, viewBox: 400,
    shapes: [
      { type: 'circle', cx: 200, cy: 160, r: 55 },
      ...[0, 1, 2, 3, 4, 5, 6, 7].map((i): import('./shapeTypes').Shape => {
        const a = (i * Math.PI) / 4;
        return { type: 'line', x1: 200 + 70 * Math.cos(a), y1: 160 + 70 * Math.sin(a), x2: 200 + 100 * Math.cos(a), y2: 160 + 100 * Math.sin(a) };
      }),
      { type: 'rect', x: 0, y: 320, w: 400, h: 80 },
    ],
  },
  {
    id: 'scene-flower', title: 'Big Flower', category: 'scenes', premium: false, viewBox: 400,
    shapes: [
      { type: 'circle', cx: 200, cy: 170, r: 24 },
      ...[0, 1, 2, 3, 4, 5].map((i): import('./shapeTypes').Shape => {
        const a = (i * Math.PI) / 3;
        return { type: 'circle', cx: 200 + 60 * Math.cos(a), cy: 170 + 60 * Math.sin(a), r: 32 };
      }),
      { type: 'line', x1: 200, y1: 210, x2: 200, y2: 350 },
      { type: 'path', d: 'M160 280 Q120 290 150 320' },
      { type: 'path', d: 'M240 300 Q280 310 250 335' },
    ],
  },
  {
    id: 'scene-fish', title: 'Little Fish', category: 'scenes', premium: false, viewBox: 400,
    shapes: [
      { type: 'ellipse', cx: 210, cy: 200, rx: 100, ry: 60 },
      { type: 'triangle', x1: 110, y1: 200, x2: 50, y2: 155, x3: 50, y3: 245 },
      { type: 'circle', cx: 270, cy: 190, r: 8 },
      { type: 'path', d: 'M180 160 Q210 130 240 155' },
    ],
  },
  {
    id: 'scene-house', title: 'Little House', category: 'scenes', premium: false, viewBox: 400,
    shapes: [
      { type: 'rect', x: 100, y: 190, w: 200, h: 150 },
      { type: 'triangle', x1: 85, y1: 190, x2: 200, y2: 100, x3: 315, y3: 190 },
      { type: 'rect', x: 180, y: 260, w: 60, h: 80 },
      { type: 'rect', x: 120, y: 210, w: 45, h: 45 },
      { type: 'rect', x: 235, y: 210, w: 45, h: 45 },
      { type: 'rect', x: 260, y: 130, w: 18, h: 40 },
    ],
  },
  {
    id: 'scene-butterfly', title: 'Butterfly', category: 'scenes', premium: false, viewBox: 400,
    shapes: [
      { type: 'line', x1: 200, y1: 130, x2: 200, y2: 280 },
      { type: 'path', d: 'M200 150 C130 110 80 150 90 200 C100 250 170 230 200 190 Z' },
      { type: 'path', d: 'M200 150 C270 110 320 150 310 200 C300 250 230 230 200 190 Z' },
      { type: 'path', d: 'M200 200 C150 220 120 250 140 280 C160 300 195 270 200 240 Z' },
      { type: 'path', d: 'M200 200 C250 220 280 250 260 280 C240 300 205 270 200 240 Z' },
    ],
  },
  {
    id: 'scene-star', title: 'Wishing Star', category: 'scenes', premium: false, viewBox: 400,
    shapes: [{ type: 'path', d: starPath(200, 190, 120, 50, 5) }],
  },
  {
    id: 'scene-heart', title: 'Big Heart', category: 'scenes', premium: true, viewBox: 400,
    shapes: [{ type: 'path', d: 'M200 320 C60 220 90 100 200 150 C310 100 340 220 200 320 Z' }],
  },
  {
    id: 'scene-tree', title: 'Apple Tree', category: 'scenes', premium: true, viewBox: 400,
    shapes: [
      { type: 'rect', x: 185, y: 240, w: 30, h: 110 },
      { type: 'circle', cx: 200, cy: 170, r: 100 },
      { type: 'circle', cx: 160, cy: 200, r: 10 },
      { type: 'circle', cx: 230, cy: 150, r: 10 },
      { type: 'circle', cx: 210, cy: 210, r: 10 },
    ],
  },
  {
    id: 'scene-cat', title: 'Sitting Cat', category: 'scenes', premium: true, viewBox: 400,
    shapes: [
      { type: 'circle', cx: 200, cy: 190, r: 60 },
      { type: 'triangle', x1: 155, y1: 150, x2: 165, y2: 100, x3: 185, y3: 150 },
      { type: 'triangle', x1: 245, y1: 150, x2: 235, y2: 100, x3: 215, y3: 150 },
      { type: 'ellipse', cx: 200, cy: 300, rx: 90, ry: 70 },
      { type: 'path', d: 'M290 300 Q340 280 330 240' },
      { type: 'circle', cx: 178, cy: 185, r: 6 },
      { type: 'circle', cx: 222, cy: 185, r: 6 },
    ],
  },
  {
    id: 'scene-dog', title: 'Happy Dog', category: 'scenes', premium: true, viewBox: 400,
    shapes: [
      { type: 'ellipse', cx: 200, cy: 210, rx: 70, ry: 60 },
      { type: 'ellipse', cx: 145, cy: 175, rx: 28, ry: 45 },
      { type: 'ellipse', cx: 255, cy: 175, rx: 28, ry: 45 },
      { type: 'ellipse', cx: 200, cy: 300, rx: 95, ry: 65 },
      { type: 'circle', cx: 175, cy: 200, r: 6 },
      { type: 'circle', cx: 225, cy: 200, r: 6 },
      { type: 'circle', cx: 200, cy: 225, r: 8 },
    ],
  },
  {
    id: 'scene-boat', title: 'Sail Boat', category: 'scenes', premium: true, viewBox: 400,
    shapes: [
      { type: 'triangle', x1: 120, y1: 280, x2: 280, y2: 280, x3: 240, y3: 330 },
      { type: 'line', x1: 200, y1: 280, x2: 200, y2: 130 },
      { type: 'triangle', x1: 200, y1: 140, x2: 200, y2: 270, x3: 130, y3: 270 },
      { type: 'triangle', x1: 200, y1: 160, x2: 200, y2: 270, x3: 260, y3: 270 },
      { type: 'path', d: 'M60 300 Q100 280 140 300 Q180 320 220 300 Q260 280 300 300 Q330 315 350 300' },
    ],
  },
  {
    id: 'scene-car', title: 'Little Car', category: 'scenes', premium: true, viewBox: 400,
    shapes: [
      { type: 'rect', x: 90, y: 210, w: 220, h: 60, rx: 14 },
      { type: 'path', d: 'M130 210 L155 160 L255 160 L280 210 Z' },
      { type: 'circle', cx: 145, cy: 275, r: 28 },
      { type: 'circle', cx: 265, cy: 275, r: 28 },
      { type: 'rect', x: 170, y: 172, w: 60, h: 30 },
    ],
  },
  {
    id: 'scene-balloon', title: 'Balloon Bunch', category: 'scenes', premium: true, viewBox: 400,
    shapes: [
      { type: 'circle', cx: 150, cy: 150, r: 50 },
      { type: 'circle', cx: 230, cy: 130, r: 45 },
      { type: 'circle', cx: 190, cy: 220, r: 55 },
      { type: 'line', x1: 150, y1: 200, x2: 190, y2: 330 },
      { type: 'line', x1: 230, y1: 175, x2: 190, y2: 330 },
      { type: 'line', x1: 190, y1: 275, x2: 190, y2: 330 },
    ],
  },
  {
    id: 'scene-cake', title: 'Birthday Cake', category: 'scenes', premium: true, viewBox: 400,
    shapes: [
      { type: 'rect', x: 110, y: 240, w: 180, h: 90, rx: 8 },
      { type: 'rect', x: 130, y: 190, w: 140, h: 60, rx: 8 },
      { type: 'line', x1: 200, y1: 190, x2: 200, y2: 150 },
      { type: 'path', d: 'M195 150 Q185 130 200 120 Q215 130 205 150' },
      { type: 'path', d: 'M110 240 Q140 220 170 240 T230 240 T290 240' },
    ],
  },
  {
    id: 'scene-umbrella', title: 'Rainy Day', category: 'scenes', premium: true, viewBox: 400,
    shapes: [
      { type: 'path', d: 'M90 200 A110 90 0 0 1 310 200 Z' },
      { type: 'line', x1: 200, y1: 200, x2: 200, y2: 320 },
      { type: 'path', d: 'M200 320 Q220 340 200 350' },
      { type: 'line', x1: 130, y1: 200, x2: 130, y2: 215 },
      { type: 'line', x1: 200, y1: 200, x2: 200, y2: 218 },
      { type: 'line', x1: 270, y1: 200, x2: 270, y2: 215 },
    ],
  },
  {
    id: 'scene-rainbow', title: 'Rainbow & Clouds', category: 'scenes', premium: true, viewBox: 400,
    shapes: [
      { type: 'path', d: 'M60 300 A140 140 0 0 1 340 300' },
      { type: 'path', d: 'M100 300 A100 100 0 0 1 300 300' },
      { type: 'path', d: 'M140 300 A60 60 0 0 1 260 300' },
      { type: 'circle', cx: 90, cy: 300, r: 30 },
      { type: 'circle', cx: 130, cy: 285, r: 24 },
      { type: 'circle', cx: 310, cy: 300, r: 28 },
    ],
  },
  {
    id: 'scene-bee', title: 'Busy Bee', category: 'scenes', premium: true, viewBox: 400,
    shapes: [
      { type: 'ellipse', cx: 200, cy: 220, rx: 70, ry: 45 },
      { type: 'line', x1: 150, y1: 190, x2: 150, y2: 250 },
      { type: 'line', x1: 185, y1: 185, x2: 185, y2: 255 },
      { type: 'line', x1: 220, y1: 185, x2: 220, y2: 255 },
      { type: 'circle', cx: 130, cy: 190, r: 30 },
      { type: 'path', d: 'M150 180 Q100 140 70 165' },
      { type: 'path', d: 'M110 180 Q90 130 55 145' },
      { type: 'ellipse', cx: 230, cy: 170, rx: 35, ry: 22 },
      { type: 'ellipse', cx: 250, cy: 195, rx: 35, ry: 22 },
    ],
  },
  {
    id: 'scene-rocket', title: 'Rocket Ship', category: 'scenes', premium: true, viewBox: 400,
    shapes: [
      { type: 'path', d: 'M200 90 C240 130 250 220 250 260 L150 260 C150 220 160 130 200 90 Z' },
      { type: 'circle', cx: 200, cy: 190, r: 22 },
      { type: 'triangle', x1: 150, y1: 240, x2: 100, y2: 300, x3: 150, y3: 260 },
      { type: 'triangle', x1: 250, y1: 240, x2: 300, y2: 300, x3: 250, y3: 260 },
      { type: 'path', d: 'M175 260 L200 320 L225 260' },
    ],
  },
  {
    id: 'scene-whale', title: 'Friendly Whale', category: 'scenes', premium: true, viewBox: 400,
    shapes: [
      { type: 'path', d: 'M60 220 C60 170 130 140 220 150 C300 158 340 190 340 220 C340 250 290 270 220 270 C130 270 60 260 60 220 Z' },
      { type: 'path', d: 'M300 190 Q330 160 350 175 Q330 195 320 210' },
      { type: 'circle', cx: 250, cy: 190, r: 8 },
      { type: 'path', d: 'M150 145 Q160 110 145 90' },
      { type: 'path', d: 'M170 145 Q185 105 175 85' },
    ],
  },
  {
    id: 'scene-owl', title: 'Wise Owl', category: 'scenes', premium: true, viewBox: 400,
    shapes: [
      { type: 'ellipse', cx: 200, cy: 220, rx: 90, ry: 100 },
      { type: 'circle', cx: 170, cy: 190, r: 32 },
      { type: 'circle', cx: 230, cy: 190, r: 32 },
      { type: 'circle', cx: 170, cy: 190, r: 10 },
      { type: 'circle', cx: 230, cy: 190, r: 10 },
      { type: 'triangle', x1: 195, y1: 210, x2: 205, y2: 210, x3: 200, y3: 230 },
      { type: 'triangle', x1: 150, y1: 140, x2: 165, y2: 110, x3: 178, y3: 145 },
      { type: 'triangle', x1: 250, y1: 140, x2: 235, y2: 110, x3: 222, y3: 145 },
    ],
  },
];

function starPath(cx: number, cy: number, rOuter: number, rInner: number, points: number) {
  let d = '';
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? rOuter : rInner;
    const a = (Math.PI * i) / points - Math.PI / 2;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    d += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1) + ' ';
  }
  return d + 'Z';
}


// Combined export of all coloring pages
export const curatedPages: ColoringPage[] = [
  ...scenesPages,
  ...dinosaurPages,
  ...mammalPages,
  ...animalPages,
  ...peoplePages,
  ...thingsPages,
  ...plantPages,
];
