import { View, Image, StyleSheet } from "react-native";
import ContentBox from "../layout/ContentBox";
import Text from "../generalUI/Text";
import Button from "../buttons/Button";
import Modal from "../generalUI/Modal";
import { percentageOf as p } from "../../utils/utils";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";

interface ResultsProps {
    visible: boolean;
    onRequestClose: () => void;
    results: {
        date?: string;
        theme?: string;
        rank?: string;
        reward?: number;
        contestId?: number;
    }
}

export default function Results(props: ResultsProps) {
    const { visible, results, onRequestClose } = props;

    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    return (
        <Modal modalVisible={visible} onRequestClose={onRequestClose} >
            <ContentBox ribbonTitle={{
                topText: results.date ? results.date : "",
                bottomText: "Results",
                stars: true,
            }}>
                <View style={styles.container}>
                    <View style={styles.section}>
                        <Text shadow={false} style={styles.text}>Theme</Text>
                        <View style={styles.textField}>
                            <Text shadow={false} style={[styles.text, styles.textFieldText]}>{results.theme}</Text>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text shadow={false} style={styles.text}>Rank</Text>
                        <View style={styles.textField}>
                            <Text shadow={false} style={[styles.text, styles.textFieldText]}>{results.rank}</Text>
                        </View>
                    </View>
                    {results.reward ? (
                        <View style={styles.section}>
                            <Text shadow={false} style={styles.text}>Reward</Text>
                            <View style={styles.rewardContainer}>
                                <Image style={styles.rewardImage} source={require("../../assets/images/coins-medium.png")} />
                                <Text shadow={false} style={[styles.text, styles.textFieldText, { fontSize: 24 }]}>{results.reward}</Text>
                            </View>
                        </View>
                    ) : null}
                    <View style={{
                        marginTop: 20,
                    }}>
                        <Button variant="toggle" fontSize={24} label="View" onPress={() => {
                            navigation.navigate("Results", { contestId: results.contestId });
                            onRequestClose();
                        }}></Button>
                    </View>
                </View>
            </ContentBox>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
        alignItems: "center",
        marginBottom: 10,
    },

    section: {
        alignItems: "center",
        gap: 4
    },

    textField: {
        backgroundColor: "#C2FDFF",
        borderRadius: 100,
        minWidth: "88%",
        alignItems: "center",
        height: 34,
        justifyContent: "center"
    },

    text: {
        color: "#60CFFF",
        fontSize: 20,
    },

    textFieldText: {
        color: "#228AED",
        fontSize: 18,
    },

    rewardContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },

    rewardImage: {
        height: p(14, 300),
        width: p(14, 398),
    }
})