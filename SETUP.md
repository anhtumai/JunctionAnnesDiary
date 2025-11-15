# Setup Guide for Anne's Diary

This guide will help you set up and run the Anne's Diary app on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Node.js** (v16 or higher): [Download here](https://nodejs.org/)
- **npm** or **yarn**: Comes with Node.js
- **Expo CLI**: Install globally with `npm install -g expo-cli`
- **Git**: [Download here](https://git-scm.com/)

### For iOS Development (Mac only)
- **Xcode**: Install from App Store
- **iOS Simulator**: Comes with Xcode

### For Android Development
- **Android Studio**: [Download here](https://developer.android.com/studio)
- **Android Emulator**: Set up through Android Studio

### API Keys Required
- **ElevenLabs API Key**: Sign up at [elevenlabs.io](https://elevenlabs.io)
  - Free tier includes 10,000 characters/month
  - Required for voice features

## Step-by-Step Setup

### 1. Install Dependencies

```bash
# Navigate to project directory
cd /Users/nguyenminh/Documents/Project/Junction

# Install all npm packages
npm install
```

### 2. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Open .env in your text editor
# Add your ElevenLabs API key:
EXPO_PUBLIC_ELEVENLABS_API_KEY=your_actual_api_key_here
```

**How to get ElevenLabs API key:**
1. Go to [elevenlabs.io](https://elevenlabs.io)
2. Sign up or log in
3. Navigate to Profile → API Keys
4. Copy your API key
5. Paste it in the `.env` file

### 3. Start the Development Server

```bash
# Start Expo development server
npm start

# Or with cache cleared
npm run clear
```

This will open Expo Dev Tools in your browser at `http://localhost:19002`

### 4. Run on Your Device

#### Option A: Physical Device (Recommended for testing voice)

**iOS (iPhone/iPad):**
1. Install **Expo Go** app from App Store
2. Open Camera app
3. Scan the QR code shown in terminal
4. App will open in Expo Go

**Android:**
1. Install **Expo Go** app from Google Play Store
2. Open Expo Go app
3. Tap "Scan QR Code"
4. Scan the QR code shown in terminal

#### Option B: Simulator/Emulator

**iOS Simulator:**
```bash
# Press 'i' in the terminal where Expo is running
# Or run:
npm run ios
```

**Android Emulator:**
```bash
# Make sure Android emulator is running
# Press 'a' in the terminal where Expo is running
# Or run:
npm run android
```

#### Option C: Web Browser (Limited functionality)
```bash
# Press 'w' in the terminal
# Or run:
npm run web
```

**Note:** Voice features may not work properly in web browsers.

## Common Issues & Solutions

### Issue: "Cannot find module" errors

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start -- --clear
```

### Issue: ElevenLabs API errors

**Solution:**
1. Verify your API key is correct in `.env`
2. Check you haven't exceeded free tier limits
3. Ensure the API key starts with `sk_`
4. Restart the Expo server after changing `.env`

### Issue: Audio permissions not working

**Solution:**
- **iOS**: Check Settings → Privacy → Microphone
- **Android**: Check app permissions in device settings
- Reinstall the app via Expo Go

### Issue: Slow performance on simulator

**Solution:**
- Use a physical device for better performance
- Voice features work better on real devices
- Close other applications to free up resources

### Issue: App crashes on launch

**Solution:**
```bash
# Clear Expo cache
expo start -c

# Or clear all caches
watchman watch-del-all
rm -rf node_modules
npm install
```

## Testing the App

### Quick Test Flow

1. **Launch app** → You'll see the Home screen with greeting
2. **Tap "Start New Story"** → Goes to photo selection
3. **Select a photo** → Tap on any demo photo
4. **Tap "Start Interview"** → Interview screen loads
5. **Tap microphone** → (Simulated) Records your response
6. **Complete 5 questions** → Story is generated
7. **View story** → See the generated narrative
8. **Save to diary** → Returns to home, story saved

### Testing Voice Features (When ElevenLabs is configured)

1. Make sure your device volume is up
2. Grant microphone permissions when prompted
3. Speak clearly and wait for the animation to stop
4. Check terminal logs for any API errors

## Project Structure Overview

```
Junction/
├── App.tsx                 # Main entry point
├── src/
│   ├── screens/           # All app screens
│   ├── components/        # Reusable UI components
│   ├── services/          # API and business logic
│   ├── navigation/        # Navigation setup
│   ├── constants/         # Theme, colors, data
│   └── types/             # TypeScript definitions
├── assets/                # Images, fonts
├── .env                   # Environment variables (create this)
├── .env.example           # Environment template
└── package.json           # Dependencies

```

## Development Tips

### Hot Reloading
- Expo supports hot reloading
- Changes to code appear automatically
- Shake device (or press Cmd+D on simulator) for dev menu

### Debugging
```bash
# View logs in terminal
# Or use React Native Debugger
npm install -g react-devtools
react-devtools
```

### Customizing the App

**Change colors:**
- Edit `src/constants/theme.ts`
- Modify `COLORS` object

**Add questions:**
- Edit `src/constants/data.ts`
- Add to `INTERVIEW_QUESTIONS` array

**Change voice:**
- Edit `src/services/elevenLabsService.ts`
- Modify `VOICE_CONFIG.defaultVoiceId`

## Building for Production

### iOS (Requires Apple Developer Account)
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

For detailed build instructions, see [Expo documentation](https://docs.expo.dev/distribution/building-standalone-apps/).

## Getting Help

### Resources
- **Expo Docs**: https://docs.expo.dev
- **React Native Docs**: https://reactnative.dev
- **ElevenLabs API Docs**: https://elevenlabs.io/docs

### Common Commands

```bash
# Start development server
npm start

# Start with cache cleared
npm run clear

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web

# Check for Expo updates
expo upgrade

# View project info
expo doctor
```

## Next Steps

After setup, you can:

1. **Customize the theme** in `src/constants/theme.ts`
2. **Add more questions** in `src/constants/data.ts`
3. **Integrate real photo import** (replace Unsplash with device gallery)
4. **Add Google Gemini** for AI photo analysis
5. **Implement real STT** (OpenAI Whisper or Google Speech-to-Text)
6. **Add cloud backup** (Firebase, AWS Amplify, or Supabase)

## Support

If you encounter issues:
1. Check this guide first
2. Search Expo forums
3. Check GitHub issues
4. Review ElevenLabs documentation

---

**Happy coding! 🚀**
