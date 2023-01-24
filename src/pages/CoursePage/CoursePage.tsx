import { AccessTimeOutlined, ArrowForwardIosOutlined, CalendarTodayOutlined, PlayCircleOutlineOutlined, SchoolOutlined } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Heading } from "../../components/Heading"
import { Text } from "../../components/Text"
import { Course } from "../../interfaces"
import { api } from "../../services/axios"
import { toTimeString } from "../../utils"
import { CourseBanner } from "../JourneyPage/components/CourseBanner"

interface ModulesFilled {
    modules: {
        title: string,
        lessons: {
            id: string,
            title: string,
            duration: number,
            description: string,
            extras: {},
            status: string
        }[]
    }[]
}

export const CoursePage = () => {

    const [course, setCourse] = useState<Course>({} as Course);
    const [modulesLesson, setModulesLesson] = useState<ModulesFilled>({} as ModulesFilled);
    const [expanded, setExpanded] = useState<string | false>(false);
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        const loadCourse = async () => {
            try {
                const { data } = await api.get<Course>(`/courses/${id}`);
                setCourse(data);
            }
            catch (error) {
                console.log(error);
            }
        }

        const loadModulesLesson = async () => {
            try {
                const { data } = await api.get<ModulesFilled>(`/lessons/${id}`);
                setModulesLesson(data);
            }
            catch (error) {
                console.log(error);
            }
        }
        loadCourse();
        loadModulesLesson();
    }, [])

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const renderModuleList = () => {
        return course.modules?.map((module, index) => {
            return (
                <Accordion
                    expanded={expanded === module.title}
                    onChange={handleChange(module.title)}
                    className="py-3" key={index}>
                    <AccordionSummary>
                        {expanded === module.title ? <ArrowForwardIosOutlined className="rotate-90" /> : <ArrowForwardIosOutlined />}
                        <Heading className="ml-2" size="sm">{module.title}</Heading>
                    </AccordionSummary>
                    {renderModuleContent(module.title)}
                </Accordion>
            )
        })
    }

    const renderModuleContent = (moduleTitle = "") => {
        const module = modulesLesson.modules?.find(module => module.title === moduleTitle)
        const lessons = module?.lessons.map((lesson, index) => {
            return (
                <Accordion key={index}>
                    <AccordionDetails className="flex ml-12 gap-4 items-center">
                        <PlayCircleOutlineOutlined className="text-primary" />
                        <div className="flex flex-col">
                            <Text>{lesson.title}</Text>
                            <Text className="text-gray-500">{lesson.description}</Text>
                        </div>
                    </AccordionDetails>
                </Accordion>
            )
        })
        return lessons;
    }

    return (
        <div className="flex flex-col gap-6 text-font">
            <CourseBanner course={course} />
            <Heading>Conteúdo do curso:</Heading>
            <div className="flex gap-6">
                <div className="flex gap-2 items-center">
                    <SchoolOutlined />
                    <div className="flex flex-col">
                        <Text className="font-semibold">Instrutor</Text>
                        <Text>{course.instructor}</Text>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <AccessTimeOutlined />
                    <div className="flex flex-col">
                        <Text className="font-semibold">Duração</Text>
                        <Text>{toTimeString(course.duration)}</Text>
                    </div>
                </div>
            </div>
            <div>
                {renderModuleList()}
            </div>
        </div>
    )
}