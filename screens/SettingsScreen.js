import React, {Component} from 'react';
import { ExpoConfigView } from '@expo/samples';
import {StyleSheet, View, Text, TouchableOpacity, GoogleSignin} from "react-native";
import BottomNav from "../components/BottomNav";
import {ScrollView} from "react-navigation";
import ExitSVG from "../assets/icons/exitIco";
import AsyncStorage from "@react-native-community/async-storage";
import {AccessToken, GraphRequest, GraphRequestManager, LoginManager} from "react-native-fbsdk";
import sign_out from "../Authentication/SignOut";

export default class SettingsScreen extends Component {
  static navigationOptions = {
    headerShown: false,
    visible: false,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _signOut = () => {
    sign_out();
  };

  _signOutAsync = async () => {
    const loginWith = await AsyncStorage.getItem("LoginWith");
    switch (loginWith) {
      case 'facebook':
        console.log("logged out");
        LoginManager.logOut();
        AccessToken.getCurrentAccessToken().then(
          (data)=>{
            let logout =
              new GraphRequest(
                "me/permissions/",
                {
                  accessToken: data.accessToken,
                  httpMethod: 'DELETE'
                },
                (error, result) => {
                  if (error) {
                    console.log('Error fetching data: ' + error.toString());
                  } else {
                    LoginManager.logOut();
                  }
                });
            new GraphRequestManager().addRequest(logout).start();
          }
        );
        break;
      case 'google':
        await GoogleSignin.signOut();
        break;
      default:
        break;
    }
    let allkeys = await AsyncStorage.getAllKeys();
    await AsyncStorage.removeItem('userToken');
    console.log(allkeys);
    this.props.navigation.navigate('OptionType');
  };

  render() {
    const { navigate } = this.props.navigation;
    const state = this.state;

    return (
      <View style={myStyles.coloredBackground}>
        <ScrollView>
          <View style={{height: '100%', width: '100%'}}>
            <View style={myStyles.viewBox}>
              <View style={myStyles.ninty}>
                <TouchableOpacity
                  activeOpacity={8.0}
                  onPress={this._signOut}>
                  <View style={[{flexDirection: 'row', width: '80%', marginTop: '10%', height: 28, paddingBottom: 22}]}>
                    <Text style={{color: '#fdfdfd', paddingRight: 10}} >Sign Out</Text>
                    <View style={{height: 22, width: 22}}>
                      <ExitSVG />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <BottomNav navigate={navigate} active={'settings'}/>
      </View>
    );
  }
}

const myStyles = StyleSheet.create({
  coloredBackground: {
    width: 'auto',
    height: '100%',
    backgroundColor: '#010101',
  },

  viewBox: {
    width: '100%',
    height: '80%',
    top: '10%',
    alignItems: 'center',
  },

  ninty: {
    alignItems: 'center',
    width: '90%',
  },
});
