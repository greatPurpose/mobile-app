import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';
import * as Font from 'expo-font';
import ovumIco from '../assets/images/ovumIcon.png';
import background from '../assets/images/Background4.png';
import colors from "../components/Colors";


let ovumDesc = "Hi, I’m the OVUM an artificial intelligence brain also known as " +
  "the mother aphid bot. Just like the Aphid can clone itself, I am going to allow " +
  "you to do the same. Your clone is going to work for you as a tech support chatbot " +
  "and E-Commerce assistant. When the bot finishes its’ shift, you are paid.";

class AboutOvum extends Component {
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
        source={background}>
        <ScrollView style={styles.scrollBox}>
          <View style={styles.outerViewBox}>
            <View style={styles.viewBox}>
              <Image style={styles.ovumIcon1} source={ovumIco} />
              {this.state.fontLoaded ? (
                <Text style={styles.ovumDesc}>
                  {ovumDesc}
                </Text>
              ) : null}
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
  },

  scrollBox: {
    position: 'absolute',
    top: '15%',
    left:0,
    right: 0,
    width: '100%',
    height: '70%'
  },

  outerViewBox: {
    position: 'relative',
    width: '100%',
    height: 480,
    alignItems: 'center',
  },

  viewBox: {
    top: '0%',
    position: 'absolute',
    // left: 20,
    width: '80%',
    height: '100%',
  },

  ovumIcon1: {
    width: '100%',
    resizeMode: 'contain',
  },

  ovumDesc: {
    width: 335,
    height: 70,
    top: 30,
    fontFamily: 'LiberationSans',
    fontSize: 12,
    fontWeight: '300',
    fontStyle: 'normal',
    lineHeight: 14,
    letterSpacing: 0,
    color: colors.white,
  },
});


export { AboutOvum };
