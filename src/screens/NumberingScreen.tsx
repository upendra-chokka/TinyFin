import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';
import { colors, radii } from '../theme/tokens';
import { sounds } from '../utils/sound';

// --- Game mode types ---
type GameMode = 'counting' | 'ordering' | 'compare' | 'addition' | 'subtraction' | 'missing';

const MODES: { key: GameMode; label: string; emoji: string }[] = [
  { key: 'counting', label: 'Counting', emoji: '🔢' },
  { key: 'ordering', label: 'Ordering', emoji: '📊' },
  { key: 'compare', label: 'Compare', emoji: '⚖️' },
  { key: 'addition', label: 'Addition', emoji: '➕' },
  { key: 'subtraction', label: 'Subtract', emoji: '➖' },
  { key: 'missing', label: 'Missing #', emoji: '❓' },
];

const EMOJIS = ['🍎', '🐝', '🐟', '🌸', '⭐', '🍓', '🐞', '🍀', '🦋', '🐢', '🍊', '🌻'];

// --- Round generators ---

interface CountingRound { n: number; emoji: string; choices: number[]; }
function makeCountingRound(): CountingRound {
  const n = 1 + Math.floor(Math.random() * 10);
  const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  const choiceSet = new Set([n]);
  while (choiceSet.size < 4) choiceSet.add(1 + Math.floor(Math.random() * 10));
  const choices = Array.from(choiceSet).sort(() => Math.random() - 0.5);
  return { n, emoji, choices };
}

interface OrderingRound { numbers: number[]; answer: number[]; }
function makeOrderingRound(): OrderingRound {
  const count = 4 + Math.floor(Math.random() * 3); // 4-6 numbers
  const set = new Set<number>();
  while (set.size < count) set.add(1 + Math.floor(Math.random() * 20));
  const numbers = Array.from(set).sort(() => Math.random() - 0.5);
  const answer = [...numbers].sort((a, b) => a - b);
  return { numbers, answer };
}

interface CompareRound { a: number; b: number; answer: '>' | '<' | '='; }
function makeCompareRound(): CompareRound {
  const a = 1 + Math.floor(Math.random() * 15);
  let b = 1 + Math.floor(Math.random() * 15);
  // Occasionally make them equal
  if (Math.random() < 0.15) b = a;
  const answer = a > b ? '>' : a < b ? '<' : '=';
  return { a, b, answer };
}

interface MathRound { a: number; b: number; op: '+' | '-'; answer: number; choices: number[]; }
function makeAdditionRound(): MathRound {
  const a = 1 + Math.floor(Math.random() * 9);
  const b = 1 + Math.floor(Math.random() * 9);
  const answer = a + b;
  const choiceSet = new Set([answer]);
  while (choiceSet.size < 4) choiceSet.add(2 + Math.floor(Math.random() * 17));
  return { a, b, op: '+', answer, choices: Array.from(choiceSet).sort(() => Math.random() - 0.5) };
}

function makeSubtractionRound(): MathRound {
  const answer = Math.floor(Math.random() * 9);
  const b = 1 + Math.floor(Math.random() * 9);
  const a = answer + b;
  const choiceSet = new Set([answer]);
  while (choiceSet.size < 4) choiceSet.add(Math.floor(Math.random() * 15));
  return { a, b, op: '-', answer, choices: Array.from(choiceSet).sort(() => Math.random() - 0.5) };
}

interface MissingRound { sequence: (number | null)[]; answer: number; choices: number[]; }
function makeMissingRound(): MissingRound {
  const start = 1 + Math.floor(Math.random() * 5);
  const step = [1, 2, 3][Math.floor(Math.random() * 3)];
  const len = 5 + Math.floor(Math.random() * 3);
  const full = Array.from({ length: len }, (_, i) => start + i * step);
  const missingIdx = 1 + Math.floor(Math.random() * (len - 2));
  const answer = full[missingIdx];
  const sequence: (number | null)[] = full.map((v, i) => (i === missingIdx ? null : v));
  const choiceSet = new Set([answer]);
  while (choiceSet.size < 4) choiceSet.add(1 + Math.floor(Math.random() * 25));
  return { sequence, answer, choices: Array.from(choiceSet).sort(() => Math.random() - 0.5) };
}

