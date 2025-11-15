import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
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
  const [userPhotos, setUserPhotos] = useState<Photo[]>([]);
  const [introText] = useState(
    VOICE_PROMPTS.photoIntroduction[
      Math.floor(Math.random() * VOICE_PROMPTS.photoIntroduction.length)
    ]
  );

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'We need access to your photos to help you create stories from your memories.',
        [{ text: 'OK' }]
      );
    }
  };

  const handlePhotoSelect = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handlePickPhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const newPhoto: Photo = {
          id: `user-${Date.now()}`,
          url: asset.uri,
          description: 'Your photo',
          category: 'other',
        };

        // Add to user photos and select it
        setUserPhotos([newPhoto, ...userPhotos]);
        setSelectedPhoto(newPhoto);
      }
    } catch (error) {
      console.error('Error picking photo:', error);
      Alert.alert('Error', 'Failed to pick photo. Please try again.');
    }
  };

  const handleContinue = () => {
    if (selectedPhoto) {
      navigation.navigate('Interview', { photoId: selectedPhoto.id });
    }
  };

  const allPhotos = [...userPhotos, ...SAMPLE_PHOTOS];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Choose a Memory</Text>
          <Text style={styles.subtitle}>{introText}</Text>
        </View>

        {/* Add Photo Button */}
        <View style={styles.addPhotoSection}>
          <Button
            title="📸 Choose from My Photos"
            onPress={handlePickPhoto}
            size="large"
          />
        </View>

        {/* Photo Grid */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {allPhotos.map((photo) => (
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
  addPhotoSection: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
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
