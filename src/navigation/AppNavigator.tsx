import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { RootStackParamList } from '../types';

// Import screens (to be created)
import HomeScreen from '../screens/Home/HomeScreen';
import PhotoSuggestionScreen from '../screens/PhotoSuggestion/PhotoSuggestionScreen';
import InterviewScreen from '../screens/Interview/InterviewScreen';
import StoryPreviewScreen from '../screens/StoryPreview/StoryPreviewScreen';
import DiaryScreen from '../screens/Diary/DiaryScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Main tab navigator for Home, Diary, and Profile
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'DiaryTab') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: COLORS.cardBackground,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: FONTS.body,
          fontWeight: '600',
        },
        tabBarIconStyle: {
          marginBottom: -4,
        },
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTitleStyle: {
          fontSize: FONTS.large,
          fontWeight: '700',
          color: COLORS.textPrimary,
        },
        headerTintColor: COLORS.primary,
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="DiaryTab"
        component={DiaryScreen}
        options={{
          title: 'My Stories',
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

// Main app navigator with stack for interview flow
export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerTitleStyle: {
            fontSize: FONTS.large,
            fontWeight: '700',
            color: COLORS.textPrimary,
          },
          headerTintColor: COLORS.primary,
          headerBackTitle: 'Back',
        }}
      >
        <Stack.Screen
          name="Home"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PhotoSuggestion"
          component={PhotoSuggestionScreen}
          options={{
            title: 'Choose a Memory',
          }}
        />
        <Stack.Screen
          name="Interview"
          component={InterviewScreen}
          options={{
            title: 'Tell Your Story',
            headerBackVisible: true,
          }}
        />
        <Stack.Screen
          name="StoryPreview"
          component={StoryPreviewScreen}
          options={{
            title: 'Your Story',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
