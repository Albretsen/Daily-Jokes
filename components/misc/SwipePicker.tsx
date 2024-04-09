import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { PanGestureHandler, State, GestureHandlerStateChangeEvent, ScrollView } from 'react-native-gesture-handler';
import ContentBox from "../layout/ContentBox";
import Text from "../generalUI/Text";
import CircularButton from '../buttons/CircularButton';
import { componentColors, colors } from './Colors';
import { SCREEN_HEIGHT } from '../layout/ScreenView';
import { useJokesSearchSwipe } from '../../hooks/useJokesSearchSwipe';
import { api } from '../../api/api';
import { UserDataManager } from '../../services/userDataManager';
import PriceDisplay from './PriceDisplay';

interface CardProps {
    text: string;
    animateCardAway: (arg0: number, arg1: string) => void;
}

export type ScrollViewRef = ScrollView & {
    flashScrollIndicators: () => void;
};

function Card({ text, animateCardAway }: CardProps) {

    const scrollViewRef = React.useRef<ScrollViewRef | null>(null);

    // Briefly shows the scrollbar to let the user know the text is scrollable
    const flashScrollbar = () => {
        setTimeout(function () {
            scrollViewRef.current?.flashScrollIndicators();
        }, 1000);
    }

    useEffect(() => {
        flashScrollbar();
    }, []);

    return (
        <>
            <ContentBox title={"Rate"} headerColor={colors.green.dark} containerStyle={{ marginTop: 50 }} style={{ overflow: "hidden" }}>
                <ScrollView persistentScrollbar={true} ref={scrollViewRef} style={{ maxHeight: SCREEN_HEIGHT - 280 }}>
                    <Text shadow={false} color={componentColors.text.contentBox}>
                        {text}
                    </Text>
                </ScrollView>
                <View style={cardStyles.buttonsContainer}>
                    <View style={cardStyles.buttonWithLabel}>
                        <CircularButton variant="undo" onPress={() => {
                            animateCardAway(-200, 'dislike');
                            flashScrollbar();
                        }} />
                        <Text shadow={false} size={14} color={colors.yellow.dark}>Undo</Text>
                    </View>
                    <View style={cardStyles.buttonWithLabel}>
                        <CircularButton variant="no" onPress={() => {
                            animateCardAway(-200, 'dislike');
                            flashScrollbar();
                        }} />
                        <Text shadow={false} size={14} color={colors.red.medium}>Dislike</Text>
                    </View>
                    <View style={{
                        gap: 0,
                    }}>
                        <View style={cardStyles.buttonWithLabel}>
                            <CircularButton variant="superlike" onPress={() => {
                                animateCardAway(0, 'superlike');
                                flashScrollbar();
                            }} />
                            <Text shadow={false} size={14} color={colors.blue.dark}>Superlike</Text>
                        </View>
                        <PriceDisplay price={50} textColor={colors.blue.dark} />
                    </View>
                    <View style={cardStyles.buttonWithLabel}>
                        <CircularButton variant="yes" onPress={() => {
                            animateCardAway(200, 'like');
                            flashScrollbar();
                        }} />
                        <Text shadow={false} size={14} color={colors.green.dark}>Like</Text>
                    </View>
                </View>
            </ContentBox>
        </>
    )
}

const cardStyles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: "row",
        gap: 20,
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
    },

    buttonWithLabel: {
        flexDirection: "column",
        gap: 4,
        justifyContent: "center",
        alignItems: "center",
    }
});

interface joke {
    id: Number;
    user?: {
        profile?: number;
        name?: string;
    };
    userId: string;
    textBody: string;
    position: number;
}

