import { View, Image, StyleSheet } from "react-native";
import ContentBox from "../layout/ContentBox";
import Button from "../buttons/Button";
import Text from "../generalUI/Text";
import { colors } from "./Colors";
import PulseAnimation from "../animations/PulseAnimation";

interface StoreListingProps {
    title: string;
    icon: "coins-small" | "coins-medium" | "coins-big" | "coins-chest" | "info";
    price: string;
    discount?: string;
    oldPrice?: string;
}

export default function StoreListing(props: StoreListingProps) {
    const { title, icon, price, discount, oldPrice } = props;

    const images = {
        "coins-small": require("../../assets/images/coins-small.png"),
        "coins-medium": require("../../assets/images/coins-medium.png"),
        "coins-big": require("../../assets/images/coins-big.png"),
        "coins-chest": require("../../assets/images/coins-chest.png"),
        "info": require("../../assets/icons/info.png"),
    }

    return (
        <View style={{ width: "42%" }}>
            <ContentBox
                title={title}
                width={"100%"}
                containerStyle={{ width: "100%" }}
            >
                <View style={styles.listingContainer}>
                    <Image style={{ height: 85, width: 85, marginTop: 6, }} source={images[icon]} />
                    <View style={styles.textContainer}>
                        {oldPrice && (
                            <Text size={15} style={{ textDecorationLine: "line-through", textDecorationStyle: 'solid' }} shadow={false} color={colors.metals.silver}>{oldPrice}</Text>
                        )}
                        <Text shadow={false} color={colors.purple.medium}>{price}</Text>
                    </View>
                    <Button height={36} label="Buy" variant="blue" />
                </View>
            </ContentBox>
            {discount && (
                <View style={styles.discountContainer}>
                    <PulseAnimation>
                        <Text size={24} color={colors.yellow.light} shadowColor={colors.red.dark}>{discount}</Text>
                    </PulseAnimation>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    listingContainer: {
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },

    textContainer: {
        // flexDirection: "row",
        // gap: 10,
        alignItems: "center",
        justifyContent: "flex-end",
        height: 22,
    },

    discountContainer: {
        position: "absolute",
        // top: -50,
        right: -16,
        transform: [{ rotate: '20deg' }],
        zIndex: 9999,
    }
})