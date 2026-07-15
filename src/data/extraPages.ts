import { ColoringPage, Shape } from './shapeTypes';

// --- DINOSAURS ---
export const dinosaurPages: ColoringPage[] = [
  {
    id: 'dino-trex', title: 'T-Rex', category: 'dinosaurs', premium: false, viewBox: 400,
    shapes: [
      { type: 'ellipse', cx: 190, cy: 230, rx: 75, ry: 55 }, // body
      { type: 'ellipse', cx: 285, cy: 165, rx: 55, ry: 42 }, // head
      { type: 'path', d: 'M330 150 L365 140 L360 160 L375 155 L368 172 L325 172 Z' }, // jaw/teeth
      { type: 'circle', cx: 300, cy: 155, r: 6 },
      { type: 'path', d: 'M240 200 Q210 210 195 230 Q205 235 220 225' }, // tiny arm
      { type: 'rect', x: 155, y: 275, w: 30, h: 70, rx: 10 },
      { type: 'rect', x: 205, y: 275, w: 30, h: 70, rx: 10 },
      { type: 'path', d: 'M120 240 Q70 250 40 280 Q60 270 90 260' }, // tail
      { type: 'path', d: 'M240 145 L255 118 L262 148' }, // head ridge
    ],
  },
  {
    id: 'dino-bronto', title: 'Brontosaurus', category: 'dinosaurs', premium: false, viewBox: 400,
    shapes: [
      { type: 'ellipse', cx: 190, cy: 240, rx: 105, ry: 62 }, // body
      { type: 'path', d: 'M270 210 Q320 175 335 130 Q340 110 325 105 Q330 125 310 150 Q290 180 260 205 Z' }, // neck
      { type: 'ellipse', cx: 330, cy: 100, rx: 26, ry: 20 },
      { type: 'circle', cx: 340, cy: 95, r: 4 },
      { type: 'path', d: 'M110 235 Q55 250 30 290 Q45 300 60 285 Q80 265 100 250' }, // tail
      { type: 'rect', x: 130, y: 285, w: 26, h: 55, rx: 10 },
      { type: 'rect', x: 175, y: 290, w: 26, h: 55, rx: 10 },
      { type: 'rect', x: 220, y: 290, w: 26, h: 55, rx: 10 },
      { type: 'rect', x: 255, y: 280, w: 26, h: 55, rx: 10 },
    ],
  },
  {
    id: 'dino-stego', title: 'Stegosaurus', category: 'dinosaurs', premium: false, viewBox: 400,
    shapes: [
      { type: 'ellipse', cx: 195, cy: 235, rx: 95, ry: 55 }, // body
      { type: 'ellipse', cx: 300, cy: 210, rx: 32, ry: 24 },
      { type: 'circle', cx: 315, cy: 205, r: 4 },
      { type: 'path', d: 'M140 190 L155 145 L170 190 Z' }, // back plates
      { type: 'path', d: 'M175 178 L192 128 L210 178 Z' },
      { type: 'path', d: 'M215 178 L232 130 L250 178 Z' },
      { type: 'path', d: 'M255 190 L268 150 L282 192 Z' },
      { type: 'rect', x: 145, y: 278, w: 24, h: 52, rx: 10 },
      { type: 'rect', x: 245, y: 278, w: 24, h: 52, rx: 10 },
      { type: 'path', d: 'M105 235 Q65 225 45 245' }, // tail
      { type: 'path', d: 'M45 235 L30 220 L38 245 L20 240 L35 260 Z' }, // tail spikes
    ],
  },
  {
    id: 'dino-ptero', title: 'Pterodactyl', category: 'dinosaurs', premium: false, viewBox: 400,
    shapes: [
      { type: 'ellipse', cx: 200, cy: 215, rx: 32, ry: 45 },
      { type: 'circle', cx: 200, cy: 152, r: 30 },
      { type: 'path', d: 'M226 148 L275 128 L232 168 Z' },
      { type: 'path', d: 'M182 128 Q170 95 192 90 Q188 110 195 125' },
      { type: 'circle', cx: 212, cy: 145, r: 4 },
      { type: 'path', d: 'M172 190 Q95 165 55 195 Q88 198 98 213 Q55 222 45 252 Q98 245 128 222 Q155 232 172 215 Z' },
      { type: 'path', d: 'M228 190 Q305 165 345 195 Q312 198 302 213 Q345 222 355 252 Q302 245 272 222 Q245 232 228 215 Z' },
      { type: 'path', d: 'M188 258 L182 288' },
      { type: 'path', d: 'M212 258 L218 288' },
    ],
  },
  {
    id: 'dino-triceratops', title: 'Triceratops', category: 'dinosaurs', premium: false, viewBox: 400,
    shapes: [
      { type: 'ellipse', cx: 175, cy: 240, rx: 85, ry: 58 }, // body
      { type: 'path', d: 'M255 165 Q320 145 335 195 Q340 235 290 245 Q255 240 250 205 Z' }, // frill
      { type: 'ellipse', cx: 285, cy: 210, rx: 40, ry: 32 },
      { type: 'path', d: 'M275 175 L268 145' }, // brow horns
      { type: 'path', d: 'M300 175 L308 145' },
      { type: 'path', d: 'M290 195 L305 175' }, // nose horn
      { type: 'circle', cx: 275, cy: 202, r: 5 },
      { type: 'rect', x: 125, y: 285, w: 26, h: 52, rx: 10 },
      { type: 'rect', x: 165, y: 288, w: 26, h: 52, rx: 10 },
      { type: 'rect', x: 210, y: 288, w: 26, h: 50, rx: 10 },
      { type: 'path', d: 'M95 240 Q60 245 45 260' }, // tail
    ],
  },
  {
    id: 'dino-raptor', title: 'Velociraptor', category: 'dinosaurs', premium: true, viewBox: 400,
    shapes: [
      { type: 'ellipse', cx: 190, cy: 225, rx: 62, ry: 40 },
      { type: 'path', d: 'M245 205 Q290 180 300 155 Q303 140 290 138' },
      { type: 'ellipse', cx: 292, cy: 148, rx: 24, ry: 18 },
      { type: 'path', d: 'M312 145 L340 138 L318 155 Z' },
      { type: 'circle', cx: 298, cy: 143, r: 3 },
      { type: 'path', d: 'M270 130 Q280 115 295 118' },
      { type: 'rect', x: 165, y: 258, w: 18, h: 55, rx: 8 },
      { type: 'path', d: 'M165 313 L155 300 L162 315 Z' },
      { type: 'rect', x: 205, y: 258, w: 18, h: 55, rx: 8 },
      { type: 'path', d: 'M205 313 L195 300 L202 315 Z' },
      { type: 'path', d: 'M135 220 Q90 225 65 255 Q75 262 90 250 Q110 235 130 225' },
    ],
  },
];

