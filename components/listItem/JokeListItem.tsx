import { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import ListItem, { ListItemCenter, ListItemRight } from "./ListItem";
import Avatar from "../profile/Avatar";
import Modal from "../generalUI/Modal";
import ContentBox from "../layout/ContentBox";
import { SCREEN_HEIGHT } from "../layout/ScreenView";
import Text from "../generalUI/Text";
import { componentColors } from "../misc/Colors";

interface JokeListItemProps {
    joke: {
        avatarId: number;
        username: string;
        text: string;
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
    onAvatarPress?: () => void;
    onMenuPress: () => void;
}

export default function JokeListItem(props: JokeListItemProps) {
    const { joke, titleColor, textColor, noBox, onAvatarPress, onMenuPress } = props;

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
                        text={joke.text}
                        titleColor={titleColor}
                        textColor={textColor}
                        button={{
                            label: "Read joke",
                            onPress: () => setModalVisible(true),
                        }}
                        stats={joke.stats}
                    />
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
                        center={<ListItemCenter title={joke.username} />}
                        right={<ListItemRight text={"#" + joke.position} />}
                        noBox
                    />
                </ContentBox>
            </Modal>
        </>
    )
}