import React, { useEffect, useState } from 'react';
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
import JokeListManager from '../components/managers/JokeListManager';
import Text from '../components/generalUI/Text';
import FilterToggle from '../components/generalUI/FilterToggle';

export default function Profile() {

    const profile = useProfile();

    const { avatarId } = useSelector((state: RootState) => state.profile);

    const [activeFilter, setActiveFilter] = useState(0);

    return (
        <View style={{ flex: 1 }}>
            <ScreenView scrollView={false}>
                <ScrollToTopView scrollToTopThreshold={Infinity} containerStyle={{ paddingTop: backgroundImageHeight + 15 }}>
                    {/* <ContentBox ribbonTitle={{
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
                    </ContentBox> */}
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

            <ProfileSection customizeButton avatarId={profile.user.profile} backgroundId={profile.user.backgroundId} name={profile.user.name} />
        </View>
    )
}
