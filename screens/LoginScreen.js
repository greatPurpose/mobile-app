import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Header,
  ScrollView,
  Platform, Alert,
} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import base64 from 'react-native-base64';
import commonStyles from '../theme/CommonStyles';
import { withApollo } from "react-apollo";
import gql from 'graphql-tag';
import LoadingOverlay from "../components/Loading";
import Video from "react-native-video";
import { sign_in_email } from "../Authentication/EmailAuth";

const getUser = gql`
  query checkUser ($user_id: String!){
      users (where: {user_id: {_eq: $user_id}}){
        user_id
        user_email
        user_nicename
        last_name
        first_name
    }
  }
`;


class LoginScreen extends React.Component {

  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      // ToDo: For testing needs to be replaced with empty strings
      user_email: 'test@test.org',
      user_pass: 'Password1',
      showError: false,
      msg: "",
      loading: false,
    }
  }

  clearEmail = () => {
    this.setState({
      user_email: ''
    });
  };

  clearPass = () => {
    this.setState({
      user_pass: ''
    });
  };

  clearAll = () => {
    this.clearEmail();
    this.clearPass();
  };

  gotoback = () => {
    this.props.navigation.navigate('ExternalLogin')
  };

  forgotScreen = () => {
    this.props.navigation.navigate('forgotPswd')
  };

  _storeData = async (data) => {
    try {
      await AsyncStorage.setItem('userToken', JSON.stringify(data.data.users[0]));
    } catch (error) {
      alert(
        'Error',
        error
      )
      // saving error
    }
  };

  _setLoading(visible) {
    this.setState({loading: visible});
  }

  login = async () => {
    if (!this.state.user_email || !this.state.user_pass) {
      // Alert(
      //     'Error',
      //     'please provide email/password.',
      // );
      this.setState({
        showError: true,
        msg: 'Please provide email/password.',
        loading: false
      });
      this.clearAll();
      return;
    }
    console.log('Login start');
    this._setLoading(true);
    await sign_in_email(this.state.user_email , this.state.user_pass)
        .catch(
            (error) => {console.log(error)}
            ).then((user) => {
            this.props.client.query({
              query: getUser,
              variables: {
                user_id: user.uid
            }
            }).then((data) => {
              if (data && data.data.users.length > 0) {
                // alert(
                //     'Info',
                //     'Login Successfully',
                // );
                // Preform Async Storage request with a return
                this._setLoading(false);
                // this._storeData(data).then(r => {this.props.navigation.navigate('Invite')});
              } else {
                // alert(
                //     'Info',
                //     'The username, email or password you entered do not match our records.',
                // );
                // this._setLoading(false);
                this.setState({
                  showError: true,
                  msg: "The username, email or password you entered do not match our records.",
                  loading: false
                })
              }
            }, (error) => {
              // this._setLoading(false);
              // alert(
              //     'Info',
              //     'error occurred !! please try again.',
              // );
              console.error('login error: ' + error);
              this.setState({
                showError: true,
                msg: "The username, email or password you entered do not match our records.",
                loading: false
              });
              this.clearAll()
            })
    });
  };
  render() {
    return (
      <View style={[commonStyles.container, {}]}>
        <ImageBackground source={require('../assets/bg.png')} style={commonStyles.bg_image} />
        <LoadingOverlay modalVisible={this.state.loading}/>
        <TouchableOpacity style={commonStyles.backicon} onPress={this.gotoback}>
          <Image style={commonStyles.backbtn} source={require('../assets/backbtn.png')} />
        </TouchableOpacity>
        <View style={styles.logo}>
          <Image style={styles.logoImg} source={require('../assets/icon.png')} />
          <Text style={styles.logo_title}>LOGIN</Text>
        </View>
        {this.state.showError && <Text style={commonStyles.error}>{this.state.msg}</Text>}
        <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={40}>
          <View style={styles.loginForm}>
            <TextInput style={styles.inputField} onKeyPress={() => { this.setState({ showError: false }) }} placeholder="Email" value={this.state.user_email} name="user_email" onChangeText={(text) => this.setState({ user_email: text })} placeholderTextColor="#9D9E9C" keyboardType='email-address' autoCapitalize='none' />
            <TextInput style={styles.inputField} onKeyPress={() => { this.setState({ showError: false }) }} placeholder="Password" value={this.state.user_pass} name="user_pass" onChangeText={(text) => this.setState({ user_pass: text })} placeholderTextColor="#9D9E9C" secureTextEntry={true} />
            <View style={styles.loginBtn}>
              <TouchableOpacity onPress={this.login}>
                <View style={[styles.btn, styles.login, {width: 140}]}>
                  <Text style={[styles.btnTxt, {width: '100%'}]}>></Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.loginFooter}>
            <TouchableOpacity onPress={this.forgotScreen}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default withApollo(LoginScreen);

const styles = StyleSheet.create({
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImg: {
    width: 74,
    height: 130,
    paddingBottom: 30,
  },
  logo_title: {
    marginTop: 18,
    color: '#FFFFFF',
    fontSize: 24,
    letterSpacing: 20,
    marginBottom: 75,
  },
  loginForm: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  inputField: {
    color: '#fff',
    marginBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    paddingVertical: 5
  },
  loginBtn: {
    alignItems: 'flex-end',
  },
  loginFooter: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30
  },
  forgotText: {
    color: '#27B4FF',
    fontSize: 18,
    letterSpacing: 3,
    textTransform: 'uppercase'
  },
  btn: {
    borderRadius: 25,
    marginBottom: 15,
    paddingVertical: 12,
  },
  btnTxt: {
    color: '#4A90E2',
    fontSize: 28,
    textAlign: "center",
  },
  login: {
    backgroundColor: '#D8D8D8',
  },

});
