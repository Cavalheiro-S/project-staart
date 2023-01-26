import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Header } from "./Header/Header";
import { Loading } from "./Loading";

export const Container = () => {
    const { loading } = useAuth();
    return loading ? <Loading /> : (
        <>
            <Header />
            <main className="h-full px-3 md:px-20 py-8 md:py-12">
                <Outlet />
            </main>
        </>
    )
}