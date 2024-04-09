import React, { useImperativeHandle, forwardRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
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
            <View style={styles.container}>
                <View style={styles.line} />
                <View style={[styles.circle, jokeSubmission.jokesSubmitted - (3 + jokeSubmission.additionalSlotsPurchased) <= -1 ? styles.used : null]} />
                <View style={[styles.circle, jokeSubmission.jokesSubmitted - (3 + jokeSubmission.additionalSlotsPurchased) <= -2 ? styles.used : null]} />
                <View style={[styles.circle, jokeSubmission.jokesSubmitted - (3 + jokeSubmission.additionalSlotsPurchased) <= -3 ? styles.used : null]} />
            </View>
            {/* TODO: Not sure if this conditional is correct */}
            {jokeSubmission.jokesSubmitted - (3 + jokeSubmission.additionalSlotsPurchased) == 0 && (
                <View style={{ marginTop: 10 }}>
                    <View style={{ justifyContent: "center", }}>
                        <Text style={{ textAlign: "center" }} size={15}>Your are out of joke submissions for today! </Text>
                    </View>
                    <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                        <CircularButton noPress size={36} backgroundColor={componentColors.playButton.bgRight} highlightColor={componentColors.playButton.highlight} variant="add" />
                        <Text style={{ marginLeft: 10 }} size={15}>Buy another submission for </Text>
                        <PriceDisplay style={{ fontSize: 15 }} price={50} />
                    </TouchableOpacity>

                </View>
            )}
        </View>
    );
});

export default JokesLeftIndicator;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 16,
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