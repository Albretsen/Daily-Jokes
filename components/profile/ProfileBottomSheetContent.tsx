import { View } from "react-native";
import Button from "../buttons/Button";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";

interface ProfileBottomSheetContentProps {
    /** 
    * @property method for closing the bottom sheet, runs when navigating away from sheet
    */
    closeMethod: () => void;
}

export default function ProfileBottomSheetContent({ closeMethod }: ProfileBottomSheetContentProps) {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    return (
        <View style={{
            // Pushes the view below the background and profile picture
            marginTop: 120,
            // justifyContent: "center",
            width: "100%",
            alignItems: "center",
        }}>
            <Button onPress={() => { navigation.navigate("User"), closeMethod() }} width={150} label="Visit profile" variant="blue" />
        </View>
    )
}