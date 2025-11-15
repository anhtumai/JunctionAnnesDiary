import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, SIZES } from '../../constants/theme';
import { VoiceState } from '../../types';

interface VoiceIndicatorProps {
  state: VoiceState;
  message?: string;
}

export const VoiceIndicator: React.FC<VoiceIndicatorProps> = ({
  state,
  message,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const dotAnim1 = useRef(new Animated.Value(0)).current;
  const dotAnim2 = useRef(new Animated.Value(0)).current;
  const dotAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (state === 'listening' || state === 'speaking') {
      // Pulsing animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else if (state === 'processing') {
      // Bouncing dots animation
      const createDotAnimation = (dot: Animated.Value, delay: number) => {
        return Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(dot, {
              toValue: -10,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(dot, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }),
          ])
        );
      };

      Animated.parallel([
        createDotAnimation(dotAnim1, 0),
        createDotAnimation(dotAnim2, 150),
        createDotAnimation(dotAnim3, 300),
      ]).start();
    } else {
      pulseAnim.setValue(1);
      dotAnim1.setValue(0);
      dotAnim2.setValue(0);
      dotAnim3.setValue(0);
    }
  }, [state]);

  const getStateColor = () => {
    switch (state) {
      case 'listening':
        return COLORS.listening;
      case 'speaking':
        return COLORS.speaking;
      case 'processing':
        return COLORS.thinking;
      default:
        return COLORS.border;
    }
  };

  const getStateIcon = () => {
    switch (state) {
      case 'listening':
        return 'mic';
      case 'speaking':
        return 'volume-high';
      case 'processing':
        return 'hourglass';
      default:
        return 'radio-button-off';
    }
  };

  const getStateMessage = () => {
    if (message) return message;
    switch (state) {
      case 'listening':
        return "I'm listening...";
      case 'speaking':
        return 'Speaking...';
      case 'processing':
        return 'Thinking...';
      default:
        return 'Ready';
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.iconContainer,
          {
            backgroundColor: getStateColor(),
            transform: [{ scale: pulseAnim }],
          },
        ]}
      >
        <Ionicons
          name={getStateIcon() as any}
          size={SIZES.iconSizeLarge}
          color={COLORS.textWhite}
        />
      </Animated.View>

      <View style={styles.textContainer}>
        <Text style={styles.stateText}>{getStateMessage()}</Text>
        {state === 'processing' && (
          <View style={styles.dotsContainer}>
            <Animated.View
              style={[
                styles.dot,
                { transform: [{ translateY: dotAnim1 }] },
              ]}
            />
            <Animated.View
              style={[
                styles.dot,
                { transform: [{ translateY: dotAnim2 }] },
              ]}
            />
            <Animated.View
              style={[
                styles.dot,
                { transform: [{ translateY: dotAnim3 }] },
              ]}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  iconContainer: {
    width: SIZES.avatarSize * 1.5,
    height: SIZES.avatarSize * 1.5,
    borderRadius: SIZES.avatarSize * 0.75,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  textContainer: {
    alignItems: 'center',
  },
  stateText: {
    fontSize: FONTS.title,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.thinking,
  },
});
