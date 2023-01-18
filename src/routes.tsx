import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Container } from "./components/Container";
import { Signin } from "./pages/Signin";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Container />}>
                    <Route path="/" element={<Signin />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};