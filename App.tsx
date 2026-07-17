import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import mobileAds from 'react-native-google-mobile-ads';
import RootNavigator from './src/navigation/RootNavigator';
import { PremiumProvider } from './src/utils/premium';

export default function App() {
  useEffect(() => {
    // Initialize Mobile Ads SDK
    mobileAds().initialize();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PremiumProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar style="dark" />
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </PremiumProvider>
    </GestureHandlerRootView>
  );
}
