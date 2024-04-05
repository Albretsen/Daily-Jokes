import { View } from "react-native";
import { useState } from "react";
import ScrollToTopView from "../components/layout/ScrollToTopView";
import ScreenView, { SCREEN_HEIGHT, HEADER_HEIGHT } from "../components/layout/ScreenView";
import Text from "../components/generalUI/Text";
import FilterToggle from "../components/generalUI/FilterToggle";
import JokeListManager from "../components/managers/JokeListManager";
import ProfileSection from "../components/profile/ProfileSection";
import { RootState } from '../state-management/reduxStore';
import { useSelector } from 'react-redux';

export default function ViewProfile() {
    const { avatarId, userId, username, backgroundId } = useSelector((state: RootState) => state.viewingUser);

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
                <ProfileSection avatarId={avatarId} backgroundId={backgroundId} name={username} />
                <View style={{
                    justifyContent: "center",
                    width: "100%",
                    alignItems: "center",
                    marginTop: 40,
                    marginBottom: 10,
                }}>
                    <Text size={24}>Jokes by {username}</Text>
                </View>
                <FilterToggle
                    options={[
                        { label: "recent" },
                        { label: "top" },
                    ]}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                />
                <JokeListManager initialCriteria={{ filters: { userId: userId }, sortBy: activeFilter == 0 ? "-createTimeStamp" : "-score" }} />
            </ScrollToTopView>
        </ScreenView >
    )
}