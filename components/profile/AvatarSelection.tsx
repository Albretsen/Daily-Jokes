import React from 'react';
import { View, StyleSheet } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { RootState } from "../../state-management/reduxStore";
import Button from "../buttons/Button";
import Avatar from './Avatar';
import PriceDisplay from '../misc/PriceDisplay';
import { buyAvatar, selectAvatar } from '../../state-management/profile';
import Text from '../generalUI/Text';

export default function AvatarSelection() {
    const { ownedAvatars, remainingAvatars, avatarId, avatarPrice } = useSelector((state: RootState) => state.profile);

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
            <View style={styles.container}>

                <Text size={24}>Owned avatars</Text>
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

                <Text size={24}>Buy avatars</Text>
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
        alignItems: "center",
        marginTop: 10,
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
        alignItems: "center",
        margin: 5,
    },
});
