import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Container } from "./components/Container";
import { PrivateRoute } from "./components/PrivateRouter";
import { useAuth } from "./hooks/useAuth";
import { CoursePage } from "./pages/Course/CoursePage";
import { CoursesPage } from "./pages/Courses/Courses";
import { ForgetPassword } from "./pages/ForgetPassword/ForgetPassword";
import { JourneyList } from "./pages/JourneyList/JourneyList";
import { JourneyPage } from "./pages/JourneyPage/JourneyPage";
import { Signin } from "./pages/Signin/Signin";
import { Signup } from "./pages/Signup/Signup";

export const AppRoutes = () => {

    const { currentUser } = useAuth();

    const renderMainPage = () => {
        if (currentUser)
            return <Navigate to="/journeys" />

        return <Navigate to="/signin" />
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Container />}>
                    <Route path="/" element={renderMainPage()} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgetPassword" element={<ForgetPassword />} />
                    <Route path="/journey/:id" element={
                        <PrivateRoute>
                            <JourneyPage />
                        </PrivateRoute>
                    } />
                    <Route path="/journey/:journeyId/course/:courseId/:from" element={
                        <PrivateRoute>
                            <CoursePage />
                        </PrivateRoute>
                    } />
                    <Route path="/journeys" element={
                        <PrivateRoute>
                            <JourneyList />
                        </PrivateRoute>
                    } />
                    <Route path="/courses" element={
                        <PrivateRoute>
                            <CoursesPage />
                        </PrivateRoute>
                    } />
                    <Route path="*" element={<Navigate to="/journeys" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};