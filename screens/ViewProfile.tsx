import { View } from "react-native";
import { useState } from "react";
import ScrollToTopView from "../components/layout/ScrollToTopView";
import ScreenView from "../components/layout/ScreenView";
import { backgroundImageHeight } from "../components/profile/ProfileBackground";
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
        <View style={{ flex: 1 }}>
            <ScreenView scrollView={false}>
                <ScrollToTopView scrollToTopThreshold={Infinity} containerStyle={{ paddingTop: backgroundImageHeight + 15 }}>
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

            <ProfileSection avatarId={avatarId} backgroundId={backgroundId} name={username} />
        </View>
    )
}