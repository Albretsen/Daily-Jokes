import React, { useEffect, useState, useContext } from 'react';
import { View } from "react-native";
import { UserDataManager } from '../../services/userDataManager';
import { useContest } from '../../hooks/useContest';
import JokeListManager from '../../components/managers/JokeListManager';
import ActiveTabContext from '../../context/ActiveTabContext';
import ScrollToTopView from '../../components/layout/ScrollToTopView';

export default function MyJokes() {
    const { activeTab } = useContext(ActiveTabContext);
    const [criteria, setCriteria] = useState({ filters: { userId: -1, contestId: -1 } });

    const contest = useContest();

    useEffect(() => {
        if (activeTab === 2) {
            const fetchUserId = async () => {
                const userDetails = await UserDataManager.getUserDetails();
                setCriteria({ filters: { userId: userDetails.id, contestId: contest.id } });
            };

            fetchUserId();
        }
    }, [activeTab, contest]);

    return (
        <ScrollToTopView>
            <JokeListManager noJokesMessage="When you post a joke, it will appear here!" initialCriteria={criteria} />
        </ScrollToTopView>
    );
}
