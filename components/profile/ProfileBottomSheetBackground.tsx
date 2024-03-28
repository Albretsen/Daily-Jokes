import { View, StyleSheet } from "react-native";
import ProfileSection from "./ProfileSection";
import { useSelector } from 'react-redux';
import { RootState } from "../../state-management/reduxStore";
import GradientBackground from "../layout/GradientBackground";

export default function BottomSheetBackground() {
    const { username, avatarId, backgroundId } = useSelector((state: RootState) => state.viewingUser);
    return (
        <View style={styles.container}>
            <GradientBackground />
            <ProfileSection
                avatarId={avatarId}
                backgroundId={backgroundId}
                name={username}
                backgroundHeight={120}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        position: "absolute",
        top: 0,
        bottom: 0,
    }
})