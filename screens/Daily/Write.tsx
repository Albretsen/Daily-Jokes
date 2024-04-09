import React, { useRef, useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Keyboard } from "react-native";
import ContentBox from "../../components/layout/ContentBox";
import InputField from "../../components/generalUI/InputField";
import Button from "../../components/buttons/Button";
import MascotTip from "../../components/misc/MascotTip";
import { create as uploadJoke } from "../../services/joke";
import JokesLeftIndicator from "../../components/misc/JokesLeftIndicator";
import { colors } from '../../components/misc/Colors';
import ActiveTabContext from '../../context/ActiveTabContext';
import { SCREEN_HEIGHT } from '../../components/layout/ScreenView';

export default function Write() {
    const { activeTab } = useContext(ActiveTabContext);
    const [inputValue, setInputValue] = useState('');
    const jokesLeftIndicatorRef = useRef<{ refreshIndicator: () => void }>(null);

    useEffect(() => {
        if (activeTab === 0) {
            jokesLeftIndicatorRef.current?.refreshIndicator();
        }
    }, [activeTab]);

    let submitJoke = async () => {
        let result = await uploadJoke(inputValue);

        setInputValue('');

        jokesLeftIndicatorRef.current?.refreshIndicator();
    }

    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
            setKeyboardHeight(e.endCoordinates.height);
            setKeyboardVisible(true);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
            setKeyboardHeight(0);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };

    }, []);

    return (
        <View style={[
            styles.container,
            {
                // paddingBottom: keyboardHeight,
                // maxHeight: SCREEN_HEIGHT - keyboardHeight,
                justifyContent: keyboardVisible ? "flex-start" : "center",
                paddingTop: 20,
            }
        ]}>
            <ContentBox title="Write" style={{ maxHeight: SCREEN_HEIGHT - 100 }} headerColor={colors.yellow.dark}>
                <InputField
                    style={{ maxHeight: SCREEN_HEIGHT - (350) }}
                    placeholder="Write your joke here..."
                    value={inputValue}
                    onChangeText={setInputValue}
                />
                <View style={{ alignItems: "center" }}>
                    <Button variant="submit" shadowHeight={8} fontSize={16} width={100} height={28} onPress={submitJoke} label="Sumbit" />
                </View>
            </ContentBox>
            <JokesLeftIndicator ref={jokesLeftIndicatorRef} />
            {/* <MascotTip /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        justifyContent: "center",
    }
})