import { ArrowForwardIosOutlined, CalendarTodayOutlined, PlayCircleOutlineOutlined, SchoolOutlined, TimerOutlined } from "@mui/icons-material";
import { Breadcrumbs } from "@mui/material";
import * as Accordion from '@radix-ui/react-accordion';
import clsx from "clsx";
import moment from "moment";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useParams } from "react-router-dom";
import { Heading } from "../../components/Heading";
import { Loading } from "../../components/Loading";
import { Text } from "../../components/Text";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { Course, Journey } from "../../interfaces";
import { api } from "../../services/axios";
import { toTimeString, verifyTextSize } from "../../utils";

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
    const [loading, setLoading] = useState(true);
    const [journey, setJourney] = useState<Journey>({} as Journey);
    const [modulesLesson, setModulesLesson] = useState<ModulesFilled>({} as ModulesFilled);
    const [expanded, setExpanded] = useState<string[]>([]);
    const { courseId, journeyId, from } = useParams<{
        from?: string,
        courseId: string,
        journeyId: string
    }>()
    const { width } = useWindowDimensions();
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [journeyResponse, courseResponse, modulesLessonResponse] = await Promise.all([
                    api.get<Journey>(`/journeys/${journeyId}`), 
                    api.get<Course>(`/courses/${courseId}`), 
                    api.get<ModulesFilled>(`/lessons/${courseId}`)
                ]);
    
                setJourney(journeyResponse.data);
                setCourse(courseResponse.data);
                setModulesLesson(modulesLessonResponse.data);
    
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);   
            } 
    
        };
    
        loadData();    
    }, []) 

    const renderModuleList = () => {
        return course.modules?.map((module, index) => {
            return (
                <Accordion.Root
                    type="multiple"
                    value={expanded}
                    onValueChange={setExpanded}
                    className="py-3 border-b-2" key={index}>
                    <Accordion.Item value={module.title}>
                        <Accordion.Trigger className="flex py-6 w-full h-full">
                            <ArrowForwardIosOutlined className={clsx("transition", {
                                "rotate-90": expanded.includes(module.title)
                            })} />
                            <Heading className="ml-2" size="sm">{module.title}</Heading>
                        </Accordion.Trigger>
                        <Accordion.Content>
                            {renderModuleContent(module.title)}
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion.Root>
            )
        })
    }

    const renderModuleContent = (moduleTitle = "") => {
        const module = modulesLesson.modules?.find(module => module.title === moduleTitle)
        const lessons = module?.lessons.map((lesson, index) => {
            return (
                <div key={index} className="flex items-center gap-4 py-4 border-b-2 last-of-type:border-b-0 pl-4 md:pl-10">
                    <PlayCircleOutlineOutlined className="text-primary" />
                    <div className="flex flex-col">
                        <Text>{lesson.title}</Text>
                        {width > 768 && (
                            <Text className="text-gray-500">{verifyTextSize(lesson.description, 50)}</Text>
                        )}
                    </div>
                </div>
            )
        })
        return lessons;
    }

    const renderBreadCrumb = () => {
        if(from === "journey") {
            return (
                <Breadcrumbs aria-label="breadcrumb">
                    <Text size="lg" asChild><Link to="/journeys">Jornadas</Link></Text>
                    <Text size="lg" asChild><Link to={`/journey/${journeyId}`}>{journey.title}</Link></Text>
                    <Text size="lg" className="text-font">{course.title}</Text>
                </Breadcrumbs>
            )
        }
        if(from === "course") {
            return (
                <Breadcrumbs aria-label="breadcrumb">
                    <Text size="lg" asChild><Link to="/courses">Cursos</Link></Text>
                    <Text size="lg" className="text-font">{course.title}</Text>
                </Breadcrumbs>
            )
        }
    }

    return loading ? <Loading /> : (
        <div className="flex flex-col gap-12 text-font">
            <div className="flex flex-col px-4 md:px-20 py-12 bg-font text-white gap-4">
                <Text>Curso</Text>
                <Heading size="lg">{course.title}</Heading>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex items-center gap-2">
                        <SchoolOutlined />
                        <div className="flex flex-col">
                            <Text>Instrutor</Text>
                            <Text>{course.instructor}</Text>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarTodayOutlined />
                        <div className="flex flex-col">
                            <Text>Atualizado em</Text>
                            <Text>{moment(course.courseUpdatedAt.$date).format("DD/MM/YYYY")}</Text>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <TimerOutlined />
                        <div className="flex flex-col">
                            <Text>Duração</Text>
                            <Text>{toTimeString(course.duration)}</Text>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col px-4 md:px-20 gap-12">
                {width > 768 && renderBreadCrumb()}
                <LazyLoadImage className="max-h-56 w-fit" src={course.medias?.thumb} />
                <div className="flex flex-col gap-2">
                    <Heading size="lg">O que você vai aprender:</Heading>
                    <Text asChild>
                        <p className="md:w-1/2 text-gray-500">{course.description}</p>
                    </Text>
                </div>
                <Heading>Conteúdo do curso:</Heading>
                <div className="md:w-1/2">
                    {renderModuleList()}
                </div>
            </div>
        </div>
    )
}