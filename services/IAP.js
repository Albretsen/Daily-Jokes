import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';

const APIKeys = {
    google: "goog_StXAnSKrfsHDKiLFViYdoaKkCGC",
    apple: "appl_KnTLeYGyzTNCwpuSgTMFXPvfINe",
};

export const initialize = async () => {
    try {
        Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

        if (Platform.OS == "android") {
            await Purchases.configure({ apiKey: APIKeys.google });
        } else if (Platform.OS == "ios") {
            await Purchases.configure({ apiKey: APIKeys.apple });
        } else {
            return;
        }

        //const customerInfo = await Purchases.getCustomerInfo();
        //const offerings = await Purchases.getOfferings();
    } catch {

    }
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

        return { success: true, customerInfo };
    } catch (error) {
        console.error("Purchase error: ", error.message);
        return { success: false, error: error.message };
    }
};