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
  TouchableOpacity, ScrollView,
} from 'react-native';
import BottomNav from '../components/BottomNav';
import colors from '../components/Colors';
import ProfilePlaceHolder from "../assets/images/profileplaceholder";
import SwitchToggle from 'react-native-switch-toggle';
import Video from 'react-native-video';
import {HeaderBackButton} from "react-navigation-stack";

export default class CloneManageScreen extends Component {
  static navigationOptions = {
    headerShown: false,
    visible: false,
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)}/>
  };

  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: true,
      aphidSalesOn: false,
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
    const state = this.state;

    if (!state.fontLoaded) {
      return (
        <ImageBackground
          style={{ width: 'auto', height: '100%', backgroundPosition: 'left' }}
          source={require('../assets/images/splash-old.png')}
        />
      );
    }
    return (
      <View style={styles.mainContainer}>
        <Video source={require('../assets/images/aCloneBG.mp4')}
               style={{
                 position: 'absolute',
                 top: 0,
                 left: -40,
                 bottom: 0,
                 right: 0,
               }}
               repeat={true}
               resizeMode="cover"
               ref={(ref) => {
                 this.player = ref
               }}                                      // Store reference
               onBuffer={null}                // Callback when remote video is buffering
               onError={null}
        />
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.8)',
        }} />
        <View style={{ height: '100%', width: '100%' }}>
          <ScrollView >
            <View style={styles.viewBox}>
              <View style={styles.ninty}>
                <View style={styles.fullWidth}>
                  <View style={{marginTop: 86}}>
                    <Text style={styles.apexTitle}>MY BOT</Text>
                  </View>
                </View>
                <View style={{marginTop:42, width: 126, height: 126}}>
                  <ProfilePlaceHolder />
                </View>
                <View style={{marginTop: 34}}>
                  <Text style={{fontSize: 18, color: '#FFFFFF', fontFamily: 'liberationSans', textAlign: 'center', letterSpacing: 12}}>YOUR BOT NAME</Text>
                </View>
                <View style={{marginTop: 90}}>
                  <Text style={{color: '#FFFFFF'}}>Provisioned For:</Text>
                </View>
                <View style={{height: 311, marginTop: 36}}>
                  <View style={{}}>
                    <View style={styles.fullWidthRow}>
                      <View style={{width:'50%', height: 51, justifyContent:'center', alignItems: 'flex-start'}}>
                        <Text style={{color: '#FFFFFF', fontFamily: 'liberationSans', alignSelf:'center'}}>Aphid Sales</Text>
                      </View>
                      <View style={{width:'50%', alignItems:'flex-end'}}>
                        <SwitchToggle
                          containerStyle={{
                            marginTop: 16,
                            width: 51,
                            height: 30,
                            borderRadius: 18,
                            backgroundColor: '#ccc',
                            padding: 5,
                          }}
                          circleStyle={{
                            width: 26,
                            height: 26,
                            borderRadius: 13,
                            backgroundColor: '#FFFFFF', // rgb(102,134,205)
                            opacity: 1,
                          }}
                          switchOn={this.state.aphidSalesOn}
                          onPress={this.onAphidSalesToggle}
                          backgroundColorOff={'#ccc'}
                          backgroundColorOn={'#4279b3'}
                          circleColorOff={'white'}
                          circleColorOn={'white'}
                          duration={500}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={{marginTop: -25, alignItems: 'flex-end'}}>
                    <Text style={{color: 'white', fontFamily: 'liberationSans'}}>Offline</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <BottomNav navigate={navigate} active={''} />
        </View>
      </View>
    );
  }

  onAphidSalesToggle = () => {
    this.setState({ aphidSalesOn: !this.state.aphidSalesOn });
  }
}

const styles = StyleSheet.create({
  // reused
  viewBox: {
    width: '100%',
    height: '80%',
    top: '10%',
    alignItems: 'center',
  },

  fullWidth: {
    width: '100%'
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

  fullWidthRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 33,
  },
  // END
  imageTop: {
    marginTop: 20,
    marginBottom: 50,
    height: 105,
    width: 103,
  },

  lgFtEa19: {
    fontFamily: 'Future_Earth_v2',
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
