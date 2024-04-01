import { useState, useEffect } from 'react';
import { api } from "../api/api";
import { useIsFocused } from '@react-navigation/native';
import { UserDataManager } from '../services/userDataManager';
import { Joke } from '../types/Joke';

export const useJokesSearch = (criteria?: Object) => {
    const [jokes, setJokes] = useState<Joke[]>([]);
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchJokes = async () => {
            if (isFocused && isMounted) {
                setIsLoading(true);
                try {
                    const jokes_result = await api("POST", "/joke/search", criteria, await UserDataManager.getToken());
                    if (isMounted) {
                        setJokes(jokes_result);
                    }
                } catch (error) {
                    console.error("Failed to fetch jokes:", error);
                }
                setIsLoading(false);
            }
        };

        fetchJokes();

        return () => { isMounted = false; };
    }, [isFocused, criteria]);

    return { jokes, isLoading };
};
