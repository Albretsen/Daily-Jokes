import { useRef } from "react";
import CircularButton from "../buttons/CircularButton";
import Drawer, { DrawerRef } from "../drawer/Drawer";
import DrawerLink from "../drawer/DrawerLink";
import { AntDesign, Ionicons } from '@expo/vector-icons';


export default function HomeNavigation() {
    const navigationDrawerRef = useRef<DrawerRef>(null);
    return (
        <>
            <CircularButton variant="hamburger" onPress={() => navigationDrawerRef.current?.openDrawer()} />
            <Drawer
                ref={navigationDrawerRef}
                containerStyle={[]}
                side="left"
            >
                <DrawerLink
                    text="Notifications"
                    linkTo="Notifications"
                    icon={<Ionicons name="notifications" size={20} color={"white"} />}
                    onPress={() => navigationDrawerRef.current?.closeDrawer()}
                />
                <DrawerLink
                    text="Results"
                    linkTo="Results"
                    icon={<AntDesign name="star" size={20} color={"white"} />}
                    linkParams={{ date: new Date().toISOString() }}
                    onPress={() => navigationDrawerRef.current?.closeDrawer()}
                />
                <DrawerLink
                    text="Store"
                    linkTo="Store"
                    icon={<AntDesign name="star" size={20} color={"white"} />}
                    linkParams={{ date: new Date().toISOString() }}
                    onPress={() => navigationDrawerRef.current?.closeDrawer()}
                />
            </Drawer>
        </>
    )
}