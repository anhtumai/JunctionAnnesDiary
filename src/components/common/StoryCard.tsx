import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES, SPACING, SHADOWS } from '../../constants/theme';
import { LegacyStory } from '../../types';

interface StoryCardProps {
  story: LegacyStory;
  onPress: () => void;
  onPlay?: () => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  story,
  onPress,
  onPlay,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {
        story.photo &&
        <Image
        source={{ uri: story.photo.url }}
        style={styles.image}
        resizeMode="cover"
      />
      }
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {story.title}
        </Text>
        <Text style={styles.date}>
          {new Date(story.createdAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </Text>
        <Text style={styles.narrative} numberOfLines={3}>
          {story.narrative}
        </Text>
      </View>
      {onPlay && story.audioUrl && (
        <TouchableOpacity
          style={styles.playButton}
          onPress={(e) => {
            e.stopPropagation();
            onPlay();
          }}
          activeOpacity={0.8}
        >
          <Ionicons name="play-circle" size={SIZES.iconSize} color={COLORS.primary} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.borderRadius,
    overflow: 'hidden',
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.divider,
  },
  content: {
    padding: SPACING.md,
  },
  title: {
    fontSize: FONTS.title,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  date: {
    fontSize: FONTS.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  narrative: {
    fontSize: FONTS.body,
    color: COLORS.textSecondary,
    lineHeight: FONTS.body * 1.5,
  },
  playButton: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.iconSize / 2,
    padding: SPACING.xs,
    ...SHADOWS.small,
  },
});
