import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { TabBar } from "./TabBar";
import TwoFAScreen from "../screens/TwoFAScreen";
import PhoneAuthScreen from "../screens/PhoneAuthScreen";
import InviteFriendsScreen from "../screens/InviteFriendsScreen";
import CreateBotScreen from "../screens/CreateBotScreen";
import OptionTypeScreen from "../screens/OptionTypeScreen";
import LoginScreen from "../screens/LoginScreen";
import ExternalLoginScreen from "../screens/ExternalLoginScreen";
import SignUpScreen from '../screens/SingupScreen';
import ForgotPswdScreen from "../screens/ForgotPswdScreen";
import OreIdLoginScreen from "../screens/OreIdLoginScreen";


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const LoginStack = createStackNavigator(
  {
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

LoginStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarVisible: false,
};

LoginStack.path = '';

const tabNavigator = createBottomTabNavigator(
  {
      LoginStack: LoginStack,
}
);

tabNavigator.path = '';

export default tabNavigator;
