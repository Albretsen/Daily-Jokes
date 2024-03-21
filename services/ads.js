import { Platform } from "react-native";
import { MobileAds, AdsConsent } from "react-native-google-mobile-ads";
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const initialize = async () => {
    if (Platform.OS == "ios")
        iOSConsent();
    else
        androidConsent();

    await MobileAds().initialize().then(adapterStatus => {
        console.log("Mobile ads initialized");
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