import { useState, useEffect } from 'react';
import { api } from "../api/api";
import { useIsFocused } from '@react-navigation/native';
import { storeData, getData } from '../utils/storage';
import { Contest } from '../types/Contest';

/**
 *
 * @param {Date} date Optional date to use for fetching contest data.
 * @param {boolean} fetchEnabled If set to false, the hook will skip fetching new data. Defaults to true for backward compatibility.
 * @return The contest information.
 */
export const useContest = (date?: Date, fetchEnabled: boolean = true) => {
    const [contest, setContest] = useState<Contest>({
        topic: "",
        date: new Date().toDateString(),
        id: -1,
        participants: [{ id: 0, profile: 0, name: "", backgroundId: 0, }],
        totalParticipants: 0,
    });
    const isFocused = useIsFocused();

    useEffect(() => {
        let isMounted = true;

        const fetchTopic = async () => {
            if (!fetchEnabled) return;

            const storedContest = await getData('contest');
            if (storedContest && isMounted) {
                setContest(storedContest);
            }

            if (isFocused && isMounted) {
                try {
                    const contestInfo = await api("GET", "/contest");
                    if (isMounted) {
                        setContest(contestInfo[0]);
                        await storeData('contest', contestInfo[0]);
                    }
                } catch (error) {
                    console.error("Failed to fetch contest:", error);
                }
            }
        };

        fetchTopic();

        return () => { isMounted = false; };
    }, [isFocused, fetchEnabled]);

    return contest;
};