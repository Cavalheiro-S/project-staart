import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebase";

interface AuthContextData {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    const state = {
        user,
        setUser
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user)
                return;
            }
            setUser(null)
        })

        return unsubscribe;
    }, [])

    return (
        <AuthContext.Provider value={state}>
            {children}
        </AuthContext.Provider>
    )
}