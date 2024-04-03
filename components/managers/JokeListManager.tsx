import React, { useEffect, useState, useRef } from 'react';
import { View } from "react-native";
import Text from '../generalUI/Text';
import JokeListItem from "../../components/listItem/JokeListItem";
import { useJokesSearch } from "../../hooks/useJokesSearch";
import LoadingIndicator from '../generalUI/LoadingIndicator';
import Button from '../buttons/Button';
import { BottomSheetView, BottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheetBackground from '../profile/ProfileBottomSheetBackground';
import CircularButton from '../buttons/CircularButton';
import { updateViewingUser } from "../../state-management/viewingUser";
import { useContest } from '../../hooks/useContest';
import { UserDataManager } from '../../services/userDataManager';
import { Joke } from '../../types/Joke';

interface JokeListManagerProps {
    initialCriteria: {
        pagination?: {
            page: number;
        },
        sortBy?: string;
        filters?: object;
        exclude?: object;
        searchQuery?: string;
    };
    noJokesMessage?: string;
}

export default function JokeListManager({ initialCriteria = { sortBy: "-createTimeStamp", pagination: { page: 1 } }, noJokesMessage = "No jokes found." }: JokeListManagerProps) {
    const [localJokes, setLocalJokes] = useState<Joke[]>([]);
    const [page, setPage] = useState(1);
    const [criteria, setCriteria] = useState(initialCriteria);
    const [initialFetchCompleted, setInitialFetchCompleted] = useState(false);

    const contest = useContest();

    const { jokes, isLoading } = useJokesSearch(criteria);

    useEffect(() => {
        const setJokes = async () => {
            const userData = await UserDataManager.getUserDetails();
            if (jokes) {
                for (let i = 0; i < jokes.length; i++) {
                    jokes[i].boostable = contest.id == jokes[i].contestId && jokes[i].userId == userData.id && jokes[i].boost == 0
                }
                setLocalJokes(prev => [...prev, ...jokes]);
                if (!initialFetchCompleted) setInitialFetchCompleted(true);
            }
        }
        setJokes();
    }, [jokes]);

    useEffect(() => {
        setPage(1);
        setCriteria(initialCriteria);
        setLocalJokes([]);
        setInitialFetchCompleted(false);
    }, [initialCriteria]);

    useEffect(() => {
        const newCriteria = {
            ...criteria,
            pagination: { ...criteria.pagination, page: page }
        };
        setCriteria(newCriteria);
    }, [page]);

    const loadMoreJokes = () => {
        const nextPage = page + 1;
        setPage(nextPage);

        const newCriteria = {
            ...criteria,
            pagination: { ...criteria.pagination, page: nextPage },
        };
        setCriteria(newCriteria);
    };

    const bottomSheetRef = useRef<BottomSheetModal>(null);

    return (
        <View>
            {localJokes.length > 0 ? (
                <>
                    {localJokes.map((joke, index) => (
                        <JokeListItem
                            key={index}
                            boostable={joke.boostable}
                            joke={{
                                avatarId: joke.user?.profile ? joke.user.profile : 0,
                                username: joke.user?.name ? joke.user.name : "",
                                text: joke.textBody,
                                position: 1,
                                stats: {
                                    likes: joke.score,
                                },
                                id: joke.id,
                            }}
                            onAvatarPress={() => {
                                bottomSheetRef.current?.present();
                                updateViewingUser(joke.user?.name ? joke.user.name : "", joke.user?.profile ? joke.user.profile : 0, joke.user?.backgroundId ? joke.user.backgroundId : 0);
                            }}
                            onMenuPress={() => {
                                bottomSheetRef.current?.present();
                                updateViewingUser(joke.user?.name ? joke.user.name : "", joke.user?.profile ? joke.user.profile : 0, joke.user?.backgroundId ? joke.user.backgroundId : 0);
                            }}
                        />
                    ))}
                    {isLoading && <View style={{ height: 50 }}><LoadingIndicator isLoading={isLoading} /></View>}
                </>
            ) : (
                !isLoading && initialFetchCompleted ? (
                    <Text shadow={false} style={{ textAlign: "center", maxWidth: "70%", alignSelf: "center" }}>{noJokesMessage}</Text>
                ) : (
                    <View style={{ height: 50 }}><LoadingIndicator isLoading={isLoading} /></View>
                )
            )}
            {(!isLoading && localJokes.length > 0) && (
                <Button style={{ alignSelf: "center", marginTop: 20 }} width={200} label="Load More" onPress={loadMoreJokes} />
            )}

            <BottomSheetModal
                ref={bottomSheetRef}
                index={0}
                snapPoints={["50%"]}
                enablePanDownToClose
                backgroundComponent={BottomSheetBackground}
            >
                <BottomSheetView>
                    <View style={{
                        alignSelf: "flex-end",
                        marginHorizontal: 20,
                    }}>
                        <CircularButton onPress={() => bottomSheetRef.current?.close()} variant="close" />
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </View>
    );
}
