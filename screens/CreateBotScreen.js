import React from 'react';
import {
  Alert,
  GoogleSignin,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import commonStyles from '../theme/CommonStyles';
import {AccessToken, GraphRequest, GraphRequestManager, LoginManager} from 'react-native-fbsdk';
import {ScrollView} from 'react-native-gesture-handler';
import {withApollo} from 'react-apollo';
import gql from 'graphql-tag';
import UUIDGenerator from 'react-native-uuid-generator';

const Check_Bots = gql`
    query checkBots ($user_id: Int!){
        bot(where: {controller: {_eq: $user_id}}) {
            UUID
        }
    }
`;

const Insert_Bot = gql`
  mutation ( $UUID: uuid!, $name: String!, $user_id: Int!){
      insert_bot(objects: [{
          UUID: $UUID,
          name: $name,
          controller: $user_id,
          type: 1
      }]
      )
      {
          returning {
              UUID
          }
      }
  }
`;

class CreateBotScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: true,
      botName: '',
      UUID: ''
    };
  }

  async componentDidMount() {
    UUIDGenerator.getRandomUUID().then((uuid) => {
      console.log(uuid);
      this.setState({
        UUID: uuid
      })
    });
    console.log(this.state.UUID)
  };

  registerMyBot = async () => {
    let botName = this.state.botName;
    try {
        let user = await this.getUser();
        console.log(user);
        try {
          await this.props.client.mutate({
            mutation: Insert_Bot,
            variables: {
              UUID: this.state.UUID,
              name: botName,
              user_id: user.id,
            },
          });
          this.gotomybot()
        } catch (e) {
          // ToDo: Logging
          Alert.alert(
            'Error',
            `${e}`,
          )
        }
    } catch (e) {
      Alert.alert(
        'Error',
        `${e}`
      );
    }
  };

  userHasBot = async () => {
    try {
      let user = await this.getUser();
      console.log("User: " + user);
      this.props.client.query({
        query: Check_Bots,
        variables: {
          user_id: user.id
        }
      }).then((data) => {
        try {
          if (data && data.data.bot.length > 0) {
            this.gotomybot()
          }
        }
        catch (e) {
          console.log(e)
        }
        },
        (e) => {
          Alert.alert(
            'Error',
            `${e}`
          )
        }
      );
    } catch (e) {
      console.error(e)
    }
  };

  gotoback = () => {
    this.props.navigation.navigate('Invite')
  };

  gotomybot = () => {
    this.props.navigation.navigate('MyBot')
  };

  getUser = async () => {
    console.log("Logged in with: " + await AsyncStorage.getItem("LoginWith"));
    console.log("User Data: " +  await AsyncStorage.getItem('UserData'));
    const CurrUser = await AsyncStorage.getItem('userToken');
    console.log("Current User: " + CurrUser);
    if (CurrUser !== null) {
      console.log("Current User: " + JSON.parse(CurrUser));
      return await JSON.parse(CurrUser)
    }
    Alert.alert(
      'Error',
      'CurrUser =' + CurrUser
    );
  };

  render() {
    const { navigate } = this.props.navigation;
    this.userHasBot().then(r => {if(r){this.gotomybot}});
    return (
      <View style={commonStyles.container}>
        <ImageBackground source={require('../assets/bg.png')} style={commonStyles.bg_image} />
        <TouchableOpacity style={[commonStyles.backbtn, {}]} onPress={this.gotoback}>
          <Image style={[commonStyles.backbtn, {marginTop: -7}]} source={require('../assets/backbtn.png')} />
        </TouchableOpacity>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={10}>
          <View style={styles.inner_text}>
            <Text style={styles.bot_text}>Create Your Bot</Text>
            <View style={styles.text_wrap}>
              <Text style={styles.upload_text}>Upload Your Profile Picture</Text>
            </View>
          </View>
          <View style={styles.shape}>
            <Image style={styles.shape_icon} source={require('../assets/photocamera.png')} />
          </View>
          <ScrollView>
            <View style={styles.input_text}>
              <TextInput style={styles.inputField} placeholder="Name Your Bot" placeholderTextColor="#fff" />
            </View>
            <View style={styles.btn}>
              <TouchableOpacity
                onPress={() => this.registerMyBot()} >
                <Text style={styles.contbtn} >Register My Bot</Text></TouchableOpacity>
              {/* <TouchableOpacity><Text style={commonStyles.contbtn} onPress={this._signOutAsync}>Sign Out</Text></TouchableOpacity> */}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default withApollo(CreateBotScreen);

const styles = StyleSheet.create({
  inner_text: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 15
  },
  bot_text: {
    fontSize: 14,
    letterSpacing: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#fff',
  },
  text_wrap: {
    marginVertical: 20

  },
  upload_text: {
    fontSize: 11,
    textAlign: 'center',
    color: '#9B9B9B',
    marginTop: 8,
    lineHeight: 14,
  },
  shape: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shape_icon: {
    width: 90,
    height: 80,
    marginBottom: 20,
    marginVertical: 20
  },
  input_text: {
    justifyContent: 'center',
    alignItems: 'stretch',
    marginBottom: 20,
    marginVertical: 20
  },
  inputField: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    color: '#fff',
  },
  btn: {
    justifyContent: 'flex-end',
    flex: 0.95
  },
  contbtn: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
    backgroundColor: '#1B9A6A',
    borderRadius: 30,
    paddingVertical: 20,
    marginBottom: 15,
  }
});
