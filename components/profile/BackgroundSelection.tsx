import React from 'react';
import { View, StyleSheet } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { RootState } from "../../state-management/reduxStore";
import Button from "../buttons/Button";
import ProfileBackground from './ProfileBackground';
import PriceDisplay from '../misc/PriceDisplay';
import { buyBackground, selectBackground } from '../../state-management/profile';
import Text from '../generalUI/Text';

export default function BackgroundSelection() {
    const { ownedBackgrounds, remainingBackgrounds, backgroundId, backgroundPrice } = useSelector((state: RootState) => state.profile);

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
            <View style={styles.container}>

                <Text size={24}>Owned backgrounds</Text>
                <View style={styles.sectionContainer}>
                    {ownedBackgrounds.map((id) => (
                        <View key={id} style={styles.backgroundContainer}>
                            <ProfileBackground sizePercentage={40} imageId={id} />
                            {id == backgroundId ? (
                                <Button disabled={true} height={34} label="Selected" variant="pink" />
                            ) : (
                                <Button onPress={() => selectBackground(id)} height={34} label="Select" variant="pink" />
                            )}
                        </View>
                    ))}
                </View>

                <Text size={24}>Buy backgrounds</Text>
                <View style={styles.sectionContainer}>
                    {remainingBackgrounds.map((id) => (
                        <View key={id} style={styles.backgroundContainer}>
                            <ProfileBackground sizePercentage={40} imageId={id} />
                            <PriceDisplay price={backgroundPrice} />
                            <Button onPress={() => buyBackground(id)} height={34} label="Buy" variant="blue" />
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
        alignItems: "center",
        marginTop: 10,
    },

    sectionContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 10,
    },

    backgroundContainer: {
        gap: 10,
        margin: 5,
        alignItems: "center",
    },
});
