import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import Text from "../generalUI/Text";
import { useCoin } from "../../hooks/useCoin";
import { RootState } from "../../state-management/reduxStore";
import { useSelector } from "react-redux";
import CircularButton from "../buttons/CircularButton";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";

export default function CoinCount({ onPress }: { onPress?: () => void; }) {
    let coin = useCoin();
    const { coins } = useSelector((state: RootState) => state.coins)

    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    return (

        <TouchableOpacity onPress={() => { navigation.navigate("Store"); if (onPress) onPress(); }} style={styles.container}>
            <Text size={16}>{coins}</Text>
            <Image style={styles.image} source={require("../../assets/icons/coin.png")} />
            <CircularButton noPress size={18} variant="add" />
        </TouchableOpacity>
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