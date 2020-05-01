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
  TouchableOpacity, Dimensions,
  ScrollView,
} from 'react-native';
import { withApollo } from 'react-apollo';
import BottomNav from '../components/BottomNav';
import colors from '../components/Colors';
import commonStyles from "../theme/CommonStyles";
import ExchangeSVG from "../assets/icons/exchangeIco";
import OnlineSVG from "../assets/icons/onlineIco";
import AsyncStorage from "@react-native-community/async-storage";
import gql from "graphql-tag";
import LoadingOverlay from "../components/Loading";
import {
  yesterday,
  lastDayOfLastWeek,
  firstDayOfThisWeek,
  lastDayOfThisWeek,
  firstDayOfLastWeek,
  firstDayOfThisMonth,
  lastDayOfThisMonth,
  firstDayOfLastMonth,
  lastDayOfLastMonth,
  firstDayOfThisYear,
  lastDayOfThisYear,
  firstDayOfLastYear,
  lastDayOfLastYear
} from "../components/DateShifts";
import dayjs from "dayjs";

const getActiveInteractions = gql`
  query getActiveInteractions ($aClone_uuid: uuid!){
    interaction (where: {bot:{_eq: $aClone_uuid}, active:{_eq: true}}){
        id
    }
  }
`;

const getInteractionsForToday = gql `
    query getYesterdayInteractions($aClone_uuid: uuid!, $today: date!) {
        interaction(where: {bot: {_eq: $aClone_uuid}, _and: {created_at: {_gte: $today}}}) {
            id
            income
        }
    }
`;

const getInteractionsBetween = gql `
    query getYesterdayInteractions($aClone_uuid: uuid!, $start: date!, $end: date!) {
        interaction(where: {bot: {_eq: $aClone_uuid}, _and: {created_at: {_gte: $start, _lt: $end}}}) {
            id
            income
        }
    }
`;

const today = new Date();

