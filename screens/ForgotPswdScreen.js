import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ImageBackground,
    // ToastAndroid,
    Image,
    KeyboardAvoidingView,
    Header,
    ScrollView,
    Platform,
} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
// import AsyncStorage from '@react-native-community/async-storage';
import base64 from 'react-native-base64';
import commonStyles from '../theme/CommonStyles';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

const getUser = gql`
  query checkUser ($phone_number: String!){
      users (where: {phone_number: {_eq: $phone_number}}){
        id
    }
  }
`;
const updateResetKey = gql`
  mutation ($id: Int!,
    $reset_key: String!){
        update_users_recovery (
        where: {id: {_eq: $id}}, _set: {reset_key: $reset_key}
    ){
        returning{
            id
        }
    }
  }
`;
const updatePswd = gql`
  mutation ($id: Int!,
    $user_pass: String!){
        update_users (
        where: {id: {_eq: $id}}, _set: {user_pass: $user_pass}
    ){
        returning{
            id
        }
    }
  }
`;


class ForgotPswdScreen extends React.Component {


    static navigationOptions = {
    headerShown: false,
    };
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            user_pass: '',
            confirm_user_pass: '',
            user_id: "",
            reset_key: "",
            input_key: "",
            showError: false,
            verify_status: "unverified",
            msg: ""
        }
    }

    gotoback = () => {
        this.props.navigation.navigate('Login')
    }

    verifyNumber = () => {
        if (!this.state.phone) {
            this.setState({ showError: true, msg: 'please fill your number' });
            return;
        }
        console.log(this.state.phone);

        this.props.client.query({
            query: getUser,
            variables: {
                phone_number: this.state.phone
            }
        }).then((data) => {
            console.log(data);
            if (data && data.data.users.length > 0) {
                try {
                    this.setState({ reset_key: Math.floor(100000 + Math.random() * 900000), user_id: data.data.users[0].id });
                    console.log(this.state);
                    this.props.client.mutate({
                        mutation: updateResetKey,
                        variables: {
                            id: this.state.user_id,
                            reset_key: this.state.reset_key.toString()
                        }
                    }).then(res => {
                        console.log(res);
                        this.setState({ verify_status: 'being_verified' });
                        return;
                    }).catch(err => {
                        console.log(JSON.stringify(err));
                        // ToastAndroid.showWithGravityAndOffset(
                        //     JSON.stringify(err),
                        //     ToastAndroid.LONG,
                        //     ToastAndroid.BOTTOM,
                        //     0,
                        //     100
                        // );
                    })
                }
                catch (ex) {
                    // ToastAndroid.showWithGravityAndOffset(
                    //     'something went wrong please try again !!',
                    //     ToastAndroid.LONG,
                    //     ToastAndroid.BOTTOM,
                    //     0,
                    //     100
                    // );
                }
            } else {
                this.setState({
                    showError: true,
                    msg: "The phone number you entered do not match our records."
                })
            }
        }, (error) => {
            // ToastAndroid.showWithGravityAndOffset(
            //     'error occurred !! please try again.',
            //     ToastAndroid.LONG,
            //     ToastAndroid.BOTTOM,
            //     0,
            //     100
            // );

        })
    }
    verifyKey = () => {
        if (!this.state.input_key) {
            this.setState({ showError: true, msg: 'please input otp sent to your number' });
            return;
        }
        if (this.state.input_key == this.state.reset_key) {
            this.setState({ verify_status: 'verified' });
        } else {
            this.setState({ showError: true, msg: 'otp number does not match!!!' });
            return;
        }
    }
    submit = () => {
        if (!this.state.user_pass || !this.state.confirm_user_pass) {
            this.setState({ showError: true, msg: 'please fill in password and confirm password field' });
            return;
        }
        if (this.state.user_pass !== this.state.confirm_user_pass) {
            this.setState({ showError: true, msg: 'password does not match to confirm password.' });
            return;
        }
        try {
            this.props.client.mutate({
                mutation: updatePswd,
                variables: {
                    id: this.state.user_id,
                    user_pass:base64.encode(this.state.user_pass)
                }
            }).then(res => {
                console.log(res);
                this.props.navigation.navigate('Login');
                // ToastAndroid.showWithGravityAndOffset(
                //     'Password updated successfully',
                //     ToastAndroid.LONG,
                //     ToastAndroid.BOTTOM,
                //     0,
                //     100
                // );
            }).catch(err => {
                console.log(JSON.stringify(err));
            })
        }
        catch (ex) {
            // ToastAndroid.showWithGravityAndOffset(
            //     'something went wrong please try again !!',
            //     ToastAndroid.LONG,
            //     ToastAndroid.BOTTOM,
            //     0,
            //     100
            // );
        }
    }
    render() {
        return (
            <ScrollView contentContainerStyle={commonStyles.container} keyboardShouldPersistTaps="always">
                <ImageBackground source={require('../assets/bg.png')} style={commonStyles.bg_image}></ImageBackground>
                <TouchableOpacity style={commonStyles.backicon} onPress={this.gotoback}>
                    <Image style={commonStyles.backbtn} source={require('../assets/backbtn.png')} />
                </TouchableOpacity>

                <View style={styles.logo}>
                    <Image style={styles.logoImg} source={require('../assets/icon.png')} />
                    <Text style={styles.logo_title}>Reset Password</Text>
                </View>
                {this.state.showError && <Text style={commonStyles.error}>{this.state.msg}</Text>}
                {
                    this.state.verify_status === 'unverified' &&
                    <View style={styles.loginForm}>
                        <TextInput style={styles.inputField} onKeyPress={() => { this.setState({ showError: false }) }} placeholder="Enter your number" value={this.state.phone} name="phone" onChangeText={(text) => this.setState({ phone: text })} placeholderTextColor="#9D9E9C" keyboardType='phone-pad' />
                        <View style={styles.loginBtn}>
                            <TouchableOpacity onPress={this.verifyNumber}>
                                <Text style={[styles.btn, styles.login]}>></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                {
                    this.state.verify_status === 'being_verified' &&
                    <View style={styles.loginForm}>
                        <TextInput style={styles.inputField} onKeyPress={() => { this.setState({ showError: false }) }} placeholder="Enter otp" value={this.state.input_key} name="phone" onChangeText={(text) => this.setState({ input_key: text })} placeholderTextColor="#9D9E9C" keyboardType='numeric' />
                        <View style={styles.loginBtn}>
                            <TouchableOpacity onPress={this.verifyKey}>
                                <Text style={[styles.btn, styles.login]}>></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                {
                    this.state.verify_status === 'verified' &&
                    <View style={styles.loginForm}>
                        <TextInput style={styles.inputField} onKeyPress={() => { this.setState({ showError: false }) }} placeholder="Enter New Password" secureTextEntry={true} value={this.state.user_pass} name="user_pass" onChangeText={(text) => this.setState({ user_pass: text })} placeholderTextColor="#9D9E9C" keyboardType='default' autoCapitalize='none' />
                        <TextInput style={styles.inputField} onKeyPress={() => { this.setState({ showError: false }) }} placeholder="Enter Confirm Password" secureTextEntry={true} value={this.state.confirm_user_pass} name="confirm_user_pass" onChangeText={(text) => this.setState({ confirm_user_pass: text })} placeholderTextColor="#9D9E9C" keyboardType='default' autoCapitalize='none' />
                        <View style={styles.loginBtn}>
                            <TouchableOpacity onPress={this.submit}>
                                <Text style={[styles.btn, styles.login]}>></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </ScrollView>

        );
    }
}
export default withApollo(ForgotPswdScreen);
const styles = StyleSheet.create({
    logo: {
        // paddingBottom:20,
        // paddingTop:20,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    logoImg: {
        width: 75,
        height: 130,
        paddingBottom: 10,
    },
    logo_title: {
        marginTop: 18,
        color: '#FFFFFF',
        fontSize: 24,
        letterSpacing: 10,
    },
    loginForm: {
        marginTop: 40,
        justifyContent: 'center',
    },
    inputField: {
        color: '#9D9E9C',
        marginBottom: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF',
        paddingVertical: 5
    },
    loginBtn: {
        alignItems: 'flex-end',
    },
    loginFooter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    forgotText: {
        color: '#27B4FF',
        fontSize: 18,
        letterSpacing: 3,
        textTransform: 'uppercase'
    },
    btn: {
        borderRadius: 25,
        color: '#4A90E2',
        fontSize: 28,
        textAlign: "center",
        paddingVertical: 12,
        width: 140,
        justifyContent: 'center'
    },
    login: {
        backgroundColor: '#D8D8D8',
    },

});
