import { AppRegistry, Platform } from 'react-native';
import { App } from './App';

AppRegistry.registerComponent('aphid_mobile', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('aphid_mobile', { rootTag });
}

if (Platform.OS === 'android') {
  AppRegistry.registerComponent('aphid', () => App);
}
