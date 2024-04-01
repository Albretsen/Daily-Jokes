import { useState } from "react";
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

interface JokeListItemProps {
    joke: {
        avatarId: number;
        username: string;
        text?: string;
        position: number;
        stats?: {
            likes?: number;
        }
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
    const { joke, titleColor, textColor, noBox, boostable, onAvatarPress, onMenuPress } = props;

    const [modalVisible, setModalVisible] = useState(false);

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
                                    <Button height={30} shadowHeight={0} fontSize={15} borderRadius={12} variant="play" label="Boost joke" />
                                    <PriceDisplay textColor={colors.purple.medium} price={50} />
                                </View>
                                <Text size={14} shadow={false} color={colors.purple.dark}>Boosting a joke makes every like it gets count double!</Text>
                            </>
                        )}
                    </ListItemCenter>
                }
                right={
                    <ListItemRight
                        text={"#" + joke.position}
                        menu={{
                            onPress: onMenuPress,
                        }}
                    />
                }
                noBox={noBox}
            />
            <Modal modalVisible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <ContentBox width={"100%"}>
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