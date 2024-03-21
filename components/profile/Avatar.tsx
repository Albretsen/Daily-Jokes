import { View, Image, StyleSheet } from "react-native";
import { percentageOf } from "../../utils/utils";

type AvatarSource = ReturnType<typeof require>;
const avatars: Record<number, AvatarSource> = {
    0: require("../../assets/avatars/0.png"),
    1: require("../../assets/avatars/1.png"),
    2: require("../../assets/avatars/2.png"),
    3: require("../../assets/avatars/3.png"),
    4: require("../../assets/avatars/4.png"),
    5: require("../../assets/avatars/5.png"),
    6: require("../../assets/avatars/6.png"),
    7: require("../../assets/avatars/7.png"),
    8: require("../../assets/avatars/8.png"),
    9: require("../../assets/avatars/9.png"),
    10: require("../../assets/avatars/10.png"),
    11: require("../../assets/avatars/11.png"),
    12: require("../../assets/avatars/12.png"),
}

interface AvatarProps {
    id: number;
    backgroundColor?: string;
    size?: number;
    borderWidth?: number;
    /** 
    * @property Determines how far the avatar should be offset
    * positive values for right, negative for left
    * should be kept low as going too far looks bad
    */
    offset?: number;
}

export default function Avatar(props: AvatarProps) {
    const { id, backgroundColor = "#FDBC66", size = 120, borderWidth = 2 } = props;
    let offset = borderWidth - borderWidth * 2
    return (
        <View style={[
            styles.fullCircle,
            {
                backgroundColor: backgroundColor,
                borderWidth: borderWidth,
                height: size - percentageOf(6, size),
                width: size - percentageOf(6, size)
            }
        ]}>
            <View style={[
                styles.lowerCircle,
                {
                    height: size + 20, // Allows room for image overflow without cutoff
                    width: size - borderWidth * 2
                }
            ]}>
                <Image style={[
                    styles.image,
                    {
                        height: size,
                        width: size,
                        left: offset
                    }
                ]} source={avatars[id]} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    fullCircle: {
        borderRadius: 100,
        justifyContent: "flex-end",
        alignItems: "center",
        borderColor: "white",
        borderWidth: 2,
    },

    lowerCircle: {
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100,
        overflow: "hidden",
    },

    image: {
        position: "absolute",
        bottom: 0,
    }
})