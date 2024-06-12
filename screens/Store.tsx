import React, { useEffect, useState } from 'react';
import ScreenView from "../components/layout/ScreenView";
import ScrollToTopView from "../components/layout/ScrollToTopView";
import StoreListing from "../components/misc/StoreListing";
import PremiumStoreListing from "../components/misc/PremiumStoreListing";
import { View, StyleSheet } from "react-native";
import ContentTab from "../components/layout/ContentTab";
import { getOfferings } from "../services/IAP";
import { showToast } from '../state-management/toast';

export default function Store() {

    const [offerings, setOfferings] = useState(null);

    useEffect(() => {
        const fetchOfferings = async () => {
            const fetchedOfferings = await getOfferings();
            setOfferings(fetchedOfferings);
        };

        fetchOfferings();
    }, []);

    const onPurchase = (success, message) => {
        if (success) {
        }
        showToast(message);
    }

    return (
        <ScreenView style={{ justifyContent: "flex-start" }}>
            <ContentTab
                contentSpacing={10}
                tabs={[
                    {
                        name: "Coins",
                        component: (
                            <ScrollToTopView containerStyle={{ marginTop: 20 }}>
                                <View style={styles.coinStoreContainer}>
                                    {offerings && offerings.all.offerings.availablePackages.map((pkg) => (
                                        <StoreListing
                                            key={pkg.identifier}
                                            title={pkg.product.title}
                                            price={pkg.product.priceString}
                                            productIdentifier={pkg.identifier}
                                            onPurchase={onPurchase}
                                        />
                                    ))}
                                </View>
                            </ScrollToTopView>
                        )
                    },
                    {
                        name: "Premium",
                        component: (
                            <ScrollToTopView>
                                <PremiumStoreListing
                                    title="Monthly"
                                    price="$5.99"
                                    offers={[
                                        "Coming soon..."
                                    ]}
                                />
                            </ScrollToTopView>
                        )
                    },
                ]}
            />

        </ScreenView>
    )
}

const styles = StyleSheet.create({
    coinStoreContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        rowGap: 40,
        columnGap: 20,
    }
})