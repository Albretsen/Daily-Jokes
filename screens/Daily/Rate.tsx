import { View, StyleSheet } from "react-native";
import SwipePicker from "../../components/misc/SwipePicker";
import RoundButtonWithLabel from "../../components/buttons/RoundButtonWithText";
import { useState } from "react";
import ContentTab from "../../components/layout/ContentTab";

export default function Rate() {
    const [showHistory, setShowHistory] = useState(false);
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
                    <ContentTab contentSpacing={0}
                        tabs={[
                            {
                                name: "Liked",
                                component: <>{/* TODO: Add ListItems here */}</>
                            },
                            {
                                name: "Disliked",
                                component: <>{/* TODO: Add ListItems here */}</>
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