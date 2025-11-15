# Features Documentation

Complete guide to all features in Anne's Diary.

## 🎤 Voice Interaction System

### Text-to-Speech (TTS)
- **Technology**: ElevenLabs API
- **Voice**: Sarah (warm, gentle female voice)
- **Speed**: Optimized for elderly users (0.75 stability)
- **Use Cases**:
  - AI companion greeting
  - Question prompts during interviews
  - Story narration playback

### Speech-to-Text (STT)
- **Technology**: Placeholder for integration
- **Recommended Options**:
  - OpenAI Whisper API (most accurate)
  - Google Cloud Speech-to-Text
  - Expo Speech Recognition (basic)
- **Features**:
  - Real-time transcription
  - Noise cancellation
  - Multiple language support (future)

### Voice States
- **Idle**: Ready to listen
- **Listening**: Recording user's voice (animated pulse)
- **Processing**: Converting speech to text (bouncing dots)
- **Speaking**: AI is talking (glowing avatar)

## 📸 Photo-Based Memory System

### Current Implementation (Demo)
- **Source**: Unsplash API
- **Sample Photos**: 8 curated vintage photos
- **Categories**:
  - Birthday celebrations
  - Childhood homes
  - Business milestones
  - Wedding memories
  - Family gatherings
  - Holidays
  - Achievements

### Photo Categories
Each photo is tagged with:
- **Category**: birthday, wedding, childhood, etc.
- **Date**: Approximate year
- **Description**: Brief caption
- **People**: Names of individuals (optional)

### Future: AI Photo Analysis
**Planned Integration**: Google Gemini Vision API

Will automatically detect:
- People and faces
- Objects and scenes
- Time period/era
- Emotions and mood
- Contextual information

## 🎙️ Interview Engine

### Question Selection
The interview engine intelligently selects questions based on:
1. **Photo category** (birthday, wedding, etc.)
2. **Diverse question types** (people, feelings, events, significance, legacy)
3. **Random variation** to keep interviews fresh

### Question Categories

#### 1. People Questions
- "Who were you with in this moment?"
- "Who was most important to you at this time?"
- Focus: Relationships and connections

#### 2. Feelings Questions
- "What were you feeling on this day?"
- "What emotions come back when you see this photo?"
- Focus: Emotional memories and sentiments

#### 3. Events Questions
- "What was happening in this moment?"
- "Can you tell me about the day this photo was taken?"
- Focus: Chronological narrative and details

#### 4. Significance Questions
- "Why was this moment important to you?"
- "What made this time in your life special?"
- Focus: Meaning and importance

#### 5. Legacy Questions
- "What would you tell your grandchildren about this time?"
- "What do you want your family to remember?"
- Focus: Wisdom and family heritage

#### 6. Details Questions
- "What do you remember most vividly?"
- "Were there any sounds or smells you remember?"
- Focus: Sensory details and atmosphere

### Interview Flow
1. **Greeting**: Warm welcome message
2. **Photo Introduction**: Show and describe photo
3. **Question 1**: First question (usually "people" category)
4. **User Response**: Record answer
5. **Question 2-5**: Continue with varied questions
6. **Completion**: Thank user and generate story

### Progress Tracking
- Visual progress bar (0-100%)
- Question counter (e.g., "Question 3 of 5")
- Automatic save of partial responses
- Resume capability (future)

## 📚 Story Generation

### Narrative Creation
The interview engine generates stories by:

1. **Introduction**
   - Photo date/year
   - Initial description
   - Setting context

2. **Body**
   - User responses woven together
   - Natural narrative flow
   - Paragraph breaks for readability
   - Proper punctuation

3. **Conclusion**
   - Reflective closing
   - Legacy message
   - Family connection

### Story Metadata
Each story includes:
- **Title**: Auto-generated from photo/category
- **Word Count**: For reading time estimation
- **Duration**: Audio length in seconds
- **Tags**: Extracted keywords for search
- **Category**: Photo category
- **Timestamps**: Created/updated dates

### Example Story Structure
```
Title: "The Day My Bakery Opened"

Narrative:
"This memory takes us back to 1965. Vintage bakery storefront.

I remember the excitement of opening day. The smell of fresh bread
filled the morning air. My husband helped me prepare everything.

The community response was overwhelming. People lined up to try my
pastries. Children pressed their noses against the window.

This moment represents years of dreaming and hard work. It was the
beginning of something special.

This memory remains a precious part of my story, a moment I cherish
and want to share with those I love."
```

## 📖 Legacy Diary Library

### Features
- **Story Cards**: Large, easy-to-read cards
- **Photos**: Prominent image display
- **Play Button**: One-tap audio playback
- **Sorting**: Chronological (newest first)
- **Search**: By title, tags, or date (future)

