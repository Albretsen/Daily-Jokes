import { View, StyleSheet } from "react-native";
import SwipePicker from "../../components/misc/SwipePicker";
import RoundButtonWithLabel from "../../components/buttons/RoundButtonWithText";
import { useState } from "react";
import ContentTab from "../../components/layout/ContentTab";

export default function Rate() {
    const [showHistory, setShowHistory] = useState(false);
    return (
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
                <SwipePicker />
            )}
            <View style={{
                position: "absolute",
                top: -220,
                left: 25,
            }}>
                <RoundButtonWithLabel onPress={() => { setShowHistory(!showHistory) }} label="Tap to view jokes you've rated" variant="history" />
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    }
})