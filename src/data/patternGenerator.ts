import { ColoringPage, Shape } from './shapeTypes';

// Deterministic seeded RNG (mulberry32) so "Mandala #47" always looks the same.
function rng(seed: number) {
  let a = seed;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CX = 200, CY = 200;

/**
 * Generates a symmetric mandala from a seed. Petal count, ring count, and
 * motif shape all vary, so consecutive seeds look genuinely different while
 * staying reproducible — this is what lets the library scale to "hundreds"
 * of pages without hand-authoring each one.
 */
export function generateMandala(seed: number): ColoringPage {
  const rand = rng(seed);
  const symmetry = 6 + Math.floor(rand() * 4); // 6..9 fold (was up to 12)
  const rings = 2 + Math.floor(rand() * 2); // 2..3 rings (was up to 5)
  const motif = Math.floor(rand() * 3); // petal / diamond / leaf
  const shapes: Shape[] = [{ type: 'circle', cx: CX, cy: CY, r: 14 }];

  for (let ring = 1; ring <= rings; ring++) {
    const radius = 20 + ring * (150 / rings);
    const size = 16 + rand() * 14;
    for (let i = 0; i < symmetry; i++) {
      const a = (i / symmetry) * Math.PI * 2 + ring * 0.15;
      const x = CX + radius * Math.cos(a);
      const y = CY + radius * Math.sin(a);
      if (motif === 0) {
        shapes.push({ type: 'circle', cx: x, cy: y, r: size * 0.55 });
      } else if (motif === 1) {
        shapes.push({
          type: 'path',
          d: `M${x} ${y - size} L${x + size} ${y} L${x} ${y + size} L${x - size} ${y} Z`,
        });
      } else {
        const a2 = a + Math.PI / symmetry;
        shapes.push({
          type: 'path',
          d: `M${x} ${y} Q${x + size} ${y - size} ${CX + (radius + size * 2) * Math.cos(a2)} ${CY + (radius + size * 2) * Math.sin(a2)}`,
        });
      }
    }
    shapes.push({ type: 'circle', cx: CX, cy: CY, r: radius + size * 0.9 });
  }

  return {
    id: `mandala-${seed}`,
    title: `Mandala #${seed}`,
    category: 'mandalas',
    premium: seed > 20, // first 20 mandalas free, rest gated
    viewBox: 400,
    shapes,
  };
}

/** Simple repeating geometric tile patterns — good for younger kids / easy fills. */
export function generatePattern(seed: number): ColoringPage {
  const rand = rng(seed * 7919 + 13);
  const kind = Math.floor(rand() * 4);
  const shapes: Shape[] = [];
  const cell = 65 + Math.floor(rand() * 30);

  if (kind === 0) {
    // grid of circles
    for (let y = cell / 2; y < 400; y += cell) {
      for (let x = cell / 2; x < 400; x += cell) {
        shapes.push({ type: 'circle', cx: x, cy: y, r: cell * 0.35 });
      }
    }
  } else if (kind === 1) {
    // diagonal stripes
    for (let x = -400; x < 400; x += cell) {
      shapes.push({ type: 'line', x1: x, y1: 0, x2: x + 400, y2: 400 });
    }
  } else if (kind === 2) {
    // grid of squares
    for (let y = 0; y < 400; y += cell) {
      for (let x = 0; x < 400; x += cell) {
        shapes.push({ type: 'rect', x, y, w: cell * 0.8, h: cell * 0.8, rx: 6 });
      }
    }
  } else {
    // wave rows
    for (let y = cell; y < 400; y += cell) {
      let d = `M0 ${y}`;
      for (let x = 0; x <= 400; x += cell / 2) {
        d += ` Q${x + cell / 4} ${y + (x / cell) % 2 === 0 ? cell / 2 : -cell / 2} ${x + cell / 2} ${y}`;
      }
      shapes.push({ type: 'path', d });
    }
  }

  return {
    id: `pattern-${seed}`,
    title: `Pattern #${seed}`,
    category: 'patterns',
    premium: seed > 20,
    viewBox: 400,
    shapes,
  };
}

export function getMandalaPage(seed: number) { return generateMandala(seed); }
export function getPatternPage(seed: number) { return generatePattern(seed); }
