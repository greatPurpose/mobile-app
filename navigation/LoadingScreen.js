import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView, Image
} from 'react-native';
import commonStyles from '../theme/CommonStyles';
import { withApollo } from 'react-apollo';
import DefaultDNA from '../assets/anims/dna_default'

class LoadingScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: '#010101'}]}>
        <View style={styles.logo}>
          <Image style={styles.logoImg} source={require('../assets/icon.png')} />
        </View>
        <DefaultDNA />
      </View>
    );
  }
}
export default withApollo(LoadingScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
