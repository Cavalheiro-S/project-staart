import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface RouteProps {
    children: ReactElement
}

export const PrivateRoute = ({ children }: RouteProps) => {
    const { currentUser } = useAuth();
    if (currentUser) return children
    return <Navigate to="/signin" />
}