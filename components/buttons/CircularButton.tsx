import { ReactNode } from "react";
import { TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { componentColors } from "../misc/Colors";
import { percentageOf as p } from "../../utils/utils";

export type VariantType = "yes" | "no" | "close" | "back" | "hamburger" | "superlike" | "no-ads" | "chest" | "boost" | "history" | "add"

interface CircularButtonProps {
    onPress?: () => void;
    variant?: VariantType;
    iconComponent?: ReactNode;
    backgroundColor?: string;
    highlightColor?: string;
    size?: number;
    noPress?: boolean;
}

const variants = {
    yes: {
        icon: require("../../assets/icons/yes.png"),
        backgroundColor: componentColors.yesButton.background,
        highlightColor: componentColors.yesButton.highlight,
    },

    no: {
        icon: require("../../assets/icons/no.png"),
        backgroundColor: componentColors.noButton.background,
        highlightColor: componentColors.noButton.highlight,
    },

    close: {
        icon: require("../../assets/icons/close.png"),
        backgroundColor: "transparent",
        highlightColor: "transparent",
    },

    back: {
        icon: require("../../assets/icons/back.png"),
        backgroundColor: componentColors.backButton.background,
        highlightColor: componentColors.backButton.highlight,
    },

    hamburger: {
        icon: require("../../assets/icons/hamburger.png"),
        backgroundColor: componentColors.backButton.background,
        highlightColor: componentColors.backButton.highlight,
    },

    superlike: {
        icon: require("../../assets/icons/superlike.png"),
        backgroundColor: componentColors.superlikeButton.background,
        highlightColor: componentColors.superlikeButton.highlight,
    },

    "no-ads": {
        icon: require("../../assets/icons/no-ads.png"),
        backgroundColor: componentColors.yesButton.background,
        highlightColor: componentColors.yesButton.highlight,
    },

    chest: {
        icon: require("../../assets/images/coins-chest.png"),
        backgroundColor: componentColors.yesButton.background,
        highlightColor: componentColors.yesButton.highlight,
    },

    boost: {
        icon: require("../../assets/icons/boost.png"),
        backgroundColor: componentColors.yesButton.background,
        highlightColor: componentColors.yesButton.highlight,
    },

    history: {
        icon: require("../../assets/icons/history.png"),
        backgroundColor: componentColors.superlikeButton.background,
        highlightColor: componentColors.superlikeButton.highlight,
    },

    add: {
        icon: require("../../assets/icons/add.png"),
        backgroundColor: componentColors.backButton.background,
        highlightColor: componentColors.backButton.highlight,
    },
}

export default function CircularButton(props: CircularButtonProps) {
    const { onPress, variant, iconComponent, backgroundColor, highlightColor, size = 40, noPress } = props;

    const borderWidth = p(7.5, size);
    const backgroundOffset = p(7, size);

    return (
        <TouchableOpacity disabled={noPress} onPress={onPress}>
            <View style={[
                styles.container,
                { width: size }
            ]}>
                <View style={[
                    styles.background,
                    {
                        backgroundColor: variant ? variants[variant].highlightColor : highlightColor,
                        width: size,
                        height: size,
                        top: backgroundOffset,
                    }
                ]} />
                <View style={[
                    styles.innerButtonContainer,
                    {
                        backgroundColor: variant ? variants[variant].backgroundColor : backgroundColor,
                        width: size,
                        height: size,
                        borderWidth: borderWidth,
                    }
                ]}>
                    {variant && (
                        <Image
                            style={{
                                height: size / 1.8,
                                width: size / 1.8
                            }}
                            source={variants[variant].icon}
                        />
                    )}
                    {iconComponent && (
                        iconComponent
                    )}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },

    background: {
        position: "absolute",
        backgroundColor: "transparent",
        borderRadius: 100,
    },

    innerButtonContainer: {
        borderColor: componentColors.button.border,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center"
    }
})