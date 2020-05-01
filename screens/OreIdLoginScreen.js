import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, ScrollView
} from 'react-native';
import commonStyles from '../theme/CommonStyles';
import LoginWebView from '../components/OreLoginWebView';
import { OreId } from 'eos-auth';
// import * as ToastAndroid from "react-native/Libraries/Components/ToastAndroid/ToastAndroid.android";
let callbackUrl = 'https://callback.sampleapp.com';
//let callbackUrl = 'https://abyt.auth0.com/login/callback';
//intialize oreId
let oreId = new OreId({
  appId: "t_ad6c52eb7fd348dabb8e54529556fb3e",
  apiKey: "t_kd014546aab0b46f783cfc10ad79babd8",
  oreIdUrl: "https://service.oreid.io"
});

export default class OreIdLoginScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  gotoback = () => {
    this.props.navigation.navigate('ExternalLogin');
  };
  async handleLogin(provider) {
    //const navigation = this.props.navigation;
    // getOreIdAuthUrl returns a fully formed url that you can redirect a user's browser to to start the OAuth login flow
    let oreIdAuthUrl = await oreId.getOreIdAuthUrl({ provider, callbackUrl, backgroundColor: "3F7BC7" });
    //show login flow in webview
    this.setState({ oreIdAuthUrl, showLoginState: 'showWeb' });
    console.log(this.state);
  }
  async handleCompletedCallback(loginResults) {
    let { account } = loginResults;
    let userInfo = {};
    if (account) {
      userInfo = await oreId.getUserInfoFromApi(account);
      // ToastAndroid.showWithGravityAndOffset(
      //   'User Login Successfuly !!',
      //   ToastAndroid.LONG,
      //   ToastAndroid.BOTTOM,
      //   0,
      //   100
      // );
      await AsyncStorage.setItem("userToken", JSON.stringify(userInfo));
      this.props.navigation.navigate("CreateBot");
    }
    //this.setState({ userInfo, showLoginState: 'webComplete' });
  }
  renderLoginMenu() {
    return (

        <View style={{ flex: 1, }}>
          <ImageBackground source={require('../assets/bg.png')} style={commonStyles.bg_image}></ImageBackground>
          <ScrollView contentContainerStyle={styles.container}>
          <TouchableOpacity style={commonStyles.backicon} onPress={this.gotoback}>
            <Image style={commonStyles.backbtn} source={require('../assets/backbtn.png')} />
          </TouchableOpacity>
          <View style={styles.logo}>
            <Image style={styles.logoImg} source={require('../assets/icon.png')} />
          </View>
          <TouchableOpacity onPress={() => this.handleLogin('phone')}>
            <Text style={[styles.btn, styles.facebook]}>Log in with Phone Number</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleLogin('email')}>
            <Text style={[styles.btn, styles.github]}>Log in with Email</Text>
          </TouchableOpacity>
          </ScrollView>
        </View>

    );
  }

  renderLoginWebView() {
    let { oreIdAuthUrl } = this.state || {};
    return (
      <View style={{ flex: 1 }}>
        <LoginWebView
          completedCallback={(values) => {
            this.handleCompletedCallback(values);
          }}
          webviewUrl={oreIdAuthUrl}
          callbackUrl={callbackUrl}
          oreIdAuthUrl={oreIdAuthUrl}
        />
      </View>
    );
  }

  render() {
    let { showLoginState } = this.state || {};
    return (
      <View style={styles.page}>
        {(showLoginState === 'login' || !showLoginState) && this.renderLoginMenu()}
        {showLoginState === 'showWeb' && this.renderLoginWebView()}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignSelf: 'stretch'
  },
  logo: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 30,
  },
  logoImg: {
    width: 75,
    height: 130,
    marginBottom: 47,
  },
  btn: {
    borderRadius: 25,
    color: '#fff',
    fontSize: 12,
    textAlign: "center",
    marginBottom: 32,
    paddingVertical: 20,
  },
  google: {
    backgroundColor: '#6B1F1E',
  },
  facebook: {
    backgroundColor: '#192348',
  },
  linkedin: {
    backgroundColor: '#274397'
  },
  github: {
    backgroundColor: '#24292e'
  },
  kakao: {
    backgroundColor: '#000'
  },
  line: {
    backgroundColor: '#00b900'
  },
  twitch: {
    backgroundColor: '#6441a4'
  },


});