// --- MAMMALS ---
export const mammalPages: ColoringPage[] = [
  {
    id: 'mammal-elephant', title: 'Elephant', category: 'mammals', premium: false, viewBox: 400,
    shapes: [
      { type: 'ellipse', cx: 175, cy: 250, rx: 95, ry: 62 },
      { type: 'ellipse', cx: 300, cy: 195, rx: 55, ry: 60 },
      { type: 'ellipse', cx: 322, cy: 148, rx: 40, ry: 50 },
      { type: 'circle', cx: 285, cy: 185, r: 6 },
      { type: 'path', d: 'M270 220 Q252 262 232 288 Q222 302 238 302 Q253 302 253 288 Q272 262 282 228 Z' },
      { type: 'rect', x: 115, y: 300, w: 28, h: 55, rx: 10 },
      { type: 'rect', x: 158, y: 305, w: 28, h: 50, rx: 10 },
      { type: 'rect', x: 232, y: 305, w: 28, h: 50, rx: 10 },
      { type: 'rect', x: 268, y: 300, w: 28, h: 55, rx: 10 },
      { type: 'path', d: 'M85 250 Q65 258 70 285' },
    ],
  },
  {
    id: 'mammal-giraffe', title: 'Giraffe', category: 'mammals', premium: false, viewBox: 400,
    shapes: [
      { type: 'ellipse', cx: 225, cy: 285, rx: 78, ry: 45 },
      { type: 'path', d: 'M198 255 L178 100 Q178 85 197 85 L213 85 Q222 85 220 100 L230 255 Z' },
      { type: 'ellipse', cx: 197, cy: 74, rx: 32, ry: 25 },
      { type: 'circle', cx: 207, cy: 68, r: 4 },
      { type: 'path', d: 'M182 52 L178 35' },
      { type: 'circle', cx: 177, cy: 32, r: 6 },
      { type: 'path', d: 'M207 52 L211 35' },
      { type: 'circle', cx: 212, cy: 32, r: 6 },
      { type: 'path', d: 'M170 80 Q158 85 155 95' },
      { type: 'rect', x: 168, y: 325, w: 20, h: 55, rx: 8 },
      { type: 'rect', x: 198, y: 325, w: 20, h: 55, rx: 8 },
      { type: 'rect', x: 250, y: 325, w: 20, h: 55, rx: 8 },
      { type: 'rect', x: 275, y: 325, w: 20, h: 55, rx: 8 },
      { type: 'path', d: 'M300 265 Q322 275 316 305' },
      { type: 'circle', cx: 205, cy: 145, r: 11 },
      { type: 'circle', cx: 210, cy: 195, r: 13 },
      { type: 'circle', cx: 250, cy: 275, r: 13 },
      { type: 'circle', cx: 205, cy: 295, r: 11 },
      { type: 'circle', cx: 240, cy: 230, r: 10 },
    ],
  },
  {
    id: 'mammal-lion', title: 'Lion', category: 'mammals', premium: false, viewBox: 400,
    shapes: [
      { type: 'circle', cx: 200, cy: 175, r: 78 },
      ...Array.from({ length: 11 }, (_, i): Shape => {
        const a = (i * Math.PI * 2) / 11;
        return { type: 'circle', cx: 200 + 70 * Math.cos(a), cy: 175 + 70 * Math.sin(a), r: 22 };
      }),
      { type: 'circle', cx: 200, cy: 178, r: 48 },
      { type: 'circle', cx: 182, cy: 172, r: 6 },
      { type: 'circle', cx: 218, cy: 172, r: 6 },
      { type: 'ellipse', cx: 200, cy: 190, rx: 12, ry: 8 },
      { type: 'path', d: 'M188 198 Q200 206 212 198' },
      { type: 'ellipse', cx: 200, cy: 300, rx: 68, ry: 55 },
      { type: 'path', d: 'M265 300 Q305 290 300 255 Q298 245 292 250' },
      { type: 'circle', cx: 296, cy: 248, r: 12 },
      { type: 'rect', x: 155, y: 345, w: 22, h: 40, rx: 8 },
      { type: 'rect', x: 225, y: 345, w: 22, h: 40, rx: 8 },
    ],
  },
  {
    id: 'mammal-bear', title: 'Bear', category: 'mammals', premium: false, viewBox: 400,
    shapes: [
      { type: 'circle', cx: 200, cy: 175, r: 58 },
      { type: 'circle', cx: 155, cy: 128, r: 24 },
      { type: 'circle', cx: 245, cy: 128, r: 24 },
      { type: 'circle', cx: 155, cy: 128, r: 10 },
      { type: 'circle', cx: 245, cy: 128, r: 10 },
      { type: 'ellipse', cx: 200, cy: 195, rx: 26, ry: 20 },
      { type: 'circle', cx: 182, cy: 170, r: 6 },
      { type: 'circle', cx: 218, cy: 170, r: 6 },
      { type: 'ellipse', cx: 200, cy: 190, rx: 8, ry: 6 },
      { type: 'ellipse', cx: 200, cy: 295, rx: 82, ry: 68 },
      { type: 'rect', x: 148, y: 345, w: 26, h: 42, rx: 10 },
      { type: 'rect', x: 228, y: 345, w: 26, h: 42, rx: 10 },
      { type: 'ellipse', cx: 145, cy: 285, rx: 24, ry: 30 },
      { type: 'ellipse', cx: 255, cy: 285, rx: 24, ry: 30 },
    ],
  },
  {
    id: 'mammal-horse', title: 'Horse', category: 'mammals', premium: true, viewBox: 400,
    shapes: [
      { type: 'ellipse', cx: 180, cy: 230, rx: 92, ry: 55 },
      { type: 'path', d: 'M255 205 Q300 165 295 120 Q292 105 278 108 Q285 130 265 160 Q245 190 225 210 Z' },
      { type: 'ellipse', cx: 292, cy: 105, rx: 24, ry: 32 },
      { type: 'path', d: 'M310 90 L330 82 L312 100 Z' },
      { type: 'circle', cx: 300, cy: 98, r: 4 },
      { type: 'path', d: 'M278 82 L282 65' },
      { type: 'path', d: 'M295 78 L300 62' },
      { type: 'path', d: 'M260 115 Q275 140 258 165 Q245 145 250 125' },
      { type: 'rect', x: 130, y: 270, w: 20, h: 65, rx: 8 },
      { type: 'rect', x: 165, y: 275, w: 20, h: 62, rx: 8 },
      { type: 'rect', x: 215, y: 275, w: 20, h: 62, rx: 8 },
      { type: 'rect', x: 245, y: 270, w: 20, h: 65, rx: 8 },
      { type: 'path', d: 'M95 220 Q65 235 60 275 Q75 280 85 260 Q95 245 100 225' },
    ],
  },
];

