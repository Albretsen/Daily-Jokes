import ScreenView from "../components/layout/ScreenView";
import ContentBox from "../components/layout/ContentBox";
import SmallInputField from "../components/generalUI/SmallInputField";
import Button from "../components/buttons/Button";
import { View } from "react-native";
import { useEffect, useState } from "react";
import Text from "../components/generalUI/Text";
import { update, updatePassword } from "../services/auth";
import NavigationService from "../services/navigation";
import { showToast } from "../state-management/toast";
import { UserDataManager } from "../services/userDataManager";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function FirstSignIn() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [name, setName] = useState(null);

    const [nameHint, setNameHint] = useState("");

    useEffect(() => {
        const getUserDetails = async () => {
            let userDetails = await UserDataManager.getUserDetails();
            if (userDetails.name) setNameHint(userDetails.name);
        };
        getUserDetails();
    }, []);

    const createAccount = async () => {
        try {
            const updateData = {};
            if (name) updateData.name = name;
            if (email) updateData.email = email;

            if (Object.keys(updateData).length !== 0) {
                let result = await update(updateData);
                console.log(result);
                if (!result.success) {
                    showToast(result.error);
                    return;
                }
            }

            if (password) await updatePassword(password);

            NavigationService.navigate("Home");
        } catch {
            showToast("Error editing account details.");
        }
    };

    const navigateToSignIn = () => {
        NavigationService.navigate("Sign in");
    };

    return (
        <ScreenView scrollView={false}>
            <ContentBox title="Create account">
                <View style={{
                    gap: 10
                }}>
                    <Text style={{ color: '#007AFF', fontSize: 16 }}>
                        Welcome to Daily Jokes! Here's your free account!
                    </Text>
                    <SmallInputField
                        label="Username (required)"
                        placeholder={nameHint}
                        inputMode="text"
                        textContentType="name"
                        value={name}
                        onChangeText={setName}
                        style={{ width: "80%" }}
                    />
                    <SmallInputField
                        label="Email (optional)"
                        inputMode="email"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        value={email}
                        onChangeText={setEmail}
                        style={{ width: "80%" }}
                    />
                    <SmallInputField
                        label="Password (optional)"
                        inputMode="text"
                        textContentType="password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        style={{ width: "80%" }}
                    />
                    <Button height={35} label="OK" variant="blue" onPress={createAccount} />
                    {/* Add a button for users to navigate to the Sign In screen if they already have an account */}
                    <TouchableOpacity onPress={navigateToSignIn} style={{ marginTop: 10 }}>
                        <Text style={{ color: '#007AFF', fontSize: 16 }}>
                            Already have an account? Sign In
                        </Text>
                    </TouchableOpacity>
                </View>
            </ContentBox>
        </ScreenView>
    );
}