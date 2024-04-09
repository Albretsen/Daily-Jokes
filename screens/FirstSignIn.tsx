import ScreenView from "../components/layout/ScreenView";
import ContentBox from "../components/layout/ContentBox";
import SmallInputField from "../components/generalUI/SmallInputField";
import Button from "../components/buttons/Button";
import { View } from "react-native";
import { useEffect, useState } from "react";
import { update , updatePassword} from "../services/auth";
import NavigationService from "../services/navigation";
import { showToast } from "../state-management/toast";
import { UserDataManager } from "../services/userDataManager";

export default function FirstSignIn() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [name, setName] = useState(null);

    const [nameHint, setNameHint] = useState("");

    useEffect(() => {
        const getUserDetails = async () => {
            let userDetails = await UserDataManager.getUserDetails();
            if (userDetails.name) setNameHint(userDetails.name);
            console.log("Setting to: " + userDetails.name);
        }
        getUserDetails();
    })

    const createAccount = async () => {
        try {
            const updateData = {};
            if (name) updateData.name = name;
            if (email) updateData.email = email;
    
            if (Object.keys(updateData).length !== 0) {
                let result = await update(updateData);
                console.log(result);
                if (!result.success) {
                    if (result == false) {
                        showToast(result.error);
                        return;
                    }
                }
            }

            if (password) await updatePassword(password);  

            NavigationService.navigate("Home");
        } catch {
            showToast("Error editing account details.");
        }
    }

    return (
        <ScreenView scrollView={false}>
            <ContentBox title="Create account">
                <View style={{
                    gap: 10
                }}>
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
                    <Button height={35} label="OK" variant="blue" onPress={createAccount}/>
                </View>
            </ContentBox>
        </ScreenView>
    )
}