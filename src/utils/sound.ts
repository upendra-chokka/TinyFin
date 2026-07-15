import { Audio, AVPlaybackSource } from 'expo-av';

// Central place for every sound the app plays. Add new effects here.
const SOURCES: Record<string, AVPlaybackSource> = {
  brushLoop: require('../../assets/sounds/brush_loop.wav'),
  pop: require('../../assets/sounds/pop.wav'),
  tap: require('../../assets/sounds/tap.wav'),
  correct: require('../../assets/sounds/correct.wav'),
  wrong: require('../../assets/sounds/wrong.wav'),
  pageComplete: require('../../assets/sounds/page_complete.wav'),
  strokeStart: require('../../assets/sounds/stroke_start.wav'),
};

type SoundKey = keyof typeof SOURCES;

class SoundManager {
  private pool: Partial<Record<SoundKey, Audio.Sound>> = {};
  private loopHandle: Audio.Sound | null = null;
  private ready = false;

  async init() {
    if (this.ready) return;
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    });
    this.ready = true;
  }

  private async get(key: SoundKey) {
    if (!this.pool[key]) {
      const { sound } = await Audio.Sound.createAsync(SOURCES[key]);
      this.pool[key] = sound;
    }
    return this.pool[key]!;
  }

  async play(key: SoundKey, volume = 1) {
    try {
      await this.init();
      const sound = await this.get(key);
      await sound.setVolumeAsync(volume);
      await sound.replayAsync();
    } catch (e) {
      // Fail silently — never let a missing sound crash a preschool app.
    }
  }

  /** Starts a looping brush-scribble sound while a stroke is being drawn. */
  async startBrushLoop() {
    try {
      await this.init();
      if (this.loopHandle) return;
      const { sound } = await Audio.Sound.createAsync(SOURCES.brushLoop, {
        isLooping: true,
        volume: 0.5,
      });
      this.loopHandle = sound;
      await sound.playAsync();
    } catch (e) {}
  }

  async stopBrushLoop() {
    try {
      if (this.loopHandle) {
        await this.loopHandle.stopAsync();
        await this.loopHandle.unloadAsync();
        this.loopHandle = null;
      }
    } catch (e) {}
  }
}

export const sounds = new SoundManager();
