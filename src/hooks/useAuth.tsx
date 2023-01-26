import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut as SignOut,
} from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { auth } from "../services/firebase";

export const useAuth = () => {
    const { currentUser } = auth;
    const { user, loading } = useContext(AuthContext)

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
    return { currentUser, loading, user, signUp, signIn, recoverPassword, signOut };
}