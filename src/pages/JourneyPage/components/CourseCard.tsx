import { PlayArrowOutlined, PlayCircleOutlineOutlined } from "@mui/icons-material";
import clsx from "clsx";
import { useState } from "react";
import { Text } from "../../../components/Text";
import { Course } from "../../../interfaces";
import { toTimeString, verifyTextSize } from "../../../utils";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface CourseCardProps {
    course: Course
    onClick?: () => void,
    className?: string
}

export const CourseCard = ({ course, onClick, className }: CourseCardProps) => {
    const [isHover, setIsHover] = useState(false);

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={
                clsx("flex md:flex-row flex-col border-2 md:h-32 border-white text-font md:gap-2 group items-center hover:border-primary rounded cursor-pointer",
                    className)}>
            <div className="h-full relative rounded transition">
                <LazyLoadImage className="h-full rounded group-hover:opacity-40 transition" src={course.medias.thumb} alt={course.title} />
                {isHover && <PlayCircleOutlineOutlined className="absolute text-primary left-0 right-0 mx-auto top-0 bottom-0 my-auto" />}
                <div className={clsx("absolute bottom-0 w-full p-2 bg-opacity-30", {
                    "bg-transparent": isHover,
                    "bg-black": !isHover
                })}>
                    <Text size="sm" className="text-white">{course.instructor}</Text>
                </div>
            </div>
            <div className="flex flex-col justify-center py-4 gap-2">
                <Text>{course.title}</Text>
                <Text size="sm"> {toTimeString(course.duration)}</Text>
                <Text size="sm" className="text-gray-500">{verifyTextSize(course.description, 60)}</Text>
            </div>
        </div>
    )
}