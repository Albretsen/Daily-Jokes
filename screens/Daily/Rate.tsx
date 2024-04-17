import { View, StyleSheet, ScrollView, Text } from "react-native";
import SwipePicker from "../../components/misc/SwipePicker";
import RoundButtonWithLabel from "../../components/buttons/RoundButtonWithText";
import { useState, useEffect } from "react";
import ContentTab from "../../components/layout/ContentTab";
import { useJokesPreferences } from "../../hooks/useJokesPreferences";
import { useContest } from "../../hooks/useContest";
import { UserDataManager } from "../../services/userDataManager";
import JokeListItem from "../../components/listItem/JokeListItem";
import { Joke } from "../../types/Joke";

export default function Rate() {
    const [showHistory, setShowHistory] = useState(false);
    const [criteria, setCriteria] = useState({ contestId: 0, userId: 0, key: Math.random() });

    const contest = useContest();
    const { jokes, isLoading } = useJokesPreferences(criteria);

    const [localJokes, setLocalJokes] = useState<Joke[]>({ liked: [], disliked: [] });

    useEffect(() => {
        const setCriteriaAsync = async () => {
            let userDetails = await UserDataManager.getUserDetails();
            setCriteria({ contestId: contest.id, userId: userDetails.id, key: 0 });
        }
        setCriteriaAsync();
    }, [contest]);

    useEffect(() => {
        setLocalJokes({ liked: jokes?.liked ? jokes.liked : [], disliked: jokes?.disliked ? jokes.disliked : [] });
    }, [jokes]);

    useEffect(() => {
        setCriteria(prev => ({ ...prev, key: Math.random() }));
    }, [showHistory]);

    return (
        <View style={{
            justifyContent: "flex-start",
            flex: 1,
        }}>
            <View style={{
                paddingTop: 10,
                alignSelf: "center",
                width: "88%",
                zIndex: 1
            }}>
                <RoundButtonWithLabel onPress={() => { setShowHistory(!showHistory) }} label={showHistory ? "Tap to rate jokes" : "Tap to view jokes you've rated"} variant="history" />
            </View>
            <View style={styles.container}>
                {showHistory ? (
                    <ContentTab contentSpacing={20}
                        tabs={[
                            {
                                name: "Liked",
                                component: (
                                    <ScrollView>
                                        {localJokes && localJokes.liked ? (
                                            localJokes.liked.map((joke, index) => (
                                                <JokeListItem key={index} joke={{
                                                    avatarId: joke.user?.profile ? joke.user.profile : 0,
                                                    username: joke.user?.name ? joke.user.name : "",
                                                    text: joke.textBody,
                                                    position: 1,
                                                    stats: {
                                                        likes: joke.score,
                                                    }
                                                }} />
                                            ))
                                        ) : (
                                            <View style={{ alignItems: 'center', marginTop: 20 }}>
                                                <Text>No liked jokes to display.</Text>
                                            </View>
                                        )}
                                    </ScrollView>
                                )
                            },
                            {
                                name: "Disliked",
                                component: (
                                    <ScrollView>
                                        {localJokes && localJokes.disliked ? (
                                            localJokes.disliked.map((joke, index) => (
                                                <JokeListItem key={index} joke={{
                                                    avatarId: joke.user?.profile ? joke.user.profile : 0,
                                                    username: joke.user?.name ? joke.user.name : "",
                                                    text: joke.textBody,
                                                    position: 1,
                                                    stats: {
                                                        likes: joke.score,
                                                    }
                                                }} />
                                            ))
                                        ) : (
                                            <View style={{ alignItems: 'center', marginTop: 20 }}>
                                                <Text>No disliked jokes to display.</Text>
                                            </View>
                                        )}
                                    </ScrollView>
                                )
                            },
                        ]}
                    />
                ) : (
                    <View style={{
                        flex: 1,
                        marginTop: -60,
                    }}>
                        <SwipePicker />
                    </View>
                )}
            </View >
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    }
})