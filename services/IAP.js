import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import { UserDataManager } from './userDataManager';

const APIKeys = {
    google: "goog_StXAnSKrfsHDKiLFViYdoaKkCGC",
    apple: "appl_KnTLeYGyzTNCwpuSgTMFXPvfINe",
};

export const initialize = async () => {
    try {
        Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

        let userDetails = await UserDataManager.getUserDetails();

        if (Platform.OS == "android") {
            await Purchases.configure({ apiKey: APIKeys.google, appUserID: userDetails.id + "" });
        } else if (Platform.OS == "ios") {
            await Purchases.configure({ apiKey: APIKeys.apple, appUserID: userDetails.id + "" });
        } else {
            return;
        }
    } catch {

    }
}

export const IAPLogin = async () => {
    let userDetails = await UserDataManager.getUserDetails();
    await Purchases.logIn(userDetails.id + "");
}

export const getOfferings = async () => {
    return await Purchases.getOfferings();
}

export const getCustomerInfo = async () => {
    return await Purchases.getCustomerInfo();
}

export const purchaseProduct = async (productIdentifier) => {
    try {
        const offerings = await getOfferings();
        if (!offerings || !offerings.current || offerings.current.availablePackages.length === 0) {
            throw new Error("No offerings available");
        }

        const productPackage = offerings.current.availablePackages.find(p => p.product.identifier === productIdentifier);
        if (!productPackage) {
            throw new Error(`Product with ID ${productIdentifier} not found.`);
        }

        const customerInfo = await Purchases.purchasePackage(productPackage);

        return { success: customerInfo?.transaction?.productIdentifier == productIdentifier, customerInfo };
    } catch (error) {
        console.error("Purchase error: ", error.message);
        return { success: false, error: error.message };
    }
};