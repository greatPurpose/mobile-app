import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, Image} from 'react-native';
import Video from 'react-native-video';

class LoadingOverlay extends Component {
  // state = {
  //   modalVisible: false,
  // };
  //
  // setModalVisible(visible) {
  //   this.setState({modalVisible: visible});
  // }

  render() {
    return (
      <View style={[{marginTop: 22}]}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.props.modalVisible}>
          <View style={[{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.8)'}]}>
            <View style={[{height: 120, width: 120}]}>
            <Image source={require('../assets/images/loading.gif')} style={[{width: 'auto', height: '100%'}]} resizeMode="contain"/>
            </View>
            <Text style={[{textAlign: 'center', color: '#FDFDFD'}]}>Loading...</Text>
          </View>
        </Modal>
      </View>
    );
  }
}

export default LoadingOverlay;
