import React, { useEffect, useImperativeHandle, useMemo, useRef, useState, forwardRef } from 'react';
import { View, StyleSheet, LayoutChangeEvent, GestureResponderEvent } from 'react-native';
import {
  Canvas, Path, Skia, SkPath, Group, SkiaDomView,
} from '@shopify/react-native-skia';
import * as Haptics from 'expo-haptics';
import { sounds } from '../utils/sound';
import { Shape } from '../data/shapeTypes';

export type BrushTool = 'marker' | 'crayon' | 'brush' | 'eraser';

export interface BrushCanvasRef {
  /** Returns base64 PNG of the current canvas, or null if unavailable */
  makeSnapshot: () => string | null;
}

interface Stroke {
  path: SkPath;
  color: string;
  width: number;
  opacity: number;
  blend: 'srcOver' | 'multiply';
}

interface Props {
  viewBox: number;
  outlineShapes?: Shape[];
  color: string;
  tool: BrushTool;
  brushSize: number;
  resetSignal?: number;
  undoSignal?: number;
  onStrokeEnd?: (strokeCount: number) => void;
  transparentBg?: boolean;
}

const TOOL_CONFIG: Record<BrushTool, { widthMult: number; opacity: number; blend: 'srcOver' | 'multiply' }> = {
  marker: { widthMult: 1, opacity: 0.92, blend: 'srcOver' },
  crayon: { widthMult: 0.7, opacity: 0.55, blend: 'multiply' },
  brush: { widthMult: 1.4, opacity: 0.45, blend: 'multiply' },
  eraser: { widthMult: 2.2, opacity: 1, blend: 'srcOver' },
};

export function shapeToPath(shape: Shape, scale: number): SkPath {
  const p = Skia.Path.Make();
  switch (shape.type) {
    case 'circle':
      p.addCircle(shape.cx * scale, shape.cy * scale, shape.r * scale);
      break;
    case 'ellipse':
      p.addOval(Skia.XYWHRect(
        (shape.cx - shape.rx) * scale, (shape.cy - shape.ry) * scale,
        shape.rx * 2 * scale, shape.ry * 2 * scale,
      ));
      break;
    case 'rect':
      p.addRRect(Skia.RRectXY(
        Skia.XYWHRect(shape.x * scale, shape.y * scale, shape.w * scale, shape.h * scale),
        (shape.rx ?? 0) * scale, (shape.rx ?? 0) * scale,
      ));
      break;
    case 'line':
      p.moveTo(shape.x1 * scale, shape.y1 * scale);
      p.lineTo(shape.x2 * scale, shape.y2 * scale);
      break;
    case 'triangle':
      p.moveTo(shape.x1 * scale, shape.y1 * scale);
      p.lineTo(shape.x2 * scale, shape.y2 * scale);
      p.lineTo(shape.x3 * scale, shape.y3 * scale);
      p.close();
      break;
    case 'polyline':
      shape.points.forEach(([x, y], i) => (i === 0 ? p.moveTo(x * scale, y * scale) : p.lineTo(x * scale, y * scale)));
      break;
    case 'path': {
      const parsed = Skia.Path.MakeFromSVGString(shape.d);
      if (parsed) {
        const m = Skia.Matrix();
        m.scale(scale, scale);
        parsed.transform(m);
        return parsed;
      }
      break;
    }
  }
  return p;
}

/**
 * A reusable drawing surface. Touch input uses React Native's built-in
 * responder system (onResponderGrant/Move/Release) on the View that wraps
 * the Skia Canvas. This runs entirely on the JS thread — the same behavior
 * the old Skia useTouchHandler had — and deliberately avoids
 * react-native-gesture-handler's Gesture API, because the
 * react-native-reanimated Babel plugin auto-workletizes gesture callbacks,
 * which would then crash when they call JS-only APIs (sounds, Haptics,
 * React state) from the UI thread.
 */
