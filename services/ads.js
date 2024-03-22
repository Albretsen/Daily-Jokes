import React from 'react';
import { View, Text, StyleSheet, Platform } from "react-native";
import { MobileAds, AdsConsent, AppOpenAd, InterstitialAd, RewardedAd, BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useTestAds } from '../config';

const bannerAdmobId = Platform.select({
    ios: 'ca-app-pub-1354741235649835/9248757255',
    android: 'ca-app-pub-1354741235649835/8443760287',
  });
  
  const interstitialAdmobId = Platform.select({
    ios: 'ca-app-pub-1354741235649835/8252188596',
    android: 'ca-app-pub-1354741235649835/1561838922',
  });
  
  const bannerId = useTestAds ? TestIds.BANNER : bannerAdmobId;
  const interstitialId = useTestAds ? TestIds.INTERSTITIAL : interstitialAdmobId;

export const initialize = async () => {
    if (Platform.OS == "ios")
        iOSConsent();
    else
        androidConsent();

    await MobileAds().initialize().then(adapterStatus => {
        console.log("Mobile ads initialized");
        AppOpenAd.createForAdRequest(TestIds.APP_OPEN);
    })
}

const androidConsent = async () => {
    const consentInfo = await AdsConsent.requestInfoUpdate();
}

const iOSConsent = async () => {
    const iosTrackingPermissionResult = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);

    if (iosTrackingPermissionResult === RESULTS.DENIED) {
        await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
    }
}

export const BannerAdWrapper = () => {
    return (
        <View style={styles.container}>
            <BannerAd unitId={bannerId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 0, // Consider 20 maybe for production? 
    },
    text: {
        marginBottom: 10, 
    },
});