### Story Card Display
Each card shows:
- Featured photo
- Story title
- Creation date
- Story excerpt (3 lines)
- Play audio button
- Tap to view full story

### Empty State
When no stories exist:
- Friendly icon
- "No Stories Yet" message
- Encouragement to start creating

## 👤 Profile & Settings

### User Profile
- Name and avatar
- Statistics:
  - Number of stories
  - Number of photos
  - Family members

### Settings

#### Voice Speed
- **Slow**: 0.5x speed
- **Normal**: 1x speed (default)
- **Fast**: 1.5x speed

#### Text Size
- **Large**: 18-24px
- **Extra Large**: 24-32px (default)

#### Preferences
- **Auto-play**: Automatically play story audio
- **Haptic Feedback**: Vibration on button press
- **Reminders**: Daily prompts to create stories
- **Voice Selection**: Choose different AI voices

### About Section
- How to Use guide
- Privacy Policy
- App version
- Contact support

## 🎨 Accessibility Features

### Visual Accessibility
- **High Contrast**: Dark text on light backgrounds
- **Large Fonts**: 18-32px for main content
- **Clear Icons**: 48-64px icon sizes
- **Color-Blind Friendly**: Not relying solely on color

### Touch Accessibility
- **Large Touch Targets**: Minimum 56px, up to 72px
- **Generous Spacing**: Prevents accidental taps
- **Clear Active States**: Visual feedback on press
- **No Swipe Gestures**: All actions via taps

### Audio Accessibility
- **Voice Guidance**: AI speaks all prompts
- **Clear Audio Feedback**: Sounds for actions
- **Volume Control**: Adjustable in settings
- **Captions**: Text accompanies all speech (future)

### Cognitive Accessibility
- **Simple Navigation**: Maximum 3 levels deep
- **Clear Labels**: Descriptive button text
- **Consistent Layout**: Same patterns throughout
- **Progress Indicators**: Always show where you are
- **Error Prevention**: Confirm before deleting

## 💾 Data Storage

### Local Storage (Current)
- **Technology**: React Native AsyncStorage
- **Stored Data**:
  - Legacy stories (text + metadata)
  - Interview sessions (in-progress)
  - User profile and preferences
  - Settings

### Storage Keys
```typescript
STORIES: '@annes_diary:stories'
SESSIONS: '@annes_diary:sessions'
USER_PROFILE: '@annes_diary:user_profile'
SETTINGS: '@annes_diary:settings'
```

### Data Persistence
- Automatic save after each action
- No data loss on app close
- Export capability (future)

### Future: Cloud Sync
Planned integrations:
- **Firebase**: Real-time sync
- **iCloud/Google Drive**: Platform-native
- **AWS S3**: Audio file storage
- **Supabase**: Open-source backend

## 🔔 Future Features

### Phase 2: Enhanced AI
- [ ] Google Gemini photo analysis
- [ ] Automatic question generation from photos
- [ ] Multi-language support
- [ ] Emotion detection in responses
- [ ] Summary generation

### Phase 3: Family Features
- [ ] Share stories with family members
- [ ] Collaborative storytelling
- [ ] Family tree integration
- [ ] Comments and reactions
- [ ] Group viewing sessions

### Phase 4: Premium Features
- [ ] Professional voice actors
- [ ] Custom voice cloning
- [ ] Video narration
- [ ] PDF book export
- [ ] Physical album printing
- [ ] Timeline visualization

### Phase 5: Platform Expansion
- [ ] iPad optimized layout
- [ ] Apple Watch companion app
- [ ] Web dashboard for family
- [ ] Smart display integration
- [ ] Alexa/Google Home skills

## 🔐 Privacy & Security

### Current Implementation
- **Local-First**: All data stored on device
- **No Account Required**: No user registration
- **API Key Security**: Environment variables
- **No Analytics**: No tracking or data collection

### Future Considerations
- End-to-end encryption for cloud sync
- GDPR compliance
- HIPAA compliance (if medical memories)
- Family permission system
- Data export in standard formats
- Right to be forgotten

## 📊 Performance Metrics

### App Performance
- **Launch Time**: < 2 seconds
- **Screen Navigation**: < 300ms
- **Voice Response**: < 500ms
- **Story Generation**: < 2 seconds

### Voice Performance
- **TTS Latency**: 1-3 seconds (ElevenLabs)
- **STT Accuracy**: 95%+ (OpenAI Whisper)
- **Audio Quality**: 44.1kHz, AAC

### Storage Efficiency
- **Text Story**: ~2-5 KB
- **Audio Story**: ~500 KB - 2 MB
- **Photo**: ~100-500 KB (compressed)
- **Total per Story**: ~1-3 MB

---

**All features designed with elderly users in mind: simple, accessible, and meaningful.**
