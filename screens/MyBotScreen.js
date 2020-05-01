import React, {Component} from 'react';
// import * as Font from 'expo-font';
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
  Platform,
  SafeAreaView,
} from 'react-native';
import { withApollo } from 'react-apollo';
import AsyncStorage from "@react-native-community/async-storage";
import LinearGradient from 'react-native-linear-gradient';
import BottomNav from '../components/BottomNav';
import StatisticsIcoSVG from "../assets/icons/statsico";
import colors from '../components/Colors';
import CalendarSVG from "../assets/icons/calendar";
import Video from 'react-native-video';
import Carousel from 'react-native-snap-carousel';
import { ENTRIES1 } from '../static/entries';
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import SliderEntry from '../components/SliderEntry'
import gql from "graphql-tag";
import LoadingOverlay from "../components/Loading";
import { get_google_user } from "../Authentication/GoogleAuth";
import auth from '@react-native-firebase/auth';

const SLIDER_1_FIRST_ITEM = 1;

const getAClone = gql`
    query getAClone ($user_id: String!){
        bot (where: {controller: {_eq: $user_id}}){
            earnings
            id
            name
            todays_earnings
            type
            UUID
        }
    }
`;

const getUser = gql`
    query getUsers ($user_id: String!){
        users (where: {user_id: {_eq: $user_id}}){
          user_id
          user_login
        }
    }
`;

const getUsers = gql`
    query getUsers {
        users {
          user_id
          user_login
        }
    }
`;

class MyBotScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      loading: false,
      bx1: '',
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      aClone: {
        name: '',
        todays_earnings: 0
      },
    };
  }

  static navigationOptions = {
    headerShown: false,
    visible: false,
    goBack: '',
    user: ''
  };



  _renderItem = ({item, index}) => {
    return (
    <TouchableOpacity
      onPress={() => {this.onTapIcon(item.to);} }>
      <View style={styles.iconContainer}>
        {item.icon}
      </View>
      <Text style={styles.fontSmWhite}>{item.title}</Text>
    </TouchableOpacity>);
    // <SliderEntry data={item} />;
  };

  _getUser = async (user) => {
    // let user = null;
    // try {
    //   user = auth()._user;
    //   return user.uid
    // } catch (e) {
    //   console.log('Error: ' + e.message);
    //   return null;
    // }
    try {
      const user = await this.props.client.query({
        query: getUser,
        variables: {
          user_id: auth()._user.uid
        }
      })
      return user.data.users
    } catch (error) {
      console.log(error)
    }
  };

  _getaClone = () => {
    this._setLoading(true);
    this.props.client.query({
      query: getAClone,
      variables: {
        user_id: this.state.user
      }
    }).then((data) => {
      if (data) {
        this._setLoading(data.loading);
        if (data.data.bot.length > 0){
          console.log(data.data.bot[0]);
          let bot = data.data.bot[0];
          this._setaClone(bot).then(r => {return bot});
        }
      }
    }).catch(error => {
        console.log(error);
        this._setLoading(false);
    });
    this._setLoading(false);
  };

  _setaClone = async (bot) => {
    try {
      await AsyncStorage.setItem('aClone', JSON.stringify(bot));
    } catch (e) {
      console.log('Error: ' + e.message)
    }
  };

  _setLoading(visible) {
    this.setState({loading: visible})
  }

  componentDidMount(): void {
    this._setLoading(true)
    this._getUser().then(user => {
      if (user.length > 0){
      //   this.setState({'user': r});
      //   this.setState({aClone: this._getaClone()})
        console.log(user)
        this._setLoading(false)
      } else {
        const provider_date = auth()._user.providerData;
        const provider_count = provider_date.length;
        const provider = provider_date.providerId;
        if (provider_count >= 2){
          console.error('Too many providers: provider count is ' + provider_count);
          throw err
        }
        console.log(provider);
        if(provider === 'google.com' ){
          get_google_user().then(user => {console.log(user.user)})
        }
        this._setLoading(false)
        // this._setLoading(false);
        // this.navigate('OptionType');
      }
    });
  }

  navigate(to){
    const { navigate } = this.props.navigation;
    return navigate(to, this.state)
  }
  _goToLogin = () => {
    this.navigate('OptionType')
  };

  onTapIcon = (nav) => {
    this.navigate(nav)
  };


  navIcons (number, title) {
    const { slider1ActiveSlide } = this.state;

    return (
      <View style={styles.exampleContainer}>
        <Carousel
          ref={c => this._slider1Ref = c}
          data={ENTRIES1}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={false}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.8}
          inactiveSlideOpacity={0.7}
          // inactiveSlideShift={20}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={4}
          autoplay={true}
          autoplayDelay={4000}
          autoplayInterval={10000}
          onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
        />
      </View>
    );
  }

  render() {
    // this._getUser();
    const { navigate } = this.props.navigation;
    const todays_earnings = () => { if(this.state.aClone){return this.state.aClone.todays_earnings}else{return 0}};
    const todays_USD = () => {return (todays_earnings() * 0.01)};
    const example1 = this.navIcons(1, 'Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots');
    // const useFocusEffect = () => (
    //   self.useCallback(() => {
    //     const onBackPress = () => {
    //       if (isSelectionModeEnabled()) {
    //         disableSelectionMode();
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     };
    //
    //     BackHandler.addEventListener('hardwareBackPress', onBackPress);
    //
    //     return () =>
    //       BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    //   }, [isSelectionModeEnabled, disableSelectionMode]));
    return (
        <View style={styles.mainContainer}>
          <Video source={require('../assets/images/MyBotScreenBG.mp4')}
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
          <LoadingOverlay modalVisible={this.state.loading}/>
          <View style={styles.viewBox}>
            <View style={styles.ninty}>
              <View style={[styles.marginBSm, {marginTop: 30}]}>
                <Text style={[styles.fontSmGrey, {height: 16}]}>Today you've earned</Text>
              </View>
              <View style={styles.marginBSm}>
                <Text style={[styles.fontLgGreen, {height: 32}]}>${todays_USD()}<Text style={styles.fontWhite}> USD</Text></Text>
              </View>
              <View style={styles.marginBLg}>
                <Text style={[styles.fontLgGreen, {height: 32}]}>{todays_earnings()}<Text style={styles.fontWhite}> aBions</Text></Text>
              </View>
            </View>
            <View style={styles.iconsContainer}>
              { example1 }
            </View>
          </View>
          <View style={[styles.infoContainer, {position: 'absolute', bottom: 90}]}>
            <Text style={styles.font10Grey}>You are known as the
              <Text style={styles.fontBold}> Controller </Text>
              of your aClone. Here is where you'll see the activity, earnings, and statistics</Text>
          </View>
          <BottomNav navigate={navigate} active={'bot'} />
        </View>
    );
  }
}

