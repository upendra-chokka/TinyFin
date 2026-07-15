import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';
import { colors, radii } from '../theme/tokens';
import { sounds } from '../utils/sound';

type PuzzleMode = 'matching' | 'pattern' | 'sorting' | 'oddone' | 'jigsaw' | 'shadow';

const MODES: { key: PuzzleMode; label: string; emoji: string }[] = [
  { key: 'matching', label: 'Match Pairs', emoji: '🃏' },
  { key: 'pattern', label: 'Pattern', emoji: '🔮' },
  { key: 'sorting', label: 'Sort It', emoji: '📦' },
  { key: 'oddone', label: 'Odd One Out', emoji: '🔍' },
  { key: 'jigsaw', label: 'Jigsaw', emoji: '🧩' },
  { key: 'shadow', label: 'Shadow Match', emoji: '👤' },
];

export default function PuzzlesScreen() {
  const [mode, setMode] = useState<PuzzleMode>('matching');
  const [score, setScore] = useState(0);

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.header}>Puzzles</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.modeRow} contentContainerStyle={{ gap: 8 }}>
        {MODES.map((m) => (
          <TouchableOpacity key={m.key} onPress={() => setMode(m.key)} style={[styles.modeBtn, mode === m.key && styles.modeBtnOn]}>
            <Text style={styles.modeEmoji}>{m.emoji}</Text>
            <Text style={[styles.modeLabel, mode === m.key && styles.modeLabelOn]}>{m.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={styles.score}>⭐ Score: {score}</Text>

      {mode === 'matching' && <MatchingGame setScore={setScore} />}
      {mode === 'pattern' && <PatternGame setScore={setScore} />}
      {mode === 'sorting' && <SortingGame setScore={setScore} />}
      {mode === 'oddone' && <OddOneOutGame setScore={setScore} />}
      {mode === 'jigsaw' && <JigsawGame setScore={setScore} />}
      {mode === 'shadow' && <ShadowMatchGame setScore={setScore} />}
    </SafeAreaView>
  );
}

// --- MATCHING PAIRS GAME ---
const MATCH_EMOJIS = ['🐶', '🐱', '🐸', '🦋', '🐢', '🌻', '🍎', '⭐', '🐘', '🦁', '🐟', '🌈'];

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeMatchBoard() {
  const picked = shuffleArray(MATCH_EMOJIS).slice(0, 6);
  const board = shuffleArray([...picked, ...picked]);
  return board;
}

function MatchingGame({ setScore }: { setScore: (fn: (s: number) => number) => void }) {
  const [board, setBoard] = useState(makeMatchBoard());
  const [revealed, setRevealed] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [locked, setLocked] = useState(false);

  const onTap = async (idx: number) => {
    if (locked || revealed.includes(idx) || matched.includes(idx)) return;
    const newRevealed = [...revealed, idx];
    setRevealed(newRevealed);
    await sounds.play('pop');

    if (newRevealed.length === 2) {
      setLocked(true);
      const [a, b] = newRevealed;
      if (board[a] === board[b]) {
        setMatched((prev) => [...prev, a, b]);
        setScore((s) => s + 1);
        await sounds.play('correct');
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
        setRevealed([]);
        setLocked(false);
        if (matched.length + 2 === board.length) {
          Speech.speak('You matched them all!', { rate: 0.9 });
          setTimeout(() => {
            setBoard(makeMatchBoard());
            setMatched([]);
          }, 1200);
        }
      } else {
        await sounds.play('wrong');
        setTimeout(() => { setRevealed([]); setLocked(false); }, 800);
      }
    }
  };

  return (
    <View style={styles.gameBox}>
      <Text style={styles.instruction}>Tap to find matching pairs!</Text>
      <View style={styles.matchGrid}>
        {board.map((emoji, i) => {
          const isRevealed = revealed.includes(i) || matched.includes(i);
          return (
            <TouchableOpacity key={i} onPress={() => onTap(i)} style={[styles.matchCard, matched.includes(i) && styles.matchCardDone]}>
              <Text style={styles.matchEmoji}>{isRevealed ? emoji : '❓'}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// --- PATTERN COMPLETION GAME ---
const PATTERN_SETS = [
  { seq: ['🔴', '🔵', '🔴', '🔵', '🔴'], answer: '🔵', choices: ['🔵', '🔴', '🟢', '🟡'] },
  { seq: ['⭐', '🌙', '⭐', '🌙', '⭐'], answer: '🌙', choices: ['🌙', '⭐', '☀️', '🌈'] },
  { seq: ['🐶', '🐱', '🐶', '🐱', '🐶'], answer: '🐱', choices: ['🐱', '🐶', '🐸', '🐦'] },
  { seq: ['🍎', '🍌', '🍎', '🍌', '🍎'], answer: '🍌', choices: ['🍌', '🍎', '🍇', '🍊'] },
  { seq: ['△', '○', '□', '△', '○'], answer: '□', choices: ['□', '△', '○', '☆'] },
  { seq: ['1', '2', '3', '1', '2'], answer: '3', choices: ['3', '1', '4', '2'] },
  { seq: ['🟢', '🟢', '🔴', '🟢', '🟢'], answer: '🔴', choices: ['🔴', '🟢', '🔵', '🟡'] },
  { seq: ['🐟', '🐟', '🐙', '🐟', '🐟'], answer: '🐙', choices: ['🐙', '🐟', '🦈', '🐳'] },
  { seq: ['A', 'B', 'C', 'A', 'B'], answer: 'C', choices: ['C', 'A', 'D', 'B'] },
  { seq: ['🌸', '🌺', '🌸', '🌺', '🌸'], answer: '🌺', choices: ['🌺', '🌸', '🌻', '🌹'] },
];

function PatternGame({ setScore }: { setScore: (fn: (s: number) => number) => void }) {
  const [idx, setIdx] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const round = PATTERN_SETS[idx % PATTERN_SETS.length];

  const onPick = async (val: string) => {
    if (feedback) return;
    if (val === round.answer) {
      setFeedback(val);
      setScore((s) => s + 1);
      await sounds.play('correct');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      Speech.speak('Correct! Great pattern skills!', { rate: 0.9 });
      setTimeout(() => { setIdx((i) => i + 1); setFeedback(null); }, 1000);
    } else {
      await sounds.play('wrong');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
    }
  };

  return (
    <View style={styles.gameBox}>
      <Text style={styles.instruction}>What comes next in the pattern?</Text>
      <View style={styles.patternRow}>
        {round.seq.map((item, i) => (
          <View key={i} style={styles.patternItem}>
            <Text style={styles.patternText}>{item}</Text>
          </View>
        ))}
        <View style={[styles.patternItem, styles.patternMissing]}>
          <Text style={styles.patternText}>?</Text>
        </View>
      </View>
      <View style={styles.choices}>
        {shuffleArray(round.choices).map((val, i) => (
          <TouchableOpacity key={i} onPress={() => onPick(val)} style={[styles.choiceBtn, feedback === val && styles.choiceCorrect]}>
            <Text style={styles.choiceText}>{val}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- SORTING GAME ---
const SORT_SETS = [
  { title: 'Which ones are fruits?', items: ['🍎', '🍌', '🐶', '🍇', '🚗', '🍊'], answers: ['🍎', '🍌', '🍇', '🍊'] },
  { title: 'Which ones are animals?', items: ['🐱', '🍕', '🐘', '🌳', '🐟', '📱'], answers: ['🐱', '🐘', '🐟'] },
  { title: 'Which ones can fly?', items: ['🐦', '🐟', '🦋', '🐢', '✈️', '🐌'], answers: ['🐦', '🦋', '✈️'] },
  { title: 'Which ones are vehicles?', items: ['🚗', '🐶', '🚌', '🍎', '✈️', '🌸'], answers: ['🚗', '🚌', '✈️'] },
  { title: 'Which ones live in water?', items: ['🐟', '🐶', '🐙', '🦋', '🐳', '🌻'], answers: ['🐟', '🐙', '🐳'] },
  { title: 'Which are round shapes?', items: ['⚪', '▲', '🟡', '⬛', '🔵', '◆'], answers: ['⚪', '🟡', '🔵'] },
];

function SortingGame({ setScore }: { setScore: (fn: (s: number) => number) => void }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const round = SORT_SETS[idx % SORT_SETS.length];

  const onTap = async (item: string) => {
    if (selected.includes(item)) {
      setSelected((prev) => prev.filter((s) => s !== item));
      return;
    }
    setSelected((prev) => [...prev, item]);
    await sounds.play('pop');
  };

  const onCheck = async () => {
    const correct = selected.length === round.answers.length && selected.every((s) => round.answers.includes(s));
    if (correct) {
      setScore((s) => s + 1);
      await sounds.play('correct');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      Speech.speak('Perfect sorting!', { rate: 0.9 });
      setTimeout(() => { setIdx((i) => i + 1); setSelected([]); }, 1000);
    } else {
      await sounds.play('wrong');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
      Speech.speak('Try again!', { rate: 0.9 });
    }
  };

  return (
    <View style={styles.gameBox}>
      <Text style={styles.instruction}>{round.title}</Text>
      <Text style={styles.subInstruction}>Tap all the correct ones, then check!</Text>
      <View style={styles.sortGrid}>
        {round.items.map((item, i) => (
          <TouchableOpacity key={i} onPress={() => onTap(item)} style={[styles.sortItem, selected.includes(item) && styles.sortItemSelected]}>
            <Text style={styles.sortEmoji}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.checkBtn} onPress={onCheck}>
        <Text style={styles.checkBtnText}>Check ✓</Text>
      </TouchableOpacity>
    </View>
  );
}

// --- ODD ONE OUT GAME ---
const ODD_SETS = [
  { items: ['🍎', '🍌', '🍇', '🐶'], answer: '🐶', hint: 'One is not a fruit' },
  { items: ['🚗', '🚌', '✈️', '🌸'], answer: '🌸', hint: 'One is not a vehicle' },
  { items: ['🐶', '🐱', '🐟', '🌳'], answer: '🌳', hint: 'One is not an animal' },
  { items: ['🔴', '🔵', '🟢', '⭐'], answer: '⭐', hint: 'One is not a color circle' },
  { items: ['A', 'B', '3', 'C'], answer: '3', hint: 'One is not a letter' },
  { items: ['🌧️', '☀️', '❄️', '🍕'], answer: '🍕', hint: 'One is not weather' },
  { items: ['👮', '🧑‍🚒', '👨‍⚕️', '🐘'], answer: '🐘', hint: 'One is not a person' },
  { items: ['🎸', '🎹', '🥁', '🚗'], answer: '🚗', hint: 'One is not an instrument' },
  { items: ['🐄', '🐑', '🐖', '🦈'], answer: '🦈', hint: 'One is not a farm animal' },
  { items: ['🏠', '🏢', '🏫', '🌊'], answer: '🌊', hint: 'One is not a building' },
];

function OddOneOutGame({ setScore }: { setScore: (fn: (s: number) => number) => void }) {
  const [idx, setIdx] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const round = ODD_SETS[idx % ODD_SETS.length];

  const onPick = async (val: string) => {
    if (feedback) return;
    if (val === round.answer) {
      setFeedback(val);
      setScore((s) => s + 1);
      await sounds.play('correct');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      Speech.speak('You found the odd one!', { rate: 0.9 });
      setTimeout(() => { setIdx((i) => i + 1); setFeedback(null); }, 1000);
    } else {
      await sounds.play('wrong');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
    }
  };

  return (
    <View style={styles.gameBox}>
      <Text style={styles.instruction}>Find the odd one out!</Text>
      <Text style={styles.subInstruction}>{round.hint}</Text>
      <View style={styles.oddGrid}>
        {shuffleArray(round.items).map((item, i) => (
          <TouchableOpacity key={i} onPress={() => onPick(item)} style={[styles.oddItem, feedback === item && styles.oddItemCorrect]}>
            <Text style={styles.oddEmoji}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- JIGSAW GAME (number ordering grid) ---
function makeJigsawBoard() {
  const size = 9; // 3x3 grid
  const numbers = Array.from({ length: size }, (_, i) => i + 1);
  return { answer: [...numbers], shuffled: shuffleArray(numbers) };
}

function JigsawGame({ setScore }: { setScore: (fn: (s: number) => number) => void }) {
  const [board, setBoard] = useState(makeJigsawBoard());
  const [placed, setPlaced] = useState<(number | null)[]>(Array(9).fill(null));
  const [nextPiece, setNextPiece] = useState(0);

  const remaining = board.shuffled.filter((n) => !placed.includes(n));

  const onPlaceAt = async (slotIdx: number) => {
    if (placed[slotIdx] !== null || remaining.length === 0) return;
    const piece = remaining[0];
    const correctSlot = board.answer.indexOf(piece);

    if (slotIdx === correctSlot) {
      const newPlaced = [...placed];
      newPlaced[slotIdx] = piece;
      setPlaced(newPlaced);
      await sounds.play('pop');
      Haptics.selectionAsync().catch(() => {});

      if (newPlaced.every((p) => p !== null)) {
        setScore((s) => s + 1);
        await sounds.play('correct');
        Speech.speak('Puzzle complete!', { rate: 0.9 });
        setTimeout(() => {
          const newBoard = makeJigsawBoard();
          setBoard(newBoard);
          setPlaced(Array(9).fill(null));
        }, 1200);
      }
    } else {
      await sounds.play('wrong');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
    }
  };

  return (
    <View style={styles.gameBox}>
      <Text style={styles.instruction}>Place numbers 1-9 in order!</Text>
      {remaining.length > 0 && (
        <View style={styles.jigsawPiece}>
          <Text style={styles.jigsawPieceText}>Place: {remaining[0]}</Text>
        </View>
      )}
      <View style={styles.jigsawGrid}>
        {placed.map((val, i) => (
          <TouchableOpacity key={i} onPress={() => onPlaceAt(i)} style={[styles.jigsawSlot, val !== null && styles.jigsawSlotFilled]}>
            <Text style={styles.jigsawSlotText}>{val !== null ? val : ''}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- SHADOW MATCH GAME ---
const SHADOW_SETS = [
  { target: '🐶', choices: ['🐶', '🐱', '🐸', '🐘'], silhouette: '🐕' },
  { target: '🦋', choices: ['🐝', '🦋', '🐞', '🐛'], silhouette: '🦋' },
  { target: '🐘', choices: ['🐘', '🦛', '🐄', '🐎'], silhouette: '🐘' },
  { target: '✈️', choices: ['🚗', '✈️', '🚢', '🚂'], silhouette: '✈️' },
  { target: '🐟', choices: ['🐟', '🐙', '🦈', '🐳'], silhouette: '🐟' },
  { target: '🌻', choices: ['🌹', '🌻', '🌸', '🌺'], silhouette: '🌻' },
  { target: '🏠', choices: ['🏢', '🏠', '🏫', '⛪'], silhouette: '🏠' },
  { target: '🚗', choices: ['🚗', '🚌', '🏎️', '🚕'], silhouette: '🚗' },
];

function ShadowMatchGame({ setScore }: { setScore: (fn: (s: number) => number) => void }) {
  const [idx, setIdx] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const round = SHADOW_SETS[idx % SHADOW_SETS.length];

  const onPick = async (val: string) => {
    if (feedback) return;
    if (val === round.target) {
      setFeedback(val);
      setScore((s) => s + 1);
      await sounds.play('correct');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      Speech.speak('Perfect match!', { rate: 0.9 });
      setTimeout(() => { setIdx((i) => i + 1); setFeedback(null); }, 1000);
    } else {
      await sounds.play('wrong');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
    }
  };

  return (
    <View style={styles.gameBox}>
      <Text style={styles.instruction}>Match the shadow!</Text>
      <View style={styles.shadowTarget}>
        <Text style={styles.shadowEmoji}>{round.silhouette}</Text>
      </View>
      <View style={styles.choices}>
        {shuffleArray(round.choices).map((item, i) => (
          <TouchableOpacity key={i} onPress={() => onPick(item)} style={[styles.choiceBtn, feedback === item && styles.choiceCorrect]}>
            <Text style={styles.choiceText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream, padding: 16 },
  header: { fontSize: 22, fontWeight: '800', color: colors.ink, marginBottom: 10 },
  modeRow: { maxHeight: 70, marginBottom: 10 },
  modeBtn: { backgroundColor: '#fff', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 16, alignItems: 'center', minWidth: 72 },
  modeBtnOn: { backgroundColor: colors.berry },
  modeEmoji: { fontSize: 20, marginBottom: 2 },
  modeLabel: { fontWeight: '700', fontSize: 11, color: colors.inkSoft },
  modeLabelOn: { color: '#fff' },
  score: { textAlign: 'center', marginBottom: 12, fontWeight: '800', fontSize: 14, color: colors.inkSoft },
  gameBox: { flex: 1, backgroundColor: '#fff', borderRadius: radii.lg, padding: 20, alignItems: 'center', justifyContent: 'center' },
  instruction: { fontSize: 16, fontWeight: '700', color: colors.ink, marginBottom: 8, textAlign: 'center' },
  subInstruction: { fontSize: 13, color: colors.inkSoft, marginBottom: 14, textAlign: 'center' },
  choices: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 16 },
  choiceBtn: { minWidth: 60, height: 60, borderRadius: 16, backgroundColor: colors.sky, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12 },
  choiceCorrect: { backgroundColor: colors.leaf },
  choiceText: { fontSize: 24 },
  // Matching
  matchGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: 12 },
  matchCard: { width: 60, height: 60, borderRadius: 14, backgroundColor: colors.sky, alignItems: 'center', justifyContent: 'center' },
  matchCardDone: { backgroundColor: colors.leaf, opacity: 0.6 },
  matchEmoji: { fontSize: 26 },
  // Pattern
  patternRow: { flexDirection: 'row', gap: 8, marginVertical: 16, flexWrap: 'wrap', justifyContent: 'center' },
  patternItem: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#F0EDE6', alignItems: 'center', justifyContent: 'center' },
  patternMissing: { backgroundColor: colors.berry },
  patternText: { fontSize: 20, fontWeight: '800' },
  // Sorting
  sortGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginVertical: 14 },
  sortItem: { width: 64, height: 64, borderRadius: 16, backgroundColor: '#F0EDE6', alignItems: 'center', justifyContent: 'center' },
  sortItemSelected: { backgroundColor: colors.sun, borderWidth: 3, borderColor: colors.berry },
  sortEmoji: { fontSize: 28 },
  checkBtn: { backgroundColor: colors.leaf, paddingHorizontal: 28, paddingVertical: 12, borderRadius: 16, marginTop: 10 },
  checkBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  // Odd one out
  oddGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 16, marginTop: 20 },
  oddItem: { width: 72, height: 72, borderRadius: 18, backgroundColor: '#F0EDE6', alignItems: 'center', justifyContent: 'center' },
  oddItemCorrect: { backgroundColor: colors.leaf },
  oddEmoji: { fontSize: 32 },
  // Jigsaw
  jigsawPiece: { backgroundColor: colors.sun, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 14, marginBottom: 14 },
  jigsawPieceText: { fontWeight: '800', fontSize: 18, color: colors.ink },
  jigsawGrid: { flexDirection: 'row', flexWrap: 'wrap', width: 200, gap: 6, justifyContent: 'center' },
  jigsawSlot: { width: 58, height: 58, borderRadius: 14, backgroundColor: '#F0EDE6', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#E0D8CA', borderStyle: 'dashed' },
  jigsawSlotFilled: { backgroundColor: colors.sky, borderColor: colors.sky, borderStyle: 'solid' },
  jigsawSlotText: { fontSize: 22, fontWeight: '800', color: '#fff' },
  // Shadow
  shadowTarget: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#2B2118', alignItems: 'center', justifyContent: 'center', marginVertical: 16 },
  shadowEmoji: { fontSize: 44, opacity: 0.15 },
});
