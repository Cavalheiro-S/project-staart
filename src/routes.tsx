import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Container } from "./components/Container";
import { PrivateRoute } from "./components/PrivateRouter";
import { useAuth } from "./hooks/useAuth";
import { Suspense, lazy } from "react";
import { Loading } from "./components/Loading";

const CoursePage = lazy(() => import("./pages/Course/CoursePage").then(module => {
    return { default: module["CoursePage"] }
}));

const CoursesPage = lazy(() => import("./pages/Courses/CoursesPage").then(module => {
    return { default: module["CoursesPage"] }
}));

const ForgetPassword = lazy(() => import("./pages/ForgetPassword/ForgetPassword").then(module => {
    return { default: module["ForgetPassword"] }
}));

const JourneyList = lazy(() => import("./pages/JourneyList/JourneyList").then(module => {
    return { default: module["JourneyList"] }
}));

const JourneyPage = lazy(() => import("./pages/JourneyPage/JourneyPage").then(module => {
    return { default: module["JourneyPage"] }
}));

const LessonPage = lazy(() => import("./pages/Lesson/LessonPage").then(module => {
    return { default: module["LessonPage"] }
}));

const Signin = lazy(() => import("./pages/Signin").then(module => {
    return { default: module["Signin"] }
}));

const Signup = lazy(() => import("./pages/Signup").then(module => {
    return { default: module["Signup"] }
}));

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
                    <Route path="/signin" element={
                        <Suspense fallback={<Loading />}>
                            <Signin />
                        </Suspense>
                    } />
                    <Route path="/signup" element={
                        <Suspense fallback={<Loading />}>
                            <Signup />
                        </Suspense>
                    } />
                    <Route path="/forgetPassword" element={
                        <Suspense fallback={<Loading />}>
                            <ForgetPassword />
                        </Suspense>
                    } />
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
                    <Route path="/lesson/:journeyId/:courseId/:lessonTitle" element={
                        <PrivateRoute>
                            <LessonPage />
                        </PrivateRoute>
                    } />
                    <Route path="*" element={<Navigate to="/journeys" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};