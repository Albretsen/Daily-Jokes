import ScreenView from "../components/layout/ScreenView";
import ContentBox from "../components/layout/ContentBox";
import SmallInputField from "../components/generalUI/SmallInputField";
import Button from "../components/buttons/Button";
import { View } from "react-native";
import { useState } from "react";
import { login } from "../services/auth";
import NavigationService from "../services/navigation";
import { showToast } from "../state-management/toast";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
        try {
            await login(email, password);

            NavigationService.navigate("Home");
        } catch {
            showToast("Wrong email or passord.");
        }
    }

    return (
        <ScreenView scrollView={false}>
            <ContentBox title="Sign in">
                <View style={{
                    gap: 10
                }}>
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
                        textContentType="password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        style={{ width: "80%" }}
                    />
                    <Button height={35} label="OK" variant="blue" onPress={signIn}/>
                </View>
            </ContentBox>
        </ScreenView>
    )
}