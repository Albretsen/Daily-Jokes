import React, { useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigationStack from './screens/AppNavigationStack';
import { initialize } from "./services/initialize";
import { Provider as ReduxProvider } from 'react-redux';
import { store } from "./state-management/reduxStore";
import { Toast } from "./components/misc/Toast";
import LoadingIndicatorGlobal from "./components/misc/LoadingIndicatorGlobal";

export default function App() {
    initialize();

    return (
        <ReduxProvider store={store}>
            <View style={styles.container}>
                <NavigationContainer>
                    <StatusBar style="auto" />
                    <AppNavigationStack />
                    <Toast />
                    <LoadingIndicatorGlobal />
                </NavigationContainer>
            </View>
        </ReduxProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});
