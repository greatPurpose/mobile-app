import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {Circle, Path, Rect} from 'react-native-svg';

export default class OnlineSVG extends React.Component {
  render() {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          { alignItems: 'center', justifyContent: 'center' },
        ]}>
        <Svg
          fill="#04E024"
          version="1.1"
          height="100%"
          width="100%"
          viewBox="0 0 512 512">
          <Circle cx={256} cy={256} r={256}/>
        </Svg>
      </View>
    );
  }
}