const BrushCanvas = forwardRef<BrushCanvasRef, Props>(({
  viewBox, outlineShapes = [], color, tool, brushSize, resetSignal, undoSignal, onStrokeEnd, transparentBg,
}, ref) => {
  const [size, setSize] = useState(0);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const currentStroke = useRef<Stroke | null>(null);
  const [, forceRender] = useState(0);
  const canvasRef = useRef<SkiaDomView>(null);

  const scale = size ? size / viewBox : 0;

  const outlinePaths = useMemo(
    () => (size ? outlineShapes.map((s) => shapeToPath(s, scale)) : []),
    [outlineShapes, scale, size],
  );

  useEffect(() => { setStrokes([]); }, [resetSignal]);
  useEffect(() => {
    setStrokes((prev) => prev.slice(0, -1));
  }, [undoSignal]);

  useImperativeHandle(ref, () => ({
    makeSnapshot: () => {
      if (!canvasRef.current) return null;
      try {
        const image = canvasRef.current.makeImageSnapshot();
        if (!image) return null;
        const data = image.encodeToBase64();
        return data;
      } catch {
        return null;
      }
    },
  }));

  const onLayout = (e: LayoutChangeEvent) => {
    const w = Math.round(e.nativeEvent.layout.width);
    if (w && w !== size) setSize(w);
  };

  const handleStart = (e: GestureResponderEvent) => {
    const { locationX, locationY } = e.nativeEvent;
    const cfg = TOOL_CONFIG[tool];
    const path = Skia.Path.Make();
    path.moveTo(locationX, locationY);
    currentStroke.current = {
      path,
      color: tool === 'eraser' ? '#FFFFFF' : color,
      width: brushSize * cfg.widthMult,
      opacity: cfg.opacity,
      blend: cfg.blend,
    };
    sounds.startBrushLoop();
    Haptics.selectionAsync().catch(() => {});
    forceRender((n) => n + 1);
  };

  const handleMove = (e: GestureResponderEvent) => {
    if (!currentStroke.current) return;
    const { locationX, locationY } = e.nativeEvent;
    currentStroke.current.path.lineTo(locationX, locationY);
    forceRender((n) => n + 1);
  };

  const handleEnd = () => {
    if (currentStroke.current) {
      setStrokes((prev) => {
        const next = [...prev, currentStroke.current!];
        onStrokeEnd?.(next.length);
        return next;
      });
      currentStroke.current = null;
    }
    sounds.stopBrushLoop();
  };

  return (
    <View
      style={[styles.wrap, transparentBg && { backgroundColor: 'transparent' }]}
      onLayout={onLayout}
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      onResponderGrant={handleStart}
      onResponderMove={handleMove}
      onResponderRelease={handleEnd}
      onResponderTerminate={handleEnd}
    >
      {size > 0 && (
        <Canvas ref={canvasRef} style={{ width: size, height: size }}>
          <Group>
            {strokes.map((s, i) => (
              <Path
                key={i}
                path={s.path}
                color={s.color}
                style="stroke"
                strokeWidth={s.width}
                strokeCap="round"
                strokeJoin="round"
                opacity={s.opacity}
                blendMode={s.blend}
              />
            ))}
            {currentStroke.current && (
              <Path
                path={currentStroke.current.path}
                color={currentStroke.current.color}
                style="stroke"
                strokeWidth={currentStroke.current.width}
                strokeCap="round"
                strokeJoin="round"
                opacity={currentStroke.current.opacity}
                blendMode={currentStroke.current.blend}
              />
            )}
            {outlinePaths.map((p, i) => (
              <Path key={`o${i}`} path={p} color="#2B2118" style="stroke" strokeWidth={5} strokeCap="round" strokeJoin="round" />
            ))}
          </Group>
        </Canvas>
      )}
    </View>
  );
});

export default BrushCanvas;

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 22,
    overflow: 'hidden',
  },
});