// --- ANIMALS (misc) ---
export const animalPages: ColoringPage[] = [
  {
    id: 'animal-frog', title: 'Frog', category: 'animals', premium: false, viewBox: 400,
    shapes: [
      { type: 'ellipse', cx: 200, cy: 245, rx: 88, ry: 55 },
      { type: 'circle', cx: 155, cy: 175, r: 32 },
      { type: 'circle', cx: 245, cy: 175, r: 32 },
      { type: 'circle', cx: 155, cy: 170, r: 13 },
      { type: 'circle', cx: 245, cy: 170, r: 13 },
      { type: 'path', d: 'M160 220 Q200 240 240 220' },
      { type: 'path', d: 'M170 260 Q150 295 118 305 Q105 308 112 295 Q125 285 148 268' },
      { type: 'path', d: 'M230 260 Q250 295 282 305 Q295 308 288 295 Q275 285 252 268' },
      { type: 'ellipse', cx: 105, cy: 300, rx: 16, ry: 10 },
      { type: 'ellipse', cx: 295, cy: 300, rx: 16, ry: 10 },
      { type: 'path', d: 'M140 235 Q110 245 95 265' },
      { type: 'path', d: 'M260 235 Q290 245 305 265' },
    ],
  },
  {
    id: 'animal-turtle', title: 'Turtle', category: 'animals', premium: false, viewBox: 400,
    shapes: [
      { type: 'ellipse', cx: 195, cy: 215, rx: 105, ry: 78 },
      { type: 'circle', cx: 195, cy: 215, r: 32 },
      { type: 'line', x1: 195, y1: 137, x2: 195, y2: 183 },
      { type: 'line', x1: 195, y1: 247, x2: 195, y2: 293 },
      { type: 'line', x1: 90, y1: 215, x2: 163, y2: 215 },
      { type: 'line', x1: 227, y1: 215, x2: 300, y2: 215 },
      { type: 'path', d: 'M130 165 L163 195' },
      { type: 'path', d: 'M260 165 L227 195' },
      { type: 'path', d: 'M130 265 L163 235' },
      { type: 'path', d: 'M260 265 L227 235' },
      { type: 'ellipse', cx: 320, cy: 208, rx: 28, ry: 22 },
      { type: 'circle', cx: 333, cy: 202, r: 4 },
      { type: 'ellipse', cx: 128, cy: 160, rx: 20, ry: 15 },
      { type: 'ellipse', cx: 262, cy: 160, rx: 20, ry: 15 },
      { type: 'ellipse', cx: 128, cy: 275, rx: 20, ry: 15 },
      { type: 'ellipse', cx: 262, cy: 275, rx: 20, ry: 15 },
      { type: 'path', d: 'M92 225 Q70 230 62 245' },
    ],
  },
  {
    id: 'animal-penguin', title: 'Penguin', category: 'animals', premium: false, viewBox: 400,
    shapes: [
      { type: 'ellipse', cx: 200, cy: 235, rx: 60, ry: 88 },
      { type: 'circle', cx: 200, cy: 155, r: 42 },
      { type: 'ellipse', cx: 200, cy: 250, rx: 38, ry: 55 },
      { type: 'circle', cx: 184, cy: 150, r: 5 },
      { type: 'circle', cx: 216, cy: 150, r: 5 },
      { type: 'path', d: 'M190 168 L210 168 L200 182 Z' },
      { type: 'path', d: 'M140 210 Q110 245 122 280' },
      { type: 'path', d: 'M260 210 Q290 245 278 280' },
      { type: 'path', d: 'M172 315 Q165 328 152 330 L178 330 Q184 322 183 315' },
      { type: 'path', d: 'M228 315 Q235 328 248 330 L222 330 Q216 322 217 315' },
    ],
  },
  {
    id: 'animal-snake', title: 'Snake', category: 'animals', premium: false, viewBox: 400,
    shapes: [
      { type: 'path', d: 'M70 310 Q110 255 175 285 Q240 315 275 265 Q310 220 285 175 Q265 145 245 165' },
      { type: 'circle', cx: 250, cy: 160, r: 22 },
      { type: 'circle', cx: 243, cy: 154, r: 4 },
      { type: 'path', d: 'M263 168 L280 175 L263 182' },
      { type: 'circle', cx: 130, cy: 275, r: 14 },
      { type: 'circle', cx: 195, cy: 300, r: 14 },
      { type: 'circle', cx: 255, cy: 245, r: 14 },
    ],
  },
  {
    id: 'animal-crab', title: 'Crab', category: 'animals', premium: true, viewBox: 400,
    shapes: [
      { type: 'ellipse', cx: 200, cy: 230, rx: 88, ry: 55 },
      { type: 'line', x1: 172, y1: 205, x2: 165, y2: 178 },
      { type: 'line', x1: 228, y1: 205, x2: 235, y2: 178 },
      { type: 'circle', cx: 165, cy: 174, r: 7 },
      { type: 'circle', cx: 235, cy: 174, r: 7 },
      { type: 'path', d: 'M122 218 Q80 205 62 182' },
      { type: 'path', d: 'M62 182 Q40 168 45 148 Q60 155 62 168 Q68 150 82 152 Q88 162 75 175 Q85 182 62 182 Z' },
      { type: 'path', d: 'M278 218 Q320 205 338 182' },
      { type: 'path', d: 'M338 182 Q360 168 355 148 Q340 155 338 168 Q332 150 318 152 Q312 162 325 175 Q315 182 338 182 Z' },
      { type: 'path', d: 'M155 278 Q145 300 125 312' },
      { type: 'path', d: 'M183 288 Q178 308 165 320' },
      { type: 'path', d: 'M217 288 Q222 308 235 320' },
      { type: 'path', d: 'M245 278 Q255 300 275 312' },
    ],
  },
];

