import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ColoringHubScreen from '../screens/ColoringHubScreen';
import ColoringCanvasScreen from '../screens/ColoringCanvasScreen';
import ImportCanvasScreen from '../screens/ImportCanvasScreen';
import TracingScreen from '../screens/TracingScreen';
import NumberingScreen from '../screens/NumberingScreen';
import LearningScreen from '../screens/LearningScreen';
import PuzzlesScreen from '../screens/PuzzlesScreen';
import RhymesScreen from '../screens/RhymesScreen';
import { colors } from '../theme/tokens';

const Tab = createBottomTabNavigator();
const ColoringStackNav = createNativeStackNavigator();

// Coloring needs its own stack (hub -> canvas / import canvas) nested inside the tab.
function ColoringStack() {
  return (
    <ColoringStackNav.Navigator screenOptions={{ headerShown: false }}>
      <ColoringStackNav.Screen name="ColoringHub" component={ColoringHubScreen} />
      <ColoringStackNav.Screen name="ColoringCanvas" component={ColoringCanvasScreen} />
      <ColoringStackNav.Screen name="ImportCanvas" component={ImportCanvasScreen} />
    </ColoringStackNav.Navigator>
  );
}

const ICONS: Record<string, string> = {
  Home: '🐠', ColoringHub: '🖌️', Tracing: '✏️', Numbering: '🔢', Learning: '📚', Puzzles: '🧩', Rhymes: '🎵',
};

export default function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.berry,
        tabBarInactiveTintColor: colors.inkSoft,
        tabBarIcon: () => <Text style={{ fontSize: 20 }}>{ICONS[route.name]}</Text>,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="ColoringHub" component={ColoringStack} options={{ title: 'Coloring' }} />
      <Tab.Screen name="Tracing" component={TracingScreen} />
      <Tab.Screen name="Numbering" component={NumberingScreen} />
      <Tab.Screen name="Learning" component={LearningScreen} />
      <Tab.Screen name="Puzzles" component={PuzzlesScreen} />
      <Tab.Screen name="Rhymes" component={RhymesScreen} />
    </Tab.Navigator>
  );
}
