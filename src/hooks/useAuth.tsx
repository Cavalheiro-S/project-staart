import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail, 
    signInWithEmailAndPassword, 
    signOut as SignOut,
} from "firebase/auth";
import { auth } from "../services/firebase";

export const useAuth = () => {
    const { currentUser } = auth;

    const signUp = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const recoverPassword = (email: string) => {
        return sendPasswordResetEmail(auth, email);
    }

    const signOut = () => {
        return SignOut(auth);
    }
    return { currentUser, signUp, signIn, recoverPassword, signOut };
}