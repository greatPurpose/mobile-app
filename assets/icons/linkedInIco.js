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
        <Svg width="100%" height="100%" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path d="M41.7857 0H3.20424C1.43638 0 0 1.45328 0 3.23731V41.664C0 43.448 1.43638 44.9013 3.20424 44.9013H41.7857C43.5536 44.9013 45 43.448 45 41.664V3.23731C45 1.45328 43.5536 0 41.7857 0ZM13.6004 38.4868H6.9308V17.0585H13.6105V38.4868H13.6004ZM10.2656 14.1319C8.12612 14.1319 6.39844 12.398 6.39844 10.2732C6.39844 8.14839 8.12612 6.41447 10.2656 6.41447C12.3951 6.41447 14.1328 8.14839 14.1328 10.2732C14.1328 12.408 12.4051 14.1319 10.2656 14.1319ZM38.6016 38.4868H31.9319V28.0633C31.9319 25.5777 31.8817 22.3805 28.4665 22.3805C24.9911 22.3805 24.4587 25.0866 24.4587 27.8829V38.4868H17.7891V17.0585H24.1875V19.9851H24.2779C25.1719 18.3013 27.3516 16.5273 30.596 16.5273C37.346 16.5273 38.6016 20.9673 38.6016 26.7403V38.4868Z" fill="white"/>
        </Svg>
      </View>
    );
  }
}
