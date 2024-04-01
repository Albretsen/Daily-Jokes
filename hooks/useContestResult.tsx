import { useState, useEffect } from 'react';
import { api } from "../api/api";
import { useIsFocused } from '@react-navigation/native';
import { UserDataManager } from '../services/userDataManager';
import { Contest } from '../types/Contest';

export const useContestResult = () => {
    const [contestResult, setContestResult] = useState<Contest[]>([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        let isMounted = true;

        const fetchContestResult = async () => {
            if (isFocused && isMounted) {
                try {
                    const contestResult_result = await api("GET", "/contestResult", undefined, await UserDataManager.getToken());
                    if (isMounted) {
                        setContestResult(contestResult_result);
                    }
                } catch (error) {
                    console.log("Failed to fetch contestResult:", error);
                }
            }
        };

        fetchContestResult();

        return () => { isMounted = false; };
    }, [isFocused]);

    return contestResult;
};
