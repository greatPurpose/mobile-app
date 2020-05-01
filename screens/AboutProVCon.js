import React, { Component } from 'react';
import { StyleSheet, ImageBackground, Image, Text, View, ScrollView } from 'react-native';
import * as Font from 'expo-font';
import colors from '../components/Colors';
import background from '../assets/images/Background2.png'
import famIco from '../assets/images/familyGroupOfThreeIco.png'
import jobIco from '../assets/images/workingWithLaptopIco.png'
import AboutPagination from "../components/AboutPagination";


let proTitle = "Pros";
let proSubTitle = "Bioning with Aphid";
let pros = "\t•\tBot does the labor for you\n" +
  "\t•\tSpend more time with your family\n" +
  "\t•\tLimitless income earning potential \n" +
  "\t•\tStress free \n" +
  "\t•\tNo middle-man controlling your money\n" +
  "\t•\tZero Bot Layoff Policy\n" +
  "\t•\tInstant Payout Liquidity (IPL)\n" +
  "\t•\tAssisted support via resources and ecosystem \n" +
  "\t•\tRobots don’t call off\n";
let conTitle = "Cons";
let conSubTitle = "Working a Job";
let cons = "\t•\tAll manual labor (trading time for money)\n" +
  "\t•\tTakes time away from your family\n" +
  "\t•\tMinimal workforce annual pay increases\n" +
  "\t•\tStress\n" +
  "\t•\tYou only get 2 days to yourself in a work week\n" +
  "\t•\tTakes 2 weeks to receive paycheck\n" +
  "\t•\tAdded duties while maintaining same pay\n";

class AboutProVCon extends Component {
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
  //   }).then( () => this.setState({ fontLoaded: true }));
  // }

  render() {
    if (!this.state.fontLoaded) {
      return (
        <View>
          <Text>FontLoading</Text>
        </View>
      );
    }
    return (
      <ImageBackground
        style={{ width: '100%', height: '100%' }}
        source={background}>
          <ScrollView style={styles.scrollBox}>
          {/*<Image style={styles.aphid} source={require('../assets/images/Aphid.png')} />*/}
          <View style={styles.outerViewBox}>
            <View style={styles.viewBox}>
              <View style={{position:'absolute', top:0, flex: 1, height: 1000, width: '100%' }}>
                {/*<Text style={styles.theBotEconomy}>THE BOT ECONOMY</Text>*/}
                <View style={styles.tCard}>
                  <View style={styles.tCardImageContainer}>
                    <Image style={styles.tCardImage} source={famIco} />
                  </View>
                  <View style={styles.tCardTextContainer}>
                      <Text style={styles.tCardTitle}>{proTitle}</Text>
                      <Text style={styles.tCardSubTitle}>{proSubTitle}</Text>
                  </View>
                </View>
                <Text style={styles.text}>{pros}</Text>
                <View style={styles.tCard}>
                  <View style={styles.tCardImageContainer}>
                    <Image style={styles.tCardImage} source={jobIco} />
                  </View>
                  <View style={styles.tCardTextContainer}>
                      <Text style={styles.tCardTitle}>{conTitle}</Text>
                      <Text style={styles.tCardSubTitle}>{conSubTitle}</Text>
                  </View>
                </View>
                <Text style={styles.text}>{cons}</Text>
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
    resizeMode: 'cover',
  },

  scrollBox: {
    position: 'absolute',
    top: 0,
    left:0,
    right: 0,
    width: '100%',
    height: '85%'
  },

  outerViewBox: {
    position: 'relative',
    width: '100%',
    height: 724,
    top: '6%',
    alignItems: 'center',
  },

  viewBox: {
    top: '0%',
    position: 'absolute',
    // left: 20,
    width: '80%',
    height: '100%',
  },
  tCard: {
    // alignItems: 'center',
    height: 110,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },

  tCardImageContainer: {
    height: '100%',
    width: '50%',
    textAlign: 'center',
  },
  tCardImage: {
    width: 102,
    height: 102,
    resizeMode: 'contain',
  },
  tCardTextContainer: {
    flexDirection: 'column',
    height: '100%',
    // width: '50%',
  },

  text: {
    fontFamily: 'LiberationSans',
    fontSize: 14,
    lineHeight: 23,
    letterSpacing: 0,
    color: '#d8d8d8',
  },

  tCardTitle: {
    fontFamily: 'LiberationSans-Bold',
    marginTop: 19,
    fontSize: 20,
    lineHeight: 23,
    letterSpacing: 0,
    color: '#d8d8d8',
    width: '100%',
    textAlign: 'center',
  },

  tCardSubTitle: {
    fontFamily: 'LiberationSans',
    marginTop: 8,
    fontSize: 20,
    lineHeight: 23,
    letterSpacing: 0,
    color: '#d8d8d8',
    width: '100%',
    textAlign: 'center',
  },

  aphid: {
    width: 112,
    height: 110,
    top: 56,
    left: -56,
  },

  theBotEconomy: {
    marginTop: 30,
    height: 14,
    fontFamily: 'LiberationSans',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 4,
    textAlign: 'center',
    color: '#1dcb8b',
  },
});


export { AboutProVCon };