export default function SwipePicker() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const translateX = new Animated.Value(0);

    const [page, setPage] = useState(1);
    const [criteria, setCriteria] = useState({ sortBy: "-createTimeStamp", pagination: { page: page, page_size: 10 } });

    const fetchedJokes = useJokesSearchSwipe(criteria);

    const [jokes, setJokes] = useState<joke[]>([]);

    useEffect(() => {
        if (fetchedJokes) {
            setJokes(prev => [...prev, ...fetchedJokes]);
        }
    }, [fetchedJokes]);

    useEffect(() => {
        onNext()
    }, [currentIndex]);

    const onNext = () => {
        if (currentIndex % 5 == 0) {
            const newCriteria = {
                ...criteria,
                pagination: { ...criteria.pagination, page: page }
            };
            setCriteria(newCriteria);
            const nextPage = page + 1;
            setPage(nextPage);
        }
    }

    useEffect(() => {
        // Animation sequence for swiping hint
        const hintAnimation = Animated.sequence([
            Animated.timing(translateX, {
                toValue: -40, // Slightly to the left
                delay: 1000,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(translateX, {
                toValue: 40, // Then slightly to the right
                delay: 500,
                duration: 700,
                useNativeDriver: true,
            }),
            Animated.timing(translateX, {
                toValue: 0, // Return to initial position
                delay: 1000,
                duration: 500,
                useNativeDriver: true,
            }),
        ]);

        hintAnimation.start();
    }, []);

    // Controls the opacity of the next card
    const nextCardOpacity = translateX.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: [1, 0, 1],
        extrapolate: 'clamp',
    });

    const rotateZ = translateX.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: ['-30deg', '0deg', '30deg'],
        extrapolate: 'clamp',
    });

    const onGestureEvent = Animated.event(
        [{ nativeEvent: { translationX: translateX } }],
        { useNativeDriver: true }
    );

    const onHandlerStateChange = (event: GestureHandlerStateChangeEvent) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            const translationX = event.nativeEvent.translationX as number;
            handleSwipe(translationX);
        }
    };

    const handleSwipe = (translationX: number) => {
        let swipeDirection = translationX > 0 ? 'right' : 'left';

        if (Math.abs(translationX) > 75) {
            const jokeId = jokes[currentIndex] ? jokes[currentIndex].id : null;
            const action = swipeDirection === 'right' ? 'like' : 'dislike';

            animateCardAway(translationX, action);
        } else {
            Animated.spring(translateX, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
        }
    };

    const rate = async (jokeId: Number, action: string) => {
        await api("POST", `/joke/rate/${jokeId}/${action}`, undefined, await UserDataManager.getToken());
    }

    const translateY = new Animated.Value(0);

    const animateCardAway = (direction: number, action: string) => {
        const jokeId = jokes[currentIndex] ? jokes[currentIndex].id : null;

        rate(jokeId, action);
        if (action === 'superlike') {
            const toValue = -SCREEN_HEIGHT; // Move the card off the screen upwards
            Animated.timing(translateY, {
                toValue: toValue,
                duration: 200,
                useNativeDriver: true,
            }).start(() => {
                translateY.setValue(0); // Reset translateY after the animation
                setCurrentIndex(currentIndex + 1); // Move to the next card
            });
        } else {
            const toValue = direction !== 0 ? (direction > 0 ? 500 : -500) : 0; // Existing logic for like/dislike
            Animated.timing(translateX, {
                toValue: toValue,
                duration: 200,
                useNativeDriver: true,
            }).start(() => {
                translateX.setValue(0); // Reset translateX after the animation
                setCurrentIndex(currentIndex + 1); // Move to the next card
            });
        }
    };


    return (
        <View style={styles.container}>
            {jokes[currentIndex + 1] && (
                <Animated.View style={[styles.nextCard, { opacity: nextCardOpacity }]}>
                    <Card text={jokes[currentIndex + 1].textBody} animateCardAway={animateCardAway} />
                </Animated.View>
            )}
            <PanGestureHandler
                onGestureEvent={onGestureEvent}
                onHandlerStateChange={onHandlerStateChange}>
                {jokes[currentIndex] ? (
                    <Animated.View style={{
                        transform: [{ translateX: translateX }, { rotateZ: rotateZ }, { translateY: translateY }],
                        position: 'absolute',
                        width: '100%',
                    }}>
                        <Card text={jokes[currentIndex].textBody} animateCardAway={animateCardAway} />
                    </Animated.View>
                ) : (
                    <View>
                        <Text>No more jokes!</Text>
                    </View>
                )}
            </PanGestureHandler>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
    },

    nextCard: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
    }
});