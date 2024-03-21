import React from 'react';
import { View, StyleSheet } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { RootState } from "../../state-management/reduxStore";
import Button from "../buttons/Button";
import Avatar from './Avatar';
import PriceDisplay from '../misc/PriceDisplay';
import { buyAvatar, selectAvatar } from '../../state-management/profile';

export default function AvatarSelection() {
    const { ownedAvatars, remainingAvatars, avatarId, avatarPrice } = useSelector((state: RootState) => state.profile);

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
            <View style={styles.container}>
                {/* Loop through ownedAvatars */}
                <View style={styles.sectionContainer}>
                    {ownedAvatars.map((id) => (
                        <View key={id} style={styles.avatarContainer}>
                            <Avatar size={100} id={id} />
                            {id == avatarId ? (
                                <Button disabled={true} height={34} label="Selected" variant="pink" />
                            ) : (
                                <Button onPress={() => selectAvatar(id)} height={34} label="Select" variant="pink" />
                            )}
                        </View>
                    ))}
                </View>

                {/* Loop through remainingAvatars */}
                <View style={styles.sectionContainer}>
                    {remainingAvatars.map((id) => (
                        <View key={id} style={styles.avatarContainer}>
                            <Avatar size={100} id={id} />
                            <PriceDisplay price={avatarPrice} />
                            <Button onPress={() => buyAvatar(id)} height={34} label="Buy" variant="blue" />
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
    },

    sectionContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 10,
        rowGap: 20,
    },


    avatarContainer: {
        gap: 10,
        justifyContent: "center",
        margin: 5,
    },
});
