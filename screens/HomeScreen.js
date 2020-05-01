import * as WebBrowser from 'expo-web-browser';
import React, {Component} from 'react';
import {Alert, Platform, ScrollView, StyleSheet, Text, View,} from 'react-native';
import {AboutWhyAphid} from "./AboutWhyAphid";
import {AboutAphid} from "./AboutAphid";
import {AboutProVCon} from "./AboutProVCon";
import {AboutOvum} from "./AboutOvum";
import {AboutPayouts} from "./AboutBotEco";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import AboutPagination from "../components/AboutPagination";
import AsyncStorage from "@react-native-community/async-storage";
import {tryCatch} from "ramda";


export default class HomeScreen extends Component {
  static navigationOptions = {
    headerShown: false,
    visible: false,
  };

  firstRun = async () => {
    try {
      let f = await this._getFirstRun();
      if (f) {
        this.props.navigation.navigate('OptionType');
      }
    } catch (e) {
      console.log(e)
    }
  };

  logedIn = async () => {
    try {

    } catch (e) {

    }
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      myText: "I'm ready to get swiped!",
      gestureName: 'none',
      backgroundColor: '#fff',
    };

    this.props.navigation.setParams({visible: false});
  }

  _setFirstRun = async (data) => {
    try {
      await AsyncStorage.setItem('hasOpened', 'true');
    } catch (e) {
      alert(
        'Error',
        e
      )
      // saving error
    }
  };

  _getFirstRun = async () => {
    const FirstRun = await AsyncStorage.getItem('hasOpened');
    switch (FirstRun) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        return false;
    }
  };

  _getLoggedIn = async () => {
    const LoggedIn = await AsyncStorage.getItem('userToken');
    return loggedIn != null;
  };

  setPageToOne = () => {
    this.setState({
      page: 1,
    });
  };

  goToLogin = () => {
    this.props.navigation.navigate('OptionType');
  };

  goToMyBot = () => {
    this.props.navigation.navigate('MyBot');
  };

  goToAbout = () => {
    this.props.navigation.navigate('About');
  };

  onSwipe(gestureName, gestureState) {
    const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName});
    switch (gestureName) {
      case SWIPE_LEFT:
        this.setState({
          page: this.state.page + 1,
        });
        break;
      case SWIPE_RIGHT:
        this.setState({
          page: this.state.page - 1,
        });
        break;
    }
  }

  render() {
    this.firstRun().then(r => {
      if (r) {
        this.goToMyBot()
      }
    });
    this.logedIn().then(r => {
      if (!r) {
        this.goToLogin()
      }
    });

    this.goToMyBot();
    return null;
  }
}

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  bottomTabBar: {
    bottom: -60,
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
