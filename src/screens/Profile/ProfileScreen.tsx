import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, SIZES, SHADOWS } from '../../constants/theme';

const ProfileScreen: React.FC = () => {
  const settingsOptions = [
    {
      icon: 'volume-high',
      title: 'Voice Speed',
      value: 'Normal',
      description: 'Adjust how fast I speak',
    },
    {
      icon: 'text',
      title: 'Text Size',
      value: 'Extra Large',
      description: 'Current text size setting',
    },
    {
      icon: 'notifications',
      title: 'Reminders',
      value: 'On',
      description: 'Daily story prompts',
    },
    {
      icon: 'phone-portrait',
      title: 'Haptic Feedback',
      value: 'On',
      description: 'Vibration when tapping',
    },
  ];

  const aboutOptions = [
    {
      icon: 'help-circle',
      title: 'How to Use',
    },
    {
      icon: 'document-text',
      title: 'Privacy Policy',
    },
    {
      icon: 'information-circle',
      title: 'About Anne\'s Diary',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Ionicons
              name="person"
              size={SIZES.iconSizeLarge}
              color={COLORS.textWhite}
            />
          </View>
          <Text style={styles.name}>Anne</Text>
          <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Stories</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Photos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Family</Text>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {settingsOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.settingItem}
              activeOpacity={0.8}
            >
              <View style={styles.settingIcon}>
                <Ionicons
                  name={option.icon as any}
                  size={28}
                  color={COLORS.primary}
                />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{option.title}</Text>
                <Text style={styles.settingDescription}>
                  {option.description}
                </Text>
              </View>
              <View style={styles.settingValue}>
                <Text style={styles.settingValueText}>{option.value}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={COLORS.textSecondary}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          {aboutOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.settingItem}
              activeOpacity={0.8}
            >
              <View style={styles.settingIcon}>
                <Ionicons
                  name={option.icon as any}
                  size={28}
                  color={COLORS.primary}
                />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{option.title}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={COLORS.textSecondary}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* App Version */}
        <Text style={styles.version}>Anne's Diary v1.0.0</Text>
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
    paddingBottom: SPACING.xl,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.md,
  },
  avatar: {
    width: SIZES.avatarSize * 1.5,
    height: SIZES.avatarSize * 1.5,
    borderRadius: SIZES.avatarSize * 0.75,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  name: {
    fontSize: FONTS.extraLarge,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  editButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: SIZES.borderRadius,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  editButtonText: {
    fontSize: FONTS.body,
    fontWeight: '600',
    color: COLORS.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.xl,
    gap: SPACING.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.borderRadius,
    padding: SPACING.md,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  statValue: {
    fontSize: FONTS.extraLarge,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: FONTS.body,
    color: COLORS.textSecondary,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONTS.large,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.xs,
    borderRadius: SIZES.borderRadius,
    padding: SPACING.md,
    gap: SPACING.md,
    ...SHADOWS.small,
  },
  settingIcon: {
    width: SIZES.iconSize,
    height: SIZES.iconSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: FONTS.title,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: FONTS.body,
    color: COLORS.textSecondary,
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  settingValueText: {
    fontSize: FONTS.body,
    color: COLORS.textSecondary,
  },
  version: {
    fontSize: FONTS.caption,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: SPACING.lg,
  },
});

export default ProfileScreen;
