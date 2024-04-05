import { ReactNode } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Text from "../generalUI/Text";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";

interface DrawerLinkProps {
    text?: string;
    icon?: ReactNode;
    linkTo: string;
    linkParams?: object;
    onPress: () => void;
}

export default function DrawerLink(props: DrawerLinkProps) {
    const { text, icon, linkTo, linkParams, onPress } = props;

    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            navigation.navigate(linkTo, linkParams);
            onPress();
        }}>
            {icon}
            <Text>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 10,
        margin: 14,
    }
})