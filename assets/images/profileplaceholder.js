import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {Circle, Path, Rect} from 'react-native-svg';

export default class SvgExample extends React.Component {
  render() {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          { alignItems: 'center', justifyContent: 'center' },
        ]}>
        <Svg
          viewBox="0 0 50 50"
          height="100%"
          width="100%"
          fill="#FFFFFF">
          <Path d="m 25,48.077 c -5.924,0 -11.31,-2.252 -15.396,-5.921 2.254,-5.362 7.492,-8.267 15.373,-8.267 7.889,0 13.139,3.044 15.408,8.418 -4.084,3.659 -9.471,5.77 -15.385,5.77 m 0.278,-35.3 c 4.927,0 8.611,3.812 8.611,8.878 0,5.21 -3.875,9.456 -8.611,9.456 -4.736,0 -8.611,-4.246 -8.611,-9.456 0,-5.066 3.684,-8.878 8.611,-8.878 M 25,0 C 11.193,0 0,11.193 0,25 1.1737557,39.199004 11.141922,49.827598 25,50 38.778878,49.362704 49.538329,38.925101 50,25 50,11.193 38.807,0 25,0" />
        </Svg>
      </View>
    );
  }
}
