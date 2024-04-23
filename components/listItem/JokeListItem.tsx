import { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, Pressable } from "react-native";
import ListItem, { ListItemCenter, ListItemRight } from "./ListItem";
import Avatar from "../profile/Avatar";
import Modal from "../generalUI/Modal";
import ContentBox from "../layout/ContentBox";
import { SCREEN_HEIGHT } from "../layout/ScreenView";
import Text from "../generalUI/Text";
import { componentColors } from "../misc/Colors";
import Button from "../buttons/Button";
import PriceDisplay from "../misc/PriceDisplay";
import { colors } from "../misc/Colors";
import { api } from "../../api/api";
import { UserDataManager } from "../../services/userDataManager";
import { showToast } from "../../state-management/toast";
import { store } from "../../state-management/reduxStore";
import { decrementCoins } from "../../state-management/coinSlice";
import { deleteJoke } from "../../services/joke";
import CircularButton from "../buttons/CircularButton";
import { toggleGoToStore } from "../../state-management/goToStore";

interface JokeListItemProps {
    joke: {
        avatarId: number;
        username: string;
        text?: string;
        position: number;
        stats?: {
            likes?: number;
        }
        id: number;
        userId: string;
    };
    titleColor?: string;
    textColor?: string;
    /** 
    * @property Whether the list item should have a content box container or not
    */
    noBox?: boolean;
    boostable?: boolean;
    boosted?: boolean;
    onAvatarPress?: () => void;
    onMenuPress: () => void;
}

type UserData = {
    role: string;
    id: string;
}

export default function JokeListItem(props: JokeListItemProps) {
    let { joke, titleColor, textColor, noBox, boostable, boosted, onAvatarPress, onMenuPress } = props;

    const [readModalVisible, setReadModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [userData, setUserData] = useState<UserData>({ role: "", id: "" });
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const userData_ = await UserDataManager.getUserDetails();
            setUserData(userData_);
        }
        fetchUserData();
    }, [])

    const onBoost = async () => {
        try {
            let result = await api("POST", `/joke/boost/${joke.id}`, undefined, await UserDataManager.getToken());
            if (result.error) {
                toggleGoToStore(true);
                return;
            }
            if (result.price)
                store.dispatch(decrementCoins(parseInt(result.price)))
            showToast("Joke boosted.");
        } catch {
            showToast("Error boosting joke.");
        }
    }

    const onDelete = async () => {
        try {
            await deleteJoke(joke.id);
            setIsVisible(false);
        } catch (error) {
            console.error("Failed to delete joke:", error);
            showToast("Error deleting joke.");
        }
    };

    // Shows delete button if user is moderator, admin or author of the joke
    const canDelete = userData.role === "moderator" || userData.role === "admin" || joke.userId === userData.id;

    if (!isVisible) return null;

    return (
        <>
            <ListItem
                left={
                    <TouchableOpacity onPress={onAvatarPress}>
                        <Avatar size={60} id={joke.avatarId} />
                    </TouchableOpacity>
                }
                center={
                    <ListItemCenter
                        title={joke.username}
                        text={joke.text ? joke.text : ""}
                        titleColor={titleColor}
                        textColor={textColor}
                        button={{
                            label: "Read joke",
                            onPress: () => setReadModalVisible(true),
                        }}
                        stats={joke.stats}
                    >
                        {boostable && (
                            <>
                                <View style={{
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    gap: 10,
                                }}>
                                    <Button height={30} shadowHeight={0} fontSize={15} borderRadius={12} variant="play" label="Boost joke" onPress={onBoost} />
                                    <PriceDisplay style={{ color: colors.purple.medium }} price={50} />
                                </View>
                                <Text size={14} shadow={false} color={colors.purple.dark}>Boosting a joke makes every like it gets count double!</Text>
                            </>
                        )}
                        {boosted && (
                            <Button noPress height={30} shadowHeight={0} fontSize={15} borderRadius={16} variant="play" label="Boosted" />
                        )}
                    </ListItemCenter>
                }
                right={
                    <>
                        <ListItemRight
                            text={""} // TODO: add listitem position here.
                            menu={{
                                onPress: onMenuPress,
                            }}
                        >
                            {canDelete && (
                                <>
                                    <CircularButton onPress={() => setDeleteModalVisible(true)} size={30} variant="delete" />
                                    <Modal modalVisible={deleteModalVisible} onRequestClose={() => setDeleteModalVisible(false)}>
                                        <ContentBox title="Delete joke">
                                            <Text style={{ textAlign: "center" }} shadow={false} color={colors.purple.medium}>Are you sure you want to delete this joke?</Text>
                                            <View style={{
                                                justifyContent: "center",
                                                flexDirection: "row",
                                                gap: 10,
                                            }}>
                                                <Button onPress={() => {
                                                    onDelete();
                                                    setDeleteModalVisible(false)
                                                }}
                                                    variant="red"
                                                    label="Delete"
                                                    height={34}
                                                />
                                                <Button onPress={() => setDeleteModalVisible(false)} height={34} variant="blue" label="Cancel" />
                                            </View>
                                        </ContentBox>
                                    </Modal>
                                </>
                            )}
                        </ListItemRight>
                    </>
                }
                noBox={noBox}
                boosted={boosted}
            />
            <Modal modalVisible={readModalVisible} onRequestClose={() => setReadModalVisible(false)}>
                <ContentBox width={"105%"}>
                    <ScrollView style={{ maxHeight: SCREEN_HEIGHT - 100 }}>
                        <Pressable>
                            <Text shadow={false} color={componentColors.contentBox.text}>{joke.text}</Text>
                        </Pressable>
                    </ScrollView>
                    <ListItem
                        left={<Avatar size={60} id={joke.avatarId} />}
                        center={<ListItemCenter style={{ justifyContent: "center" }} title={joke.username} />}
                        right={<ListItemRight style={{ justifyContent: "center" }} text={"#" + joke.position} />}
                        noBox
                    />
                </ContentBox>
            </Modal>
        </>
    )
}