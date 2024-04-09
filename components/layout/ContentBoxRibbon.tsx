/**
 * ContentBox component, but with fancy ribbon title
 * 
 */
import { ReactNode, useState } from "react";
import { View, StyleSheet, StyleProp, ViewStyle, DimensionValue } from "react-native";
import { componentColors } from "../misc/Colors";
import Shadow from "../misc/Shadow";
import RibbonTitle from "../generalUI/RibbonTitle";

interface ContentBoxRibbonProps {
    children?: ReactNode;
    style?: StyleProp<ViewStyle>;
    isLoading?: boolean;
    /** 
    * @property The small text at the top of the ribbon
    */
    topText: string;
    /** 
    * @property The large text at the bottom of the ribbon
    */
    bottomText: string;
    /** 
    * @property Decorates the ribbon with stars
    */
    stars?: boolean;
    width?: DimensionValue;
    fetchEnabled?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
}

export default function ContentBoxRibbon(props: ContentBoxRibbonProps) {
    const {
        children,
        style,
        isLoading = false,
        topText,
        bottomText,
        stars,
        width = "88%",
        containerStyle,
    } = props;

    const [containerHeight, setContainerHeight] = useState(200); // Default minHeight

    // Whenever the layout changes, check the height of the contentBox,
    // This assures the shadow knows the height of the box, even when it become bigger than 200
    const onLayout = (event: any) => {
        const { height } = event.nativeEvent.layout;
        setContainerHeight(height);
    };

    return (
        <View style={[styles.container, containerStyle]}>
            <Shadow height={containerHeight} shadowHeight={8} width={width} borderRadius={20} />
            <View style={[
                styles.background,
                { height: containerHeight + 4 },
                { width: width }
            ]} />
            <View style={[styles.contentBoxContainer, { width: width }, style]} onLayout={onLayout}>
                <>
                    <View style={styles.ribbonTitleConatiner}>
                        <RibbonTitle stars={stars} topText={topText} bottomText={bottomText} />
                    </View>
                    {isLoading ? (
                        null // TODO: add loading indicator
                    ) : (
                        <View style={{ marginTop: 40, gap: 10 }}>
                            {children}
                        </View>
                    )}
                </>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        marginTop: 25,
    },

    contentBoxContainer: {
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 20,
        backgroundColor: componentColors.contentBox.background,
        minHeight: 100,
        gap: 10,
    },

    background: {
        position: "absolute",
        backgroundColor: componentColors.contentBox.backgroundHighlight,
        borderRadius: 20,
    },

    ribbonTitleConatiner: {
        position: "absolute",
        alignSelf: "center",
        top: -30,
    }
})