import { PlayCircleOutlineOutlined } from "@mui/icons-material";
import clsx from "clsx";
import { Course } from "../interfaces";
import { toTimeString, verifyTextSize } from "../utils";
import { Text } from "./Text";

interface CourseCardContainerProps {
    course: Course
    onClick?: () => void,
    className?: string,
    orientation?: "horizontal" | "vertical"
    children?: React.ReactNode
}

interface CourseCardDescriptionProps {
    className?: string,
    course: Course
}

interface CourseCardHoverProps{
    className?: string,
    course: Course
}

const CardHover = ({course, className}: CourseCardHoverProps) => {

    return (
        <div className={clsx("h-full relative rounded transition", className)}>
            <img className="h-full rounded group-hover:opacity-40 transition" src={course.medias.thumb} alt={course.title} />
            <PlayCircleOutlineOutlined sx={{display:"none"}} className="absolute text-primary left-0 right-0 mx-auto top-0 bottom-0 my-auto group-hover:block" />
            <div className={clsx("absolute bottom-0 w-full p-2 bg-opacity-30 bg-black group-hover:bg-transparent")}>
                <Text size="sm" className="text-white">{course.instructor}</Text>
            </div>
        </div>
    )
}


const CardContainer = ({ onClick, className, orientation, children }: CourseCardContainerProps) => {
    return (
        <div
            onClick={onClick}
            className={clsx(
                "flex border-2 border-white text-font",
                "md:gap-2 group items-center hover:border-primary",
                "rounded cursor-pointer",
                {
                    "flex-col": orientation === "vertical",
                    "flex-row": orientation === "horizontal"
                }, className)}>
                    {children}
        </div>
    )
}

const CardDescription = ({ course, className }: CourseCardDescriptionProps) => {
    return (
        <div className={clsx("flex flex-col justify-center py-4 gap-2", className)}>
            <Text>{course.title}</Text>
            <Text size="sm"> {toTimeString(course.duration)}</Text>
            <Text size="sm" className="text-gray-500">{verifyTextSize(course.description, 60)}</Text>
        </div>
    )
}

export const Card = {
    Container: CardContainer,
    Hover: CardHover,
    Description: CardDescription,
}