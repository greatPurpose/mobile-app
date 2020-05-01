import React, { Component } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  Text,
  ScrollView,
} from "react-native";
// import * as Font from 'expo-font';
// import colors from '../components/Colors';
// import AboutPagination from '../components/AboutPagination';

let descBold = "85% of people hate their job,";
let descriptionText =
  "\naccording to a Gallup poll. Aphid has developed a" +
  "solution for a 1 hour work week with equivalent compensation of a typical" +
  "workforce salary. Introducing Bioning, when your bot works for you, you get paid.";

class AboutWhyAphid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: true
    };
  }

  // async componentDidMount() {
  //   await Font.loadAsync({
  //     liberationSans: require('../assets/fonts/liberation-sans/LiberationSans-Regular.ttf'),
  //     liberationSansBold: require('../assets/fonts/liberation-sans/LiberationSans-Bold.ttf'),
  //     liberationSansItalic: require('../assets/fonts/liberation-sans/LiberationSans-Italic.ttf'),
  //     liberationSansBoldItalic: require('../assets/fonts/liberation-sans/LiberationSans-BoldItalic.ttf'),
  //   }).then(() => this.setState({ fontLoaded: true }));
  // }

  render() {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <View style={styles.outerViewBox}>
          <View style={styles.viewBox}>
            <Image
              style={styles.stressIco}
              source={require("../assets/images/stress.png")}
            />
            <View style={styles.paragraphBx}>
              {this.state.fontLoaded ? (
                <Text style={styles.aphidDesc}>
                  <Text style={{ fontFamily: "LiberationSans-Bold" }}>
                    {descBold}
                  </Text>
                  {descriptionText}
                </Text>
              ) : (
                <Text>loading fonts...</Text>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

AboutWhyAphid.navigationOptions = {};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  // ToDO: Needs proper implementation.
  // scrollBox: {
  //   position: 'absolute',
  //   top: 0,
  //   left:0,
  //   right: 0,
  //   width: '100%',
  //   height: '85%'
  // },

  outerViewBox: {
    position: "relative",
    width: "100%",
    height: "80%",
    top: "10%",
    alignItems: "center"
  },

  viewBox: {
    position: "absolute",
    width: 348,
    height: 368,
    top: "10%"
  },

  stressIco: {
    resizeMode: 'contain',
    position: 'absolute',
    width: '54%',
    height: 'auto',
    left: '22%',
    right: '22%',
    top: '0%',
    bottom: '44%'
  },

  paragraphBx: {
    position: 'absolute',
    height: '42%',
    width: '100%',
    // top: '76.25%',
    bottom: '0%'
  },

  aphidDesc: {
    position: 'absolute',
    left: '0%',
    right: '0%',
    top: '0%',
    bottom: '0%',

    fontFamily: 'LiberationSans',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    // letterSpacing: -0.2,
    color: '#000000'
    //mixBlendMode: 'normal',
    // opacity: 0.85,
  },
});

export { AboutWhyAphid };
