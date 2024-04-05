import { ReactNode } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Text from "../generalUI/Text";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import { colors } from "../misc/Colors";

interface DrawerLinkProps {
    title?: string;
    text?: string;
    icon?: ReactNode;
    linkTo: string;
    linkParams?: object;
    onPress: () => void;
}

export default function DrawerLink(props: DrawerLinkProps) {
    const { title, text, icon, linkTo, linkParams, onPress } = props;

    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            navigation.navigate(linkTo, linkParams);
            onPress();
        }}>
            <View style={{ flexDirection: "row", gap: 10 }}>
                {icon}
                <Text color={colors.yellow.dark} size={20}>{title}</Text>
            </View>

            <Text style={{ marginLeft: 30 }} size={14}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 14,
    }
})