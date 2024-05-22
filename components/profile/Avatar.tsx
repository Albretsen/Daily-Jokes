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
    13: require("../../assets/avatars/13.png"),
    14: require("../../assets/avatars/14.png"),
    15: require("../../assets/avatars/15.png"),
    16: require("../../assets/avatars/16.png"),
    17: require("../../assets/avatars/17.png"),
    18: require("../../assets/avatars/18.png"),
}

interface AvatarProps {
    id: number;
    backgroundColor?: string;
    size?: number;
    /** 
    * @property Determines how far the avatar should be offset
    * positive values for right, negative for left
    * should be kept low as going too far looks bad
    */
    offset?: number;
}

export default function Avatar(props: AvatarProps) {
    const { id, backgroundColor = "#FDBC66", size = 120 } = props;
    return (
        <View style={[
            styles.fullCircle,
            {
                backgroundColor: backgroundColor,
                height: size - percentageOf(6, size),
                width: size - percentageOf(6, size)
            }
        ]}>
            <View style={[
                styles.lowerCircle,
                {
                    height: size + 20, // Allows room for image overflow without cutoff
                    width: size - percentageOf(6, size)
                }
            ]}>
                <Image style={[
                    styles.image,
                    {
                        height: size,
                        width: size,
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
    },

    lowerCircle: {
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100,
        overflow: "hidden",
        alignItems: "center",
    },

    image: {
        position: "absolute",
        bottom: 0,
    }
})