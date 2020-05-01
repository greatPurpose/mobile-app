import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as commonFunctions from '../services/commonFunctions';
import ReactNative, {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput, KeyboardAvoidingView,
  TouchableOpacity, ScrollView,
  Image, // ToastAndroid,
  Platform, Event, Alert
} from 'react-native';
import commonStyles from '../theme/CommonStyles';
import { Mutation, Query, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import {registerEmail} from "../Authentication/EmailAuth";
import sign_in_anon from "../Authentication/AnonymusAuth";
import sign_out from "../Authentication/SignOut";
import auth from '@react-native-firebase/auth';
import LoadingOverlay from "../components/Loading";


const Sign_Up = gql`
  mutation (
    $first_name: String!,
    $last_name: String!,
    $user_email: String!,
    $user_registered: time!,
    $user_id : String!,
    $user_nicename: String!, 
    $phone_number : String!,
    ){
    insert_users (
      objects: [{
        first_name: $first_name,
        last_name: $last_name,
        user_email: $user_email,
        user_id : $user_id,
        user_registered: $user_registered,
        user_nicename: $user_nicename,
        phone_number: $phone_number,
      }]
    ){
      returning {
        user_id
      }
    }
  }
`;

const InsertUsersRecovery = gql`
mutation ($user_id: Int!){
    insert_users_recovery (
    objects: [{
      user_id: $user_id
    }]
  ){
    returning {
      id
    }
  }
}
`;

const checkEmail = gql`
  query checkUser ($user_email: String!){
      users (where: {user_email: {_eq: $user_email}}){
        id
    }
  }
`;
const checkUsername = gql`
  query checkUser ($user_nicename : String!){
      users (where: { user_nicename: {_eq: $user_nicename}}){
        id
    }
  }
`;

class SignUpScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      first_name: '',
      last_name: '',
      user_email: '',
      user_pass: '',
      user_confirmpass: '',
      user_nicename: '',
      phone_number: ''
    }
  }

  componentDidMount(): void {

  }

  clearFName = () => {
    this.setState({
      first_name: ''
    });
  };

  clearLName = () => {
    this.setState({
        last_name: ''
      });
  };

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

  clearPhone = () => {
    this.setState({
      phone_number: ''
    });
  };


  clearAll = () => {
    this.clearFName();
    this.clearLName();
    this.clearEmail();
    this.clearPass();
    this.clearPhone();
  };

  Invite = () => {
    this.props.navigation.navigate('InviteFriend')
  };

  gotoback = () => {
    this.props.navigation.navigate('OptionType')
  };

  submit = async () => {
    //sign_in_anon();
    if (!this.state.first_name || !this.state.last_name || !this.state.user_email || !this.state.user_pass || !this.state.user_nicename || !this.state.phone_number) {
      Alert.alert(
          'Error',
          'All fields are mandatory!',
      );
      return;
    }
    if (!commonFunctions.checkEmailValidation(this.state.user_email)) {
      Alert.alert(
          'Error',
          'please input valid email.',
      );
      this.clearEmail();
      return;
    }
    if (this.state.user_pass !== this.state.user_confirmpass) {
      Alert.alert(
          'Error',
          'Password and confirm password does not match!',
      );
      this.clearPass();
      return;
    }
    try {
      //sign_out();
      await registerEmail(this.state.user_email, this.state.user_pass)
          .catch( (error) => {

          })
          .then((user) => {
            try {
            // const user_id = auth()._user.uid;
            const user_id = user.uid;
            console.log('User ID exists: ' + user_id!==null);
            this.props.client.mutate({
              mutation: Sign_Up,
              variables: {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                user_email: this.state.user_email,
                user_id: user_id,
                user_registered: new Date().toLocaleTimeString(),
                user_nicename: this.state.user_nicename,
                phone_number: this.state.phone_number,
              }
            }).then(res => {
              console.log(res);
              this.props.client.mutate({
              mutation: InsertUsersRecovery,
              variables: {
                user_id: user_id
              }
            }).then(res1 => {
            });
            this.setState({
              first_name: '',
              last_name: '',
              user_email: '',
              user_pass: '',
              user_nicename: "",
              phone_number: "",
              user_confirmpass: ''
            });
            });} catch (error ){
                Alert.alert(
                          'Error',
                          'something went wrong please try again !!',
                      );
            //ToDo: Add to Logging for production
            //       this.props.navigation.navigate('Invite')
            //     }).catch(err => {
            //       // ToDo: Add logging for Production
            //       Alert.alert(
            //           'Error',
            //           'something went wrong please try again !!',
            //       );
            //       this.clearAll();
            //     });
            //     console.log(auth.user_id)
            }
          });
    } catch (ex) {
      Alert.alert(
          'Error',
          'something went wrong please try again !!\n' + {ex},
      );
      this.clearAll();
    }
  };

  checkEmailExists = () => {
    if (!this.state.user_email) {
      return;
    }
    if (!commonFunctions.checkEmailValidation(this.state.user_email)) {
      Alert.alert(
          'Error',
          'please input valid email.',
      );
      this.clearEmail();
      return;
    }
    this.props.client.query({
      query: checkEmail,
      variables: {
        user_email: this.state.user_email
      }
    }).then((data) => {
      console.log(data);
      if (data && data.data.users.length > 0) {
        this.setState({
          user_email: ""
        });
        Alert.alert(
            'Error',
            'Email already exists!!.',
        );
        this.clearEmail();
      }
    }, (error) => {
      // ToDo: safely Log Errors in Production
    })
  };

  checkUsernameExists = () => {
    if (!this.state.user_nicename) {
      return;
    }
    this.props.client.query({
      query: checkUsername,
      variables: {
        user_nicename: this.state.user_nicename
      }
    }).then((data) => {
      console.log(data);
      if (data && data.data.users.length > 0) {
        this.setState({
          user_nicename: ""
        });
        Alert.alert(
            'Error',
            'Username already exists!!.',
        )
      }
    }, (error) => {
      // ToDo: Logging
    })
  };

  render() {
    return (
      <View style={commonStyles.container}>
        <ImageBackground source={require('../assets/bg.png')} style={commonStyles.bg_image}/>
        <LoadingOverlay modalVisible={this.state.loading}/>
        <TouchableOpacity style={commonStyles.backicon} onPress={this.gotoback}>
          <Image style={commonStyles.backbtn} source={require('../assets/backbtn.png')} />
        </TouchableOpacity>
        <KeyboardAwareScrollView
          enableOnAndroid keyboardShouldPersistTaps="always"
          enableAutomaticScroll
          keyboardOpeningTime={0}
          extraHeight={Platform.select({ android: 0 })}>
          <View style={styles.signupform}>
            <TextInput style={styles.inputField} value={this.state.first_name} name="first_name" onChangeText={(text) => this.setState({ first_name: text })} placeholder="First Name" placeholderTextColor="#9D9E9C" />

            <TextInput style={styles.inputField} value={this.state.last_name} name="last_name" onChangeText={(text) => this.setState({ last_name: text })} placeholder="Last Name" placeholderTextColor="#9D9E9C" />
            <TextInput style={styles.inputField} value={this.state.user_nicename} onChangeText={(text) => this.setState({ user_nicename: text })} placeholder="Username" placeholderTextColor="#9D9E9C" onBlur={this.checkUsernameExists} />
            <TextInput style={styles.inputField} value={this.state.user_email} name="user_email" onChangeText={(text) => this.setState({ user_email: text })} placeholder="Email Address" placeholderTextColor="#9D9E9C" keyboardType='email-address' autoCapitalize='none' onBlur={this.checkEmailExists} />
            <TextInput style={styles.inputField} value={this.state.phone_number} onChangeText={(text) => this.setState({ phone_number: text })} placeholder="Phone Number" placeholderTextColor="#9D9E9C" keyboardType="numeric" maxLength={10} />
            <TextInput style={styles.inputField} value={this.state.user_pass} name="user_pass" onChangeText={(text) => this.setState({ user_pass: text })} placeholder="Password" placeholderTextColor="#9D9E9C" secureTextEntry={true} />

            <TextInput style={styles.inputField} value={this.state.user_confirmpass} onChangeText={(text) => this.setState({ user_confirmpass: text })} placeholder="Verify Password" placeholderTextColor="#9D9E9C" secureTextEntry={true} />
          </View>

          <View style={commonStyles.contbtn}>
            <TouchableOpacity onPress={this.submit}><Text style={commonStyles.contbtntxt} >Continue</Text></TouchableOpacity>
          </View>

        </KeyboardAwareScrollView>

      </View>
    )
  }
}
export default withApollo(SignUpScreen);
const styles = StyleSheet.create({
  signupform: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginTop: 40,
  },
  inputField: {
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    color: '#fff',
  },

});
