import { createStackNavigator } from "@react-navigation/stack";
import HeaderOptions from "../components/header/HeaderOptions";
import Home from "./Home";
import Daily from "./Daily/Daily";
import Browse from "./Browse/Browse";
import Results from "./Results/Results";
import Profile from "./Profile";
import Notifications from "./Notifications";
import Store from "./Store";
import ViewProfile from "./ViewProfile";
import SignIn from "./SignIn";
import ContestResultChecker from "../components/misc/ContestResultChecker";
import { AdsWrapper } from "../services/ads";
import FirstSignIn from "./FirstSignIn";

export type StackParamsList = {
    Home: undefined;
    Daily: undefined;
    Browse: undefined;
    Results: undefined;
    Profile: undefined;
    Notifications: undefined;
    Store: undefined;
    User: undefined;
    "Sign in": undefined;
    "First sign in": undefined;
}

const Stack = createStackNavigator<StackParamsList>();

export default function AppNavigationStack() {

    return (
        <ContestResultChecker>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={({ navigation, route }) => HeaderOptions({ navigation, route })}
                />
                <Stack.Screen
                    name="Daily"
                    component={Daily}
                    options={({ navigation, route }) => HeaderOptions({ navigation, route })}
                />
                <Stack.Screen
                    name="Browse"
                    component={Browse}
                    options={({ navigation, route }) => HeaderOptions({ navigation, route })}
                />
                <Stack.Screen
                    name="Results"
                    component={Results}
                    options={({ navigation, route }) => HeaderOptions({ navigation, route })}
                />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={({ navigation, route }) => HeaderOptions({ navigation, route })}
                />
                {/* <Stack.Screen
                    name="Notifications"
                    component={Notifications}
                    options={({ navigation, route }) => HeaderOptions({ navigation, route })}
                /> */}
                <Stack.Screen
                    name="Store"
                    component={Store}
                    options={({ navigation, route }) => HeaderOptions({ navigation, route })}
                />
                <Stack.Screen
                    name="User"
                    component={ViewProfile}
                    options={({ navigation, route }) => HeaderOptions({ navigation, route })}
                />
                <Stack.Screen
                    name="Sign in"
                    component={SignIn}
                    options={({ navigation, route }) => HeaderOptions({ navigation, route })}
                />
                <Stack.Screen
                    name="First sign in"
                    component={FirstSignIn}
                    options={({ navigation, route }) => HeaderOptions({ navigation, route })}
                />
            </Stack.Navigator>
            <AdsWrapper />
        </ContestResultChecker>
    )
}