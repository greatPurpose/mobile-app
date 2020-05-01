import React, { Component } from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  Text,
  ScrollView
} from "react-native";
import * as Font from "expo-font";
import colors from "../components/Colors";
import AboutPagination from "../components/AboutPagination";
import background2 from "../assets/images/Background2.png";
import chatBot from "../assets/images/cbotIcoLg.png";
import piggy from "../assets/images/piggy-bank.png";
import bag from "../assets/images/shoppingBagIco.png";

let headerText = "Payouts";
let botText =
  "Create a bot that works as our chat support representative and get paid from its labor. No experience required";
let tokenTextFirst = "Tokens are paid out to you the bot ";
let tokenTextBold = "Controller";
let tokenTextLast = ", after your bots' activity is completed";
let commissionText =
  "Earn commission when someone shops on our website. Your bot is randomly selected and will assist the customer with auto-assign bot checkout";
let footerText = "CTS Subscription Required";

class AboutPayouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: true,
    };
  }

  // async componentDidMount() {
  //   await Font.loadAsync({
  //     liberationSans: require('../assets/fonts/liberation-sans/LiberationSans-Regular.ttf'),
  //     liberationSansBold: require('../assets/fonts/liberation-sans/LiberationSans-Bold.ttf'),
  //     liberationSansItalic: require('../assets/fonts/liberation-sans/LiberationSans-Italic.ttf'),
  //     liberationSansBoldItalic: require('../assets/fonts/liberation-sans/LiberationSans-BoldItalic.ttf')
  //   }).then(() => this.setState({ fontLoaded: true }));
  // }

  render() {
    return (
      <ImageBackground style={styles.background} source={background2}>
        <ScrollView style={styles.scrollBox}>
          <View style={styles.outerViewBox}>
            <View style={styles.viewBox}>
              <View style={styles.header}>
                <Text style={styles.headerText}>{headerText}</Text>
              </View>
              <View style={styles.textContainer}>
                <Image source={chatBot} />
                <Text style={styles.botText}>
                  <Text style={styles.text}>{botText}</Text>
                </Text>
              </View>
              <View style={styles.textContainer}>
                <Image source={piggy} />
                <Text style={styles.tokenText}>
                  <Text style={styles.text}>
                    {tokenTextFirst}
                    <Text style={styles.boldText}>{tokenTextBold}</Text>
                    {tokenTextLast}
                  </Text>
                </Text>
              </View>
              <View style={styles.textContainer}>
                <Image source={bag} />
                <Text style={styles.commissionText}>
                  <Text style={styles.text}>{commissionText}</Text>
                </Text>
              </View>
              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  <Text style={styles.text}>{footerText}</Text>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },

  scrollBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '85%'
  },

  outerViewBox: {
    position: 'relative',
    alignItems: 'center',
    width: '100%',
    height: 600,
    top: '6%'
  },

  viewBox: {
    alignItems: 'center',
    width: '90%',
    height: '100%'
  },

  text: {
    fontFamily: 'LiberationSans',
    color: colors.white,
  },

  standardText: {
    textAlign: 'center',
    fontSize: 14,
    letterSpacing: -0.2,
  },

  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '17%'
  },

  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '22%'
  },

  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '17%'
  },

  headerText: {
    fontFamily: 'LiberationSans',
    color: colors.white,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 23,
  },

  botText: {
    textAlign: 'center',
    fontSize: 14,
    letterSpacing: 1,
  },

  tokenText: {
    textAlign: 'center',
    fontSize: 14,
    letterSpacing: 1,
  },

  commissionText: {
    textAlign: 'center',
    fontSize: 14,
    letterSpacing: 1,
  },

  footerText: {
    textAlign: 'center',
    fontSize: 14,
    letterSpacing: 1,
  },

  boldText: {
    fontFamily: 'LiberationSans-Bold'
  },

  mediumText: {},

  pagination: {
    position: 'absolute',
    bottom: 0,
    width: 148,
    height: 19,
  },

  cloneicon: {
    width: 206,
    height: 114,
    left: 0,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
});

export { AboutPayouts };
