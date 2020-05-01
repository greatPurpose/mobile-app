import React from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  // ToastAndroid,
  StyleSheet,
  Image,
} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import commonStyles from '../theme/CommonStyles';
import LinkedInModal from 'react-native-linkedin';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import {google_sign_in} from "../Authentication/GoogleAuth";
import gql from "graphql-tag";

const getUser = gql`
    query getUsers ($user_id: String!){
        users (where: {user_id: {_eq: $user_id}}){
          user_id
          user_login
        }
    }
`;

export default class ExternalLoginScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props)

    this.state = {
      auth_type: ''
    }
  }

  async componentDidMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      forceConsentPrompt: true,
      // accountName: 'ApHidByte', // [Android] specifies an account name on the device that should be used
    });
  }

  gotoLogin = () => {
    this.props.navigation.navigate('Login')
  };

  gotoback = () => {
    this.props.navigation.navigate('OptionType')
  };

  gotToInviteFriend = () => {
    this.props.navigation.navigate('InviteFriend');
  };

  logInWithFB = async () => {
    // Create a graph request asking for user information with a callback to handle the response.

    LoginManager.logInWithPermissions(["public_profile"]).then(
      function (result) {
        if (result.isCancelled) {
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              new GraphRequestManager().addRequest(
                new GraphRequest(
                  '/me',
                  { accessToken: data.accessToken },
                  (error, result) => {
                    if (error) {
                      console.log('Error fetching data: ' + error.toString());
                    } else {
                      console.log('Success fetching data: ' + JSON.stringify(result));
                      AsyncStorage.setItem('UserData', JSON.stringify(result));
                      AsyncStorage.setItem('LoginWith', 'facebook');
                      this.gotToInviteFriend();
                    }
                  },
                )).start();
            }
          )
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    );
  };

  loginWithGoogle = async () => {
    await google_sign_in()
      .then(user => {
        // this.props.client.query({
        //   query: getUser,
        //   variables: {
        //     user_id: user.uid
        //   }
        // });
      })
      .catch(
      error => {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
          console.log('user cancelled the login flow')
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
          console.log('')
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
          console.log('play services not available or outdated')
        } else {
          // some other error happened
          console.log(`some other error occurred: ${error}`)
        }
      }
    );
  };

  loginWithOre = async () => {
    this.props.navigation.navigate('OreLogin')
  };

  renderLinkedInBtn = () => {
    return (
        <View style={[styles.btn, styles.linkedin]}>
          <TouchableOpacity onPress={() => this.modal.open()}>
            <Text style={[styles.btnTxt]}>Login LinkedIn</Text>
          </TouchableOpacity>
        </View>
    );
  };

  async getLinkedInUser({ access_token }) {
    try {
      const baseApi = 'https://api.linkedin.com/v2/me';

      const response = await fetch(`${baseApi}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + access_token,
        },
      });

      const payload = await response.json();
      console.log(payload);
      if (payload.id && payload.localizedFirstName) {
        await AsyncStorage.setItem("UserData", JSON.stringify(payload));
        this.props.navigation.navigate('InviteFriend');
      }
    }
    catch ({ message }) {
      console.log(message);
    }
    //this.setState({ ...payload, refreshing: false })
  }


  render() {
    return (
      <View style={{ flex: 1, }}>
        <ImageBackground source={require('../assets/bg.png')} style={commonStyles.bg_image} />
        <ScrollView contentContainerStyle={commonStyles.container}>
          <TouchableOpacity style={commonStyles.backbtn} onPress={this.gotoback}>
            <Image style={commonStyles.backbtn} source={require('../assets/backbtn.png')} />
          </TouchableOpacity>
          <View style={styles.logo}>
            <Image style={styles.logoImg} source={require('../assets/icon.png')} />
            <Text style={styles.logo_title}>LOGIN</Text>
          </View>
          <TouchableOpacity onPress={this.loginWithOre} style={{borderRadius: 9}}>
            <View style={[styles.btn, styles.Decentralized]}>
              <Text style={[styles.btnTxt]}>Login Decentralized</Text>
            </View>
          </TouchableOpacity>

          <View style={[styles.btn, styles.google]}>
            <TouchableOpacity onPress={this.loginWithGoogle}>
              <Text style={[styles.btnTxt]}>Login with Google</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.btn, styles.facebook]}>
            <TouchableOpacity onPress={this.logInWithFB}>
              <Text style={[styles.btnTxt]}>Login with Facebook</Text>
            </TouchableOpacity>
          </View>

          <LinkedInModal renderButton={this.renderLinkedInBtn}
            ref={ref => {
              this.modal = ref
            }}
            permissions={['r_liteprofile']}
            clientID="86nwv5kifqqn2r"
            clientSecret="3KLdSdJHsMmZI9lY"
            redirectUri="https://abyt.auth0.com/login/callback"
            onSuccess={token => this.getLinkedInUser(token)}
            onError={error => console.log(error)}
          />
          <View style={[styles.btn, styles.email]}>
            <TouchableOpacity onPress={this.gotoLogin}>
              <Text style={[styles.btnTxt, styles.emailTxt]}>Login with Email Address</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  existingUser: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  newUser: {
    marginTop: 0,
    paddingTop: 20,
  },
  title: {
    color: '#fff',
    marginBottom: 18,
  },
  btn: {
    borderRadius: 25,
    marginBottom: 15,
    paddingVertical: 20,
  },

  btnTxt: {
    color: '#fff',
    fontSize: 12,
    textAlign: "center",
  },

  login: {
    backgroundColor: '#1B9A6A',
  },
  Decentralized: {
    backgroundColor: '#3D18D5',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImg: {
    width: 75,
    height: 130,
    paddingBottom: 30,
  },
  logo_title: {
    marginTop: 18,
    color: '#FFFFFF',
    fontSize: 18,
    letterSpacing: 20,
    marginBottom: 50,
  },
  google: { backgroundColor: '#6B1F1E', },
  facebook: { backgroundColor: '#192348', },
  email: { backgroundColor: '#FFFFFF', },
  emailTxt: { color: '#474747', },
  linkedin: { backgroundColor: '#274397' },


});

