import { View } from "react-native";
import ScrollToTopView from "../../components/layout/ScrollToTopView";
import JokeListManager from "../../components/managers/JokeListManager";

export default function AllJokesResults({ contestId }: { contestId: number }) {
    return (
        <View style={{ flex: 1 }}>
            <ScrollToTopView>
                <JokeListManager initialCriteria={{ filters: { contestId: contestId }, sortBy: "-createTimeStamp" }} />
            </ScrollToTopView >
        </View >
    )
}