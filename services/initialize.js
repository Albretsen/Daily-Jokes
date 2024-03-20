import { initialize as initializeAuth } from "./auth.js";
import { initialize as initializeContestResult } from "./contestResult.js";
import { initialize as initializeIAP } from "./IAP.js";

export const initialize = async () => {
    await initializeAuth();
    initializeIAP();
    initializeContestResult();
};