import React, { useState, useEffect } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import ScreenView from "../../components/layout/ScreenView";
import ContentTab from "../../components/layout/ContentTab";
import AllJokesResults from "./AllJokesResults";
import MyJokesResults from "./MyJokesResults";
import Text from '../../components/generalUI/Text';
import { View } from 'react-native';
import { useContestSearch } from '../../hooks/useContestSearch';
import { formatTimestampToShortDate } from '../../utils/date';

interface Criteria {
    filters: {
        id: number;
    };
}

type ResultsRouteProp = {
    Results: {
        contestId?: number;
    };
};

export default function Results() {
    const route = useRoute<RouteProp<ResultsRouteProp, 'Results'>>();
    const contestId = route.params?.contestId ? route.params.contestId : 50;
    const [criteria, setCriteria] = useState<Criteria>({ filters: { id: contestId } });
    const { contests, isLoading } = useContestSearch(criteria);

    useEffect(() => {
        console.log(JSON.stringify(contests));
    }, [contests])

    return (
        <ScreenView>
            <View>
                <Text size={24} style={{ textAlign: "center" }}>Results for contest:</Text>
                <Text style={{ textAlign: "center" }}>{contests[0] ? contests[0].topic + " on " + formatTimestampToShortDate(contests[0].date) : ""}</Text>
            </View>
            <ContentTab
                tabs={[
                    {
                        name: "All Jokes",
                        component: <AllJokesResults contestId={contestId} />,
                    },
                    {
                        name: "My Jokes",
                        component: <MyJokesResults contestId={contestId} />,
                    },
                ]}
            />
        </ScreenView>
    );
}
