import { View, Image, StyleSheet } from "react-native";
import ContentBox from "../layout/ContentBox";
import Button from "../buttons/Button";
import Text from "../generalUI/Text";
import { colors } from "./Colors";
import PulseAnimation from "../animations/PulseAnimation";
import { purchaseProduct } from "../../services/IAP";

interface StoreListingProps {
    title: string;
    icon: "coins-small" | "coins-medium" | "coins-big" | "coins-chest" | "info";
    price: string;
    productIdentifier: string;
    discount?: string;
    oldPrice?: string;
    onPurchase?: (success: boolean, message: string) => void;
}

export default function StoreListing(props: StoreListingProps) {
    let { title, icon, price, productIdentifier, discount, oldPrice, onPurchase } = props;

    const handlePurchase = async () => {
        try {
            const result = await purchaseProduct(productIdentifier);
            if (onPurchase) {
                onPurchase(true, "Purchase successful");
            }
        } catch (error) {
            if (onPurchase) {
                onPurchase(false, error.message);
            }
        }
    };

    const productToIconMap = {
        "100_coins": "coins-small",
        "200_coins": "coins-medium",
        "500_coins": "coins-big",
        "1000_coins": "coins-chest",
    };

    if (!icon) icon = productToIconMap[productIdentifier] || "info";

    const images = {
        "coins-small": require("../../assets/images/coins-small.png"),
        "coins-medium": require("../../assets/images/coins-medium.png"),
        "coins-big": require("../../assets/images/coins-big.png"),
        "coins-chest": require("../../assets/images/coins-chest.png"),
        "info": require("../../assets/icons/info.png"),
    }

    return (
        <ContentBox
            title={title}
            width={"100%"}
            containerStyle={{ width: "42%" }}
        >
            <View style={styles.listingContainer}>
                <Image style={{ height: 85, width: 85, marginTop: 6, }} source={images[icon]} />
                <View style={styles.textContainer}>
                    {oldPrice && (
                        <Text size={15} style={{ textDecorationLine: "line-through", textDecorationStyle: 'solid' }} shadow={false} color={colors.metals.silver}>{oldPrice}</Text>
                    )}
                    <Text shadow={false} color={colors.purple.medium}>{price}</Text>
                </View>
                <Button height={36} label="Buy" variant="blue" onPress={handlePurchase} />
            </View>
            {discount && (
                <View style={styles.discountContainer}>
                    <PulseAnimation>
                        <Text size={24} color={colors.yellow.light} shadowColor={colors.red.dark}>{discount}</Text>
                    </PulseAnimation>
                </View>
            )}
        </ContentBox>
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
        top: -50,
        right: -30,
        transform: [{ rotate: '20deg' }],
        zIndex: 9999,
    }
})