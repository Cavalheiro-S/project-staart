import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Footer } from "./Footer";
import { Header } from "./Header/Header";
import { Loading } from "./Loading";
import { ToTop } from "./ToTop";

export const Container = () => {
    const { loading } = useAuth();
    return loading ? <Loading /> : (
        <>
            <Header />
            <main className="h-full md:pt-[10vh]">
                <Outlet />
            </main>
            <Footer />
            <ToTop />
        </>
    )
}