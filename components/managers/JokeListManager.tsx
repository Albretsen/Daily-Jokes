import React, { useEffect, useState } from 'react';
import { View } from "react-native";
import Text from '../generalUI/Text';
import JokeListItem from "../../components/listItem/JokeListItem";
import { useJokesSearch } from "../../hooks/useJokesSearch";
import { colors } from '../misc/Colors';
import LoadingIndicator from '../generalUI/LoadingIndicator';
import Button from '../buttons/Button';
import ContentBox from '../layout/ContentBox';

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
        </View>
    );
}
