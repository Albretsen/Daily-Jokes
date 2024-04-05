import { useRef, useState } from "react";
import { View, TouchableOpacity, StyleSheet, TextInput } from "react-native";
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
import { FontAwesome6 } from '@expo/vector-icons';
import Modal from "../generalUI/Modal";
import InputField from "../generalUI/InputField";
import { SCREEN_HEIGHT } from "../layout/ScreenView";
import ContentBox from "../layout/ContentBox";

interface ProfileSectionProps {
    avatarId: number;
    backgroundId: number;
    name: string;
    backgroundHeight?: number;
    customizable?: boolean;
}

export default function ProfileSection({ avatarId, backgroundId, name, backgroundHeight, customizable }: ProfileSectionProps) {
    const [inputValue, setInputValue] = useState(name);
    const [nameModalVisible, setNameModalVisible] = useState(false);
    const customizeDrawer = useRef<DrawerRef>(null);

    const inputRef = useRef<TextInput>(null);

    return (
        <View style={{
            position: "absolute",
            top: 0,
        }}>
            <ProfileBackground height={backgroundHeight ? backgroundHeight : null} imageId={backgroundId}>
                {customizable && (
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
                    {customizable && (
                        <TouchableOpacity onPress={() => setNameModalVisible(true)}>
                            <FontAwesome6 name="edit" size={20} color="white" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <Modal
                onShow={() => inputRef.current?.focus()}
                modalVisible={nameModalVisible}
                onRequestClose={() => setNameModalVisible(false)}
            >
                <ContentBox title="Change your username">
                    <InputField
                        ref={inputRef}
                        style={{
                            maxHeight: SCREEN_HEIGHT - (350),
                            textAlign: "center",
                            textAlignVertical: "center",
                            minHeight: 0,
                            height: 30,
                        }}
                        placeholder="Write your new name here..."
                        value={inputValue}
                        onChangeText={setInputValue}
                    />
                    <View style={{
                        width: "100%",
                        alignItems: "center",
                    }}>
                        <Button height={32} width={150} label="Save username" variant="blue" />
                    </View>
                </ContentBox>
            </Modal>

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
