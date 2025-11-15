# Anne's Diary 📖

A voice-first mobile application designed for elderly users (60-85 years) to preserve their precious memories through AI-powered conversational interviews. Built with React Native and Expo, featuring ElevenLabs voice integration for natural, gentle conversations.

## 🌟 Overview

Anne's Diary helps seniors create legacy stories by:
- **Voice-First Interface**: Natural conversation using ElevenLabs TTS & STT
- **AI-Powered Interviews**: Thoughtful questions guided by photos
- **Memory Preservation**: Beautiful stories combining audio, text, and photos
- **Family Sharing**: Share precious memories with loved ones
- **Elder-Friendly Design**: Large UI elements, warm colors, simple navigation

## ✨ Features

### Core Features
- 🎤 **Voice Interviews**: AI companion asks warm, personal questions
- 📸 **Photo-Driven Memories**: Stories built around meaningful photos
- 📚 **Legacy Diary**: Beautiful library of saved stories
- 🎵 **Audio Narration**: Listen to stories with AI-generated voice
- 👥 **Family Profiles**: Share stories with family members
- ⚙️ **Accessibility**: Extra-large buttons, high contrast, simple navigation

### Technical Features
- React Native with Expo for cross-platform development
- ElevenLabs API for natural voice synthesis and recognition
- Local storage with AsyncStorage for privacy
- Warm gold color theme optimized for elderly users
- Large fonts (18-32px) and touch targets (56-72px)
- Smooth animations with React Native Reanimated

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator
- ElevenLabs API key ([get one here](https://elevenlabs.io))

### Installation

1. **Clone the repository**
   ```bash
   cd annes-diary
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your ElevenLabs API key:
   ```
   EXPO_PUBLIC_ELEVENLABS_API_KEY=your_actual_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on your device**
   - **iOS**: Press `i` or scan QR code with Camera app
   - **Android**: Press `a` or scan QR code with Expo Go app
   - **Web**: Press `w` (limited functionality)

## 📱 App Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── PhotoCard.tsx
│   │   ├── StoryCard.tsx
│   │   └── VoiceIndicator.tsx
│   ├── interview/       # Interview-specific components
│   ├── story/          # Story-related components
│   └── diary/          # Diary library components
├── screens/
│   ├── Home/           # Home screen with voice prompt
│   ├── PhotoSuggestion/# Photo selection screen
│   ├── Interview/      # Voice interview mode
│   ├── StoryPreview/   # Preview generated story
│   ├── Diary/          # Story library
│   └── Profile/        # User settings
├── services/
│   ├── elevenLabsService.ts    # Voice TTS/STT integration
│   ├── storageService.ts       # Local data persistence
│   └── interviewEngine.ts      # Interview flow & story generation
├── navigation/
│   └── AppNavigator.tsx        # Navigation structure
├── constants/
│   ├── theme.ts        # Colors, fonts, spacing
│   └── data.ts         # Sample photos, questions
└── types/
    └── index.ts        # TypeScript type definitions
```

## 🎨 Design Philosophy

### Elderly-Friendly UI
- **Extra Large Text**: 18-32px fonts for easy reading
- **High Contrast**: Dark text on light backgrounds
- **Large Touch Targets**: 56-72px minimum for easy tapping
- **Warm Colors**: Soft gold palette (#D4AF37) for comfort
- **Simple Navigation**: Maximum 3 screens deep
- **Slow Animations**: 400-600ms for gentle transitions

### Voice-First Design
- **Natural Conversation**: AI asks questions like a caring friend
- **Patient Pacing**: Generous time for responses
- **Clear States**: Visual feedback for listening/speaking/processing
- **Gentle Prompts**: Warm, encouraging language
- **Error Tolerance**: Graceful handling of misunderstandings

## 🔧 Configuration

### Voice Settings
Edit `src/services/elevenLabsService.ts` to customize:
- Voice ID (default: Sarah - warm female voice)
- Speech stability (0-1, default: 0.75)
- Voice speed and style

### Interview Questions
Edit `src/constants/data.ts` to customize:
- Question categories (people, feelings, events, etc.)
- Question templates
- Follow-up prompts

### Theme Customization
Edit `src/constants/theme.ts` to customize:
- Colors (primary, secondary, background)
- Font sizes
- Spacing and sizing
- Shadow styles

## 📝 Usage Flow

1. **Home Screen**: User sees warm greeting and suggestions
2. **Photo Selection**: Choose a photo to talk about
3. **Voice Interview**: AI asks 5-6 thoughtful questions
4. **Story Generation**: Responses are woven into narrative
5. **Preview**: Review story with audio narration
6. **Save & Share**: Add to diary and share with family

## 🔮 Future Enhancements

### Planned Features
- [ ] Google Gemini API for automatic photo analysis
- [ ] Real photo import from device gallery
- [ ] OpenAI Whisper for improved speech recognition
- [ ] Multi-language support
- [ ] Cloud sync for backup
- [ ] Family collaboration features
- [ ] Timeline view of stories
- [ ] Print/export as PDF book

### Photo Analysis (Future)
When integrated with Google Gemini:
```typescript
// Analyze photo to generate contextual questions
const analysis = await geminiService.analyzePhoto(photoUri);
// Returns: people, objects, setting, era, emotions
```

## 🤝 Contributing

This is a demo project. Contributions for accessibility improvements and elderly-friendly features are welcome!

## 📄 License

MIT License - feel free to use this as a foundation for your own memory preservation app.

## 🙏 Acknowledgments

- **ElevenLabs** for natural voice synthesis
- **Unsplash** for demo photos
- **Expo** for making React Native development smooth
- Inspired by the need to preserve precious family stories

## 📧 Support

For issues or questions, please check:
- ElevenLabs API documentation: https://elevenlabs.io/docs
- Expo documentation: https://docs.expo.dev
- React Native documentation: https://reactnative.dev

---

**Built with ❤️ for preserving precious memories**
