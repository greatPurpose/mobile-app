import auth from '@react-native-firebase/auth';

export default function sign_out() {
    auth()
        .signOut()
        .then(() => console.log('User signed out!'));
}