import { View, Pressable, StyleSheet } from "react-native";
import Avatar from "./Avatar";
import Text from "../generalUI/Text";
import { colors } from "../misc/Colors";
import { BottomSheetView, BottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheetBackground from './ProfileBottomSheetBackground';
import CircularButton from '../buttons/CircularButton';
import { useRef } from "react";
import { updateViewingUser } from "../../state-management/viewingUser";

interface User {
    name: string,
    id: number;
    backgroundId: number;
    avatarId: number;
}

interface PlayersDisplayProps {
    users: User[];
    totalPlayers: number;
}

export default function PlayersDisplay(props: PlayersDisplayProps) {
    const { users, totalPlayers } = props;
    const displayedUsers = users.slice(0, totalPlayers <= 5 ? totalPlayers : 4);
    const remainingCount = totalPlayers > 5 ? totalPlayers - 4 : 0;

    if (totalPlayers <= 0) return null;

    const bottomSheetRef = useRef<BottomSheetModal>(null);

    return (
        <View style={styles.container}>
            <Text shadow={false} color={colors.purple.dark}>Players</Text>
            <View style={styles.avatarContainer}>
                {displayedUsers.map((user) => (
                    <Pressable key={user.id} onPress={async () => {
                        updateViewingUser(user.name, user.avatarId, user.backgroundId);
                        bottomSheetRef.current?.present();
                    }}>
                        <Avatar size={54} id={user.avatarId} />
                    </Pressable>
                ))}
                {remainingCount > 0 && (
                    <View style={styles.remainingCircle}>
                        <Text>+{remainingCount}</Text>
                    </View>
                )}
            </View>

            <BottomSheetModal
                ref={bottomSheetRef}
                index={0}
                snapPoints={["50%"]}
                enablePanDownToClose
                backgroundComponent={BottomSheetBackground}
            >
                <BottomSheetView>
                    <View style={{
                        alignSelf: "flex-end",
                        marginHorizontal: 20,
                    }}>
                        <CircularButton onPress={() => bottomSheetRef.current?.close()} variant="close" />
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 6,
    },
    avatarContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 15,
    },
    remainingCircle: {
        width: 48,
        height: 48,
        borderRadius: 100,
        backgroundColor: "#9F51FE",
        justifyContent: "center",
        alignItems: "center",
    },
});
