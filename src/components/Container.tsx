import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Header } from "./Header/Header";
import { Loading } from "./Loading";

export const Container = () => {
    const { loading } = useAuth();
    return loading ? <Loading /> : (
        <>
            <Header />
            <main className="h-full">
                <Outlet />
            </main>
        </>
    )
}