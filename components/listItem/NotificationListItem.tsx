import ListItem, { ListItemCenter, ListItemRight } from "./ListItem";
import { View, Image, StyleSheet } from "react-native";
import { colors } from "../misc/Colors";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";

const images = {
    "coins-small": require("../../assets/images/coins-small-notification.png"),
    "coins-medium": require("../../assets/images/coins-medium-notification.png"),
    "coins-big": require("../../assets/images/coins-big.png"),
    "coins-chest": require("../../assets/images/coins-chest.png"),
    "info": require("../../assets/icons/info.png"),
}

interface NotificationListItemProps {
    icon: "coins-small" | "coins-medium" | "coins-big" | "coins-chest" | "info";
    title: string;
    text?: string;
    date?: string;
    data?: {
        contestId: number;
    };
    type?: string;
}

export default function NotificationListItem(props: NotificationListItemProps) {
    const { icon, title, text, date, data, type } = props;

    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    const onPress = () => {
        if (type === "contestResult") {
            if (data?.contestId !== undefined && data?.contestId !== null) {
                navigateToContestResult(data.contestId)
            }
        }
    }

    const navigateToContestResult = (contestId: number) => {
        navigation.navigate("Results", { contestId: contestId });
    }

    return (
        <ListItem
            noBox
            left={
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={images[icon]} />
                </View>
            }
            center={
                <ListItemCenter
                    title={title}
                    text={text}
                    bottomText={date}
                    button={{
                        label: "Check out",
                        onPress: onPress,
                    }}
                />
            }
            right={
                <ListItemRight
                    displayArrow
                />
            }
        />
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        borderRadius: 100,
        overflow: "hidden",
        height: 48,
        width: 48,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.blue.medium,
    },

    image: {
        height: 44,
        width: 44,
    }
})