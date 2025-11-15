import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Photo } from '../../types';
import { COLORS, FONTS, SPACING } from '../../constants/theme';
import { Button, PhotoCard } from '../../components/common';
import { SAMPLE_PHOTOS, VOICE_PROMPTS } from '../../constants/data';

type PhotoSuggestionScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PhotoSuggestion'
>;

interface Props {
  navigation: PhotoSuggestionScreenNavigationProp;
}

const PhotoSuggestionScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [introText] = useState(
    VOICE_PROMPTS.photoIntroduction[
      Math.floor(Math.random() * VOICE_PROMPTS.photoIntroduction.length)
    ]
  );

  const handlePhotoSelect = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleContinue = () => {
    if (selectedPhoto) {
      navigation.navigate('Interview', { photoId: selectedPhoto.id });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Choose a Memory</Text>
          <Text style={styles.subtitle}>{introText}</Text>
        </View>

        {/* Photo Grid */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {SAMPLE_PHOTOS.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              selected={selectedPhoto?.id === photo.id}
              onPress={() => handlePhotoSelect(photo)}
            />
          ))}
        </ScrollView>

        {/* Bottom Action */}
        {selectedPhoto && (
          <View style={styles.bottomAction}>
            <Button
              title="Start Interview"
              onPress={handleContinue}
              size="large"
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  title: {
    fontSize: FONTS.extraLarge,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONTS.title,
    color: COLORS.textSecondary,
    lineHeight: FONTS.title * 1.4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xxl + 80,
  },
  bottomAction: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.md,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});

export default PhotoSuggestionScreen;