class TrackerScreen extends Component {
  static navigationOptions = {
    headerShown: false,
    visible: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      bx1: '',
      user: {},
      aClone: {
        name: '',
        UUID: "",
        earnings: 0
      },
      active_interaction: 0,
      weeklyChange: 0,
      dailyChange: 0,
      monthlyChange: 0,
      yearlyChange: 0,
    };
  }

  goToMain = () => {
    this.props.navigation.navigate('MyBot')
  };

  _getUser = async () => {
    let user = null;
    try {
      user = await AsyncStorage.getItem('userToken');
      return JSON.parse(user)
    } catch (e) {
      return null;
    }
  };

  _getaClone = async () => {
    let aClone = null;
    try {
      aClone = await AsyncStorage.getItem('aClone');
      return JSON.parse(aClone)
    } catch (e) {
      return null;
    }
  };

  _getActive = (uuid) => {
    this._setLoading(true);
    this.props.client.query({
      query: getActiveInteractions,
      variables: {
        aClone_uuid: uuid
      }
    }).then((data) => {
      if (data) {
        this._setLoading(data.loading);
        if (data.data.interaction.length > 0){
          return data.data.interaction.length
        }else{
          return 0
        }
      }
      })
  };

  _getFormatedDate = (date) => {
    let month = (date.getMonth() + 1);
    let day = date.getDate();
    let year = date.getFullYear();
    if (month <= 9){
      month = '0' + month
    }
    if (day <= 9){
      day = '0' + day
    }
    return year + "-" + month + "-" + day;
  };

  _getChangeOverYesterday(uuid) {
    let todaysInteractions = 0;
    let yesterdaysInteractions = 0;
    this.props.client.query({
      query: getInteractionsForToday,
      variables: {
        aClone_uuid: uuid,
        today: this._getFormatedDate(new Date())
      }
    }).then((data) => {
      if(data){
        todaysInteractions = data.data.interaction.length;
      }else{
        todaysInteractions = 0
      }
      this.props.client.query({
        query: getInteractionsBetween,
        variables: {
          aClone_uuid: uuid,
          start: this._getFormatedDate(yesterday()),
          end: this._getFormatedDate(new Date())
        }
      }).then((data) => {
        if(data){
          yesterdaysInteractions = data.data.interaction.length;
        } else {
          yesterdaysInteractions = 0;
        }
        this.setState({dailyChange: (todaysInteractions - yesterdaysInteractions)})
      });
    });
  }

  _getChangeOverLastWeek(uuid) {
    let thisWeekInteractions = 0;
    let lastWeekInteractions = 0;

    this.props.client.query({
      query: getInteractionsBetween,
      variables: {
        aClone_uuid: uuid,
        start: this._getFormatedDate(firstDayOfThisWeek()),
        end: this._getFormatedDate(lastDayOfThisWeek())
      }
    }).then((data) => {
      if(data){
        thisWeekInteractions = data.data.interaction.length;
        this.props.client.query({
          query: getInteractionsBetween,
          variables: {
            aClone_uuid: uuid,
            start: this._getFormatedDate(firstDayOfLastWeek()),
            end: this._getFormatedDate(lastDayOfLastWeek())
          }
        }).then((data) => {
          if(data){
            lastWeekInteractions = data.data.interaction.length;
            this.setState({weeklyChange: thisWeekInteractions - lastWeekInteractions});
          } else {
            this.setState({weeklyChange: thisWeekInteractions});
          }
        });
      }else {
        thisWeekInteractions = 0;
        this.props.client.query({
          query: getInteractionsBetween,
          variables: {
            aClone_uuid: uuid,
            start: this._getFormatedDate(firstDayOfLastWeek()),
            end: this._getFormatedDate(lastDayOfLastWeek())
          }
        }).then((data) => {
          if(data){
            this.setState({weeklyChange: thisWeekInteractions - lastWeekInteractions});
          }
        });
      }
    });
  }

  _getChangeOverLastMonth(uuid) {
    let thisMonthInteractions = 0;
    let lastMonthInteractions = 0;

    this.props.client.query({
      query: getInteractionsBetween,
      variables: {
        aClone_uuid: uuid,
        start: this._getFormatedDate(firstDayOfThisMonth()),
        end: this._getFormatedDate(lastDayOfThisMonth())
      }
    }).then((data) => {
      if(data){
        thisMonthInteractions = data.data.interaction.length;
      }else {
        thisMonthInteractions = 0;
      }
      this.props.client.query({
        query: getInteractionsBetween,
        variables: {
          aClone_uuid: uuid,
          start: this._getFormatedDate(firstDayOfLastMonth()),
          end: this._getFormatedDate(lastDayOfLastMonth())
        }
      }).then((data) => {
        if(data){
          lastMonthInteractions = data.data.interaction.length;
          this.setState({monthlyChange: thisMonthInteractions - lastMonthInteractions});
        } else {
          this.setState({monthlyChange: thisMonthInteractions});
        }
      });
    });
  }

  _getChangeOverLastYear(uuid) {
    let thisYearsInteractions = 0;
    let lastYearsInteractions = 0;

    this.props.client.query({
      query: getInteractionsBetween,
      variables: {
        aClone_uuid: uuid,
        start: this._getFormatedDate(firstDayOfThisYear()),
        end: this._getFormatedDate(lastDayOfThisYear())
      }
    }).then((data) => {
      if(data){
        thisYearsInteractions = data.data.interaction.length;
      }else {
        thisYearsInteractions = 0;
      }
      this.props.client.query({
        query: getInteractionsBetween,
        variables: {
          aClone_uuid: uuid,
          start: this._getFormatedDate(firstDayOfLastYear()),
          end: this._getFormatedDate(lastDayOfLastYear())
        }
      }).then((data) => {
        if(data){
          lastYearsInteractions = data.data.interaction.length;
          this.setState({yearlyChange: thisYearsInteractions - lastYearsInteractions});
        } else {
          this.setState({yearlyChange: thisYearsInteractions});
        }
      });
    });
  }

  _setLoading(visible) {
    this.setState({loading: visible})
  }

  componentDidMount(): void {
    this._getUser().then(r => {this.setState({user: r})});
    this._getaClone().then(r => {
      this.setState({aClone: r});
      if(r.UUID) {
        this.setState({active_interaction: this._getActive(r.UUID)});
        this._getChangeOverLastWeek(r.UUID);
        this._getChangeOverYesterday(r.UUID);
        this._getChangeOverLastMonth(r.UUID);
        this._getChangeOverLastYear(r.UUID)
      }
    });
  }

  render() {
    // ToDo: Stub out Advanced Tracker
    const { navigate } = this.props.navigation;
    const active = this.state.active_interaction;
    const earnings = () => { if(this.state.aClone){return this.state.aClone.earnings}else{return 0}};

    return (
        <View style={[{ height: '100%', width: '100%' }]}>
          <ImageBackground
            style={{ width: '100%', height: '100%', backgroundPosition: 'left', position: 'absolute' }}
            source={require('../assets/images/SkyLineBGdarkteal.png')} />
          <View style={[{ height: '100%', width: '100%' }]}>
          <ScrollView >
            <LoadingOverlay modalVisible={this.state.loading}/>
            <View style={[{position: 'absolute', top: 40, left: 40}]}>
              <TouchableOpacity style={[commonStyles.backicon, {width:64,height:64}]} onPress={this.goToMain}>
                <Image style={commonStyles.backbtn} source={require('../assets/backbtn.png')} />
              </TouchableOpacity>
            </View>
            <View style={styles.viewBox}>
              <View style={[styles.ninty, {}]}>
                <Text style={[styles.colorWhite, styles.apexMk2, {marginTop: 20, marginBottom: 20}]}>Analytics</Text>
                <View style={[styles.fullWidthRow, {marginBottom: 20}]}>
                  <View style={[{width: '50%'}]}>
                    <Text style={[styles.colorWhite, {}]}>Cumulative Pay</Text>
                  </View>
                  <View style={[styles.fullWidthRow, {width: '50%'}]}>
                    {/*ToDo: connect data*/}
                    <Text style={[styles.colorWhite, {marginRight: 6}]}>{active}</Text>
                    <Text style={[styles.colorWhite, {}]}>activity interactions today</Text>
                  </View>
                </View>
                <View style={[styles.fullWidthRow, {marginBottom: 22}]}>
                  <View style={[styles.oneThirdBox, {}]}>
                    {/*ToDo: connect data*/}
                    <Text style={[styles.colorWhite, {}]}>${earnings()}</Text>
                  </View>
                  <View style={[styles.oneThirdBox, {}]}>
                    <Text style={[styles.colorWhite, {}]}>USD</Text>
                  </View>
                  <View style={[styles.oneThirdBox, {height: 24, width: 24}]}>
                    <ExchangeSVG />
                  </View>
                </View>
                <View style={[styles.fullWidthRow, {marginBottom: 10}]}>
                  <View style={[styles.oneThirdBox, {}]}>
                    <Text style={[styles.colorWhite, {}]}>Day</Text>
                  </View>
                  <View style={[styles.oneThirdBox, {}]}>
                    <Text style={[styles.colorWhite, {}]}>Week</Text>
                  </View>
                  <View style={[styles.oneThirdBox, {}]}>
                    <Text style={[styles.colorWhite, {}]}>Month</Text>
                  </View>
                </View>
                <View style={[styles.fullWidthRow, {marginBottom: 33}]}>
                  <View style={[styles.oneThirdBox, {}]}>
                    {/*ToDo: connect data*/}
                    <Text style={[styles.colorWhite, {}]}>{this.state.dailyChange}</Text>
                  </View>
                  <View style={[styles.oneThirdBox, {}]}>
                    {/*ToDo: connect data*/}
                    <Text style={[styles.colorWhite, {}]}>{this.state.weeklyChange}</Text>
                  </View>
                  <View style={[styles.oneThirdBox, {}]}>
                    {/*ToDo: connect data*/}
                    <Text style={[styles.colorWhite, {}]}>{this.state.monthlyChange}</Text>
                  </View>
                </View>
                <View style={[styles.fullWidthRow, {}]}>
                  <View style={[{height: 24, width: 24}]}>
                    <OnlineSVG />
                  </View>
                  <View style={[{marginLeft: 20}]}>
                    <Text style={[styles.colorWhite, {marginTop: -7}]}>Shift Ended</Text>
                    <Text style={[styles.colorWhite, {}]}>As of 12:03 EDT PM 5-23-2019</Text>
                  </View>
                </View>
                <View style={[styles.fullWidthRow, {}]}>
                  <View style={[styles.oneThirdBox, {}]}>
                    <Text style={[styles.colorWhite, {}]}>Shift Open</Text>
                  </View>
                  <View style={[styles.oneThirdBox, {}]}>
                    <Text style={[styles.colorWhite, {}]}>Shift Close</Text>
                  </View>
                  <View style={[styles.oneThirdBox, {}]}>
                    <Text style={[styles.colorWhite, {}]}>Volume</Text>
                  </View>
                </View>
                <Image source={require('../assets/images/graph.png')} style={[{marginTop: -20}]}/>
                {/* ToDo: Table placeholder (hidden) */}
                <View style={[{width: '100%', alignItems: 'flex-end'}]}>
                  <Text style={[styles.colorWhite, {marginTop: -40}]}>Advanced Data</Text>
                </View>
              </View>
            </View>
          </ScrollView>
          <BottomNav style={[{position: 'absolute', bottom:0}]} navigate={navigate} active={''} />
        </View>
        </View>
    );
  }
}

export default withApollo(TrackerScreen);

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
function wp (percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const styles = StyleSheet.create({
  viewBox: {
    width: '100%',
    height: 'auto',
    top: '10%',
    alignItems: 'center',
  },

  ninty: {
    alignItems: 'center',
    width: '90%',
  },

  colorWhite: {
    color:'#fdfdfd',
    fontFamily: 'liberationSans',
  },

  liberationSans: {
    fontFamily: 'liberationSans',
  },

  apexMk2: {
    alignSelf: 'flex-start',
    fontFamily: 'ApexMk2-Regular',
    textTransform: 'uppercase',
    letterSpacing: 12,
  },

  imageTop: {
    marginTop: 20,
    marginBottom: 50,
    height: 105,
    width: 103,
  },

  lgFtEa19: {
    fontFamily: 'Future_Earth_V2',
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

  fullWidthRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 22,
  },

  oneThirdBox: {
    width: '30%',
    alignItems: 'center',
  },
});
