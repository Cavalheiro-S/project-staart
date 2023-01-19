import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Container } from "./components/Container";
import { ForgetPassword } from "./pages/ForgetPassword";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Container />}>
                    <Route path="/" element={<Signin />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgetPassword" element={<ForgetPassword />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};