import { Outlet } from "react-router-dom"
import { Header } from "./Header"

export const Container = () => {
    return (
        <>
            <Header/>
            <main className="h-full px-20 py-12">
                <Outlet />
            </main>
        </>

    )
}