import { Audio } from 'expo-av';
import axios from 'axios';

/**
 * ElevenLabs API Service
 * Handles Text-to-Speech (TTS) and Speech-to-Text (STT) using ElevenLabs API
 */

const ELEVENLABS_API_KEY = process.env.EXPO_PUBLIC_ELEVENLABS_API_KEY || 'sk_a2312b4af9397738a75143c2b8354fac027bf101c647c202';
const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1';

// Voice IDs - use warm, gentle voices suitable for elderly users
const VOICE_CONFIG = {
  // Use a warm, gentle female voice
  defaultVoiceId: 'EXAVITQu4vr4xnSDxMaL', // Sarah - warm and friendly
  voiceSettings: {
    stability: 0.75, // Higher stability for clearer speech
    similarity_boost: 0.75,
    style: 0.5,
    use_speaker_boost: true,
  },
};

export class ElevenLabsService {
  private sound: Audio.Sound | null = null;
  private recording: Audio.Recording | null = null;

  /**
   * Initialize audio mode for the app
   */
  async initialize() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });
    } catch (error) {
      console.error('Failed to initialize audio:', error);
      throw error;
    }
  }

  /**
   * Convert text to speech using ElevenLabs TTS
   * @param text - The text to convert to speech
   * @param voiceId - Optional voice ID (defaults to warm female voice)
   * @returns Audio URL or blob
   */
  async textToSpeech(
    text: string,
    voiceId: string = VOICE_CONFIG.defaultVoiceId
  ): Promise<string> {
    try {
      const response = await axios.post(
        `${ELEVENLABS_API_URL}/text-to-speech/${voiceId}`,
        {
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: VOICE_CONFIG.voiceSettings,
        },
        {
          headers: {
            'xi-api-key': ELEVENLABS_API_KEY,
            'Content-Type': 'application/json',
          },
          responseType: 'blob',
        }
      );

      // Convert blob to base64 for mobile playback
      const blob = response.data;
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          const base64data = reader.result as string;
          resolve(base64data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Text-to-speech error:', error);
      throw error;
    }
  }

  /**
   * Play audio from text using ElevenLabs TTS
   * @param text - The text to speak
   */
  async speak(text: string): Promise<void> {
    try {
      // Stop any currently playing audio
      await this.stopSpeaking();

      // Generate speech
      const audioData = await this.textToSpeech(text);

      // Create and play sound
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioData },
        { shouldPlay: true }
      );

      this.sound = sound;

      // Clean up when finished
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          this.stopSpeaking();
        }
      });
    } catch (error) {
      console.error('Speak error:', error);
      throw error;
    }
  }

  /**
   * Stop currently playing audio
   */
  async stopSpeaking(): Promise<void> {
    try {
      if (this.sound) {
        await this.sound.stopAsync();
        await this.sound.unloadAsync();
        this.sound = null;
      }
    } catch (error) {
      console.error('Stop speaking error:', error);
    }
  }

  /**
   * Start recording user's voice
   */
  async startRecording(): Promise<void> {
    try {
      // Request permissions
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        throw new Error('Microphone permission not granted');
      }

      // Prepare recording
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      await recording.startAsync();

      this.recording = recording;
    } catch (error) {
      console.error('Start recording error:', error);
      throw error;
    }
  }

  /**
   * Stop recording and get audio file
   */
  async stopRecording(): Promise<string> {
    try {
      if (!this.recording) {
        throw new Error('No active recording');
      }

      await this.recording.stopAndUnloadAsync();
      const uri = this.recording.getURI();
      this.recording = null;

      if (!uri) {
        throw new Error('Failed to get recording URI');
      }

      return uri;
    } catch (error) {
      console.error('Stop recording error:', error);
      throw error;
    }
  }

  /**
   * Convert speech to text using ElevenLabs STT
   * Note: ElevenLabs may not have direct STT. Consider using alternatives:
   * - Expo Speech Recognition
   * - Google Speech-to-Text
   * - OpenAI Whisper API
   *
   * For now, this is a placeholder that would integrate with your chosen STT service
   */
  async speechToText(audioUri: string): Promise<string> {
    try {
      // This is a placeholder - implement your preferred STT service
      // Options:
      // 1. OpenAI Whisper API
      // 2. Google Cloud Speech-to-Text
      // 3. Expo Speech Recognition (for basic needs)

      console.log('Speech-to-text for:', audioUri);

      // Placeholder return
      return 'Transcribed text will appear here';
    } catch (error) {
      console.error('Speech-to-text error:', error);
      throw error;
    }
  }

  /**
   * Cleanup resources
   */
  async cleanup(): Promise<void> {
    await this.stopSpeaking();
    if (this.recording) {
      try {
        await this.recording.stopAndUnloadAsync();
      } catch (error) {
        console.error('Cleanup recording error:', error);
      }
      this.recording = null;
    }
  }
}

// Export singleton instance
export const elevenLabsService = new ElevenLabsService();

// Export utility functions
export const speak = (text: string) => elevenLabsService.speak(text);
export const stopSpeaking = () => elevenLabsService.stopSpeaking();
export const startRecording = () => elevenLabsService.startRecording();
export const stopRecording = () => elevenLabsService.stopRecording();
