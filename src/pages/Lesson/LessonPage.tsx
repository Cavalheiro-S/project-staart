import { ArrowBackIosOutlined, PlayCircleOutlineOutlined } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AccordionStyled } from "../../components/Accordion"
import { Heading } from "../../components/Heading"
import { Loading } from "../../components/Loading"
import { Text } from "../../components/Text"
import { useWindowDimensions } from "../../hooks/useWindowDimensions"
import { ModulesFilled } from "../../interfaces"
import { api } from "../../services/axios"
import { verifyTextSize } from "../../utils"


export const LessonPage = () => {

    const [expanded, setExpanded] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [modulesLesson, setModulesLesson] = useState<ModulesFilled>({} as ModulesFilled);
    const { journeyId, courseId, lessonTitle } = useParams<{
        journeyId: string,
        courseId: string,
        lessonTitle: string
    }>()
    const navigate = useNavigate();
    const { width } = useWindowDimensions();

    useEffect(() => {
        try {
            setLoading(true);
            const loadData = async () => {
                const data = await api.get<ModulesFilled>(`/lessons/${courseId}`)
                setModulesLesson(data.data);
            }
            loadData();
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false);
        }

    }, [])

    const renderModuleList = () => {
        return modulesLesson.modules?.map(module => (
            <AccordionStyled.Item summary={module.title}>
                <AccordionStyled.Trigger expanded={expanded} summary={module.title} />
                <AccordionStyled.Content>
                    {renderModuleContent(module.title)}
                </AccordionStyled.Content>
            </AccordionStyled.Item>
        ))
    }

    const renderModuleContent = (moduleTitle = "") => {
        const module = modulesLesson.modules?.find(module => module.title === moduleTitle)
        const lessons = module?.lessons.map((lesson, index) => {
            return (
                <div onClick={() => navigate(`/lesson/${journeyId}/${courseId}/${lesson.title}`)} key={index} className="flex items-center gap-4 py-4 border-b-2 last-of-type:border-b-0 pl-4 md:pl-10">
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
    const renderLessonDescription = () => {
        const currentLesson = modulesLesson.modules?.find(module => {
            const lesson = module.lessons.find(lesson => {
                if (lesson.title === lessonTitle) {
                    return lesson.description;
                }
            })
            return lesson;
        })
        const lesson = currentLesson?.lessons.find(lesson => lesson.title === lessonTitle)

        
        return (
            <Text asChild>
                <p>{lesson?.description}</p>
            </Text>
        )
    }
    
    return loading ? <Loading/> : (
        <div className="flex flex-col md:px-20 px-4 mt-12 gap-12 ">
            <div className="flex gap-2" onClick={() => navigate(`/journey/${journeyId}/course/${courseId}/course`)}>
                <ArrowBackIosOutlined className="text-primary" />
                <Heading size="sm">{lessonTitle}</Heading>
            </div>
            <div className="flex flex-col md:grid grid-cols-3 w-full gap-6">
                <div className="flex flex-col col-span-2 gap-12 ">
                    <iframe className="h-96 w-full" src="https://www.youtube.com/embed/4hyOjN5mcug" title="A tecnologia pode transformar a sua vida." allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" />
                    <div>
                        <Text className="font-semibold" size="lg">Descrição</Text>
                        <Text asChild><p>
                            {renderLessonDescription()}
                        </p></Text>
                    </div>
                </div>
                <AccordionStyled.Root expanded={expanded} setExpanded={setExpanded} className="flex-1">
                    {renderModuleList()}
                </AccordionStyled.Root>
            </div>
        </div>
    )
}