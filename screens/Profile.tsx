import React, { useRef } from 'react';
import { View } from 'react-native';
import ScreenView from '../components/layout/ScreenView';
import ContentBox from '../components/layout/ContentBox';
import ContestListItem from '../components/listItem/ContestListItem';
import { backgroundImageHeight } from '../components/profile/ProfileBackground';
import ScrollToTopView from '../components/layout/ScrollToTopView';
import { RootState } from '../state-management/reduxStore';
import { useSelector } from 'react-redux';
import { useProfile } from '../hooks/useProfile';
import ProfileSection from '../components/profile/ProfileSection';

export default function Profile() {

    const profile = useProfile();

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

            </ScreenView >

            <ProfileSection customizeButton avatarId={avatarId} backgroundId={0} name={profile.user.name} />
        </View>
    )
}
