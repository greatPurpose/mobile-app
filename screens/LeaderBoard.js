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
import BottomNav from '../components/BottomNav';
import colors from '../components/Colors';


export default class TrackerScreen extends Component {
  static navigationOptions = {
    headerShown: false,
    visible: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      bx1: '',
    };
  }

//  async componentDidMount() {
//    await Font.loadAsync({
//      FutureEarth: require('../assets/fonts/future_earth/Future_Earth_v2.ttf'),
//      Android101: require('../assets/fonts/android101/Android101.otf'),
//      liberationSans: require('../assets/fonts/liberation-sans/LiberationSans-Regular.ttf'),
//      liberationSansBold: require('../assets/fonts/liberation-sans/LiberationSans-Bold.ttf'),
//      liberationSansItalic: require('../assets/fonts/liberation-sans/LiberationSans-Italic.ttf'),
//      liberationSansBoldItalic: require('../assets/fonts/liberation-sans/LiberationSans-BoldItalic.ttf'),
//    }).then( () => this.setState({ fontLoaded: true }));
//  }

  render() {
    // ToDo: Stub out Advanced Tracker
    const { navigate } = this.props.navigation;
    if (this.state.loading) {
      return (
        <ImageBackground
          style={{ width: 'auto', height: '100%', backgroundPosition: 'left' }}
          source={require('../assets/images/splash-old.png')}
        />
      );
    }
    return (
      <ImageBackground
        style={{ width: 'auto', height: '100%', backgroundPosition: 'left' }}
        source={require('../assets/images/SkyLineBG.png')}>
        <View style={{ height: '100%', width: '100%' }}>
          <View style={styles.viewBox}>
            <View style={styles.ninty}>
              <Image style={styles.imageTop} source={require('../assets/images/BionIconMd.png')} />
              <Text style={styles.lgFtEa19}>20 : 22 : 47 : 32</Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.tIds}>
                  <Text style={styles.android10114}>DAYS</Text>
                </View>
                <View style={styles.tIds}>
                  <Text style={styles.android10114}>HOURS</Text>
                </View>
                <View style={styles.tIds}>
                  <Text style={styles.android10114}>MINS</Text>
                </View>
                <View style={styles.tIds}>
                  <Text style={styles.android10114}>SECS</Text>
                </View>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.reg11LtGrey}>
                  Welcome to the application. Here is where you'll see the countdown to when your bot starts working. Once live, this page will display your earnings and leaderboard statistics of our shared economy bonus pool known as the CTS.
                </Text>
              </View>
            </View>
          </View>
          <BottomNav navigate={navigate} active={'bot'} />
        </View>
      </ImageBackground>
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

  imageTop: {
    marginTop: 20,
    marginBottom: 50,
    height: 105,
    width: 103,
  },

  lgFtEa19: {
    fontFamily: 'Future_Earth_V2',
    fontSize: 19,
    lineHeight: 29,
    letterSpacing: -1.91,
    color: colors.white,
  },

  android10114: {
    fontFamily: 'Android101',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0,
    color: colors.white,
  },

  tIds: {
    marginTop: 10,
    alignItems: 'center',
    width: 68,
  },

  reg11LtGrey: {
    fontFamily: 'liberationSans',
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0,
    color: '#fdfdfd',
  },
});
