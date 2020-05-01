import React, { Component } from 'react';
import {StyleSheet, ImageBackground, View, Image, Text, ScrollView} from 'react-native';
import * as Font from 'expo-font';
import colors from '../components/Colors';
import AboutPagination from '../components/AboutPagination';

let aphidDesc = "Aphids are small sap-sucking insects and members of the superfamily Aphidoidea. " +
  "After laying eggs or creating clones, the new females are able to produce copies of " +
  "themselves as well. Wingless adult female aphids can produce 50 to 100 offspring.";

class AboutAphid extends Component {
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
    return (
      <ImageBackground
        style={styles.background}
        source={require('../assets/images/AphidBg.png')}>
          <View style={styles.outerViewBox}>
            <View style={styles.viewBox}>
              {this.state.fontLoaded ? (
                <Text style={[styles.aphidPronun, {lineHeight: 14}]}>
                  a·phid
                  {'\n'}
                  /ˈāfid,ˈafid/
                </Text>
              ) : null}
              {this.state.fontLoaded ? (
                <Text style={styles.aphidDesc}>
                  {aphidDesc}
                </Text>
              ) : null}
            </View>
          </View>
      </ImageBackground>
    );
  }
}



const styles = StyleSheet.create({
  background: {
    width: '104%',
    height: '100%',
    left: '-2%',
    resizeMode: 'cover',
  },
// ToDo: Needs proper implementation.
  // scrollBox: {
  //   position: 'absolute',
  //   top: 0,
  //   left:0,
  //   right: 0,
  //   width: '100%',
  //   height: '85%'
  // },

  outerViewBox: {
    width: '100%',
    height: '80%',
    top: '10%',
    alignItems: 'center',
  },

  viewBox: {
    width: '90%',
    height: 119,
    left: '5%',
    top: '65%',
  },

  aphidPronun: {
    height: 30,
    left: 29,
    fontFamily: 'LiberationSans',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 3,
  },

  aphidDesc: {
    height: 70,
    top: 20,
    fontFamily: 'LiberationSans',
    fontSize: 11,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 14,
    letterSpacing: 0,
    color: '#fefefc',
  },
});


export { AboutAphid };
