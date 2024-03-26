import React, { useEffect } from 'react';
import { View, StyleSheet, Platform, AppState } from 'react-native';
import { MobileAds, AdsConsent, AppOpenAd, BannerAd, BannerAdSize, TestIds, AdEventType, InterstitialAd } from 'react-native-google-mobile-ads';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useTestAds } from '../config';

const adConfig = {
  ios: {
    banner: 'ca-app-pub-1354741235649835/9248757255',
    interstitial: 'ca-app-pub-1354741235649835/8252188596',
    appOpen: 'ca-app-pub-1354741235649835/9970494756',
  },
  android: {
    banner: 'ca-app-pub-1354741235649835/8443760287',
    interstitial: 'ca-app-pub-1354741235649835/1561838922',
    appOpen: 'ca-app-pub-1354741235649835/5137535121',
  },
};

const getAdmobId = (type) => {
  const platformIds = adConfig[Platform.OS];
  return platformIds ? platformIds[type] : null;
};

const useAdIds = () => {
  const testAds = useTestAds;
  return {
    bannerId: testAds ? TestIds.BANNER : getAdmobId('banner'),
    interstitialId: testAds ? TestIds.INTERSTITIAL : getAdmobId('interstitial'),
    appOpenId: testAds ? TestIds.APP_OPEN : getAdmobId('appOpen'),
  };
};

const initializeAds = async () => {
  await requestConsent();
  await MobileAds().initialize();
  console.log('Mobile ads initialized');
};

const requestConsent = async () => {
  if (Platform.OS === 'ios') await requestIosConsent();
  else await requestAndroidConsent();
};

const requestAndroidConsent = async () => await AdsConsent.requestInfoUpdate();
const requestIosConsent = async () => {
  const result = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
  if (result === RESULTS.DENIED) {
    await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
  }
};

let appOpenAd = null;
let appOpenAdLoaded = false;
let interstitialAd = null;
let lastLoadTime = null;
let interstitialLoaded = false;
const AdState = {
  canShowAppOpenAd: true
};

let retryInterval = 30000;

const loadInterstitialAd = (interstitialId) => {
  if (!interstitialAd) {
    interstitialAd = InterstitialAd.createForAdRequest(interstitialId, {
      requestNonPersonalizedAdsOnly: true
    });
  }

  const loadAd = () => interstitialAd.load();

  const onAdLoaded = () => {
    interstitialLoaded = true;
  };

  const onAdFailedToLoad = (error) => {
    console.error('Interstitial ad failed to load: ', error);
    interstitialLoaded = false;
    setTimeout(loadAd, retryInterval);
  };

  const onAdClosed = () => {
    AdState.canShowAppOpenAd = false;
  };

  const loadedListener = interstitialAd.addAdEventListener(AdEventType.LOADED, onAdLoaded);
  const errorListener = interstitialAd.addAdEventListener(AdEventType.ERROR, onAdFailedToLoad);
  const closedListener = interstitialAd.addAdEventListener(AdEventType.CLOSED, onAdClosed);

  loadAd();

  return () => {
    loadedListener();
    errorListener();
    closedListener();
  };
};

export const showInterstitialAd = () => {
  if (interstitialLoaded && interstitialAd) {
    interstitialAd.show();
    interstitialLoaded = false;

    interstitialAd.load();
  }
};

const loadAppOpenAd = (appOpenId) => {
  return;
  if (!appOpenAd) {
    appOpenAd = AppOpenAd.createForAdRequest(appOpenId, { requestNonPersonalizedAdsOnly: true });
  }

  const onAdLoaded = () => {
    appOpenAdLoaded = true;
    lastLoadTime = new Date();
  };

  const onAdFailedToLoad = (error) => {
    console.error('App Open ad failed to load: ', error);
    appOpenAdLoaded = false;
    setTimeout(() => appOpenAd.load(), retryInterval);
  };

  const loadedListener = appOpenAd.addAdEventListener(AdEventType.LOADED, onAdLoaded);
  const errorListener = appOpenAd.addAdEventListener(AdEventType.ERROR, onAdFailedToLoad);

  appOpenAd.load();

  return () => {
    loadedListener();
    errorListener();
  };
};

const showAppOpenAdIfNeeded = () => {
  return;
  const now = new Date();
  if (appOpenAdLoaded && lastLoadTime && (now - lastLoadTime) < 4 * 3600 * 1000) {
    appOpenAd.show().then(() => {
      appOpenAdLoaded = false;
      appOpenAd.load();
    }).catch(error => {
      console.error('Failed to show app open ad:', error);
    });
  } else if (!appOpenAdLoaded) {
    appOpenAd.load();
  }
};

export const AdsWrapper = () => {
  const { bannerId, interstitialId, appOpenId } = useAdIds();

  useEffect(() => {
    const initialize = async () => {
      await requestConsent();
      await MobileAds().initialize();
      console.log('Mobile ads initialized');

      const cleanupAppOpenAd = loadAppOpenAd(appOpenId);
      const unsubscribeInterstitial = loadInterstitialAd(interstitialId);

      const subscription = AppState.addEventListener('change', (nextAppState) => {
        if (nextAppState === "active") {
          if (
            appOpenAdLoaded &&
            AdState.canShowAppOpenAd
          ) {
            showAppOpenAdIfNeeded();
          } else {
            AdState.canShowAppOpenAd = true;
          }
        }
      });

      return () => {
        subscription.remove();
        cleanupAppOpenAd();
        unsubscribeInterstitial();
      };
    };

    initialize();
  }, [appOpenId, interstitialId]);

  return (
    <View style={styles.container}>
      <BannerAd unitId={bannerId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
  },
});