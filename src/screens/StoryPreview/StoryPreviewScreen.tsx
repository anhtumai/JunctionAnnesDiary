import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types';
import { COLORS, FONTS, SPACING, SIZES, SHADOWS } from '../../constants/theme';
import { Button } from '../../components/common';
import { elevenLabsService } from '../../services/elevenLabsService';
import { storageService } from '../../services/storageService';
import { LegacyStory } from '../../types';

type StoryPreviewScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'StoryPreview'
>;

type StoryPreviewScreenRouteProp = RouteProp<
  RootStackParamList,
  'StoryPreview'
>;

interface Props {
  navigation: StoryPreviewScreenNavigationProp;
  route: StoryPreviewScreenRouteProp;
}

const StoryPreviewScreen: React.FC<Props> = ({ navigation, route }) => {
  const { title, narrative, photo } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const story = {
    title,
    narrative,
    photo,
    createdAt: new Date().toISOString(),
  };

  // Initialize audio service on mount
  useEffect(() => {
    elevenLabsService.initialize();

    // Cleanup on unmount
    return () => {
      elevenLabsService.stopSpeaking();
    };
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);

      // Stop audio before saving
      elevenLabsService.stopSpeaking();

      // Create a complete LegacyStory object
      const legacyStory: LegacyStory = {
        id: `story-${Date.now()}`,
        title: story.title,
        photo: story.photo,
        narrative: story.narrative,
        createdAt: story.createdAt,
        updatedAt: story.createdAt,
        metadata: {
          category: story.photo.category,
          wordCount: story.narrative.split(' ').length,
          people: story.photo.people || [],
          tags: [],
        },
      };

      // Save to storage
      await storageService.saveStory(legacyStory);

      // Navigate back to home
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error saving story:', error);
      alert('Failed to save story. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = () => {
    // In real app, implement sharing functionality
    console.log('Share story');
  };

  const handlePlayAudio = async () => {
    try {
      if (isPlaying) {
        // Stop if already playing
        await elevenLabsService.stopSpeaking();
        setIsPlaying(false);
      } else {
        // Play the story narrative using ElevenLabs
        setIsLoading(true);
        await elevenLabsService.speak(story.narrative);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      alert('Failed to play audio. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Header */}
        <View style={styles.successHeader}>
          <Ionicons
            name="checkmark-circle"
            size={SIZES.iconSizeLarge}
            color={COLORS.success}
          />
          <Text style={styles.successText}>Your story is ready!</Text>
        </View>

        {/* Photo */}
        <View style={styles.photoContainer}>
          <Image
            source={{ uri: story.photo.url }}
            style={styles.photo}
            resizeMode="cover"
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>{story.title}</Text>

        {/* Date */}
        <Text style={styles.date}>
          Created on{' '}
          {new Date(story.createdAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </Text>

        {/* Audio Player */}
        <TouchableOpacity
          style={styles.audioPlayer}
          onPress={handlePlayAudio}
          activeOpacity={0.8}
          disabled={isLoading}
        >
          <View style={styles.audioIcon}>
            <Ionicons
              name={isPlaying ? 'stop' : 'play'}
              size={SIZES.iconSize}
              color={COLORS.textWhite}
            />
          </View>
          <View style={styles.audioInfo}>
            <Text style={styles.audioTitle}>
              {isLoading ? 'Loading...' : isPlaying ? 'Stop Story' : 'Listen to Your Story'}
            </Text>
            <Text style={styles.audioDuration}>~ 2 minutes</Text>
          </View>
        </TouchableOpacity>

        {/* Narrative */}
        <View style={styles.narrativeContainer}>
          <Text style={styles.narrativeTitle}>Your Story</Text>
          <Text style={styles.narrative}>{story.narrative}</Text>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <Button
            title={isSaving ? "Saving..." : "Save to My Diary"}
            onPress={handleSave}
            size="large"
            disabled={isSaving}
            loading={isSaving}
            icon={
              <Ionicons name="save" size={32} color={COLORS.textWhite} />
            }
          />

          <TouchableOpacity
            style={styles.secondaryAction}
            onPress={handleShare}
            activeOpacity={0.8}
          >
            <Ionicons
              name="share-social"
              size={SIZES.iconSize}
              color={COLORS.primary}
            />
            <Text style={styles.secondaryActionText}>
              Share with Family
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.xxl,
  },
  successHeader: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  successText: {
    fontSize: FONTS.large,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: SPACING.sm,
  },
  photoContainer: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
    borderRadius: SIZES.borderRadius,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  photo: {
    width: '100%',
    height: 280,
    backgroundColor: COLORS.divider,
  },
  title: {
    fontSize: FONTS.extraLarge,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  date: {
    fontSize: FONTS.body,
    color: COLORS.textSecondary,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  audioPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
    borderRadius: SIZES.borderRadius,
    padding: SPACING.md,
    gap: SPACING.md,
    ...SHADOWS.small,
  },
  audioIcon: {
    width: SIZES.iconSizeLarge,
    height: SIZES.iconSizeLarge,
    borderRadius: SIZES.iconSizeLarge / 2,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioInfo: {
    flex: 1,
  },
  audioTitle: {
    fontSize: FONTS.title,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  audioDuration: {
    fontSize: FONTS.body,
    color: COLORS.textSecondary,
  },
  narrativeContainer: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.xl,
  },
  narrativeTitle: {
    fontSize: FONTS.large,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  narrative: {
    fontSize: FONTS.title,
    color: COLORS.textSecondary,
    lineHeight: FONTS.title * 1.6,
  },
  actionsContainer: {
    marginHorizontal: SPACING.md,
    gap: SPACING.md,
  },
  secondaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.borderRadius,
    height: SIZES.buttonHeight,
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
    ...SHADOWS.small,
  },
  secondaryActionText: {
    fontSize: FONTS.title,
    fontWeight: '600',
    color: COLORS.primary,
  },
});

export default StoryPreviewScreen;
