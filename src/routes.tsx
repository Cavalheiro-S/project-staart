import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Container } from "./components/Container";
import { LazyLoad } from "./components/LazyLoad";
import { PrivateRoute } from "./components/PrivateRouter";
import { useAuth } from "./hooks/useAuth";

const CoursePage = LazyLoad("Course/CoursePage", "CoursePage");
const CoursesPage = LazyLoad("Courses/Courses", "CoursesPage");
const ForgetPassword = LazyLoad("ForgetPassword/ForgetPassword", "ForgetPassword");
const JourneyList = LazyLoad("JourneyList/JourneyList", "JourneyList");
const JourneyPage = LazyLoad("JourneyPage/JourneyPage","JourneyPage");
const LessonPage = LazyLoad("Lesson/LessonPage", "LessonPage");
const Signin = LazyLoad("Signin/Signin", "Signin");
const Signup = LazyLoad("Signup/Signup", "Signup");

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