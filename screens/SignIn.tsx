import ScreenView from "../components/layout/ScreenView";
import ContentBox from "../components/layout/ContentBox";
import SmallInputField from "../components/generalUI/SmallInputField";
import Button from "../components/buttons/Button";
import { View } from "react-native";
import { useState } from "react";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
                    <Button height={35} label="OK" variant="blue" />
                </View>
            </ContentBox>
        </ScreenView>
    )
}