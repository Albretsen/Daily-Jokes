import React, { useImperativeHandle, forwardRef } from 'react';
import { View, StyleSheet } from "react-native";
import { componentColors } from "./Colors";
import { useJokeSubmission } from "../../hooks/useJokeSubmission";
import PriceDisplay from './PriceDisplay';
import CircularButton from '../buttons/CircularButton';
import Text from '../generalUI/Text';

const JokesLeftIndicator = forwardRef((props, ref) => {
    const { jokeSubmission, refresh } = useJokeSubmission();

    useImperativeHandle(ref, () => ({
        refreshIndicator: () => {
            refresh();
        }
    }));

    return (
        <View>
            <View style={styles.outerContainer}>
                <View style={styles.container}>
                    <View style={styles.line} />
                    <View style={[styles.circle, jokeSubmission.jokesSubmitted - (3 + jokeSubmission.additionalSlotsPurchased) <= -1 ? styles.used : null]} />
                    <View style={[styles.circle, jokeSubmission.jokesSubmitted - (3 + jokeSubmission.additionalSlotsPurchased) <= -2 ? styles.used : null]} />
                    <View style={[styles.circle, jokeSubmission.jokesSubmitted - (3 + jokeSubmission.additionalSlotsPurchased) <= -3 ? styles.used : null]} />
                    <CircularButton onPress={() => {/* TODO: Add buy function */ }} size={24} backgroundColor={componentColors.playButton.bgRight} highlightColor={"transparent"} variant="add" />
                </View>
                <PriceDisplay style={{ fontSize: 15 }} price={50} />
            </View>
            {/* TODO: Not sure if this conditional is correct */}
            {jokeSubmission.jokesSubmitted - (3 + jokeSubmission.additionalSlotsPurchased) == 0 && (
                <View style={{ marginTop: 10 }}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ textAlign: "center", width: "80%" }} size={15}>Your are out of joke submissions for today. Press the green button to buy more.</Text>
                    </View>
                </View>
            )}
        </View>
    );
});

export default JokesLeftIndicator;

const styles = StyleSheet.create({
    outerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
        gap: 6
    },
    container: {
        flexDirection: "row",
        alignSelf: "center",
        gap: 6,
        overflow: "hidden",
    },

    line: {
        position: "absolute",
        width: "100%",
        height: 2,
        backgroundColor: "white",
        top: "46%"
    },

    circle: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "white",
        height: 24,
        width: 24,
        backgroundColor: componentColors.contentTab.background,
    },

    used: {
        backgroundColor: componentColors.contentBox.highlight,
    }
})