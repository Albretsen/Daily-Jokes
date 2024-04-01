import { useState, useEffect } from 'react';
import { api } from "../api/api";
import { useIsFocused } from '@react-navigation/native';
import { storeData, getData } from '../utils/storage';
import { UserDataManager } from '../services/userDataManager';

export const useProfile = () => {
    const [profile, setProfile] = useState({ user: { id: -1, name: "", }, userId: -1, profile: { id: -1 } });
    const isFocused = useIsFocused();

    useEffect(() => {
        let isMounted = true;

        const fetchProfile = async () => {
            const storedProfile = await getData('profile');
            if (storedProfile && isMounted) {
                setProfile(storedProfile);
            }

            if (isFocused && isMounted) {
                try {
                    const profile_result = await api("POST", "/auth/loginWithToken", undefined, await UserDataManager.getToken());
                    if (isMounted) {
                        setProfile(profile_result);
                        await storeData('profile', profile_result);
                    }
                } catch (error) {
                    console.error("Failed to fetch profile:", error);
                }
            }
        };

        fetchProfile();

        return () => { isMounted = false; };
    }, [isFocused]);

    return profile;
};