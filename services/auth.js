import { api } from "../api/api";
import { UserDataManager } from "./userDataManager";
import { generateRandomCredentials } from "../utils/random";
import { registerForPushNotificationsAsync } from "./notification";
import { loadProfileToState } from "../state-management/profile";
import NavigationService from "./navigation";

export const login = async (email, password) => {
    try {
        let response = await api("POST", "/auth/login", {
            "email": email,
            "password": password,
        });

        if (response.user.email === email) {
            await loadProfileToState(response.user);
            UserDataManager.storeUserData(response.user);
        } else {
            throw new Error('Login failed');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const loginWithToken = async (token) => {
    try {
        let response = await api("POST", "/auth/loginWithToken", undefined, token);

        if (response.user?.token === token) {
            await loadProfileToState(response.user);
            UserDataManager.storeUserData(response.user);
            return response.user;
        } else {
            throw new Error('Login with token failed');
        }
    } catch (error) {
        console.error(error);
    }
};

export const autoRegisterDevice = async () => {
    try {
        const { email, password, name, deviceID } = await generateRandomCredentials();

        const user = await register(email, password, name, deviceID);

        console.log('Auto-registered account created successfully.');
        return user;
    } catch (error) {
        console.error('Failed to auto-register device:', error);
        throw error;
    }
};

export const register = async (email, password, name, deviceID = "") => {
    try {
        let response = await api("POST", "/auth/register", {
            "name": name,
            "email": email,
            "password": password,
            "deviceID": deviceID,
            "expoPushToken": await registerForPushNotificationsAsync(),
        });

        if (response.user.email === email) {
            await loadProfileToState(response.user);
            UserDataManager.storeUserData(response.user);
            return response.user;
        } else {
            throw new Error('Register failed');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const update = async (data) => {
    try {
        let token = await UserDataManager.getToken();

        if (!token) throw new Error('No stored token');

        let response = await api("POST", "/auth/update", data, token);

        if (response.ok) {
            return true;
        } else {
            throw new Error('Update user info failed');
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const initialize = async () => {
    //await UserDataManager.storeToken("eUGlqdtZFnWhJ3mj.k.De62fnCFM5AWjxQSirUSOKAgyDu7K8.X56Ko2TGoF5VuC");
    //await UserDataManager.storeToken("eUGlqdtZFnWhJ3mj.k.De62fnCFM5AWjxQSirUSOKAgyDu7K8.X56Ko2TGoF5Vu");
    let token = await UserDataManager.getToken();

    if (token && await validateToken(token)) {
        return;
    }

    if (token) {
        console.log("COULD NOT VALIDATE LOCAL TOKEN");
        NavigationService.navigate("Sign in");
        return;
    }

    let localDeviceID = await UserDataManager.getDeviceID();

    if (!localDeviceID) {
        await autoRegisterDevice();
        return;
    } else {
        //await UserDataManager.clearAllData();
        //await autoRegisterDevice();
    }
};


const validateToken = async (token) => {
    if (!token) {
        return false;
    }

    let user = await loginWithToken(token);

    return user?.token === token;
}