import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/CourseCard";
import { Heading } from "../../components/Heading";
import { Loading } from "../../components/Loading";
import { SelectFilter } from "../../components/SelectFilter";
import { Text } from "../../components/Text";
import { Course, Journey } from "../../interfaces";
import { api } from "../../services/axios";

export const CoursesPage = () => {

    const [courses, setCourses] = useState<Course[]>([]);
    const [filterValue, setFilterValue] = useState("standard");
    const [loading, setLoading] = useState(true);
    const filterOptions = [

        {
            value: "standard",
            label: "Padrão"
        },
        {
            value: "alphabetic",
            label: "Alfabético"
        },
        {
            value: "duration",
            label: "Duração"
        },
        {
            value: "newest",
            label: "Mais recente"
        },
        {
            value: "oldest",
            label: "Mais antigo"
        }
    ]
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const journeys = await api.get<Journey[]>(`/journeys/`);
                const coursesPromise = journeys.data.map(async journey => {
                    const coursesResponse = await api.get<Course[]>(`/journeys/${journey.pathID}/courses/`)
                    coursesResponse.data.forEach(courses => {
                        courses.journeyId = journey.pathID;
                    })
                    return coursesResponse;
                })
                const coursesResolved = await Promise.all(coursesPromise);
                const courses = coursesResolved.map(course => course.data);
                const coursesFlat = courses.flat();
                const coursesPublished = coursesFlat.filter(course => course.status === "published");
                const coursesNotRepeated = coursesPublished.filter((course, index, self) =>
                    index === self.findIndex((t) => (
                        t.id === course.id
                    ))
                )
                setCourses(coursesNotRepeated);

            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }

        }
        loadData();
    }, []);


    const renderCourses = () => {
        if (loading)
            return <Loading />

        const coursesFiltered = filterCourses(filterValue, courses);
        return coursesFiltered.map((course, index) => {
            return (
                <Card.Container
                    key={`${course.title}-${index}`}
                    onClick={() => navigate(`/journey/${course.journeyId}/course/${course.id}/course`)}
                    className="flex-col md:max-w-xs" course={course}>
                    <Card.Hover course={course} key={index} />
                    <Card.Description className="px-2" course={course} />
                </Card.Container>
            )
        })
    }

    const filterCourses = (filter: string, coursesWithLesson: Course[]) => {
        const courseEmpty = [] as Course[];
        const coursesFiltered = courseEmpty.concat(...coursesWithLesson)

        if (filter === 'standard')
            return coursesFiltered;
        switch (filter) {
            case 'alphabetic':
                coursesFiltered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'duration':
                coursesFiltered.sort((a, b) => a.duration - b.duration);
                break;
            case 'newest':
                coursesFiltered.sort((a, b) => moment(a.courseCreatedAt.$date).isBefore(moment(b.courseCreatedAt.$date)) ? 1 : -1);
                break;
            case 'oldest':
                coursesFiltered.sort((a, b) => moment(a.courseCreatedAt.$date).isAfter(moment(b.courseCreatedAt.$date)) ? 1 : -1);
                break;
            default:
                break;
        }
        return coursesFiltered;
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const filter = event.target.value as string;
        setFilterValue(filter);
    };
    return (
        <div className="flex flex-col mt-12 px-4 md:px-20 gap-6">
            <div>
                <Heading className="text-font">Cursos</Heading>
                <Text className="text-gray-500">Todas os cursos da plataforma</Text>
            </div>
            <SelectFilter options={filterOptions} filterValue={filterValue} handleChange={handleChange} />
            <div className="flex flex-wrap gap-6 h-full">
                {renderCourses()}
            </div>

        </div>
    );
};
