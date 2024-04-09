import { useRef } from "react";
import { View } from "react-native";
import Button from "../buttons/Button";
import Drawer, { DrawerRef } from "../drawer/Drawer";
import AvatarSelection from "./AvatarSelection";
import BackgroundSelection from "./BackgroundSelection";
import CoinCount from "../misc/CoinCount";
import CircularButton from "../buttons/CircularButton";
import ContentTab from "../layout/ContentTab";
import EditAccount from "./EditAccount";
import Text from "../generalUI/Text";

export default function CustomizeProfile() {
    const customizeDrawer = useRef<DrawerRef>(null);
    const editProfileDrawer = useRef<DrawerRef>(null);

    return (
        <>
            <View style={{
                width: "88%",
                alignSelf: "center",
                flexDirection: "row",
                gap: 10,
                flexWrap: "wrap",
                justifyContent: "space-evenly"
            }}>
                <Button
                    label="Customize profile"
                    width={150}
                    variant="blue"
                    fontSize={15}
                    height={30}
                    onPress={() => customizeDrawer.current?.openDrawer()}
                />
                <Button
                    label="Edit profile details"
                    width={165}
                    variant="submit"
                    fontSize={15}
                    height={30}
                    onPress={() => editProfileDrawer.current?.openDrawer()}
                />
            </View>

            <Drawer width="94%" ref={customizeDrawer}>
                <View style={{ alignSelf: "center", width: "86%", marginVertical: 10 }}>
                    <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                        <CircularButton variant="back" onPress={() => customizeDrawer.current?.closeDrawer()} />
                        <Text size={20}>Customize profile</Text>
                        <CoinCount onPress={() => customizeDrawer.current?.closeDrawer()} />
                    </View>
                </View>
                <ContentTab
                    contentSpacing={10}
                    tabs={[
                        {
                            name: "Avatars",
                            component: (
                                <AvatarSelection />
                            )
                        },
                        {
                            name: "Backgrounds",
                            component: (
                                <BackgroundSelection />
                            )
                        },
                    ]}
                />
            </Drawer>

            <Drawer width="94%" ref={editProfileDrawer}>
                <View style={{ alignSelf: "center", width: "86%", marginVertical: 10 }}>
                    <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                        <CircularButton variant="back" onPress={() => editProfileDrawer.current?.closeDrawer()} />
                        <Text size={20}>Edit account</Text>
                        <CoinCount onPress={() => editProfileDrawer.current?.closeDrawer()} />
                    </View>
                </View>
                <EditAccount />
            </Drawer>
        </>
    )
}