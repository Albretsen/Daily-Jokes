import { useState } from "react";
import { ScrollView } from "react-native";
import ListItem from "./ListItem";
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
    noBox?: boolean;
}

export default function JokeListItem(props: JokeListItemProps) {
    const { joke, titleColor, textColor, noBox } = props;

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <ListItem
                left={<Avatar size={60} id={joke.avatarId} />}
                useDefaultCenter
                centerTitle={joke.username}
                centerText={joke.text}
                centerTitleColor={titleColor}
                centerTextColor={textColor}
                stats={joke.stats}
                useDefaultRight
                rightText={"#" + joke.position}
                onPress={() => setModalVisible(true)}
                noBox={noBox}
            />
            <Modal modalVisible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <ContentBox width={"100%"}>
                    <ScrollView style={{ maxHeight: SCREEN_HEIGHT - 100 }}>
                        <Text shadow={false} color={componentColors.contentBox.text}>{joke.text}</Text>
                    </ScrollView>
                    <ListItem
                        left={<Avatar size={60} id={joke.avatarId} />}
                        useDefaultCenter
                        centerTitle={joke.username}
                        rightArrow={false}
                        useDefaultRight
                        rightText={"#" + joke.position}
                    />
                </ContentBox>
            </Modal>
        </>
    )
}