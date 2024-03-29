import React from 'react';
import { useRoute } from '@react-navigation/native'; // Import useRoute
import ScreenView from "../../components/layout/ScreenView";
import ContentTab from "../../components/layout/ContentTab";
import AllJokesResults from "./AllJokesResults";
import MyJokesResults from "./MyJokesResults";
import Text from '../../components/generalUI/Text';
import { View } from 'react-native';

export default function Results() {
    const route = useRoute();
    const contestId = route.params?.contestId ? route.params.contestId : 50;

    return (
        <ScreenView>
            <View>
                <Text size={24} style={{ textAlign: "center" }}>Results for contest:</Text>
                <Text style={{ textAlign: "center" }}>TODO: Contest name</Text>
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
