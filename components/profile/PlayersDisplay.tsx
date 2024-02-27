import { View, StyleSheet } from "react-native";
import Avatar from "./Avatar";
import Text from "../Text";
import { componentColors, colors } from "../Colors";

interface User {
    id: number;
    avatarId: number;
}
    
interface PlayersDisplayProps {
    users: User[];
}

export default function PlayersDisplay(props: PlayersDisplayProps) {
    const {users} = props;
    // If there are 5 players, display them, if there are more, display just 4
    const displayedUsers = users.slice(0, users.length == 5 ? 5 : 4);
    const remainingCount = users.length == 5 ? 0 : users.length - 4;

    // If no users are provided, return nothing
    if(users.length <= 0) return null;

    return (
        <View style={styles.container}>
            <Text color={colors.purple.dark}>Players</Text>
            <View style={styles.avatarContainer}>
            {displayedUsers.map((user) => (
                <Avatar key={user.id} id={user.avatarId} />
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
        gap: 10
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