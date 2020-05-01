import { LoginManager, AccessToken  } from 'react-native-fbsdk';
import { firebase } from '@react-native-firebase/auth';

export async function fb_sign_in() {
    // Login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
        throw new Error('User cancelled the login process');
    }

    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
        throw new Error('Something went wrong obtaining access token');
    }

    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
    await firebase.auth().signInWithCredential(credential);
}
