import React, { Component } from 'react';
import * as Font from 'expo-font';
import {
  Button,
  ImageBackground,
  StyleSheet,
  View,
  TextInput, ScrollView,
  Image,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import BottomNav from '../components/BottomNav';
import colors from '../components/Colors';
import LoadingScreen from "../navigation/LoadingScreen";


export default class ShiftPreferenceScreen extends Component {
  state = {
    tableLoaded: false,
    tableHead: [ '   ', 'Expected', 'Reported'],
    tableData: [
      ['Monday', '8.00', '0.00'],
      ['Tuesday', '8.00', '0.00'],
      ['Wednesday', '8.00', '0.00'],
      ['Thursday', '8.00', '0.00'],
      ['Friday', '8.00', '0.00'],
      ['Saturday', '0.00', '0.00'],
      ['Sunday', '0.00', '0.00']
    ],
  };
  static navigationOptions = {
    headerShown: false,
    visible: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      tableLoaded: false,
      bx1: '',
      tableHead: ['   ', 'Expected', 'Reported'],
      tableData: [
        ['Monday', '8.00', '0.00'],
        ['Tuesday', '8.00', '0.00'],
        ['Wednesday', '8.00', '0.00'],
        ['Thursday', '8.00', '0.00'],
        ['Friday', '8.00', '0.00'],
        ['Saturday', '0.00', '0.00'],
        ['Sunday', '0.00', '0.00']
      ],
    };
  }

  setRemainingShiftTime() {

  }

  render() {
    const { navigate } = this.props.navigation;
    const state = this.state;

    // this.setTableData();

    if (state.tableData)  {
      return (
        <View style={styles.backgroundColor}>
          <View style={{ height: '100%', width: '100%' }}>
            <ScrollView>
              <View style={styles.viewBox}>
                <View style={styles.ninty}>
                  <View>
                    <Text style={styles.fontSmGrey}>
                      Today's Shift Ends In
                    </Text>
                  </View>
                  <View style={{marginTop: 30}}>
                    <Text style={styles.fontLgWhite}>
                      03 : 22 : 47
                    </Text>
                  </View>
                  <View style={styles.clockLabels}>
                    <Text style={styles.fontAnd101}>HOURS</Text>
                    <Text style={styles.fontAnd101}>MINS</Text>
                    <Text style={styles.fontAnd101}>SECS</Text>
                  </View>
                  <View style={[styles.weekSlider, {marginBottom: 0}]}>
                    <Text style={styles.fontMdWhite}>This Week</Text>
                  </View>
                  <View style={{marginTop: 14}}>
                    <Text style={styles.fontSmGrey}>August 25, 2019</Text>
                  </View>
                  <View style={{marginTop: 50}}>
                    <Text style={styles.fontMdWhite}>Bot Shift Preference</Text>
                  </View>
                  <View style={styles.shiftSelector}>
                    <Text style={styles.buttonFont}>8am-5pm ET</Text>
                  </View>
                  <View style={{color: 'white', marginTop: 42}}>
                    <View style={styles.fullWidthRow}>
                      <View style={styles.col1} />
                      <View style={styles.cols}>
                        <Text style={styles.fontSmGrey}>Expected</Text>
                      </View>
                      <View style={styles.cols}>
                        <Text style={styles.fontSmGrey}>Reported</Text>
                      </View>
                    </View>
                    <View style={styles.fullWidthRow}>
                      <View style={styles.col1} >
                        <Text style={styles.fontSmWhite}>Monday</Text>
                      </View>
                      <View style={styles.cols}>
                        <Text style={styles.fontSmGrey}>{this.state.tableData[0][1]}</Text>
                      </View>
                      <View style={styles.cols}>
                        <Text style={styles.fontSmGrey}>{this.state.tableData[0][2]}</Text>
                      </View>
                    </View>
                    <View style={styles.fullWidthRow}>
                      <View style={styles.col1}>
                        <Text style={styles.fontSmWhite}>Tuesday</Text>
                      </View>
                      <View style={styles.cols}>
                        <Text style={styles.fontSmGrey}>{this.state.tableData[1][1]}</Text>
                      </View>
                      <View style={styles.cols}>
                        <Text style={styles.fontSmGrey}>{this.state.tableData[1][2]}</Text>
                      </View>
                    </View>
                    <View style={styles.fullWidthRow}>
                      <View style={styles.col1} >
                        <Text style={styles.fontSmWhite}>Wednesday</Text>
                      </View>
                      <View style={styles.cols}>
                        <Text style={styles.fontSmGrey}>{this.state.tableData[2][1]}</Text>
                      </View>
                      <View style={styles.cols}>
                        <Text style={styles.fontSmGrey}>{this.state.tableData[2][2]}</Text>
                      </View>
                    </View>
                    <View style={styles.fullWidthRow}>
                      <View style={styles.col1} >
                        <Text style={styles.fontSmWhite}>Thursday</Text>
                      </View>
                      <View style={styles.cols}>
                        <Text style={styles.fontSmGrey}>{this.state.tableData[3][1]}</Text>
                      </View>
                      <View style={styles.cols}>
                        <Text style={styles.fontSmGrey}>{this.state.tableData[3][2]}</Text>
                      </View>
                    </View>
                    <View style={styles.fullWidthRow}>
                      <View style={styles.col1} >
                        <Text style={styles.fontSmWhite}>Friday</Text>
                      </View>
                      <View style={styles.cols}>
                        <Text style={styles.fontSmGrey}>{this.state.tableData[4][1]}</Text>
                      </View>
                      <View style={styles.cols}>
                        <Text style={styles.fontSmGrey}>{this.state.tableData[4][2]}</Text>
                      </View>
                    </View>
                    <View style={styles.fullWidthRow}>
                      <View style={styles.col1} >
                        <Text style={styles.fontSmWhite}>Saturday</Text>
                      </View>
                      <View style={styles.cols}>
                        <Text style={styles.fontSmGrey}>{this.state.tableData[5][1]}</Text>
                      </View>
                      <View style={styles.cols}>
                        <Text style={styles.fontSmGrey}>{this.state.tableData[5][2]}</Text>
                      </View>
                    </View>
                    <View style={styles.fullWidthRow}>
                      <View style={styles.col1} >
                        <Text style={styles.fontSmWhite}>Sunday</Text>
                      </View>
                      <View style={styles.cols}>
                        <Text style={styles.fontSmGrey}>{this.state.tableData[6][1]}</Text>
                      </View>
                      <View style={styles.cols}>
                        <Text style={styles.fontSmGrey}>{this.state.tableData[6][2]}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{width: '100%', marginTop:54, alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', width: 319}}>
                      <View style={styles.availHours}>
                        <Text style={styles.buttonFont}>4.25 hrs left</Text>
                      </View>
                      <View style={styles.schedHours}>
                        <Text style={styles.buttonFont}>3.75 hrs left</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
            <BottomNav navigate={navigate} active={'calendar'} />
          </View>
        </View>
      );
    } else {
      return (
        <LoadingScreen />
        // <ImageBackground
        //   style={{ width: 'auto', height: '100%', backgroundPosition: 'left' }}
        //   source={require('../assets/images/splash-old.png')}
        // />
      );
    }
    // this.setTableData().then(r => {if(r) {
    // console.log(state.tableData);

    // }
    // }
    // );
    return null
  }
}


const styles = StyleSheet.create({
  // reused START
  backgroundColor: {
    width: 'auto',
    height: '100%',
    backgroundColor: '#010101',
  },

  viewBox: {
    width: '100%',
    top: '10%',
    alignItems: 'center',
    marginBottom: 200,
  },

  fullWidthRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 33,
  },

  ninty: {
    alignItems: 'center',
    width: '90%',
  },

  fontSmGrey: {
    fontSize: 11,
    color: '#8F9083',
    textAlign: 'center',
    fontFamily: 'liberationSans'
  },

  fontSmWhite: {
    fontSize: 11,
    color: 'white',
    textAlign: 'left',
    fontFamily: 'liberationSans-Bold'
  },

  fontMdWhite: {
    fontSize: 17,
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'liberationSans'
  },

  // reused END
  col1: {
    width: 180
  },

  cols: {
    width: 60
  },

  fontLgWhite: {
    fontSize: 29,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'liberationSans-Bold'
  },

  weekSlider: {
    marginTop: 42,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 196,
  },

  shiftSelector: {
    width: 218,
    height: 43,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D8D8D8',
    borderRadius: 8,
  },

  availHours: {
    width: 151,
    height: 43,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#01E23B',
    borderRadius: 8,
    marginRight: 17,
  },

  schedHours: {
    width: 151,
    height: 43,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8E71C',
    borderRadius: 8,
  },

  buttonFont: {
    fontSize: 17,
    alignSelf: 'center',
    color: '#000000',
    fontFamily: 'liberationSans-Bold'
  },

  clockLabels: {
    flexDirection: 'row',
    width: 180,
  },

  fontAnd101: {
    width: 45,
    fontSize: 11,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Android101',
    marginLeft: 10,
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
