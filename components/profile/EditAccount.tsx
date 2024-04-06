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
            setEmail(userDetails.email);
        }
        setUserDetails();
    },[])

    const onSubmit = async () => {
        try {
            if (password) {
                await updatePassword(password);
            }

            let userData = {};
            if (username) userData.name = username;
            if (email) userData.email = email;
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
                        label="Username (optional)"
                        inputMode="text"
                        keyboardType="default"
                        textContentType="username"
                        value={username}
                        onChangeText={setUsername}
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