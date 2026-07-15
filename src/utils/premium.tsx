import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Premium context — tracks whether user has purchased the $0.99 upgrade.
 * 
 * For now uses AsyncStorage. When you publish to Play Store, replace
 * the `purchasePremium()` call with actual Google Play Billing (via
 * react-native-iap or RevenueCat). The restore logic will query
 * Google Play's owned purchases API.
 */

const PREMIUM_KEY = 'tinyfin.premium';

interface PremiumContextType {
  isPremium: boolean;
  purchasePremium: () => Promise<void>;
  restorePurchase: () => Promise<void>;
}

const PremiumContext = createContext<PremiumContextType>({
  isPremium: false,
  purchasePremium: async () => {},
  restorePurchase: async () => {},
});

export function PremiumProvider({ children }: { children: React.ReactNode }) {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    // Check stored premium status on launch
    AsyncStorage.getItem(PREMIUM_KEY).then((v) => {
      if (v === 'true') setIsPremium(true);
    });
  }, []);

  const purchasePremium = useCallback(async () => {
    // TODO: Replace with real Google Play Billing purchase flow.
    // For now, this simulates a successful purchase.
    // When you integrate react-native-iap:
    //   1. Call requestPurchase('tinyfin_premium')
    //   2. On success, set premium to true
    //   3. On failure, show error
    await AsyncStorage.setItem(PREMIUM_KEY, 'true');
    setIsPremium(true);
  }, []);

  const restorePurchase = useCallback(async () => {
    // TODO: Replace with Google Play Billing getAvailablePurchases()
    // For now, just check local storage
    const v = await AsyncStorage.getItem(PREMIUM_KEY);
    if (v === 'true') setIsPremium(true);
  }, []);

  return (
    <PremiumContext.Provider value={{ isPremium, purchasePremium, restorePurchase }}>
      {children}
    </PremiumContext.Provider>
  );
}

export function usePremium() {
  return useContext(PremiumContext);
}
