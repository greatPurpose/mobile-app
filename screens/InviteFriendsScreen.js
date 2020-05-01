import React from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import commonStyles from '../theme/CommonStyles';
import { ScrollView } from 'react-native-gesture-handler';
// import { underline } from 'ansi-colors';
import SMSSvg from "../assets/icons/smsIco";
import FacebookSVG from "../assets/icons/facebookIco"
import TwitterSVG from "../assets/icons/twiterIco"
import LinkedInSVG from "../assets/icons/linkedInIco"
import { ShareDialog } from 'react-native-fbsdk';

const shareLinkContent = {
  contentType: 'link',
  contentUrl: "https://aphid.io",
  contentDescription: 'Wow, check this out!',
};

export default class InviteFriendsScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props)
  }

  shareLinkOnFaceBook = ()=> {
    let tmp = this;
    ShareDialog.canShow(this.state.shareLinkContent).then(
      function(canShow) {
        if (canShow) {
          return ShareDialog.show(tmp.state.shareLinkContent);
        }
      }
    ).then(
      function(result) {
        if (result.isCancelled) {
          console.log('Share cancelled');
        } else {
          console.log('Share success with postId: '
            + result.postId);
        }
      },
      function(error) {
        console.log('Share fail with error: ' + error);
      }
    );
  };

  gotobot = () => {
    this.props.navigation.navigate('CreateBot')
  };
  gotoback = () => {
    this.props.navigation.goBack()
  };

  render() {
    return (
      <View style={{ flex: 1 }} >
        <ImageBackground source={require('../assets/bg.png')} style={commonStyles.bg_image}/>
        <ScrollView contentContainerStyle={styles.container}>
          <TouchableOpacity style={commonStyles.backicon} onPress={this.gotoback}>
            <Image style={commonStyles.backbtn} source={require('../assets/backbtn.png')} />
          </TouchableOpacity>
          <View style={styles.invite_wrap}>
            <Text style={[styles.invite_text, {paddingBottom: 0, marginBottom: 0}]}>Invite</Text>
            <Text style={[styles.invite_text, {}]}>Friends</Text>
          </View>
          <View style={styles.invite_icon}>
            <TouchableOpacity>
              <View style={[styles.icons, {}]}>
                <SMSSvg />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.shareLinkOnFaceBook}>
              <View style={[styles.icons, {}]}>
                <FacebookSVG />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={[styles.icons, {}]}>
                <TwitterSVG />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={[styles.icons, {}]}>
                <LinkedInSVG />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.btn}>
            <TouchableOpacity onPress={this.gotobot}>
              <Text style={styles.contbtn} >Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );

  }
}


const styles = StyleSheet.create({
  invite_wrap: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  skip: {
    textAlign: 'right',
    color: '#fff',
    textDecorationLine: 'underline',
  },
  invite_text: {
    textAlign: 'center',
    letterSpacing: 16,
    textTransform: 'uppercase',
    fontSize: 18,
    color: '#fdfdfd',
    marginBottom: 40,
    lineHeight: 24,

  },
  invite_icon: {
    alignItems: 'center',
  },
  icons: {
    width: 45,
    height: 45,
    marginBottom: 70
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  btn: {
    justifyContent: 'flex-end',
    flex: 0.95,
    backgroundColor: '#1B9A6A',
    borderRadius: 30,
  },
  contbtn: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 0,
    color: '#fff',
    paddingVertical: 10,
  }
});
