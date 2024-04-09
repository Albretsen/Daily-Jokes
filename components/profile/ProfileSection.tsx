import { View, StyleSheet } from "react-native";
import ProfileBackground from "./ProfileBackground";
import Avatar from "./Avatar";
import Text from "../generalUI/Text";
import CustomizeProfile from "./CustomizeProfile";

interface ProfileSectionProps {
    avatarId: number;
    backgroundId: number;
    name: string;
    backgroundHeight?: number;
    customizable?: boolean;
}

export default function ProfileSection({ avatarId, backgroundId, name, backgroundHeight, customizable }: ProfileSectionProps) {
    return (
        <View>
            <ProfileBackground height={backgroundHeight ? backgroundHeight : 175} imageId={backgroundId}>
            </ProfileBackground>
            <View style={styles.profilePictureContainer}>
                <View style={styles.profilePictureInner}>
                    <Avatar id={avatarId} />
                    <Text size={20}>{name}</Text>
                </View>
            </View>
            {customizable && (
                <CustomizeProfile />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    profilePictureContainer: {
        height: 75,
        width: "88%",
        alignSelf: "center",
        marginBottom: -25,
    },

    profilePictureInner: {
        bottom: "40%",
        position: "absolute",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
})
