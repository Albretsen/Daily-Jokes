import { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
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
    };
    titleColor?: string;
    textColor?: string;
    /** 
    * @property Whether the list item should have a content box container or not
    */
    noBox?: boolean;
    boostable?: boolean;
    onAvatarPress?: () => void;
    onMenuPress: () => void;
}

export default function JokeListItem(props: JokeListItemProps) {
    let { joke, titleColor, textColor, noBox, boostable, onAvatarPress, onMenuPress } = props;

    const [modalVisible, setModalVisible] = useState(false);

    const [userData, setUserData] = useState({});

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            console.log("the async");
            const userData_ = await UserDataManager.getUserDetails();
            setUserData(userData_);
        }
        fetchUserData();
    },[])

    const onBoost = async () => {
        try {
            let result = await api("POST", `/joke/boost/${joke.id}`, undefined, await UserDataManager.getToken());
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
                            onPress: () => setModalVisible(true),
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
                                    <PriceDisplay textColor={colors.purple.medium} price={50} />
                                </View>
                                <Text size={14} shadow={false} color={colors.purple.dark}>Boosting a joke makes every like it gets count double!</Text>
                            </>
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
                            {canDelete && <CircularButton onPress={onDelete} size={30} variant="delete" />}
                        </ListItemRight>
                    </>
                }
                noBox={noBox}
            />
            <Modal modalVisible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <ContentBox width={"105%"}>
                    <ScrollView style={{ maxHeight: SCREEN_HEIGHT - 100 }}>
                        <Text shadow={false} color={componentColors.contentBox.text}>{joke.text}</Text>
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