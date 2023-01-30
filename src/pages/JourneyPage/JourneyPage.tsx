import { ComputerOutlined, TimerOutlined } from "@mui/icons-material"
import { Breadcrumbs } from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Heading } from "../../components/Heading"
import { Loading } from "../../components/Loading"
import { Text } from "../../components/Text"
import { useWindowDimensions } from "../../hooks/useWindowDimensions"
import { Course, Journey } from "../../interfaces"
import { api } from "../../services/axios"
import { CourseCard } from "./components/CourseCard"
import { JourneyBanner } from "./components/JourneyBanner"


export const JourneyPage = () => {

    const { id } = useParams<{ id: string }>();
    const [journey, setJourney] = useState<Journey>();
    const [courses, setCourses] = useState<Course[]>();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { width } = useWindowDimensions();

    useEffect(() => {
        try {
            setLoading(true);
            const loadJourney = async () => {
                setLoading(true);
                const { data } = await api.get<Journey>(`/journeys/${id}`);
                setJourney(data);
            }
            const loadCourses = async () => {
                setLoading(true);
                const { data } = await api.get<Course[]>(`/journeys/${id}/courses`);
                setCourses(data);
            }
            loadJourney();
            loadCourses();
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }, [])

    const renderCourseList = () => {
        const coursesWithLessons = removeCoursesWithNoLessons();
        return (
            <>
                <Heading className="text-font">Cursos da Jornada</Heading>
                <div className="flex flex-col gap-6 w-fit">
                    {coursesWithLessons?.map((course, index) => (
                        <CourseCard
                            onClick={() => navigate(`course/${course.id}`)}
                            key={index}
                            course={course} />

                    ))}
                </div>
            </>
        )
    }


    const removeCoursesWithNoLessons = () => {
        const newCourses = courses?.filter(course => course.modules.length > 0);
        return newCourses;
    }


    return loading ? <Loading /> : (
        <div>
            <JourneyBanner journey={journey ?? {} as Journey} />
            <div className="flex flex-col gap-12 px-4 md:px-20 py-20">
                {width > 768 && (
                    <Breadcrumbs>
                        <Text size="lg" asChild>
                            <Link to="/journeys">Jornadas</Link>
                        </Text>
                        <Text size="lg" className="text-font">Jornada {journey?.title}</Text>
                    </Breadcrumbs>
                )}
                <div className="md:w-1/2">
                    <Heading className="text-font mb-2">O que você vai aprender ?</Heading>
                    <Text className="text-gray-500">{journey?.description}</Text>
                </div>
                {renderCourseList()}
            </div>
        </div >
    )

}