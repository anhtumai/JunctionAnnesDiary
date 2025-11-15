import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES, SPACING, SHADOWS } from '../../constants/theme';
import { Photo } from '../../types';
import { MEMORY_CATEGORIES } from '../../constants/data';

interface PhotoCardProps {
  photo: Photo;
  onPress: () => void;
  selected?: boolean;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  onPress,
  selected = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: photo.url }}
        style={styles.image}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {photo.category && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>
                {photo.category.charAt(0).toUpperCase() + photo.category.slice(1)}
              </Text>
            </View>
          )}
          {photo.description && (
            <Text style={styles.description} numberOfLines={2}>
              {photo.description}
            </Text>
          )}
          {photo.date && (
            <Text style={styles.date}>
              {new Date(photo.date).getFullYear()}
            </Text>
          )}
        </View>
      </LinearGradient>
      {selected && (
        <View style={styles.selectedBadge}>
          <View style={styles.checkmark} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.borderRadius,
    overflow: 'hidden',
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  selected: {
    borderColor: COLORS.primary,
  },
  image: {
    width: '100%',
    height: 280,
    backgroundColor: COLORS.divider,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    justifyContent: 'flex-end',
  },
  content: {
    padding: SPACING.md,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: SIZES.borderRadius / 2,
    marginBottom: SPACING.xs,
  },
  categoryText: {
    fontSize: FONTS.caption,
    fontWeight: '600',
    color: COLORS.textWhite,
  },
  description: {
    fontSize: FONTS.body,
    fontWeight: '600',
    color: COLORS.textWhite,
    marginBottom: SPACING.xs / 2,
  },
  date: {
    fontSize: FONTS.caption,
    color: COLORS.textWhite,
    opacity: 0.9,
  },
  selectedBadge: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    width: 12,
    height: 20,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: COLORS.textWhite,
    transform: [{ rotate: '45deg' }, { translateY: -2 }],
  },
});
