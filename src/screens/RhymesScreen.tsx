import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
  ScrollView, FlatList, Animated,
} from 'react-native';
import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';
import { colors, radii } from '../theme/tokens';
import { sounds } from '../utils/sound';
import { rhymes, Rhyme } from '../data/rhymes';

type Mode = 'list' | 'singing';

export default function RhymesScreen() {
  const [mode, setMode] = useState<Mode>('list');
  const [activeRhyme, setActiveRhyme] = useState<Rhyme | null>(null);
  const [currentLine, setCurrentLine] = useState(0);
  const [listening, setListening] = useState(false);
  const [feedback, setFeedback] = useState('');
  const listenTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Pulse animation for microphone
  useEffect(() => {
    if (listening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.3, duration: 600, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [listening]);

  const startRhyme = (rhyme: Rhyme) => {
    setActiveRhyme(rhyme);
    setCurrentLine(0);
    setMode('singing');
    setFeedback('');
    // Speak the first line for the child to follow
    setTimeout(() => {
      Speech.speak(rhyme.lines[0], { rate: 0.75, pitch: 1.1 });
    }, 500);
  };

  const goBack = () => {
    setMode('list');
    setActiveRhyme(null);
    setCurrentLine(0);
    setFeedback('');
    stopListening();
    Speech.stop();
  };

  const startListening = () => {
    setListening(true);
    setFeedback('Sing this line...');
    // Auto-finish after a reasonable time for the line. No actual audio
    // recording happens — this app doesn't evaluate singing, it just gives
    // the child a window to sing along, so there's nothing here that needs
    // a native recording session (which is what was breaking on line 2+:
    // expo-av only allows one Recording object at a time, and creating a
    // fresh one right after unloading the previous one was unreliable).
    listenTimer.current = setTimeout(() => {
      evaluateSinging();
    }, 5000);
  };

  const stopListening = () => {
    if (listenTimer.current) {
      clearTimeout(listenTimer.current);
      listenTimer.current = null;
    }
    setListening(false);
  };

  const evaluateSinging = async () => {
    stopListening();

    if (!activeRhyme) return;

    await sounds.play('correct');
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});

    setFeedback('Nice! Now next line 🎉');
    Speech.speak('Nice! Now next line', { rate: 0.9, pitch: 1.1 });

    setTimeout(() => {
      const nextLine = currentLine + 1;
      if (nextLine < activeRhyme.lines.length) {
        setCurrentLine(nextLine);
        setFeedback('');
        // Speak the next line
        Speech.speak(activeRhyme.lines[nextLine], { rate: 0.75, pitch: 1.1 });
      } else {
        // Rhyme complete!
        setFeedback('Amazing! You sang the whole rhyme! 🌟');
        Speech.speak('Amazing! You sang the whole rhyme!', { rate: 0.9, pitch: 1.2 });
        sounds.play('pageComplete');
      }
    }, 1500);
  };

  const speakCurrentLine = () => {
    if (activeRhyme) {
      Speech.stop();
      Speech.speak(activeRhyme.lines[currentLine], { rate: 0.75, pitch: 1.1 });
    }
  };

  // --- LIST VIEW ---
  if (mode === 'list') {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.header}>Rhymes</Text>
        <Text style={styles.subHeader}>Sing along with nursery rhymes!</Text>
        <FlatList
          data={rhymes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.rhymeCard} onPress={() => startRhyme(item)}>
              <Text style={styles.rhymeEmoji}>{item.emoji}</Text>
              <View style={styles.rhymeInfo}>
                <Text style={styles.rhymeTitle}>{item.title}</Text>
                <Text style={styles.rhymeLines}>{item.lines.length} lines</Text>
              </View>
              <Text style={styles.playIcon}>▶️</Text>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
  }

  // --- SINGING VIEW ---
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topbar}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Text style={{ fontSize: 18 }}>←</Text>
        </TouchableOpacity>
        <Text style={styles.singTitle} numberOfLines={1}>
          {activeRhyme?.emoji} {activeRhyme?.title}
        </Text>
      </View>

      {/* Progress */}
      <View style={styles.progressRow}>
        {activeRhyme?.lines.map((_, i) => (
          <View key={i} style={[styles.progressDot,
            i < currentLine && styles.progressDone,
            i === currentLine && styles.progressCurrent,
          ]} />
        ))}
      </View>

      {/* Current line display */}
      <View style={styles.lineBox}>
        <Text style={styles.lineNumber}>
          Line {currentLine + 1} of {activeRhyme?.lines.length}
        </Text>
        <Text style={styles.currentLineText}>
          {activeRhyme?.lines[currentLine]}
        </Text>
      </View>

      {/* Feedback */}
      {feedback !== '' && (
        <View style={styles.feedbackBox}>
          <Text style={styles.feedbackText}>{feedback}</Text>
        </View>
      )}

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.hearBtn} onPress={speakCurrentLine}>
          <Text style={styles.hearBtnEmoji}>🔊</Text>
          <Text style={styles.hearBtnText}>Hear it</Text>
        </TouchableOpacity>

        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity
            style={[styles.micBtn, listening && styles.micBtnActive]}
            onPress={listening ? evaluateSinging : startListening}
          >
            <Text style={styles.micEmoji}>{listening ? '⏹️' : '🎤'}</Text>
            <Text style={styles.micText}>{listening ? 'Done' : 'Sing!'}</Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity style={styles.hearBtn} onPress={() => {
          if (activeRhyme && currentLine < activeRhyme.lines.length - 1) {
            setCurrentLine((l) => l + 1);
            setFeedback('');
          }
        }}>
          <Text style={styles.hearBtnEmoji}>⏭️</Text>
          <Text style={styles.hearBtnText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* All lines preview */}
      <ScrollView style={styles.allLines} contentContainerStyle={{ paddingBottom: 20 }}>
        {activeRhyme?.lines.map((line, i) => (
          <Text key={i} style={[styles.allLineText,
            i === currentLine && styles.allLineCurrent,
            i < currentLine && styles.allLineDone,
          ]}>
            {i < currentLine ? '✓ ' : i === currentLine ? '▶ ' : '  '}{line}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream, padding: 16 },
  header: { fontSize: 22, fontWeight: '800', color: colors.ink, marginBottom: 4 },
  subHeader: { fontSize: 14, color: colors.inkSoft, marginBottom: 14 },
  // List
  rhymeCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 10 },
  rhymeEmoji: { fontSize: 32, marginRight: 14 },
  rhymeInfo: { flex: 1 },
  rhymeTitle: { fontSize: 16, fontWeight: '800', color: colors.ink },
  rhymeLines: { fontSize: 12, color: colors.inkSoft, marginTop: 2 },
  playIcon: { fontSize: 20 },
  // Singing top
  topbar: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  singTitle: { flex: 1, textAlign: 'center', fontWeight: '800', fontSize: 18, color: colors.ink },
  // Progress
  progressRow: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginBottom: 16 },
  progressDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#E0D8CA' },
  progressDone: { backgroundColor: colors.leaf },
  progressCurrent: { backgroundColor: colors.berry, width: 20 },
  // Line display
  lineBox: { backgroundColor: '#fff', borderRadius: 20, padding: 24, alignItems: 'center', marginBottom: 14 },
  lineNumber: { fontSize: 12, color: colors.inkSoft, marginBottom: 8 },
  currentLineText: { fontSize: 22, fontWeight: '800', color: colors.ink, textAlign: 'center', lineHeight: 32 },
  // Feedback
  feedbackBox: { backgroundColor: colors.sun, borderRadius: 14, padding: 12, alignItems: 'center', marginBottom: 14 },
  feedbackText: { fontSize: 16, fontWeight: '700', color: colors.ink },
  // Controls
  controls: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20, marginBottom: 16 },
  hearBtn: { alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 12, width: 70 },
  hearBtnEmoji: { fontSize: 22 },
  hearBtnText: { fontSize: 10, fontWeight: '700', color: colors.inkSoft, marginTop: 4 },
  micBtn: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.berry, alignItems: 'center', justifyContent: 'center' },
  micBtnActive: { backgroundColor: colors.leaf },
  micEmoji: { fontSize: 28 },
  micText: { fontSize: 12, fontWeight: '800', color: '#fff', marginTop: 2 },
  // All lines
  allLines: { flex: 1, backgroundColor: '#fff', borderRadius: 16, padding: 14 },
  allLineText: { fontSize: 14, color: colors.inkSoft, lineHeight: 26, paddingVertical: 2 },
  allLineCurrent: { color: colors.ink, fontWeight: '800' },
  allLineDone: { color: colors.leaf },
});
