import { useState, useEffect } from 'react';
import { api } from "../api/api";
import { useIsFocused } from '@react-navigation/native';
import { UserDataManager } from '../services/userDataManager';
import { Contest } from '../types/Contest';

export const useContestSearch = (criteria?: Object) => {
    const [contests, setContests] = useState<Contest[]>([]);
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchContests = async () => {
            if (isFocused && isMounted) {
                setIsLoading(true);
                try {
                    const contests_result = await api("POST", "/contest/search", criteria, await UserDataManager.getToken());
                    if (isMounted) {
                        setContests(contests_result);
                    }
                } catch (error) {
                    console.error("Failed to fetch contests:", error);
                }
                setIsLoading(false);
            }
        };

        fetchContests();

        return () => { isMounted = false; };
    }, [isFocused, criteria]);

    return { contests, isLoading };
};