import { initialize as initializeAuth } from "./auth.js";
import { initialize as initializeContestResult } from "./contestResult.js";
import { initialize as initializeIAP } from "./IAP.js";
import { initialize as initializeAds } from "./ads.js";

export const initialize = async () => {
    await initializeAds();
    await initializeAuth();
    initializeContestResult();
    initializeIAP();
};