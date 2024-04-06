import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigationStack from './screens/AppNavigationStack';
import { initialize } from "./services/initialize";
import { Provider as ReduxProvider } from 'react-redux';
import { store } from "./state-management/reduxStore";
import { Toast } from "./components/misc/Toast";
import LoadingIndicatorGlobal from "./components/misc/LoadingIndicatorGlobal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import GoToStoreModal from './components/misc/GoToStoreModal';
import { navigationRef } from './services/navigation';

export default function App() {
    initialize();

    return (
        <ReduxProvider store={store}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <NavigationContainer ref={navigationRef}>
                    <BottomSheetModalProvider>
                        <StatusBar style="auto" />
                        <AppNavigationStack />
                        <Toast />
                        <LoadingIndicatorGlobal />
                        <GoToStoreModal />
                    </BottomSheetModalProvider>
                </NavigationContainer>
            </GestureHandlerRootView>
        </ReduxProvider>
    );
}
