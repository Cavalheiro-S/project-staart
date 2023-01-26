import { ArrowForwardIosOutlined, ComputerOutlined, LockClockOutlined, TimerOutlined } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Heading } from "../../components/Heading"
import { Loading } from "../../components/Loading"
import { Text } from "../../components/Text"
import { Course, Journey } from "../../interfaces"
import { api } from "../../services/axios"
import { returnColorByJourneyTitle } from "../../utils"
import { CourseCard } from "./components/CurseCard"
import { CourseBanner } from "./components/CourseBanner"
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material"
import { AccordionStyled } from "../../components/Accordion"


export const JourneyPage = () => {

    const { id } = useParams<{ id: string }>();
    const [journey, setJourney] = useState<Journey>();
    const [courses, setCourses] = useState<Course[]>();
    const [courseSelected, setCourseSelected] = useState<Course>({} as Course);
    const [expanded, setExpanded] = useState<string | false>(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadJourney = async () => {
            try {
                setLoading(true);
                const { data } = await api.get<Journey>(`/journeys/${id}`);
                setJourney(data);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
        const loadCourses = async () => {
            try {
                setLoading(true);
                const { data } = await api.get<Course[]>(`/journeys/${id}/courses`);
                setCourses(data);
                data.length > 0 && setCourseSelected(data[0]);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
        loadJourney();
        loadCourses();
    }, [])


    const courseSelectedHandler = (course: Course) => {
        setCourseSelected(course);
    }


    const renderCourseList = () => {
        return (
            <div className=" hidden md:flex flex-col flex-1  max-h-96 overflow-y-scroll col-start-1">
                {courses?.map((course, index) => (
                    <CourseCard
                        onClick={() => courseSelectedHandler(course)}
                        className={courseSelected?.id === course.id ? "bg-primaryHover" : ""}
                        key={index}
                        course={course} />

                ))}
            </div>
        )
    }

    return loading ? <Loading /> : (
        <div className="flex flex-col gap-4 md:grid md:grid-cols-3 grid-rows-2">
            <div className="flex flex-col col-span-1 row-start-1 gap-4">
                <div>
                    {journey?.medias.thumb && <img src={journey?.medias.thumb} className="w-12 md:block" alt="thumb" />}
                    <Heading className={returnColorByJourneyTitle(journey?.title ?? "")}>{journey?.title}</Heading>
                </div>
                <div>
                    <Heading size="sm" className="text-font">O que você vai aprender ?</Heading>
                    <Text className="text-gray-500 max-w-md">{journey?.description}</Text>
                </div>
                <div className="flex gap-4">
                    <div className="flex gap-4 items-center text-font">
                        <ComputerOutlined />
                        <div className="flex flex-col">
                            <Text>Total de cursos</Text>
                            <Heading size="sm" className="text-font">{journey?.coursesID.length}</Heading>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center text-font">
                        <TimerOutlined />
                        <div className="flex flex-col">
                            <Text>Tempo estimado</Text>
                            <Heading size="sm" className="text-font">13h 20min</Heading>
                        </div>
                    </div>
                </div>
            </div>
            {renderCourseList()}
            <div className=" md:ml-20 col-start-1 md:col-start-2 md:row-start-1">
                <CourseBanner course={courseSelected} />
            </div>
        </div>
    )

}