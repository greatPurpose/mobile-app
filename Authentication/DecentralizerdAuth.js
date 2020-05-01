import auth from '@react-native-firebase/auth';
import { OreId } from 'eos-auth';

export async function register_decentralized(email, password) {
    try {
        await auth();
    } catch (error) {
        console.error(error.message);
    }
}

export async function sign_in_decentralized(email, password) {
    try {
        await auth();

    } catch (error) {
        console.error(error.message)
    }
}