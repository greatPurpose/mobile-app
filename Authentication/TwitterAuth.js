import { NativeModules } from 'react-native';
import { firebase } from '@react-native-firebase/auth';

const { RNTwitterSignIn } = NativeModules;

export async function twitter_bootstrap() {
    await RNTwitterSignIn.init('TWITTER_CONSUMER_KEY', 'TWITTER_CONSUMER_SECRET');
}

export async function twitter_sign_in() {
    const { authToken, authTokenSecret } = await RNTwitterSignIn.login();
    const credential = firebase.auth.TwitterAuthProvider.credential(authToken, authTokenSecret);

    await firebase.auth().signInWithCredential(credential);
}
