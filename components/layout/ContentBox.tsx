/**
 * Container for displaying text and various other informations to the user
 * 
 */
import { ReactNode, useState } from "react";
import { View, StyleSheet, StyleProp, ViewStyle, DimensionValue } from "react-native";
import { componentColors } from "../misc/Colors";
import Text from "../generalUI/Text";
import Shadow from "../misc/Shadow";
import { useContest } from "../../hooks/useContest";
import RibbonTitle from "../generalUI/RibbonTitle";
import { LinearGradient } from "expo-linear-gradient";

interface ContentBoxProps {
    children?: ReactNode;
    title?: string;
    text?: string | ReactNode;
    textColor?: string;
    style?: StyleProp<ViewStyle>;
    headerColor?: string;
    isLoading?: boolean;
    /** 
    * @property Date used to determine the title for a contest title
    */
    date?: Date;
    /** 
    * @property Replaces the normal title with a big fancy title
    */
    ribbonTitle?: {
        topText: string;
        bottomText: string;
        stars?: boolean;
    }
    width?: DimensionValue;
    fetchEnabled?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    /** 
    * @property Adds a rainbow border to the box
    */
    rainbowBorder?: boolean;
}

export default function ContentBox(props: ContentBoxProps) {
    const {
        children,
        title,
        text,
        textColor = componentColors.contentBox.text,
        style,
        headerColor = componentColors.contentBox.highlight,
        isLoading = false,
        date,
        ribbonTitle,
        width = "88%",
        fetchEnabled = true,
        containerStyle,
        rainbowBorder,
    } = props;

    const [containerHeight, setContainerHeight] = useState(200); // Default minHeight

    // Whenever the layout changes, check the height of the contentBox,
    // This assures the shadow knows the height of the box, even when it become bigger than 200
    const onLayout = (event: any) => {
        const { height } = event.nativeEvent.layout;
        setContainerHeight(height);
    };

    const contest = useContest(date, fetchEnabled);

    return (
        <View style={[styles.container, ribbonTitle ? { marginTop: 25 } : null, containerStyle]}>
            <Shadow height={containerHeight} shadowHeight={rainbowBorder ? 4 : 8} width={width} borderRadius={20} />
            <View style={[
                styles.background,
                { height: containerHeight + (rainbowBorder ? 0 : 4) },
                { width: width }
            ]} />
            <LinearGradient
                colors={rainbowBorder ?
                    ["#8FFFF8", "#85FF71", "#FAE84C", "#FF7D7D", "#8E00D0"]
                    :
                    ["white", "white"]
                }
                style={[styles.gradientContainer, { width: width }, style]}
                onLayout={onLayout}
            >
                <View style={styles.contentBoxContainer}>
                    {ribbonTitle && (
                        <View style={styles.ribbonTitleConatiner}>
                            <RibbonTitle stars={false} topText={ribbonTitle.topText} bottomText={ribbonTitle.bottomText ? ribbonTitle.bottomText : title} />
                        </View>
                    )}
                    {isLoading ? (
                        null // TODO: add loading indicator
                    ) : (
                        <>
                            {!ribbonTitle && title && (
                                <View style={[styles.titleContainer, { backgroundColor: headerColor }]}>
                                    <Text shadow={false}>{title ? title : contest.topic}</Text>
                                </View>
                            )}
                            {text && (
                                <View style={styles.textContainer}>
                                    <Text shadow={false} color={textColor} style={{ textAlign: "center" }}>{text}</Text>
                                </View>
                            )}
                            <View style={[ribbonTitle ? { marginTop: 40 } : null, { gap: 10 }, { paddingTop: 10 }]}>
                                {children}
                            </View>
                        </>
                    )}
                </View>
            </LinearGradient>
        </View>
    )
}

interface ContentBoxBottomProps {
    children?: ReactNode;
}

export function ContentBoxBottom({ children }: ContentBoxBottomProps) {
    return (
        <View style={styles.bottomContainer}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
    },

    gradientContainer: {
        padding: 6,
        borderRadius: 20,
        backgroundColor: componentColors.contentBox.background,
        minHeight: 100,
        gap: 10,
    },

    contentBoxContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 16,
        backgroundColor: "white"
    },

    background: {
        position: "absolute",
        backgroundColor: componentColors.contentBox.backgroundHighlight,
        borderRadius: 20,
    },

    titleContainer: {
        borderRadius: 20,
        height: 26,
        justifyContent: "center",
        alignItems: "center",
        // zIndex: 1,
    },

    textContainer: {
        justifyContent: "center",
        alignItems: "center",
        minHeight: 40,
    },

    bottomContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },

    ribbonTitleConatiner: {
        position: "absolute",
        alignSelf: "center",
        top: -30,
    }
})