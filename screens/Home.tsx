import { useState, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import ScreenView from "../components/layout/ScreenView";
import Button from "../components/buttons/Button";
import ContentBox, { ContentBoxBottom } from "../components/layout/ContentBox";
import PlayersDisplay from "../components/profile/PlayersDisplay";
import { useContest } from "../hooks/useContest";
import Text from "../components/generalUI/Text";
import { useTimeLeft } from "../hooks/useTimeLeft";
import { colors } from "../components/misc/Colors";
import PulseAnimation from "../components/animations/PulseAnimation";
import StylizedTitle from "../components/misc/StylizedTitle";

interface HomeProps {
    navigation: {
        navigate: (name: string) => void;
    };
}

export default function Home({ navigation }: HomeProps) {

    const contest = useContest();
    const timeLeft = useTimeLeft(contest.date);

    return (
        <>
            <ScreenView scrollView={false} style={styles.container}>
                <StylizedTitle />
                <ContentBox
                    title="Daily contest"
                    headerColor={colors.purple.dark}
                    text={
                        <Text shadow={false}>
                            <Text shadow={false} color={colors.purple.medium}>{"The theme for today is \n" + contest.topic}</Text>
                            <PulseAnimation>
                                <Text shadow={false} color={colors.purple.dark}></Text>
                            </PulseAnimation>
                        </Text>
                    }
                    isLoading={contest.topic == ""}
                >
                    {contest.participants && (
                        <PlayersDisplay totalPlayers={contest.totalParticipants} users={contest.participants.map(participant => ({
                            id: participant.id,
                            avatarId: participant.profile,
                        }))} />
                    )}
                    <ContentBoxBottom>
                        <Button height={36} variant="play" onPress={() => navigation.navigate("Daily")} label="Play" />
                        <Text shadow={false} color={colors.purple.dark}>{timeLeft}</Text>
                    </ContentBoxBottom>
                </ContentBox>

            </ScreenView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 20,
        paddingTop: 20,
        justifyContent: "flex-start",
    }
})