import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import ScreenView from '../components/layout/ScreenView';
import Text from '../components/generalUI/Text';
import Avatar from '../components/profile/Avatar';
import ContentBox from '../components/layout/ContentBox';
import ContestListItem from '../components/listItem/ContestListItem';
import ProfileBackground, { backgroundImageHeight } from '../components/profile/ProfileBackground';
import ScrollToTopView from '../components/layout/ScrollToTopView';
import Button from '../components/buttons/Button';
import CircularButton from '../components/buttons/CircularButton';
import Drawer from '../components/drawer/Drawer';
import ContentTab from '../components/layout/ContentTab';
import AvatarSelection from '../components/profile/AvatarSelection';
import BackgroundSelection from '../components/profile/BackgroundSelection';
import { RootState } from '../state-management/reduxStore';
import { useSelector } from 'react-redux';
import { useProfile } from '../hooks/useProfile';
import CoinCount from '../components/misc/CoinCount';


type DrawerRef = {
    openDrawer: () => void;
    closeDrawer: () => void;
};

export default function Profile() {

    const profile = useProfile();

    const customizeDrawer = useRef<DrawerRef>(null);

    const { avatarId } = useSelector((state: RootState) => state.profile);

    return (
        <View style={{ flex: 1 }}>
            <ScreenView scrollView={false}>
                <ScrollToTopView scrollToTopThreshold={Infinity} containerStyle={{ paddingTop: backgroundImageHeight + 15 }}>
                    <ContentBox ribbonTitle={{
                        topText: "Top",
                        bottomText: "Results",
                    }}>
                        <ContestListItem noBox={true} contest={{
                            date: "2022-03-25",
                            name: "Puns!",
                            position: 5,
                            id: 1,
                            stats: {
                                likes: 234,
                                participants: 32,
                            }
                        }} />
                    </ContentBox>
                </ScrollToTopView>

                <Drawer width="94%" ref={customizeDrawer}>
                    <View style={{ alignSelf: "center", width: "86%", marginVertical: 10 }}>
                        <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                            <CircularButton variant="back" onPress={() => customizeDrawer.current?.closeDrawer()} />
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
            </ScreenView >

            <View style={{
                position: "absolute",
                top: 0,
            }}>
                <ProfileBackground imageId={0}>
                    <Button
                        label="Customize your profile"
                        width={250}
                        variant="blue"
                        height={32}
                        onPress={() => customizeDrawer.current?.openDrawer()}
                    />
                </ProfileBackground>
                <View style={styles.profilePictureContainer}>
                    <View style={styles.profilePictureInner}>
                        <Avatar id={avatarId} />
                        <Text size={20}>{profile.user.name}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profilePictureContainer: {
        height: 75,
        width: "88%",
        alignSelf: "center"
    },

    profilePictureInner: {
        bottom: "40%",
        position: "absolute",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
})
