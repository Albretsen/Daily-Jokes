import { View, StyleSheet } from "react-native";
import Avatar from "./Avatar";
import Text from "../generalUI/Text";
import { colors } from "../misc/Colors";

interface User {
    id: number;
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

    return (
        <View style={styles.container}>
            <Text shadow={false} color={colors.purple.dark}>Players</Text>
            <View style={styles.avatarContainer}>
                {displayedUsers.map((user) => (
                    <Avatar size={60} key={user.id} id={user.avatarId} />
                ))}
                {remainingCount > 0 && (
                    <View style={styles.remainingCircle}>
                        <Text>+{remainingCount}</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

// Example styling
const styles = StyleSheet.create({
    container: {
        gap: 6,
    },
    avatarContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
    remainingCircle: {
        width: 48,
        height: 48,
        borderRadius: 24, // Adjusted for a circular shape
        backgroundColor: "#9F51FE",
        justifyContent: "center",
        alignItems: "center",
    },
});