// --- Main component ---

export default function NumberingScreen() {
  const [mode, setMode] = useState<GameMode>('counting');
  const [score, setScore] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.header}>Numbering</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.modeRow} contentContainerStyle={{ gap: 8 }}>
        {MODES.map((m) => (
          <TouchableOpacity key={m.key} onPress={() => setMode(m.key)} style={[styles.modeBtn, mode === m.key && styles.modeBtnOn]}>
            <Text style={styles.modeEmoji}>{m.emoji}</Text>
            <Text style={[styles.modeLabel, mode === m.key && styles.modeLabelOn]}>{m.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={styles.score}>⭐ Score: {score}{totalRounds > 0 ? ` / ${totalRounds}` : ''}</Text>

      {mode === 'counting' && <CountingGame score={score} setScore={setScore} setTotal={setTotalRounds} />}
      {mode === 'ordering' && <OrderingGame score={score} setScore={setScore} setTotal={setTotalRounds} />}
      {mode === 'compare' && <CompareGame score={score} setScore={setScore} setTotal={setTotalRounds} />}
      {mode === 'addition' && <MathGame makeRound={makeAdditionRound} score={score} setScore={setScore} setTotal={setTotalRounds} />}
      {mode === 'subtraction' && <MathGame makeRound={makeSubtractionRound} score={score} setScore={setScore} setTotal={setTotalRounds} />}
      {mode === 'missing' && <MissingGame score={score} setScore={setScore} setTotal={setTotalRounds} />}
    </SafeAreaView>
  );
}

// --- Counting Game (original) ---
function CountingGame({ score, setScore, setTotal }: { score: number; setScore: (fn: (s: number) => number) => void; setTotal: (fn: (n: number) => number) => void }) {
  const [round, setRound] = useState(makeCountingRound());
  const [feedback, setFeedback] = useState<number | null>(null);

  const next = useCallback(() => {
    setRound(makeCountingRound());
    setFeedback(null);
    Speech.speak('Count and tap the number', { rate: 0.9 });
  }, []);

  const onPick = async (val: number) => {
    if (feedback !== null) return;
    setTotal((n) => n + 1);
    if (val === round.n) {
      setScore((s) => s + 1);
      setFeedback(val);
      await sounds.play('correct');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      Speech.speak(`Yes! ${round.n}`, { rate: 0.9 });
      setTimeout(next, 900);
    } else {
      await sounds.play('wrong');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
    }
  };

  return (
    <View style={styles.box}>
      <Text style={styles.instruction}>How many {round.emoji} do you see?</Text>
      <Text style={styles.icons}>{round.emoji.repeat(round.n)}</Text>
      <View style={styles.choices}>
        {round.choices.map((val) => (
          <TouchableOpacity
            key={val}
            onPress={() => onPick(val)}
            style={[styles.choiceBtn, feedback === val && styles.choiceCorrect]}
          >
            <Text style={styles.choiceText}>{val}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- Ordering Game ---
function OrderingGame({ score, setScore, setTotal }: { score: number; setScore: (fn: (s: number) => number) => void; setTotal: (fn: (n: number) => number) => void }) {
  const [round, setRound] = useState(makeOrderingRound());
  const [selected, setSelected] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const next = () => {
    setRound(makeOrderingRound());
    setSelected([]);
    setDone(false);
    Speech.speak('Put the numbers in order, smallest first', { rate: 0.9 });
  };

  const onPick = async (val: number) => {
    if (done || selected.includes(val)) return;
    const nextIdx = selected.length;
    if (val === round.answer[nextIdx]) {
      const newSelected = [...selected, val];
      setSelected(newSelected);
      await sounds.play('pop');
      if (newSelected.length === round.answer.length) {
        setDone(true);
        setTotal((n) => n + 1);
        setScore((s) => s + 1);
        await sounds.play('correct');
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
        Speech.speak('Perfect order!', { rate: 0.9 });
        setTimeout(next, 1200);
      }
    } else {
      setTotal((n) => n + 1);
      await sounds.play('wrong');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
    }
  };

  return (
    <View style={styles.box}>
      <Text style={styles.instruction}>Tap numbers smallest to largest</Text>
      {selected.length > 0 && (
        <Text style={styles.orderedDisplay}>{selected.join(' → ')}{selected.length < round.answer.length ? ' → ?' : ' ✓'}</Text>
      )}
      <View style={styles.choices}>
        {round.numbers.map((val) => (
          <TouchableOpacity
            key={val}
            onPress={() => onPick(val)}
            style={[styles.choiceBtn, selected.includes(val) && styles.choiceCorrect]}
          >
            <Text style={styles.choiceText}>{val}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- Compare Game ---
function CompareGame({ score, setScore, setTotal }: { score: number; setScore: (fn: (s: number) => number) => void; setTotal: (fn: (n: number) => number) => void }) {
  const [round, setRound] = useState(makeCompareRound());
  const [feedback, setFeedback] = useState<string | null>(null);

  const next = () => {
    setRound(makeCompareRound());
    setFeedback(null);
    Speech.speak('Which is bigger? Or are they equal?', { rate: 0.9 });
  };

  const onPick = async (val: '>' | '<' | '=') => {
    if (feedback !== null) return;
    setTotal((n) => n + 1);
    if (val === round.answer) {
      setScore((s) => s + 1);
      setFeedback(val);
      await sounds.play('correct');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      Speech.speak('Correct!', { rate: 0.9 });
      setTimeout(next, 900);
    } else {
      await sounds.play('wrong');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
    }
  };

  return (
    <View style={styles.box}>
      <Text style={styles.instruction}>Compare the numbers</Text>
      <View style={styles.compareRow}>
        <View style={styles.compareNum}><Text style={styles.compareBig}>{round.a}</Text></View>
        <Text style={styles.compareVs}>?</Text>
        <View style={styles.compareNum}><Text style={styles.compareBig}>{round.b}</Text></View>
      </View>
      <View style={styles.choices}>
        {(['<', '=', '>'] as const).map((op) => (
          <TouchableOpacity
            key={op}
            onPress={() => onPick(op)}
            style={[styles.choiceBtn, styles.compareBtn, feedback === op && styles.choiceCorrect]}
          >
            <Text style={styles.choiceText}>{op === '<' ? '◀ Less' : op === '>' ? 'More ▶' : '= Equal'}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- Math Game (Addition / Subtraction) ---
function MathGame({ makeRound, score, setScore, setTotal }: { makeRound: () => MathRound; score: number; setScore: (fn: (s: number) => number) => void; setTotal: (fn: (n: number) => number) => void }) {
  const [round, setRound] = useState(makeRound());
  const [feedback, setFeedback] = useState<number | null>(null);

  const next = useCallback(() => {
    setRound(makeRound());
    setFeedback(null);
  }, [makeRound]);

  const onPick = async (val: number) => {
    if (feedback !== null) return;
    setTotal((n) => n + 1);
    if (val === round.answer) {
      setScore((s) => s + 1);
      setFeedback(val);
      await sounds.play('correct');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      Speech.speak(`${round.a} ${round.op === '+' ? 'plus' : 'minus'} ${round.b} equals ${round.answer}`, { rate: 0.9 });
      setTimeout(next, 1100);
    } else {
      await sounds.play('wrong');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
    }
  };

  return (
    <View style={styles.box}>
      <Text style={styles.instruction}>Solve it!</Text>
      <Text style={styles.mathProblem}>{round.a} {round.op} {round.b} = ?</Text>
      <View style={styles.choices}>
        {round.choices.map((val) => (
          <TouchableOpacity
            key={val}
            onPress={() => onPick(val)}
            style={[styles.choiceBtn, feedback === val && styles.choiceCorrect]}
          >
            <Text style={styles.choiceText}>{val}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// --- Missing Number Game ---
function MissingGame({ score, setScore, setTotal }: { score: number; setScore: (fn: (s: number) => number) => void; setTotal: (fn: (n: number) => number) => void }) {
  const [round, setRound] = useState(makeMissingRound());
  const [feedback, setFeedback] = useState<number | null>(null);

  const next = () => {
    setRound(makeMissingRound());
    setFeedback(null);
    Speech.speak('Find the missing number', { rate: 0.9 });
  };

  const onPick = async (val: number) => {
    if (feedback !== null) return;
    setTotal((n) => n + 1);
    if (val === round.answer) {
      setScore((s) => s + 1);
      setFeedback(val);
      await sounds.play('correct');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      Speech.speak(`Yes! The missing number is ${round.answer}`, { rate: 0.9 });
      setTimeout(next, 1000);
    } else {
      await sounds.play('wrong');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
    }
  };

  return (
    <View style={styles.box}>
      <Text style={styles.instruction}>Find the missing number</Text>
      <View style={styles.sequenceRow}>
        {round.sequence.map((val, i) => (
          <View key={i} style={[styles.seqBox, val === null && styles.seqBoxMissing]}>
            <Text style={[styles.seqText, val === null && styles.seqTextMissing]}>{val !== null ? val : '?'}</Text>
          </View>
        ))}
      </View>
      <View style={styles.choices}>
        {round.choices.map((val) => (
          <TouchableOpacity
            key={val}
            onPress={() => onPick(val)}
            style={[styles.choiceBtn, feedback === val && styles.choiceCorrect]}
          >
            <Text style={styles.choiceText}>{val}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream, padding: 16 },
  header: { fontSize: 22, fontWeight: '800', color: colors.ink, marginBottom: 10 },
  modeRow: { maxHeight: 70, marginBottom: 10 },
  modeBtn: { backgroundColor: '#fff', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 16, alignItems: 'center', minWidth: 72 },
  modeBtnOn: { backgroundColor: colors.sky },
  modeEmoji: { fontSize: 20, marginBottom: 2 },
  modeLabel: { fontWeight: '700', fontSize: 11, color: colors.inkSoft },
  modeLabelOn: { color: '#fff' },
  score: { textAlign: 'center', marginBottom: 12, fontWeight: '800', fontSize: 14, color: colors.inkSoft },
  box: { flex: 1, backgroundColor: '#fff', borderRadius: radii.lg, padding: 20, alignItems: 'center', justifyContent: 'center' },
  instruction: { fontSize: 16, fontWeight: '700', color: colors.inkSoft, marginBottom: 14, textAlign: 'center' },
  icons: { fontSize: 34, lineHeight: 52, letterSpacing: 6, textAlign: 'center', minHeight: 100, maxWidth: '100%', flexWrap: 'wrap' },
  choices: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 20 },
  choiceBtn: { minWidth: 58, height: 58, borderRadius: 16, backgroundColor: colors.sky, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12 },
  choiceCorrect: { backgroundColor: colors.leaf },
  choiceText: { color: '#fff', fontWeight: '800', fontSize: 18 },
  // Compare
  compareRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginVertical: 16 },
  compareNum: { width: 70, height: 70, borderRadius: 20, backgroundColor: colors.sun, alignItems: 'center', justifyContent: 'center' },
  compareBig: { fontSize: 32, fontWeight: '800', color: colors.ink },
  compareVs: { fontSize: 28, fontWeight: '800', color: colors.inkSoft },
  compareBtn: { minWidth: 80 },
  // Math
  mathProblem: { fontSize: 40, fontWeight: '800', color: colors.ink, marginVertical: 16 },
  // Ordering
  orderedDisplay: { fontSize: 18, fontWeight: '700', color: colors.leaf, marginBottom: 10 },
  // Missing
  sequenceRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 12, justifyContent: 'center' },
  seqBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#F0EDE6', alignItems: 'center', justifyContent: 'center' },
  seqBoxMissing: { backgroundColor: colors.berry, },
  seqText: { fontSize: 18, fontWeight: '800', color: colors.ink },
  seqTextMissing: { color: '#fff' },
});