export default withApollo(MyBotScreen);

const styles = StyleSheet.create({
  backgroundImage: {
    width: 'auto',
    height: '100%',
  },

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

  mainContainer: {
    fontFamily: 'LiberationSans',
    height: '100%',
    width: '100%',
  },

  infoContainer: {
    marginTop: 0,
    marginBottom: 0,
    height: 70,
    justifyContent: 'center',
    // backgroundColor: '#f0bf2890',
  },

  marginBSm: {
    marginBottom: '5%',
  },

  marginBLg: {
    marginBottom: '15%',
  },

  fontBold: {
    fontFamily: 'LiberationSans-Bold',
  },

  width50: {
    width: '50%',
  },

  iconContainer: {
    height: 80,
    marginBottom: '5%',
  },

  icon: {
    width: 60,
    height: 60,
  },

  font10Grey: {
    fontSize: 10,
    color: '#e3af16',
    textAlign: 'center',
  },

  fontSmWhite: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },

  fontSmGrey: {
    fontSize: 11,
    color: '#8F9083',
    textAlign: 'center',
  },

  fontLgGreen: {
    fontSize: 29,
    color: '#1FCE88',
    textAlign: 'center',
    fontFamily: 'LiberationSans-Bold'
  },

  iconsContainer: {
    width: '100%',
  },

  fontWhite: {
    color: 'white',
  },

  safeArea: {
    flex: 1,
    backgroundColor: colors.black
  },

  container: {
    flex: 1,
    backgroundColor: colors.background1
  },

  scrollview: {
    flex: 1
  },

  exampleContainer: {
    paddingVertical: 10,
    height: 180
  },

  exampleContainerDark: {
    backgroundColor: colors.black
  },

  exampleContainerLight: {
    backgroundColor: 'white'
  },

  title: {
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  titleDark: {
    color: colors.black
  },

  subtitle: {
    marginTop: 5,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center'
  },

  slider: {
    marginTop: 15,
    overflow: 'visible' // for custom animations
  },

  sliderContentContainer: {
    paddingVertical: 10 // for custom animation
  },

  paginationContainer: {
    paddingVertical: 8
  },

  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8
  }
});
