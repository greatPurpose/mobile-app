import React, {Component} from "react";
import AsyncStorage from "@react-native-community/async-storage";
import GestureRecognizer, {swipeDirections} from "react-native-swipe-gestures";
import {AboutWhyAphid} from "./AboutWhyAphid";
import AboutPagination from "../components/AboutPagination";
import {AboutProVCon} from "./AboutProVCon";
import {AboutPayouts} from "./AboutBotEco";
import {AboutAphid} from "./AboutAphid";
import {AboutOvum} from "./AboutOvum";

export default class AboutScreen extends Component {
  static navigationOptions = {
    headerShown: false,
    visible: false,
  };

  firstRun = async () => {
    try {
      let f = await this.getFirstRun();
      if (f) {
        this.props.navigation.navigate('Login');
      }
    } catch (e) {
      console.log(e)
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

  _storeData = async (data) => {
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

  setPageToOne = () => {
    this.setState({
      page: 1,
    });
  };

  goToLogin = () => {
    this._storeData().then(r => {});
    this.props.navigation.navigate('OptionType');
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
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    this._getFirstRun().then(r => { if(r){this.goToLogin()}});
    switch (this.state.page) {
      case 1:
        return (
          <GestureRecognizer
            onSwipe={(direction, state) => this.onSwipe(direction, state)}
            config={config}
            style={{
              width: '100%',
              left: 0,
              flex: 1,
            }}>
            <AboutWhyAphid navigation={this.props.navigation}/>
            <AboutPagination active={'one'}/>
          </GestureRecognizer>
        );
      case 2:
        return (
          <GestureRecognizer
            onSwipe={(direction, state) => this.onSwipe(direction, state)}
            config={config}
            style={{
              width: '100%',
              height: '100%',
              left: 0,
              flex: 1,
            }}>
            <AboutProVCon navigation={this.props.navigation}/>
            <AboutPagination active={'two'}/>
          </GestureRecognizer>
        );
      case 3:
        return (
          <GestureRecognizer
            onSwipe={(direction, state) => this.onSwipe(direction, state)}
            config={config}
            style={{
              width: '100%',
              left: 0,
              flex: 1,
            }}>
            <AboutPayouts navigation={this.props.navigation}/>
            <AboutPagination active={'three'}/>
          </GestureRecognizer>
        );
      case 4:
        return (
          <GestureRecognizer
            onSwipe={(direction, state) => this.onSwipe(direction, state)}
            config={config}
            style={{
              width: '100%',
              left: 0,
              flex: 1,
            }}>
            <AboutAphid navigation={this.props.navigation}/>
            <AboutPagination active={'four'}/>
          </GestureRecognizer>
        );
      case 5:
        return (
          <GestureRecognizer
            onSwipe={(direction, state) => this.onSwipe(direction, state)}
            config={config}
            style={{
              width: '100%',
              left: 0,
              flex: 1,
            }}>
            <AboutOvum navigation={this.props.navigation}/>
            <AboutPagination active={'five'}/>
          </GestureRecognizer>
        );
      default:
        this.setPageToOne();
        this.goToLogin();
        return null;
    }
  }
}
