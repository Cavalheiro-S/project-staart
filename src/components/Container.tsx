import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const Container = () => {

    return (
        <>
            <Header />
            <main className="h-full px-3 md:px-20 py-3 md:py-12">
                <Outlet />
            </main>
        </>

    )
}