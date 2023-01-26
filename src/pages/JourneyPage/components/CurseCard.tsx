import { TimerOutlined } from "@mui/icons-material";
import clsx from "clsx";
import { Button } from "../../../components/Button";
import { Text } from "../../../components/Text";
import { Course } from "../../../interfaces";
import { toTimeString, verifyTextSize } from "../../../utils";

interface CourseCardProps {
    course: Course
    onClick?: () => void,
    className?: string
}

export const CourseCard = ({ course, onClick, className }: CourseCardProps) => {
    return (
        <div
            onClick={onClick}
            className={clsx("flex flex-col md:flex-row text-font gap-2 py-4 border-b-2 items-center", className)}>
            <img className="h-20 w-36 rounded" src={course.medias.thumb} alt={course.title} />
            <div className="flex flex-col justify-center">
                <Text>{course.title}</Text>
                <Text className="text-gray-500"> {toTimeString(course.duration)}</Text>
                <Text className="text-gray-500">{verifyTextSize(course.description, 60)}</Text>
            </div>
        </div>
    )
}