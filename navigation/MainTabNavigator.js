import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { TabBar } from "./TabBar";
import TwoFAScreen from "../screens/TwoFAScreen";
import MyBotScreen from "../screens/MyBotScreen";
import PhoneAuthScreen from "../screens/PhoneAuthScreen";
import InviteFriendsScreen from "../screens/InviteFriendsScreen";
import WalletScreen from "../screens/WalletScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ShiftPreferenceScreen from "../screens/ShiftPreferenceScreen";
import ColonyScreen from "../screens/ColonyScreen";
import TrackerScreen from "../screens/TrackerScreen";
import AdvancedTrackerScreen from "../screens/AdvancedTrackerScreen";
import CreateBotScreen from "../screens/CreateBotScreen";
import WalletWithdrawScreen from "../screens/WalletWithdrawScreen";
import SendCryptoScreen from "../screens/SendCryptoScreen";
import OptionTypeScreen from "../screens/OptionTypeScreen";
import LoginScreen from "../screens/LoginScreen";
import ExternalLoginScreen from "../screens/ExternalLoginScreen";
import SignUpScreen from '../screens/SingupScreen';
import ForgotPswdScreen from "../screens/ForgotPswdScreen";
import OreIdLoginScreen from "../screens/OreIdLoginScreen";
import AboutScreen from "../screens/AboutScreen";
import CloneManageScreen from "../screens/ManageBotScreen";


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    About: AboutScreen,
    OptionType: OptionTypeScreen,
    Login: LoginScreen,
    ExternalLogin: ExternalLoginScreen,
    SignUp: SignUpScreen,
    TwoFA: TwoFAScreen,
    forgotPswd : ForgotPswdScreen,
    OreLogin : OreIdLoginScreen,
    PhoneAuth: PhoneAuthScreen,
    Invite: InviteFriendsScreen,
    CreateBot: CreateBotScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarVisible: false,
};

HomeStack.path = '';

const MainStack = createStackNavigator(
  {
    MyBot: MyBotScreen,
    Wallet: WalletScreen,
    Profile: ProfileScreen,
    Colony: ColonyScreen,
  },
  config
);

MainStack.navigationOptions = {
  tabBarLabel: 'Main',
  tabBarVisible: false,
};

MainStack.path = '';

const ShiftStack = createStackNavigator(
  {
    ShiftPreference: ShiftPreferenceScreen,
  },
  config
);

ShiftStack.navigationOptions = {
  tabBarLabel: 'Bot',
  tabBarVisible: false,
};

ShiftStack.path = '';

const TrackerStack = createStackNavigator(
  {
    Tracker: TrackerScreen,
    AdvancedTracker: AdvancedTrackerScreen,
  },
  config
);

TrackerStack.navigationOptions = {
  tabBarLabel: 'Tracker',
  tabBarVisible: false,
};

TrackerStack.path = '';

const aCloneStack = createStackNavigator(
  {
    aClone: CloneManageScreen,
  },
  config
);

aCloneStack.navigationOptions = {
  tabBarVisible: false,
  tabBarLabel: 'aClone',
};
aCloneStack.path = '';

const WalletStack = createStackNavigator(
  {
    Withdraw: WalletWithdrawScreen,
    SendCrypto: SendCryptoScreen,
  },
  config
);

WalletStack.navigationOptions = {
  tabBarLabel: 'Wallet',
  tabBarVisible: false,
};

WalletStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarVisible: false,
  // tabBarIcon: ({ focused }) => (
  //   <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  // ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator(
  {
    MainStack,
    ShiftStack,
    TrackerStack,
    aCloneStack,
    SettingsStack,
}
);

tabNavigator.path = '';

export default tabNavigator;
