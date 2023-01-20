import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
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
    return { currentUser, signUp, signIn, recoverPassword };
}