import React, { Component } from 'react';
import * as Font from 'expo-font';
import {
  Button,
  ImageBackground,
  StyleSheet,
  View,
  TextInput,
  Image,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import colors from '../components/Colors';

export default class PhoneAuthScreen extends Component {
  static navigationOptions = {
    headerShown: false,
    visible: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      bx1: '',
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      liberationSans: require('../assets/fonts/liberation-sans/LiberationSans-Regular.ttf'),
      liberationSansBold: require('../assets/fonts/liberation-sans/LiberationSans-Bold.ttf'),
      liberationSansItalic: require('../assets/fonts/liberation-sans/LiberationSans-Italic.ttf'),
      liberationSansBoldItalic: require('../assets/fonts/liberation-sans/LiberationSans-BoldItalic.ttf')
    }).then( () => this.setState({ fontLoaded: true }));
  }

  onContinue() {
    const { navigate } = this.props.navigation;
    navigate('Invite');
  }

  render() {
    const { navigate } = this.props.navigation;
    if (!this.state.fontLoaded) {
      return (
        <ImageBackground
          style={{ width: 'auto', height: '100%', backgroundPosition: 'left' }}
          source={require('../assets/images/splash-old.png')}
        />
      );
    }
    return (
      <View style={{ height: '100%', backgroundColor: colors.black }}>
        <View style={styles.viewBox}>
          <View style={styles.ninty}>
            <Image
              style={{ left: 10, height: 108, width: 94 }}
              source={require('../assets/images/smartphone.png')}
            />
            <Text style={styles.RegShort15}>
              A Text Message was sent to ***-***-5555. Please Verify Your Account.
            </Text>
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({ bx1: 5 });
              }}>
              <View style={{ marginTop: 40, flexDirection: 'row' }}>
                <View style={styles.whtBx}>
                  <Text style={styles.vFont}>{this.state.bx1}</Text>
                </View>
                <View style={styles.whtBx}>
                  <Text style={styles.vFont}>{this.state.bx1}</Text>
                </View>
                <View style={styles.whtBx}>
                  <Text style={styles.vFont}>{this.state.bx1}</Text>
                </View>
                <View style={styles.whtBx}>
                  <Text style={styles.vFont}>{this.state.bx1}</Text>
                </View>
                <View style={styles.whtBx}>
                  <Text style={styles.vFont}>{this.state.bx1}</Text>
                </View>
                <View style={styles.whtBx}>
                  <Text style={styles.vFont}>{this.state.bx1}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={{ width: '90%' }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.loginButton}
              onPress={() => {
                this.onContinue();
              }}>
              {this.state.fontLoaded ? <Text style={styles.buttonTxt1}>Continue</Text> : null}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

  loginButton: {
    width: '100%',
    height: 86,
    bottom: 0,
    alignItems: 'center',
    backgroundColor: colors.viridian,
  },

  buttonTxt1: {
    marginTop: 31.5,
    fontFamily: 'liberationSans',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    letterSpacing: 0,
    color: colors.white,
  },

  whtBx: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 40,
    borderRadius: 3,
    marginRight: 10,
    backgroundColor: colors.white,
  },

  vFont: {
    fontFamily: 'liberationSansBold',
    fontSize: 20,
  },

  inputBox: {
    marginTop: 24,
    height: 26,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
  },

  signUpForm: {
    width: '100%',
    height: 316,
  },

  RegShort15: {
    marginTop: 20,
    fontFamily: 'liberationSans',
    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'center',
    lineHeight: 21,
    letterSpacing: 0,
    color: colors.white,
  },
});
