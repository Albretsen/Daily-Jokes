import { useRef } from "react";
import { View, StyleSheet } from "react-native";
import ProfileBackground from "./ProfileBackground";
import Button from "../buttons/Button";
import Drawer, { DrawerRef } from "../drawer/Drawer";
import AvatarSelection from "./AvatarSelection";
import BackgroundSelection from "./BackgroundSelection";
import Avatar from "./Avatar";
import Text from "../generalUI/Text";
import CoinCount from "../misc/CoinCount";
import CircularButton from "../buttons/CircularButton";
import ContentTab from "../layout/ContentTab";

interface ProfileSectionProps {
    avatarId: number;
    backgroundId: number;
    name: string;
    backgroundHeight?: number;
    customizeButton?: boolean;
}

export default function ProfileSection({ avatarId, backgroundId, name, backgroundHeight, customizeButton }: ProfileSectionProps) {
    const customizeDrawer = useRef<DrawerRef>(null);
    return (
        <View style={{
            position: "absolute",
            top: 0,
        }}>
            <ProfileBackground height={backgroundHeight ? backgroundHeight : null} imageId={backgroundId}>
                {customizeButton && (
                    <Button
                        label="Customize your profile"
                        width={250}
                        variant="blue"
                        height={32}
                        onPress={() => customizeDrawer.current?.openDrawer()}
                    />
                )}
            </ProfileBackground>
            <View style={styles.profilePictureContainer}>
                <View style={styles.profilePictureInner}>
                    <Avatar id={avatarId} />
                    <Text size={20}>{name}</Text>
                </View>
            </View>

            <Drawer width="94%" ref={customizeDrawer}>
                <View style={{ alignSelf: "center", width: "86%", marginVertical: 10 }}>
                    <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                        <CircularButton variant="back" onPress={() => customizeDrawer.current?.closeDrawer()} />
                        <CoinCount onPress={() => customizeDrawer.current?.closeDrawer()} />
                    </View>
                </View>
                <ContentTab
                    contentSpacing={10}
                    tabs={[
                        {
                            name: "Avatars",
                            component: (
                                <AvatarSelection />
                            )
                        },
                        {
                            name: "Backgrounds",
                            component: (
                                <BackgroundSelection />
                            )
                        },
                    ]}
                />
            </Drawer>
        </View>
    )
}

const styles = StyleSheet.create({
    profilePictureContainer: {
        height: 75,
        width: "88%",
        alignSelf: "center"
    },

    profilePictureInner: {
        bottom: "40%",
        position: "absolute",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
})
