import { ReactElement, Suspense } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "./Loading";

interface RouteProps {
    children: ReactElement
}

export const PrivateRoute = ({ children }: RouteProps) => {
    const { currentUser } = useAuth();
    if (currentUser) return (
        <Suspense fallback={<Loading />}>
            {children}
        </Suspense>
    )
    return <Navigate to="/signin" />
}