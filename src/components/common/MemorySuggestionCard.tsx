import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MemorySuggestion } from '../../types';
import { COLORS, FONTS, SPACING, SIZES, SHADOWS } from '../../constants/theme';

interface MemorySuggestionCardProps {
  suggestion: MemorySuggestion;
  onPress: (suggestion: MemorySuggestion) => void;
}

export const MemorySuggestionCard: React.FC<MemorySuggestionCardProps> = ({
  suggestion,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(suggestion)}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{suggestion.icon}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{suggestion.title}</Text>
        <Text style={styles.description}>{suggestion.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.borderRadius,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  icon: {
    fontSize: 32,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: FONTS.title,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  description: {
    fontSize: FONTS.body,
    color: COLORS.textSecondary,
  },
});
