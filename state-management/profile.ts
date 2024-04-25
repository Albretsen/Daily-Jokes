import { store } from './reduxStore';
import { addOwnedAvatar, updateAvatar, addOwnedBackground, updateBackground } from './profileSlice';
import { showToast } from './toast';
import { api } from '../api/api';
import { UserDataManager } from '../services/userDataManager';
import { decrementCoins } from './coinSlice';

export interface profileTypes {
    backgroundId: string;
    createdAt: string,
    deviceID: string,
    email: string,
    expoPushToken: string,
    id: number,
    isActive: boolean,
    lastLoginAt: string,
    name: string,
    profile: string,
    profileBackgrounds: [
        {
            backgroundId: string,
            createdAt: string,
            id: number,
            userId: number
        }
    ],
    profilePictures: [
        {
            pictureId: string,
            createdAt: string,
            id: number,
            userId: number
        }
    ]
}

export async function loadProfileToState(profile: profileTypes) {
    try {
        if (profile?.profilePictures) {
            for (let i = 0; i < profile.profilePictures.length; i++) {
                store.dispatch(addOwnedAvatar(parseInt(profile.profilePictures[i].pictureId)));
            }
        }
        if (profile?.profileBackgrounds) {
            for (let i = 0; i < profile.profileBackgrounds.length; i++) {
                store.dispatch(addOwnedBackground(parseInt(profile.profileBackgrounds[i].backgroundId)));
            }
        }
        if (profile?.profile) {
            store.dispatch(updateAvatar(parseInt(profile.profile)));
        }
        if (profile?.backgroundId) {
            store.dispatch(updateBackground(parseInt(profile.backgroundId)));
        }
    } catch (error) {
        console.log(error);
    }
}


export async function buyAvatar(id: number) {
    try {
        const result = await secureApiCall("/auth/purchaseProfilePicture", "POST", { pictureId: String(id) });
        store.dispatch(addOwnedAvatar(id));
        selectAvatar(id);
        store.dispatch(decrementCoins(result.price));
        showToast("Avatar purchased successfully!");
    } catch (error) {

    }
}

export async function selectAvatar(id: number) {
    try {
        await secureApiCall("/auth/changeProfilePicture", "POST", { pictureId: String(id) });
        store.dispatch(updateAvatar(id));
        showToast("Avatar changed successfully!");
    } catch (error) {

    }
}

export async function buyBackground(id: number) {
    try {
        const result = await secureApiCall("/auth/purchaseBackground", "POST", { backgroundId: String(id) });
        store.dispatch(addOwnedBackground(id));
        selectBackground(id);
        store.dispatch(decrementCoins(result.price));
        showToast("Background purchased successfully!");
    } catch (error) {

    }
}

export async function selectBackground(id: number) {
    try {
        await secureApiCall("/auth/changeBackground", "POST", { backgroundId: String(id) });
        store.dispatch(updateBackground(id));
        showToast("Background changed successfully!");
    } catch (error) {

    }
}

async function secureApiCall(endpoint: string, method: string, data: object) {
    try {
        const token = await UserDataManager.getToken();
        const result = await api(method, endpoint, data, token, true, 3, false);
        return result;
    } catch (error) {
        if (error?.error) {
            showToast(error.error);
        }
        throw new Error('');
    }
}