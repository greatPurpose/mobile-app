import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {Circle, Path, Rect} from 'react-native-svg';

export default class ExitSVG extends React.Component {
  render() {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          { alignItems: 'center', justifyContent: 'center' },
        ]}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="#fdfdfd"
          viewBox="0 0 512 512">
          <Path d="M384 320v-64h-160v-64h160v-64l96 96zM352 288v128h-160v96l-192-96v-416h352v160h-32v-128h-256l128 64v288h128v-96z"/>
        </Svg>
      </View>
    );
  }
}