// --- PEOPLE ---
export const peoplePages: ColoringPage[] = [
  {
    id: 'person-police', title: 'Police Officer', category: 'people', premium: false, viewBox: 400,
    shapes: [
      { type: 'circle', cx: 200, cy: 125, r: 42 },
      { type: 'path', d: 'M158 110 Q158 78 200 75 Q242 78 242 110 Q242 95 200 92 Q158 95 158 110 Z' },
      { type: 'rect', x: 192, y: 68, w: 16, h: 10, rx: 2 },
      { type: 'circle', cx: 184, cy: 128, r: 5 },
      { type: 'circle', cx: 216, cy: 128, r: 5 },
      { type: 'path', d: 'M188 148 Q200 156 212 148' },
      { type: 'rect', x: 160, y: 172, w: 80, h: 108, rx: 10 },
      { type: 'circle', cx: 200, cy: 200, r: 12 },
      { type: 'line', x1: 160, y1: 235, x2: 240, y2: 235 },
      { type: 'path', d: 'M160 195 Q120 208 112 252' },
      { type: 'path', d: 'M240 195 Q280 208 288 252' },
      { type: 'rect', x: 172, y: 280, w: 24, h: 58, rx: 8 },
      { type: 'rect', x: 204, y: 280, w: 24, h: 58, rx: 8 },
    ],
  },
  {
    id: 'person-firefighter', title: 'Firefighter', category: 'people', premium: false, viewBox: 400,
    shapes: [
      { type: 'circle', cx: 200, cy: 128, r: 42 },
      { type: 'path', d: 'M152 118 Q152 78 200 72 Q248 78 248 118 Q248 100 200 98 Q152 100 152 118 Z' },
      { type: 'path', d: 'M180 72 L200 55 L220 72 Z' },
      { type: 'circle', cx: 184, cy: 132, r: 5 },
      { type: 'circle', cx: 216, cy: 132, r: 5 },
      { type: 'path', d: 'M188 150 Q200 157 212 150' },
      { type: 'rect', x: 160, y: 175, w: 80, h: 105, rx: 10 },
      { type: 'line', x1: 160, y1: 210, x2: 240, y2: 210 },
      { type: 'path', d: 'M160 198 Q118 212 112 258' },
      { type: 'path', d: 'M240 198 Q282 212 288 258' },
      { type: 'path', d: 'M288 258 L312 235 L322 246 L298 270 Z' },
      { type: 'line', x1: 288, y1: 258, x2: 268, y2: 285 },
      { type: 'rect', x: 172, y: 280, w: 24, h: 58, rx: 8 },
      { type: 'rect', x: 204, y: 280, w: 24, h: 58, rx: 8 },
    ],
  },
  {
    id: 'person-doctor', title: 'Doctor', category: 'people', premium: false, viewBox: 400,
    shapes: [
      { type: 'circle', cx: 200, cy: 128, r: 42 },
      { type: 'path', d: 'M175 92 Q185 78 200 80 Q215 78 225 92' },
      { type: 'circle', cx: 184, cy: 130, r: 5 },
      { type: 'circle', cx: 216, cy: 130, r: 5 },
      { type: 'path', d: 'M188 150 Q200 157 212 150' },
      { type: 'rect', x: 160, y: 178, w: 80, h: 112, rx: 10 },
      { type: 'path', d: 'M195 178 L195 290' },
      { type: 'path', d: 'M285 200 Q300 210 298 230 Q296 245 280 240' },
      { type: 'circle', cx: 200, cy: 205, r: 3 },
      { type: 'circle', cx: 278, cy: 238, r: 10 },
      { type: 'path', d: 'M160 200 Q122 214 116 260' },
      { type: 'path', d: 'M240 200 Q278 214 284 260' },
      { type: 'rect', x: 172, y: 290, w: 24, h: 55, rx: 8 },
      { type: 'rect', x: 204, y: 290, w: 24, h: 55, rx: 8 },
    ],
  },
  {
    id: 'person-astronaut', title: 'Astronaut', category: 'people', premium: true, viewBox: 400,
    shapes: [
      { type: 'circle', cx: 200, cy: 140, r: 52 },
      { type: 'circle', cx: 200, cy: 142, r: 36 },
      { type: 'path', d: 'M180 128 Q195 118 212 128' },
      { type: 'rect', x: 172, y: 200, w: 56, h: 45, rx: 8 },
      { type: 'rect', x: 155, y: 200, w: 90, h: 115, rx: 16 },
      { type: 'rect', x: 178, y: 225, w: 44, h: 40, rx: 6 },
      { type: 'circle', cx: 190, cy: 245, r: 4 },
      { type: 'circle', cx: 210, cy: 245, r: 4 },
      { type: 'path', d: 'M155 225 Q112 235 100 278 Q98 290 112 285' },
      { type: 'path', d: 'M245 225 Q288 235 300 278 Q302 290 288 285' },
      { type: 'rect', x: 168, y: 312, w: 28, h: 52, rx: 8 },
      { type: 'rect', x: 204, y: 312, w: 28, h: 52, rx: 8 },
    ],
  },
  {
    id: 'person-teacher', title: 'Teacher', category: 'people', premium: true, viewBox: 400,
    shapes: [
      { type: 'circle', cx: 200, cy: 120, r: 38 },
      { type: 'path', d: 'M165 100 Q180 78 200 82 Q220 78 235 100' },
      { type: 'circle', cx: 185, cy: 120, r: 4 },
      { type: 'circle', cx: 215, cy: 120, r: 4 },
      { type: 'path', d: 'M190 138 Q200 145 210 138' },
      { type: 'rect', x: 170, y: 162, w: 60, h: 100, rx: 8 },
      { type: 'path', d: 'M170 185 Q135 200 130 245' },
      { type: 'path', d: 'M230 185 Q262 195 272 220' },
      { type: 'line', x1: 272, y1: 220, x2: 320, y2: 205 },
      { type: 'rect', x: 178, y: 262, w: 20, h: 55, rx: 8 },
      { type: 'rect', x: 208, y: 262, w: 20, h: 55, rx: 8 },
      { type: 'rect', x: 305, y: 130, w: 70, h: 90, rx: 4 },
      { type: 'line', x1: 315, y1: 150, x2: 360, y2: 150 },
      { type: 'line', x1: 315, y1: 170, x2: 350, y2: 170 },
    ],
  },
];

