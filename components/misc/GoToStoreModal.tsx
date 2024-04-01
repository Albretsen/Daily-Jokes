import Modal from "../generalUI/Modal";
import Text from "../generalUI/Text";
import Button from "../buttons/Button";
import ContentBox from "../layout/ContentBox";
import { colors } from "./Colors";
import { View, Image } from "react-native";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import { RootState } from '../../state-management/reduxStore';
import { toggleGoToStore } from "../../state-management/goToStore";

export default function GoToStoreModal() {
    const { visible } = useSelector((state: RootState) => state.goToStore);

    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    return (
        <Modal modalVisible={visible} onRequestClose={() => toggleGoToStore(false)}>
            <ContentBox title="Not enough coins">
                <View style={{
                    gap: 16,
                    marginVertical: 10,
                }}>
                    <Image style={{
                        height: 100,
                        width: 100,
                        alignSelf: "center",
                    }}
                        source={require("../../assets/images/coins-big.png")}
                    />
                    <Text shadow={false} color={colors.purple.medium} style={{ textAlign: "center" }}>Win coins by writing the best joke in a contest or buy more in the store.</Text>
                    <Button onPress={() => { navigation.navigate("Store"); toggleGoToStore(false) }} width={150} style={{ alignSelf: "center" }} variant="blue" label="Go to store" />
                </View>
            </ContentBox>
        </Modal>
    )
}