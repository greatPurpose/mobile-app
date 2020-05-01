import React from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Image,
  Dimensions,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import commonStyles from '../theme/CommonStyles';
import { GoogleSignin, statusCodes } from  '@react-native-community/google-signin';
import LinkedInModal from 'react-native-linkedin';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import {google_sign_in} from "../Authentication/GoogleAuth";

const checkUserExists = gql`
  query checkUser ($user_email: String!){
      users (where: {user_email: {_eq: $user_email}}){
        id
        user_email
        user_nicename
        last_name
        first_name
    }
  }
`;
const HEIGHT = Dimensions.get('window').height;
const Sign_Up = gql`
  mutation ($first_name: String!,
    $last_name: String!,
    $user_email: String!,
    $user_registered: time!,
    $user_pass : String!,
    $user_nicename: String!
    $user_login : String!){
    insert_users (
      objects: [{
        first_name: $first_name,
        last_name: $last_name,
        user_email: $user_email,
        user_pass : $user_pass,
        user_registered: $user_registered,
        user_nicename: $user_nicename,
        user_login: $user_login
      }]
    ){
      returning {
        id
      }
    }
  }
`;

class OptionTypeScreen extends React.Component {

  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.modal;
  }

  handleBackButton = () => {
    BackHandler.exitApp();
  };

  async componentDidMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      forceConsentPrompt: true,
      // accountName: 'ApHidByte', // [Android] specifies an account name on the device that should be used
    });
  }

  gotoLogin = () => {
    this.props.navigation.navigate('ExternalLogin')
  };
  gotoSignUp = () => {
    this.props.navigation.navigate('SignUp')
  };
  goToMyBot = () => {
    this.props.navigation.navigate('MyBot')
  };
  logInWithFB = async () => {
    // Create a graph request asking for user information with a callback to handle the response.
    const gotToHomeScreen = () => {
      this.props.navigation.navigate('InviteFriend');
    };
    // LoginManager.setLoginBehavior('web_only');
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      function (result) {
        if (result.isCancelled) {
          console.log("cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              console.log(data);
              new GraphRequestManager().addRequest(
                new GraphRequest(
                  `/${data.userID}`,
                  { accessToken: data.accessToken },
                  (error, result) => {
                    if (error) {
                      console.log('Error fetching data: ' + error.toString());
                    } else {
                      console.log('Success fetching data: ' + JSON.stringify(result));
                      AsyncStorage.setItem('UserData', JSON.stringify(result));
                      AsyncStorage.setItem('LoginWith', "facebook");
                      gotToHomeScreen();
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
    await google_sign_in(this.props.client).catch(
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
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();
    //   console.log(userInfo);
    //   if (userInfo && userInfo.user) {
    //     console.log(userInfo.user);
    //     this.props.client.mutate({
    //       mutation: Sign_Up,
    //       variables: {
    //         first_name: userInfo.user.givenName,
    //         last_name: userInfo.user.familyName,
    //         user_email: userInfo.user.email,
    //         user_pass: '',
    //         user_login: 'google',
    //         user_registered: new Date().toLocaleTimeString(),
    //         user_nicename: userInfo.user.email
    //       }
    //     }).then(res => {
    //       // ToastAndroid.showWithGravityAndOffset(
    //       //   'User Added Successfully.',
    //       //   ToastAndroid.LONG,
    //       //   ToastAndroid.BOTTOM,
    //       //   0,
    //       //   100
    //       // );
    //       AsyncStorage.setItem('UserData', JSON.stringify(userInfo));
    //       AsyncStorage.setItem('LoginWith', 'google');
    //       this.props.navigation.navigate('InviteFriend');
    //     }).catch(err => {
    //       console.error(err)
    //       // ToastAndroid.showWithGravityAndOffset(
    //       //   'something went wrong please try again !!',
    //       //   ToastAndroid.LONG,
    //       //   ToastAndroid.BOTTOM,
    //       //   0,
    //       //   100
    //       // );
    //     })
    //   }
    //
    // } catch (error) {
    //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //     // user cancelled the login flow
    //   } else if (error.code === statusCodes.IN_PROGRESS) {
    //     // operation (e.g. sign in) is in progress already
    //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //     // play services not available or outdated
    //   } else {
    //     // some other error happened
    //   }
    // }
  };

  loginWithOre = async () => {
    this.props.navigation.navigate('OreLogin')
  };

  renderLinkedInBtn = () => {
    return (
        <View style={[styles.btn, styles.linkedin]}>
          <TouchableOpacity onPress={() => this.modal.open()}>
            <Text style={[styles.btnTxt]}>Sign up with LinkedIn</Text>
          </TouchableOpacity>
        </View>
    );
  };

  async loggedIn() {
    let log = await this._getUser();
    if (log) {
      this.goToMyBot()
    }
  };

  _getUser = async () => {
    const CurrUser = await AsyncStorage.getItem('userToken');
    if (CurrUser !== null) {
      console.log("Current User: " + JSON.parse(CurrUser));
      return await JSON.parse(CurrUser)
    }
    return null
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
        // ToastAndroid.showWithGravityAndOffset(
        //   'Login with LinkedIn Successfully',
        //   ToastAndroid.LONG,
        //   ToastAndroid.BOTTOM,
        //   0,
        //   100
        // );
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
    this.loggedIn().then(r => {});
    return (
      <View style={{ flex: 1, }}>
        <ImageBackground source={require('../assets/bg.png')} style={commonStyles.bg_image}/>

        <ScrollView contentContainerStyle={styles.container}>

          <View style={styles.logo}>
            <Image style={styles.logoImg} source={require('../assets/icon.png')} />
          </View>
          <View style={styles.existingUser}>
            <Text style={styles.title}>
              Existing Members
                </Text>
            <TouchableOpacity onPress={this.gotoLogin}>
              <View style={[styles.btn, styles.login]}>
                  <Text style={[styles.btnTxt, {width: '100%'}]}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.newUser}>
            <Text style={styles.title}>
              New Members
                </Text>
            <TouchableOpacity onPress={this.loginWithOre} style={{borderRadius: 9}}>
              <View style={[styles.btn, styles.Decentralized]}>
                <Text style={[styles.btnTxt]}>Sign Up with Decentralized</Text>
              </View>
            </TouchableOpacity>

            <View style={[styles.btn, styles.google]}>
              <TouchableOpacity onPress={this.loginWithGoogle}>
                <Text style={[styles.btnTxt]}>Sign Up with Google</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.btn, styles.facebook]}>
              <TouchableOpacity onPress={this.logInWithFB}>
                <Text style={[styles.btnTxt]}>Sign Up with Facebook</Text>
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
              <TouchableOpacity onPress={this.gotoSignUp}>
                <Text style={[styles.btnTxt, styles.emailTxt]}>Sign up with Email Address</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </View>
    );
  }
}

export default withApollo(OptionTypeScreen);
const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  existingUser: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  logo: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  logoImg: {
    width: 75,
    height: 130,
    paddingBottom: 30,
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
  google: { backgroundColor: '#6B1F1E', },
  facebook: { backgroundColor: '#192348', },
  email: { backgroundColor: '#FFFFFF', },
  emailTxt: { color: '#474747', },
  linkedin: { backgroundColor: '#274397' }

});