// --- THINGS ---
export const thingsPages: ColoringPage[] = [
  {
    id: 'thing-guitar', title: 'Guitar', category: 'things', premium: false, viewBox: 400,
    shapes: [
      { type: 'path', d: 'M200 300 Q140 300 130 250 Q125 225 145 210 Q130 195 140 170 Q150 150 175 155 Q185 145 200 150 Q215 145 225 155 Q250 150 260 170 Q270 195 255 210 Q275 225 270 250 Q260 300 200 300 Z' },
      { type: 'circle', cx: 200, cy: 235, r: 22 },
      { type: 'rect', x: 193, y: 90, w: 14, h: 70, rx: 4 },
      { type: 'line', x1: 197, y1: 90, x2: 197, y2: 160 },
      { type: 'line', x1: 203, y1: 90, x2: 203, y2: 160 },
      { type: 'rect', x: 178, y: 60, w: 44, h: 32, rx: 6 },
      { type: 'circle', cx: 186, cy: 70, r: 4 },
      { type: 'circle', cx: 214, cy: 70, r: 4 },
      { type: 'circle', cx: 186, cy: 84, r: 4 },
      { type: 'circle', cx: 214, cy: 84, r: 4 },
    ],
  },
  {
    id: 'thing-airplane', title: 'Airplane', category: 'things', premium: false, viewBox: 400,
    shapes: [
      { type: 'path', d: 'M60 200 Q60 185 90 185 L310 195 Q330 197 330 205 Q330 213 310 215 L90 215 Q60 215 60 200 Z' },
      { type: 'path', d: 'M170 190 Q150 130 110 110 L130 112 Q175 145 195 192 Z' },
      { type: 'path', d: 'M170 210 Q150 265 110 285 L130 283 Q175 255 195 213 Z' },
      { type: 'path', d: 'M300 195 Q330 175 350 178 Q340 195 322 200' },
      { type: 'circle', cx: 100, cy: 200, r: 10 },
      { type: 'circle', cx: 140, cy: 200, r: 8 },
      { type: 'circle', cx: 175, cy: 200, r: 8 },
      { type: 'circle', cx: 210, cy: 200, r: 8 },
    ],
  },
  {
    id: 'thing-train', title: 'Train', category: 'things', premium: false, viewBox: 400,
    shapes: [
      { type: 'rect', x: 75, y: 175, w: 145, h: 105, rx: 12 },
      { type: 'rect', x: 230, y: 210, w: 100, h: 70, rx: 8 },
      { type: 'rect', x: 95, y: 130, w: 45, h: 45, rx: 4 },
      { type: 'circle', cx: 118, cy: 210, r: 20 },
      { type: 'circle', cx: 170, cy: 210, r: 20 },
      { type: 'circle', cx: 250, cy: 235, r: 14 },
      { type: 'circle', cx: 290, cy: 235, r: 14 },
      { type: 'circle', cx: 108, cy: 292, r: 20 },
      { type: 'circle', cx: 160, cy: 292, r: 20 },
      { type: 'circle', cx: 200, cy: 292, r: 20 },
      { type: 'circle', cx: 260, cy: 292, r: 18 },
      { type: 'circle', cx: 310, cy: 292, r: 18 },
      { type: 'line', x1: 55, y1: 312, x2: 355, y2: 312 },
      { type: 'path', d: 'M117 130 Q117 105 128 95 Q133 90 133 105' },
      { type: 'path', d: 'M128 95 Q140 75 132 65' },
    ],
  },
  {
    id: 'thing-bicycle', title: 'Bicycle', category: 'things', premium: true, viewBox: 400,
    shapes: [
      { type: 'circle', cx: 125, cy: 262, r: 52 },
      { type: 'circle', cx: 275, cy: 262, r: 52 },
      { type: 'circle', cx: 125, cy: 262, r: 5 },
      { type: 'circle', cx: 275, cy: 262, r: 5 },
      { type: 'line', x1: 125, y1: 262, x2: 195, y2: 190 },
      { type: 'line', x1: 195, y1: 190, x2: 275, y2: 262 },
      { type: 'line', x1: 195, y1: 190, x2: 225, y2: 262 },
      { type: 'line', x1: 225, y1: 262, x2: 275, y2: 262 },
      { type: 'path', d: 'M195 190 Q195 165 195 150' },
      { type: 'path', d: 'M175 148 Q195 140 215 148' },
      { type: 'line', x1: 225, y1: 262, x2: 260, y2: 175 },
      { type: 'line', x1: 245, y1: 175, x2: 280, y2: 175 },
    ],
  },
  {
    id: 'thing-cup', title: 'Teacup', category: 'things', premium: true, viewBox: 400,
    shapes: [
      { type: 'path', d: 'M115 180 L128 295 Q130 310 150 310 L250 310 Q270 310 272 295 L285 180 Z' },
      { type: 'path', d: 'M285 205 Q328 205 333 240 Q328 275 285 270' },
      { type: 'ellipse', cx: 200, cy: 315, rx: 95, ry: 14 },
      { type: 'path', d: 'M160 155 Q170 130 182 150 Q192 128 202 152' },
      { type: 'path', d: 'M215 155 Q225 132 237 152' },
    ],
  },
];

