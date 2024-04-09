import ContentBox from "../layout/ContentBox";
import Button from "../buttons/Button";
import SmallInputField from "../generalUI/SmallInputField";
import { ScrollView } from 'react-native-gesture-handler';
import { View } from "react-native";
import { useEffect, useState } from "react";
import { update, updatePassword, loginWithToken } from "../../services/auth";
import { UserDataManager } from "../../services/userDataManager";
import { showToast } from "../../state-management/toast";

export default function EditAccount() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const setUserDetails = async () => {
            const userDetails = await UserDataManager.getUserDetails();
            setUsername(userDetails.name);
            if (!userDetails.email.includes('@dailyjokes.app')) {
                setEmail(userDetails.email);
            }
        }
        setUserDetails();
    }, [])

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const onSubmit = async () => {
        try {
            if (password) {
                await updatePassword(password);
            }

            let userData = {};
            if (username) userData.name = username;

            // Check if email is not empty and valid before adding to userData
            if (email && !isValidEmail(email)) {
                showToast("Please enter a valid email address.");
                return; // Exit the function to prevent updating with invalid email
            } else if (email) {
                userData.email = email;
            }

            await update(userData);
            showToast("Account details updated.");
            loginWithToken(await UserDataManager.getToken());
        } catch {
            showToast("Problem updating account details.");
        }
    }

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
            <ContentBox title="Account details">
                <View style={{
                    gap: 10
                }}>
                    <SmallInputField
                        label="Username"
                        inputMode="text"
                        keyboardType="default"
                        textContentType="username"
                        value={username}
                        onChangeText={setUsername}
                        style={{ width: "80%" }}
                    />
                    <SmallInputField
                        label="Email"
                        inputMode="email"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        value={email}
                        onChangeText={setEmail}
                        style={{ width: "80%" }}
                    />
                    <SmallInputField
                        label="Password"
                        inputMode="text"
                        textContentType="newPassword"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        style={{ width: "80%" }}
                    />
                    <Button height={35} label="OK" variant="blue" onPress={onSubmit}/>
                </View>
            </ContentBox>
        </ScrollView>
    )
}