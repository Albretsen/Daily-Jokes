import { ReactNode } from "react";
import { View, TouchableOpacity, Image, StyleSheet, ViewStyle, StyleProp } from "react-native";
import Text from "../generalUI/Text";
import { componentColors } from "../misc/Colors";
import ContentBox from "../layout/ContentBox";
import Button from "../buttons/Button";
import { ButtonVariantType } from "../buttons/Button";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from "../misc/Colors";

interface ListItemRightProps {
    text?: string;
    displayArrow?: boolean;
    menu?: {
        onPress: () => void;
    }
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
}

export function ListItemRight(props: ListItemRightProps) {
    const { text, displayArrow, menu, style, children } = props;
    return (
        <View style={[rightStyles.container, style]}>
            {menu && (
                <TouchableOpacity onPress={menu.onPress}>
                    <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
                </TouchableOpacity>
            )}
            {displayArrow && (
                <Image style={rightStyles.icon} source={require("../../assets/icons/arrow-right.png")} />
            )}
            <Text shadow={false} color={"black"}>{text}</Text>
            {children}
        </View>
    )
}

const rightStyles = StyleSheet.create({
    container: {
        // justifyContent: "center",
        gap: 10,
        alignItems: "center",
        flex: 1,
    },

    icon: {
        width: 20,
        height: 20,
    }
})


interface ListItemCenterProps {
    title?: string;
    text?: string;
    bottomText?: string;
    titleColor?: string;
    textColor?: string;

    button?: {
        label: string;
        variant?: ButtonVariantType;
        onPress: () => void;
    }

    stats?: {
        likes?: number;
        participants?: number;
    }

    children?: ReactNode;

    style?: StyleProp<ViewStyle>;
}

export function ListItemCenter(props: ListItemCenterProps) {
    const { title, text, bottomText, titleColor = componentColors.text.black, textColor = componentColors.text.dark, stats, button, children, style } = props;
    return (
        <View style={[centerStyles.centerContainer, style]}>
            <Text shadow={false} numberOfLines={1} color={titleColor}>{title}</Text>
            {text && (
                <Text shadow={false} numberOfLines={2} size={15} style={{ letterSpacing: 0.5 }} color={textColor}>{text}</Text>
            )}
            {bottomText && (
                <Text color="rgba(73, 69, 79, 0.5)" size={15} shadow={false}>{bottomText}</Text>
            )}
            {(stats || button) && (
                <View style={centerStyles.statsContainer}>
                    {button && (
                        <Button onPress={button.onPress} height={30} shadowHeight={0} fontSize={15} borderRadius={12} variant={button.variant ? button.variant : "toggle"} label={button.label} />
                    )}
                    {stats && (
                        <>
                            {stats.likes !== undefined && stats.likes !== null && (
                                <View style={centerStyles.stat}>
                                    <Image style={centerStyles.icon} source={require("../../assets/icons/likes.png")} />
                                    <Text shadow={false} color="#49454F" size={16}>{stats.likes}</Text>
                                </View>
                            )}
                            {stats.participants && (
                                <View style={centerStyles.stat}>
                                    <Image style={centerStyles.icon} source={require("../../assets/icons/participants.png")} />
                                    <Text shadow={false} color="#49454F" size={16}>{stats.participants}</Text>
                                </View>
                            )}
                        </>
                    )}
                </View>
            )}
            {children}
        </View>
    )
}

const centerStyles = StyleSheet.create({
    centerContainer: {
        gap: 2,
        justifyContent: "space-evenly",
        flex: 1
    },

    statsContainer: {
        flexDirection: "row",
        gap: 10,
    },

    stat: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },

    icon: {
        height: 14,
        width: 14,
    }
})


interface ListItemProps {
    left?: ReactNode;
    center?: ReactNode;
    right?: ReactNode;
    /** 
    * @property Whether the list item should have a content box container or not
    */
    noBox?: boolean;
}

export default function ListItem(props: ListItemProps) {
    const {
        left,
        center,
        right,
        noBox,
    } = props;

    const ParentTag = noBox ? View : ContentBox;
    return (
        <ParentTag style={{ marginBottom: 18 }} fetchEnabled={false} >
            <View style={listItemStyles.container}>
                <View style={listItemStyles.left}>
                    {left}
                </View>
                <View style={listItemStyles.center}>
                    {center}
                </View>
                <View style={listItemStyles.right}>
                    {right}
                </View>
            </View>
        </ParentTag>
    )
}

const listItemStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 10,
        marginVertical: 8,
    },

    left: {
        flexBasis: 56,
    },

    center: {
        flex: 1,
    },

    right: {
        flexBasis: 35,
    },
})