// --- PLANTS ---
export const plantPages: ColoringPage[] = [
  {
    id: 'plant-sunflower', title: 'Sunflower', category: 'plants', premium: false, viewBox: 400,
    shapes: [
      { type: 'circle', cx: 200, cy: 155, r: 38 },
      ...Array.from({ length: 12 }, (_, i): Shape => {
        const a = (i * Math.PI) / 6;
        return { type: 'ellipse', cx: 200 + 58 * Math.cos(a), cy: 155 + 58 * Math.sin(a), rx: 20, ry: 11 };
      }),
      { type: 'path', d: 'M200 195 Q195 260 200 330' },
      { type: 'path', d: 'M200 250 Q155 240 145 262 Q155 275 200 262' },
      { type: 'path', d: 'M200 290 Q245 280 255 302 Q245 315 200 302' },
    ],
  },
  {
    id: 'plant-cactus', title: 'Cactus', category: 'plants', premium: false, viewBox: 400,
    shapes: [
      { type: 'rect', x: 172, y: 145, w: 56, h: 205, rx: 28 },
      { type: 'path', d: 'M172 215 Q135 215 130 185 Q130 165 148 165 L148 235 Z' },
      { type: 'path', d: 'M228 245 Q265 245 270 215 Q270 195 252 195 L252 265 Z' },
      { type: 'rect', x: 145, y: 340, w: 110, h: 22, rx: 8 },
      { type: 'path', d: 'M188 148 Q200 128 212 148' },
      { type: 'circle', cx: 200, cy: 138, r: 6 },
      { type: 'line', x1: 185, y1: 175, x2: 185, y2: 330 },
      { type: 'line', x1: 200, y1: 165, x2: 200, y2: 335 },
      { type: 'line', x1: 215, y1: 175, x2: 215, y2: 330 },
    ],
  },
  {
    id: 'plant-tree', title: 'Big Tree', category: 'plants', premium: false, viewBox: 400,
    shapes: [
      { type: 'rect', x: 182, y: 245, w: 36, h: 115, rx: 6 },
      { type: 'circle', cx: 200, cy: 175, r: 72 },
      { type: 'circle', cx: 150, cy: 200, r: 48 },
      { type: 'circle', cx: 250, cy: 200, r: 48 },
      { type: 'circle', cx: 165, cy: 145, r: 38 },
      { type: 'circle', cx: 235, cy: 145, r: 38 },
      { type: 'circle', cx: 200, cy: 120, r: 34 },
      { type: 'path', d: 'M182 358 Q160 348 148 363' },
      { type: 'path', d: 'M218 358 Q240 348 252 363' },
    ],
  },
  {
    id: 'plant-mushroom', title: 'Mushroom', category: 'plants', premium: false, viewBox: 400,
    shapes: [
      { type: 'path', d: 'M90 235 Q85 130 200 115 Q315 130 310 235 Q200 260 90 235 Z' },
      { type: 'rect', x: 172, y: 232, w: 56, h: 105, rx: 16 },
      { type: 'circle', cx: 155, cy: 175, r: 16 },
      { type: 'circle', cx: 225, cy: 158, r: 13 },
      { type: 'circle', cx: 260, cy: 198, r: 11 },
      { type: 'circle', cx: 130, cy: 208, r: 9 },
      { type: 'circle', cx: 200, cy: 140, r: 11 },
    ],
  },
  {
    id: 'plant-tulip', title: 'Tulip', category: 'plants', premium: true, viewBox: 400,
    shapes: [
      { type: 'path', d: 'M175 185 Q160 130 200 95 Q240 130 225 185 Q200 200 175 185 Z' },
      { type: 'path', d: 'M160 205 Q145 155 180 120' },
      { type: 'path', d: 'M240 205 Q255 155 220 120' },
      { type: 'path', d: 'M200 200 Q195 270 200 345' },
      { type: 'path', d: 'M200 255 Q160 245 148 268 Q160 280 200 265' },
      { type: 'path', d: 'M200 300 Q240 290 252 312 Q240 322 200 310' },
    ],
  },
  {
    id: 'plant-rose', title: 'Rose', category: 'plants', premium: true, viewBox: 400,
    shapes: [
      { type: 'circle', cx: 200, cy: 155, r: 22 },
      { type: 'path', d: 'M200 133 Q232 118 244 145 Q249 168 226 178' },
      { type: 'path', d: 'M200 133 Q168 118 156 145 Q151 168 174 178' },
      { type: 'path', d: 'M174 178 Q152 195 163 217 Q180 227 200 190' },
      { type: 'path', d: 'M226 178 Q248 195 237 217 Q220 227 200 190' },
      { type: 'path', d: 'M200 205 Q195 280 200 350' },
      { type: 'path', d: 'M200 255 Q168 248 158 265' },
      { type: 'path', d: 'M200 290 Q232 285 242 302' },
      { type: 'path', d: 'M195 245 Q186 236 176 238' },
      { type: 'path', d: 'M205 285 Q214 276 224 279' },
    ],
  },
];
