# Quick Start Guide

Get Anne's Diary running in 5 minutes!

## Prerequisites

✅ Node.js installed (check: `node --version`)
✅ Expo CLI installed (install: `npm install -g expo-cli`)
✅ Phone with Expo Go app OR simulator

## Steps

### 1. Install Dependencies (1 minute)

```bash
npm install
```

### 2. Configure API Key (2 minutes)

```bash
# Copy environment template
cp .env.example .env

# Edit .env file and add your ElevenLabs API key
# Get one free at: https://elevenlabs.io
```

Your `.env` should look like:
```
EXPO_PUBLIC_ELEVENLABS_API_KEY=sk_your_actual_key_here
```

### 3. Start the App (1 minute)

```bash
npm start
```

### 4. Run on Device (1 minute)

**Option A: Your Phone (Recommended)**
1. Install "Expo Go" from App Store or Google Play
2. Scan the QR code shown in terminal
3. App opens automatically!

**Option B: Simulator**
- iOS: Press `i` in terminal
- Android: Press `a` in terminal

## Test the App

1. Tap "Start New Story" on home screen
2. Select any photo
3. Tap "Start Interview"
4. Tap the microphone and speak
5. Complete the interview
6. View your generated story!

## Troubleshooting

**Can't install dependencies?**
```bash
npm cache clean --force
npm install
```

**API key not working?**
- Check it starts with `sk_`
- Make sure no quotes in .env file
- Restart Expo server: `npm start`

**App won't load?**
```bash
npm start -- --clear
```

## What's Next?

- Read [FEATURES.md](FEATURES.md) for full feature list
- See [SETUP.md](SETUP.md) for detailed setup
- Check [README.md](README.md) for project overview

## Need Help?

- Check logs in terminal
- Review [SETUP.md](SETUP.md) troubleshooting section
- Visit Expo documentation: https://docs.expo.dev

---

**That's it! You're ready to preserve precious memories! 🎉**
