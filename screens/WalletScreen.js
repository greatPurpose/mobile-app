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
import {ScrollView} from "react-navigation";


export default class WalletScreen extends Component {
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
      <View style={{ width: 'auto', height: '100%', backgroundPosition: 'left', backgroundColor: '#010101' }}>
        <ScrollView>
          <View style={styles.viewBox}>
            <View style={styles.ninty}>
              <View style={styles.fullWidth}>
                <Text style={styles.apexTitle}>WALLET</Text>
              </View>
              <View style={[
                {
                  marginTop: 40,
                }
              ]}>
                <View style={[styles.fullWidthRow, {}]}>
                  <Text style={[styles.fontMdWhite, {width: '50%'}]}>Linked Accounts</Text>
                  <Text style={[styles.fontMdWhite, {width: '50%', textAlign: 'right'}]}>Edit</Text>
                </View>
                <View style={[styles.fullWidthRow, {}]}>
                  <View style={[{width: '50%'}]}>
                    <Text style={[styles.fontMd2WhiteLeft]}>Chase</Text>
                  </View>
                  <Text style={[
                    styles.fontMd2White,
                    {width: '50%', textAlign: 'right'}
                  ]}>
                    ...0456
                  </Text>
                </View>
                <View style={[styles.fullWidthRow, {}]}>
                  <View style={[{width: '50%'}]}>
                    <Text style={[styles.fontMd2WhiteLeft]}>Wells Fargo</Text>
                  </View>
                  <Text style={[
                    styles.fontMd2White,
                    {width: '50%', textAlign: 'right'}
                  ]}>
                    ...4839
                  </Text>
                </View>
                <View style={[styles.fullWidthRow, {}]}>
                  <View style={[{width: '50%'}]}>
                    <Text style={[styles.fontMd2WhiteLeft, {}]}>PayPal</Text>
                  </View>
                  <Text style={[
                    styles.fontMd2White,
                    {width: '50%', textAlign: 'right'}
                  ]}>
                    m...@yahoo.com
                  </Text>
                </View>
                <View style={[styles.fullWidthRow, {}]}>
                  <View style={[{width: '50%'}]}>
                    <Text style={[styles.fontMd2WhiteLeft, {}]}>MyEtherWallet</Text>
                  </View>
                  <Text style={[
                    styles.fontMd2White,
                    {width: '50%', textAlign: 'right'}
                  ]}>
                    m...@yahoo.com
                  </Text>
                </View>
              </View>
              <View style={[
                styles.fullWidthRow,
                {
                  alignItems: 'center',
                  marginTop: 67,
                }
              ]}>
                <View style={{width: '80%'}}>
                  <Text style={[
                    {
                      fontFamily: 'liberationSans',
                      fontSize: 21,
                      color: 'white'
                    }
                  ]}>
                    Add a payment method
                  </Text>
                </View>
                <View style={[{
                  width: '20%',
                  alignItems: 'flex-end',
                }]}>
                  <View style={[
                    {
                      width: 60,
                      height: 38,
                      borderRadius: 8,
                      backgroundColor: '#F3F7FB'
                    },
                  ]}/>
                </View>
              </View>
              <View style={[
                styles.fullWidthRow,
                {}
              ]}>
                <View style={[
                  {
                    width: '50%'
                  }
                ]}>
                  <Text style={[
                    {
                      fontSize: 14,
                      color: 'white',
                      fontFamily: 'liberationSans',
                    }
                  ]}>
                    Balance: <Text style={[
                    {
                      color: '#1FCE88',
                    }
                  ]}>
                    $118.71 </Text>
                    USD
                  </Text>
                  <Text style={[
                    {
                      fontSize: 14,
                      color: 'white',
                      fontFamily: 'liberationSans',
                    }
                  ]}>
                    Abions: <Text style={[
                    {
                      color: '#1FCE88',
                    }
                  ]}>218</Text>
                  </Text>
                </View>
                <Text style={[
                  {
                    fontSize: 14,
                    marginTop: 7,
                    color: 'white',
                    textAlign: 'right',
                    width: '50%',
                    fontFamily: 'liberationSans',
                  }
                ]}>Withdraw</Text>
              </View>
              <View style={[styles.fullWidthRow,
                {
                  marginBottom: 120,
                }
                ]}>
                <Text style={[
                  {
                    marginTop: 9,
                    color: 'white',
                    fontSize: 14,
                    fontFamily: 'liberationSans',
                  }
                ]}>Current Plan: A1</Text>
                <View style={[
                  {
                    width: 87,
                    height: 32,
                    borderRadius: 22.5,
                    marginLeft: 20,
                    backgroundColor: 'linear-gradient(180deg, rgba(238, 238, 238, 0.0595562) 0%, #D8D8D8 100%)',
                  }
                ]}/>
              </View>
            </View>
          </View>
        </ScrollView>

        <BottomNav navigate={navigate} active={'wallet'} />
      </View>
    );
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

  fontMdWhite: {
    fontSize: 17,
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'liberationSans'
  },

  fontMd2White: {
    fontSize: 21,
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'liberationSans'
  },

  fontMd2WhiteLeft: {
    fontSize: 21,
    color: 'white',
    fontFamily: 'liberationSans'
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
