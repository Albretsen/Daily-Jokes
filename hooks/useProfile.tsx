import { useState, useEffect } from 'react';
import { api } from "../api/api";
import { useIsFocused } from '@react-navigation/native';
import { storeData, getData } from '../utils/storage';
import { UserDataManager } from '../services/userDataManager';

interface ProfileState {
    user: {
        id: number;
        name: string;
    };
    userId: number;
    profile: {
        id: number;
    };
}

export const useProfile = (userId?: number) => {
    const [profile, setProfile] = useState({ user: { id: -1, name: "", }, userId: -1, profile: { id: -1 } });
    const isFocused = useIsFocused();

    useEffect(() => {
        let isMounted = true;

        const fetchProfile = async () => {
            if (userId === undefined) {
                const storedProfile = await getData('profile');
                if (storedProfile && isMounted) {
                    setProfile(storedProfile);
                }

                if (isFocused && isMounted) {
                    try {
                        const profileResult = await api("POST", "/auth/loginWithToken", undefined, await UserDataManager.getToken());
                        if (isMounted) {
                            setProfile(profileResult);
                            await storeData('profile', profileResult);
                        }
                    } catch (error) {
                        console.error("Failed to fetch profile:", error);
                    }
                }
            } else {
                if (isFocused && isMounted) {
                    try {
                        // Replace "/new/endpoint" with your actual API endpoint and adjust as necessary.
                        const profileResult = await api("POST", `/auth/public/${userId}`, undefined, await UserDataManager.getToken());
                        console.log(profileResult);
                        if (isMounted) {
                            setProfile(profileResult);
                        }
                    } catch (error) {
                        console.error("Failed to fetch profile with optional number:", error);
                    }
                }
            }
        };

        fetchProfile();

        return () => {
            isMounted = false;
        };
    }, [isFocused, userId]);

    return profile;
};
