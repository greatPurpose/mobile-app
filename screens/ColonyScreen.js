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
  ScrollView
} from 'react-native';
import BottomNav from '../components/BottomNav';
import colors from '../components/Colors';
import Svg, {Path, Circle, Rect} from "react-native-svg";


export default class ColonyScreen extends Component {
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

  // async componentDidMount() {
  //   await Font.loadAsync({
  //     ApexMk2: require('../assets/fonts/ApexMk2/ApexMk2-Regular.ttf'),
  //   }).then( () => this.setState({ fontLoaded: true }));
  // }

  render() {
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
      <View
        style={{ width: 'auto', height: '100%', backgroundPosition: 'left', backgroundColor: '#010101' }}>
        <View style={{ height: '100%', width: '100%' }}>
          <ScrollView style={{top: '10%'}}>
            <View style={styles.viewBox}>
              <View style={styles.ninty}>
                <View style={{alignItems: 'flex-start', textAlign: 'left'}}>
                  <Text style={styles.apexTitle}>THE COLONY</Text>
                </View>
                <View style={{marginTop: 10, width: '100%', height: 400}}>
                  <View style={[
                      StyleSheet.absoluteFill,
                      { alignItems: 'center', justifyContent: 'center' },
                      ]}>
                    <Svg
                      viewBox="0 0 100 100"
                      height="100%"
                      width="100%"
                      fill="none">
                      <Rect x="0" y="0" width='100' height='100' fill='#000'/>
                      <Circle cx='50' cy='50' r='2' fill="#FFF"/>
                    </Svg>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <BottomNav navigate={navigate} active={'colony'} />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  // reused START
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

  apexTitle: {
    fontFamily: 'ApexMk2-Regular',
    color:'white',
    letterSpacing: 16,
    fontSize: 14,
  },
  // END

  imageTop: {
    marginTop: 20,
    marginBottom: 50,
    height: 105,
    width: 103,
  },

  lgFtEa19: {
    fontFamily: 'FutureEarth',
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
