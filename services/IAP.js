import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';

const APIKeys = {
    google: "goog_StXAnSKrfsHDKiLFViYdoaKkCGC",
    apple: "appl_KnTLeYGyzTNCwpuSgTMFXPvfINe",
};

export const initialize = async () => {
    try {
        Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
        console.log("Initializing IAP");

        if (Platform.OS == "android") {
            await Purchases.configure({ apiKey: APIKeys.google });
            console.log("PASSED CONFIGURE");
        } else if (Platform.OS == "ios") {
            await Purchases.configure({ apiKey: APIKeys.apple });
        } else {
            return;
        }

        const customerInfo = await Purchases.getCustomerInfo();
        console.log("CUSTOMER INFO: ", customerInfo);

        console.log("REACHED OFFERINGS");
        const offerings = await Purchases.getOfferings();
        console.log("PASSED OFFERINGS");

        console.log("Offerings: ", offerings);
    } catch {

    }
}