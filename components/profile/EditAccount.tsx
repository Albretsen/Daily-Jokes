import ContentBox from "../layout/ContentBox";
import Button from "../buttons/Button";
import SmallInputField from "../generalUI/SmallInputField";
import { ScrollView } from 'react-native-gesture-handler';
import { View } from "react-native";
import { useState } from "react";

export default function EditAccount() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                    <Button height={35} label="OK" variant="blue" />
                </View>
            </ContentBox>
        </ScrollView>
    )
}