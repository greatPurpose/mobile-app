import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import gql from "graphql-tag";

const getUser = gql`
    query getUsers ($user_id: String!){
        users (where: {user_id: {_eq: $user_id}}){
          user_id
          user_login
        }
    }
`;

export async function google_bootstrap() {
    // GoogleSignin.configure({
    //     scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    //     forceConsentPrompt: true,
    //     webClientId: '307488835515-u5delod9jdv23cf97t1f8kju94lk8657.apps.googleusercontent.com', // required
    // });
    await GoogleSignin.configure({
        webClientId: '307488835515-u5delod9jdv23cf97t1f8kju94lk8657.apps.googleusercontent.com', // required
    });
}

export async function google_sign_in() {
    await google_bootstrap()
      .then(
        console.log('Google Boot Strapped')
      )
      .catch(error => {
          if (error.code === 'auth/operation-not-allowed') {
              console.log('Enable google auth in your firebase console.');
          }
          console.error(error);
      });

    const { idToken } = await GoogleSignin.signIn()

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return await auth().signInWithCredential(googleCredential);
}

export async function get_google_user() {
    return await GoogleSignin.getCurrentUser()
}
