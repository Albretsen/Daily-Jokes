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

interface joke {
    user?: {
        profile?: number;
        name?: string;
    };
    userId: string;
    textBody: string;
    position: number;
    score?: number;
}

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
    const [localJokes, setLocalJokes] = useState<joke[]>([]);
    const [page, setPage] = useState(1);
    const [criteria, setCriteria] = useState(initialCriteria);
    const [initialFetchCompleted, setInitialFetchCompleted] = useState(false);

    const { jokes, isLoading } = useJokesSearch(criteria);

    useEffect(() => {
        if (jokes) {
            setLocalJokes(prev => [...prev, ...jokes]);
            if (!initialFetchCompleted) setInitialFetchCompleted(true);
        }
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
                            joke={{
                                avatarId: joke.user?.profile ? joke.user.profile : 0,
                                username: joke.user?.name ? joke.user.name : "",
                                text: joke.textBody,
                                position: 1,
                                stats: {
                                    likes: joke.score,
                                }
                            }}
                            onAvatarPress={() => {
                                bottomSheetRef.current?.present();
                                // TODO: Add background id
                                updateViewingUser(joke.user?.name ? joke.user.name : "", joke.user?.profile ? joke.user.profile : 0, 0);
                            }}
                            onMenuPress={() => {
                                bottomSheetRef.current?.present();
                                updateViewingUser(joke.user?.name ? joke.user.name : "", joke.user?.profile ? joke.user.profile : 0, 0);
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
