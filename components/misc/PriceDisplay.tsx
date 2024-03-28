import { View, Image, StyleSheet } from "react-native";
import Text from "../generalUI/Text";

interface PriceDisplayProps {
    price: number | string;
    textColor?: string;
}

export default function PriceDisplay({ price, textColor }: PriceDisplayProps) {
    return (
        <View style={styles.container}>
            <Text color={textColor} size={16}>{price}</Text>
            <Image style={styles.image} source={require("../../assets/icons/coin.png")} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 4
    },

    image: {
        width: 16,
        height: 16,
    }
})