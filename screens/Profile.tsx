import React, { useState } from 'react';
import { View } from 'react-native';
import ScreenView, { SCREEN_HEIGHT, HEADER_HEIGHT } from '../components/layout/ScreenView';
import ScrollToTopView from '../components/layout/ScrollToTopView';
import { RootState } from '../state-management/reduxStore';
import { useSelector } from 'react-redux';
import { useProfile } from '../hooks/useProfile';
import ProfileSection from '../components/profile/ProfileSection';
import JokeListManager from '../components/managers/JokeListManager';
import Text from '../components/generalUI/Text';
import FilterToggle from '../components/generalUI/FilterToggle';

export default function Profile() {

    const profile = useProfile();

    const { avatarId, backgroundId } = useSelector((state: RootState) => state.profile);

    const [activeFilter, setActiveFilter] = useState(0);

    return (
        <ScreenView style={{
            marginTop: 0,
            maxHeight: SCREEN_HEIGHT + HEADER_HEIGHT,
            minHeight: SCREEN_HEIGHT + HEADER_HEIGHT
        }}
            scrollView={false}
        >
            <ScrollToTopView scrollToTopThreshold={Infinity}>
                <ProfileSection customizable avatarId={avatarId} backgroundId={backgroundId} name={profile.user.name} />
                <View style={{
                    justifyContent: "center",
                    width: "100%",
                    alignItems: "center",
                    marginTop: 40,
                    marginBottom: 10,
                }}>
                    <Text size={24}>Jokes by {profile.user.name}</Text>
                </View>
                <FilterToggle
                    options={[
                        { label: "recent" },
                        { label: "top" },
                    ]}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                />
                <JokeListManager initialCriteria={{ filters: { userId: profile.user.id }, sortBy: activeFilter == 0 ? "-createTimeStamp" : "-score" }} />
            </ScrollToTopView>
        </ScreenView >
    )
}
