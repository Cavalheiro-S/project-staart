import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Container } from "./components/Container";
import { CoursePage } from "./pages/CoursePage/CoursePage";
import { ForgetPassword } from "./pages/ForgetPassword/ForgetPassword";
import { JourneyList } from "./pages/JourneyList/JourneyList";
import { JourneyPage } from "./pages/JourneyPage/JourneyPage";
import { Signin } from "./pages/Signin/Signin";
import { Signup } from "./pages/Signup/Signup";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Container />}>
                    <Route path="/" element={<Signin />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgetPassword" element={<ForgetPassword />} />
                    <Route path="/journey/:id" element={<JourneyPage />} />
                    <Route path="/course/:id" element={<CoursePage />} />
                    <Route path="/journeys" element={<JourneyList />} />
                    <Route path="*" element={<Navigate to="/journeys" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};