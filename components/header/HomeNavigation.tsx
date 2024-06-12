import { useRef } from "react";
import CircularButton from "../buttons/CircularButton";
import Drawer, { DrawerRef } from "../drawer/Drawer";
import DrawerLink from "../drawer/DrawerLink";
import { AntDesign, Ionicons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { colors } from "../misc/Colors";
import Text from "../generalUI/Text";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeNavigation() {
    const navigationDrawerRef = useRef<DrawerRef>(null);
    return (
        <>
            <CircularButton variant="hamburger" onPress={() => navigationDrawerRef.current?.openDrawer()} />
            <Drawer
                ref={navigationDrawerRef}
                containerStyle={[{ paddingVertical: 50, paddingHorizontal: 10 }]}
                side="left"
            >
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                    <View style={{
                        paddingHorizontal: 44,
                        marginBottom: 10,
                    }}>
                        <Text size={26}>Navigation</Text>
                    </View>
                    {/* <DrawerLink
                        title="Notifications"
                        text="See notifications you've gotten."
                        linkTo="Notifications"
                        icon={<Ionicons name="notifications" size={20} color={colors.blue.light} />}
                        onPress={() => navigationDrawerRef.current?.closeDrawer()}
                    /> */}
                    {/* <DrawerLink
                        title="Results"
                        text="See the results of yesterday's contest."
                        linkTo="Results"
                        icon={<AntDesign name="star" size={20} color={"#ffbf00"} />}
                        linkParams={{ date: new Date().toISOString() }}
                        onPress={() => navigationDrawerRef.current?.closeDrawer()}
                    /> */}
                    <DrawerLink
                        title="Store"
                        text="Buy more coins at the store. You can use these for various advantages in the app."
                        linkTo="Store"
                        icon={<FontAwesome5 name="coins" size={20} color={"#ffbf00"} />}
                        linkParams={{ date: new Date().toISOString() }}
                        onPress={() => navigationDrawerRef.current?.closeDrawer()}
                    />

                    <DrawerLink
                        title="Sign in"
                        text="If you already have an account, log in here."
                        linkTo="Sign in"
                        icon={<Entypo name="login" size={20} color={colors.blue.light} />}
                        linkParams={{ date: new Date().toISOString() }}
                        onPress={() => navigationDrawerRef.current?.closeDrawer()}
                    />
                </ScrollView>
            </Drawer>
        </>
    )
}