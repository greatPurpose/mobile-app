import auth from '@react-native-firebase/auth';

export async function registerEmail(email, password) {
    try {
        await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
        console.error(error.message);
    }
}

export async function sign_in_email(email, password) {
    try {
        await auth().signInWithEmailAndPassword(email, password);

    } catch (error) {
        console.error(error.message)
    }
}
